from django.contrib import admin
from .models import SEOPage

@admin.register(SEOPage)
class SEOPageAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'page_type', 'is_published', 'updated_at']
    list_filter = ['is_published', 'page_type']
    prepopulated_fields = {'slug': ('title',)}
