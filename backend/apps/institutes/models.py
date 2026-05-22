"""
Institute model for Data Science training institutes.
"""

from django.db import models
from core.mixins import BaseModel, SlugMixin, SoftDeleteMixin


class Institute(BaseModel, SlugMixin, SoftDeleteMixin):
    """Represents a Data Science training institute."""

    name = models.CharField(max_length=255, db_index=True)
    description = models.TextField(blank=True, default='')
    short_description = models.CharField(max_length=500, blank=True, default='')

    # Location
    address = models.TextField(blank=True, default='')
    city = models.CharField(max_length=100, db_index=True)
    state = models.CharField(max_length=100, db_index=True)
    pincode = models.CharField(max_length=10, blank=True, default='')
    latitude = models.DecimalField(max_digits=10, decimal_places=8, null=True, blank=True)
    longitude = models.DecimalField(max_digits=11, decimal_places=8, null=True, blank=True)

    # Contact
    website = models.URLField(blank=True, default='')
    email = models.EmailField(blank=True, default='')
    phone = models.CharField(max_length=20, blank=True, default='')

    # Branding
    logo = models.ImageField(upload_to='institutes/logos/', blank=True, null=True)
    banner = models.ImageField(upload_to='institutes/banners/', blank=True, null=True)

    # Stats (denormalized for performance)
    avg_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_reviews = models.PositiveIntegerField(default=0)
    total_courses = models.PositiveIntegerField(default=0)
    total_placements = models.PositiveIntegerField(default=0)

    # SEO
    meta_title = models.CharField(max_length=255, blank=True, default='')
    meta_description = models.TextField(blank=True, default='')

    # Features
    established_year = models.PositiveIntegerField(null=True, blank=True)
    is_featured = models.BooleanField(default=False, db_index=True)

    class Meta:
        db_table = 'institutes'
        verbose_name = 'Institute'
        verbose_name_plural = 'Institutes'
        ordering = ['-is_featured', '-avg_rating', 'name']
        indexes = [
            models.Index(fields=['city', 'state']),
            models.Index(fields=['is_featured', 'is_active']),
        ]

    def __str__(self):
        return self.name
