"""
Notification model — Phase 2.
"""

from django.conf import settings
from django.db import models
from core.mixins import BaseModel


class Notification(BaseModel):
    """User notifications."""

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    notification_type = models.CharField(max_length=50, default='info')
    is_read = models.BooleanField(default=False)
    link = models.URLField(blank=True, default='')

    class Meta:
        db_table = 'notifications'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.title} → {self.user.email}'
