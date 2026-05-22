"""
Enquiry model for lead management and student interest tracking.
"""

from django.conf import settings
from django.db import models
from core.mixins import BaseModel


class EnquiryStatus(models.TextChoices):
    NEW = 'new', 'New'
    CONTACTED = 'contacted', 'Contacted'
    FOLLOW_UP = 'follow_up', 'Follow Up'
    INTERESTED = 'interested', 'Interested'
    NOT_INTERESTED = 'not_interested', 'Not Interested'
    ENROLLED = 'enrolled', 'Enrolled'
    CLOSED = 'closed', 'Closed'


class EnquirySource(models.TextChoices):
    WEBSITE = 'website', 'Website'
    GOOGLE = 'google', 'Google Search'
    SOCIAL_MEDIA = 'social_media', 'Social Media'
    REFERRAL = 'referral', 'Referral'
    DIRECT = 'direct', 'Direct'
    ADVERTISEMENT = 'advertisement', 'Advertisement'
    OTHER = 'other', 'Other'


class Enquiry(BaseModel):
    """
    Represents a student enquiry/lead for a specific course.
    Tracks the full lifecycle from submission to conversion.
    """

    # Student info (can be from registered user or anonymous)
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='enquiries',
    )
    name = models.CharField(max_length=255)
    email = models.EmailField(db_index=True)
    phone = models.CharField(max_length=20)
    message = models.TextField(blank=True, default='')

    # Course/Institute reference
    course = models.ForeignKey(
        'courses.Course',
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='enquiries',
    )
    institute = models.ForeignKey(
        'institutes.Institute',
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='enquiries',
    )

    # Lead management
    status = models.CharField(
        max_length=20,
        choices=EnquiryStatus.choices,
        default=EnquiryStatus.NEW,
        db_index=True,
    )
    source = models.CharField(
        max_length=20,
        choices=EnquirySource.choices,
        default=EnquirySource.WEBSITE,
        db_index=True,
    )
    assigned_counsellor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='assigned_enquiries',
        limit_choices_to={'role': 'counsellor'},
    )

    # Tracking
    priority = models.CharField(
        max_length=10,
        choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')],
        default='medium',
    )
    notes = models.TextField(blank=True, default='', help_text='Internal notes by counsellor/admin')
    follow_up_date = models.DateField(null=True, blank=True)
    metadata = models.JSONField(default=dict, blank=True, help_text='Additional tracking data')

    # Conversion tracking
    converted_at = models.DateTimeField(null=True, blank=True)
    conversion_value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = 'enquiries'
        verbose_name = 'Enquiry'
        verbose_name_plural = 'Enquiries'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'created_at']),
            models.Index(fields=['source', 'status']),
            models.Index(fields=['assigned_counsellor', 'status']),
            models.Index(fields=['email']),
        ]

    def __str__(self):
        course_name = self.course.title if self.course else 'General'
        return f'{self.name} — {course_name} ({self.status})'


class EnquiryNote(BaseModel):
    """Notes/comments on an enquiry by counsellors/admins."""

    enquiry = models.ForeignKey(
        Enquiry,
        on_delete=models.CASCADE,
        related_name='enquiry_notes',
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
    )
    content = models.TextField()

    class Meta:
        db_table = 'enquiry_notes'
        ordering = ['-created_at']

    def __str__(self):
        return f'Note on {self.enquiry} by {self.author}'
