from django.contrib import admin
from .models import Placement

@admin.register(Placement)
class PlacementAdmin(admin.ModelAdmin):
    list_display = ['student', 'company_name', 'designation', 'salary', 'placed_date', 'is_verified']
    list_filter = ['is_verified', 'placed_date']
    search_fields = ['student__email', 'company_name', 'designation']
