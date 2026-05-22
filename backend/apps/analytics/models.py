"""
Analytics event tracking model.
"""

from django.conf import settings
from django.db import models
from core.mixins import BaseModel


class AnalyticsEvent(BaseModel):
    """Tracks user interactions for analytics and reporting."""

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)

    event_type = models.CharField(max_length=50, db_index=True, help_text='e.g., page_view, course_view, search, enquiry_submit')
    entity_type = models.CharField(max_length=50, blank=True, default='', help_text='e.g., course, institute')
    entity_id = models.UUIDField(null=True, blank=True)

    metadata = models.JSONField(default=dict, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True, default='')
    referrer = models.URLField(blank=True, default='')
    session_id = models.CharField(max_length=100, blank=True, default='')

    class Meta:
        db_table = 'analytics_events'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['event_type', 'created_at']),
            models.Index(fields=['entity_type', 'entity_id']),
        ]

    def __str__(self):
        return f'{self.event_type} — {self.entity_type}:{self.entity_id}'
