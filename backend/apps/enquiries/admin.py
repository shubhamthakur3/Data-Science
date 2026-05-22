from django.contrib import admin
from .models import Enquiry, EnquiryNote


class EnquiryNoteInline(admin.TabularInline):
    model = EnquiryNote
    extra = 0
    readonly_fields = ['author', 'created_at']


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'course', 'status', 'source', 'priority',
                    'assigned_counsellor', 'created_at']
    list_filter = ['status', 'source', 'priority', 'created_at']
    search_fields = ['name', 'email', 'phone']
    inlines = [EnquiryNoteInline]
    ordering = ['-created_at']
