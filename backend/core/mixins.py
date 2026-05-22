"""
Shared model mixins for the platform.
"""

import uuid
from django.db import models


class TimeStampedMixin(models.Model):
    """Adds created_at and updated_at timestamps."""
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ['-created_at']


class UUIDMixin(models.Model):
    """Uses UUID as primary key instead of auto-incrementing integer."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True


class BaseModel(UUIDMixin, TimeStampedMixin):
    """
    Base model combining UUID primary key and timestamps.
    All domain models should inherit from this.
    """

    class Meta:
        abstract = True
        ordering = ['-created_at']


class SlugMixin(models.Model):
    """Adds a unique slug field for SEO-friendly URLs."""
    slug = models.SlugField(max_length=255, unique=True, db_index=True)

    class Meta:
        abstract = True


class SoftDeleteMixin(models.Model):
    """Adds soft delete capability."""
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        abstract = True

    def soft_delete(self):
        self.is_active = False
        self.save(update_fields=['is_active'])

    def restore(self):
        self.is_active = True
        self.save(update_fields=['is_active'])
