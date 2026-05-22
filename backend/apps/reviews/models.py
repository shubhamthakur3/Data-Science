"""
Review & Rating model.
"""

from django.conf import settings
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from core.mixins import BaseModel


class Review(BaseModel):
    """Student reviews and ratings for courses/institutes."""

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, null=True, blank=True, related_name='reviews')
    institute = models.ForeignKey('institutes.Institute', on_delete=models.CASCADE, null=True, blank=True, related_name='reviews')

    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    title = models.CharField(max_length=255, blank=True, default='')
    comment = models.TextField()

    is_approved = models.BooleanField(default=False, db_index=True)

    class Meta:
        db_table = 'reviews'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['course', 'is_approved']),
            models.Index(fields=['institute', 'is_approved']),
        ]

    def __str__(self):
        target = self.course.title if self.course else (self.institute.name if self.institute else 'N/A')
        return f'{self.student.full_name} — {target} ({self.rating}/5)'
