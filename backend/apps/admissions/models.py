"""
Admission model for enrollment tracking.
"""

from django.conf import settings
from django.db import models
from core.mixins import BaseModel


class PaymentStatus(models.TextChoices):
    PENDING = 'pending', 'Pending'
    PARTIAL = 'partial', 'Partial'
    COMPLETED = 'completed', 'Completed'
    REFUNDED = 'refunded', 'Refunded'


class AdmissionStatus(models.TextChoices):
    ACTIVE = 'active', 'Active'
    COMPLETED = 'completed', 'Completed'
    DROPPED = 'dropped', 'Dropped'
    ON_HOLD = 'on_hold', 'On Hold'


class Admission(BaseModel):
    """Tracks student enrollment in courses."""

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='admissions')
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='admissions')
    enquiry = models.OneToOneField('enquiries.Enquiry', on_delete=models.SET_NULL, null=True, blank=True)

    # Payment
    total_fees = models.DecimalField(max_digits=10, decimal_places=2)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    payment_status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)

    # Batch info
    batch_code = models.CharField(max_length=50, blank=True, default='')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    status = models.CharField(max_length=20, choices=AdmissionStatus.choices, default=AdmissionStatus.ACTIVE)

    class Meta:
        db_table = 'admissions'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['student', 'status']),
            models.Index(fields=['course', 'status']),
        ]

    def __str__(self):
        return f'{self.student.full_name} — {self.course.title}'
