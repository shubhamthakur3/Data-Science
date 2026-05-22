"""
Placement model for tracking student job placements.
"""

from django.conf import settings
from django.db import models
from core.mixins import BaseModel


class Placement(BaseModel):
    """Tracks student placements after course completion."""

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='placements')
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='placements')
    institute = models.ForeignKey('institutes.Institute', on_delete=models.CASCADE, related_name='placements')

    company_name = models.CharField(max_length=255, db_index=True)
    designation = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    placed_date = models.DateField()
    location = models.CharField(max_length=255, blank=True, default='')

    is_verified = models.BooleanField(default=False)
    testimonial = models.TextField(blank=True, default='')

    class Meta:
        db_table = 'placements'
        ordering = ['-placed_date']
        indexes = [
            models.Index(fields=['company_name']),
            models.Index(fields=['institute', 'placed_date']),
        ]

    def __str__(self):
        return f'{self.student.full_name} → {self.company_name}'
