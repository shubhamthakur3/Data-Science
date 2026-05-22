from django.contrib import admin
from .models import Institute


@admin.register(Institute)
class InstituteAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'state', 'avg_rating', 'total_courses', 'is_featured', 'is_active']
    list_filter = ['city', 'state', 'is_featured', 'is_active']
    search_fields = ['name', 'city', 'description']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['-created_at']
