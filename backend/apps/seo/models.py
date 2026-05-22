"""
SEO Page model for managing meta content and landing pages.
"""

from django.db import models
from core.mixins import BaseModel, SlugMixin


class SEOPage(BaseModel, SlugMixin):
    """Custom SEO pages managed by admin."""

    title = models.CharField(max_length=255)
    meta_description = models.TextField(blank=True, default='')
    meta_keywords = models.CharField(max_length=500, blank=True, default='')
    content = models.TextField(blank=True, default='')
    structured_data = models.JSONField(default=dict, blank=True)
    is_published = models.BooleanField(default=False)
    page_type = models.CharField(max_length=50, default='landing', help_text='e.g., landing, blog, category')

    class Meta:
        db_table = 'seo_pages'
        ordering = ['-updated_at']

    def __str__(self):
        return self.title
