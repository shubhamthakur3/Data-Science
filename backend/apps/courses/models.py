"""
Course, CourseCategory, and SyllabusModule models.
"""

from django.db import models
from core.mixins import BaseModel, SlugMixin, SoftDeleteMixin


class DifficultyLevel(models.TextChoices):
    BEGINNER = 'beginner', 'Beginner'
    INTERMEDIATE = 'intermediate', 'Intermediate'
    ADVANCED = 'advanced', 'Advanced'
    ALL_LEVELS = 'all_levels', 'All Levels'


class CourseMode(models.TextChoices):
    ONLINE = 'online', 'Online'
    OFFLINE = 'offline', 'Offline'
    HYBRID = 'hybrid', 'Hybrid'


class CourseCategory(BaseModel, SlugMixin):
    """Category for grouping courses (e.g., Data Science, ML, AI, etc.)."""

    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, default='')
    icon = models.CharField(max_length=50, blank=True, default='', help_text='Icon class name or emoji')
    sort_order = models.PositiveIntegerField(default=0, db_index=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'course_categories'
        verbose_name = 'Course Category'
        verbose_name_plural = 'Course Categories'
        ordering = ['sort_order', 'name']

    def __str__(self):
        return self.name


class Course(BaseModel, SlugMixin, SoftDeleteMixin):
    """Represents a Data Science training course offered by an institute."""

    # Relationships
    institute = models.ForeignKey(
        'institutes.Institute',
        on_delete=models.CASCADE,
        related_name='courses',
        db_index=True,
    )
    category = models.ForeignKey(
        CourseCategory,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='courses',
    )

    # Core details
    title = models.CharField(max_length=255, db_index=True)
    description = models.TextField()
    short_description = models.CharField(max_length=500, blank=True, default='')
    thumbnail = models.ImageField(upload_to='courses/thumbnails/', blank=True, null=True)
    banner = models.ImageField(upload_to='courses/banners/', blank=True, null=True)

    # Pricing & Duration
    fees = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_fees = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    duration_weeks = models.PositiveIntegerField(help_text='Duration in weeks')
    total_hours = models.PositiveIntegerField(default=0, help_text='Total learning hours')

    # Classification
    difficulty = models.CharField(
        max_length=20,
        choices=DifficultyLevel.choices,
        default=DifficultyLevel.BEGINNER,
        db_index=True,
    )
    mode = models.CharField(
        max_length=20,
        choices=CourseMode.choices,
        default=CourseMode.ONLINE,
        db_index=True,
    )

    # Features (JSON fields for flexibility)
    tools_covered = models.JSONField(default=list, blank=True, help_text='List of tools/technologies covered')
    highlights = models.JSONField(default=list, blank=True, help_text='Course highlights')
    prerequisites = models.JSONField(default=list, blank=True, help_text='Course prerequisites')
    learning_outcomes = models.JSONField(default=list, blank=True, help_text='What students will learn')

    # Placement & Certification
    placement_support = models.BooleanField(default=False, db_index=True)
    certification = models.BooleanField(default=True)
    placement_rate = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True,
                                          help_text='Placement rate percentage')

    # Stats (denormalized)
    avg_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_reviews = models.PositiveIntegerField(default=0)
    total_enrollments = models.PositiveIntegerField(default=0)
    total_views = models.PositiveIntegerField(default=0)

    # SEO
    meta_title = models.CharField(max_length=255, blank=True, default='')
    meta_description = models.TextField(blank=True, default='')

    # Flags
    is_featured = models.BooleanField(default=False, db_index=True)
    is_trending = models.BooleanField(default=False, db_index=True)

    class Meta:
        db_table = 'courses'
        verbose_name = 'Course'
        verbose_name_plural = 'Courses'
        ordering = ['-is_featured', '-avg_rating', '-created_at']
        indexes = [
            models.Index(fields=['institute', 'is_active']),
            models.Index(fields=['category', 'is_active']),
            models.Index(fields=['difficulty', 'mode']),
            models.Index(fields=['fees']),
            models.Index(fields=['is_featured', 'is_trending']),
        ]

    def __str__(self):
        return f'{self.title} — {self.institute.name}'

    @property
    def effective_fees(self):
        """Return discounted fees if available, otherwise regular fees."""
        return self.discounted_fees if self.discounted_fees else self.fees

    @property
    def discount_percentage(self):
        """Calculate discount percentage."""
        if self.discounted_fees and self.fees > 0:
            return round(((self.fees - self.discounted_fees) / self.fees) * 100, 1)
        return 0


class SyllabusModule(BaseModel):
    """Represents a module/topic within a course syllabus."""

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='syllabus_modules',
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    sort_order = models.PositiveIntegerField(default=0)
    duration_hours = models.PositiveIntegerField(default=0, help_text='Duration in hours')
    topics = models.JSONField(default=list, blank=True, help_text='List of topic strings')

    class Meta:
        db_table = 'syllabus_modules'
        verbose_name = 'Syllabus Module'
        verbose_name_plural = 'Syllabus Modules'
        ordering = ['sort_order']
        unique_together = ['course', 'sort_order']

    def __str__(self):
        return f'{self.course.title} — Module {self.sort_order}: {self.title}'
