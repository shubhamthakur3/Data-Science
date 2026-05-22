from django.contrib import admin
from .models import Admission

@admin.register(Admission)
class AdmissionAdmin(admin.ModelAdmin):
    list_display = ['student', 'course', 'payment_status', 'status', 'start_date', 'created_at']
    list_filter = ['payment_status', 'status']
    search_fields = ['student__email', 'course__title', 'batch_code']
