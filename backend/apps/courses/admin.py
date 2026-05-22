from django.contrib import admin
from .models import Course, CourseCategory, SyllabusModule


class SyllabusModuleInline(admin.TabularInline):
    model = SyllabusModule
    extra = 1
    ordering = ['sort_order']


@admin.register(CourseCategory)
class CourseCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'sort_order', 'is_active']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'institute', 'category', 'fees', 'difficulty', 'mode',
                    'avg_rating', 'is_featured', 'is_active']
    list_filter = ['category', 'difficulty', 'mode', 'placement_support', 'is_featured', 'is_active']
    search_fields = ['title', 'description', 'institute__name']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [SyllabusModuleInline]
    ordering = ['-created_at']
