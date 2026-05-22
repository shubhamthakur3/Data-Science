"""
Serializers for Course management and discovery.
"""

from rest_framework import serializers
from apps.institutes.serializers import InstituteListSerializer
from .models import Course, CourseCategory, SyllabusModule


class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = ['id', 'name', 'slug', 'description', 'icon', 'sort_order']


class SyllabusModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SyllabusModule
        fields = ['id', 'title', 'description', 'sort_order', 'duration_hours', 'topics']


class CourseListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for course listing pages."""
    institute_name = serializers.CharField(source='institute.name', read_only=True)
    institute_slug = serializers.CharField(source='institute.slug', read_only=True)
    institute_city = serializers.CharField(source='institute.city', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True, default=None)
    effective_fees = serializers.ReadOnlyField()
    discount_percentage = serializers.ReadOnlyField()

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'short_description', 'thumbnail',
            'institute_name', 'institute_slug', 'institute_city',
            'category_name',
            'fees', 'discounted_fees', 'effective_fees', 'discount_percentage',
            'duration_weeks', 'difficulty', 'mode',
            'placement_support', 'certification',
            'avg_rating', 'total_reviews', 'total_enrollments',
            'tools_covered', 'is_featured', 'is_trending',
        ]


class CourseDetailSerializer(serializers.ModelSerializer):
    """Full serializer for course detail page."""
    institute = InstituteListSerializer(read_only=True)
    category = CourseCategorySerializer(read_only=True)
    syllabus_modules = SyllabusModuleSerializer(many=True, read_only=True)
    effective_fees = serializers.ReadOnlyField()
    discount_percentage = serializers.ReadOnlyField()

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'thumbnail', 'banner',
            'institute', 'category',
            'fees', 'discounted_fees', 'effective_fees', 'discount_percentage',
            'duration_weeks', 'total_hours', 'difficulty', 'mode',
            'tools_covered', 'highlights', 'prerequisites', 'learning_outcomes',
            'placement_support', 'certification', 'placement_rate',
            'avg_rating', 'total_reviews', 'total_enrollments', 'total_views',
            'meta_title', 'meta_description',
            'is_featured', 'is_trending',
            'syllabus_modules',
            'created_at', 'updated_at',
        ]


class CourseCompareSerializer(serializers.ModelSerializer):
    """Serializer for comparing multiple courses side by side."""
    institute_name = serializers.CharField(source='institute.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True, default=None)
    effective_fees = serializers.ReadOnlyField()
    syllabus_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'institute_name', 'category_name',
            'fees', 'effective_fees', 'duration_weeks', 'total_hours',
            'difficulty', 'mode',
            'tools_covered', 'highlights',
            'placement_support', 'certification', 'placement_rate',
            'avg_rating', 'total_reviews',
            'syllabus_count',
        ]

    def get_syllabus_count(self, obj):
        return obj.syllabus_modules.count()


class CourseCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for admin course CRUD."""
    syllabus_modules = SyllabusModuleSerializer(many=True, required=False)

    class Meta:
        model = Course
        fields = [
            'title', 'slug', 'description', 'short_description',
            'thumbnail', 'banner',
            'institute', 'category',
            'fees', 'discounted_fees', 'duration_weeks', 'total_hours',
            'difficulty', 'mode',
            'tools_covered', 'highlights', 'prerequisites', 'learning_outcomes',
            'placement_support', 'certification', 'placement_rate',
            'meta_title', 'meta_description',
            'is_featured', 'is_trending', 'is_active',
            'syllabus_modules',
        ]

    def create(self, validated_data):
        modules_data = validated_data.pop('syllabus_modules', [])
        course = Course.objects.create(**validated_data)
        for module_data in modules_data:
            SyllabusModule.objects.create(course=course, **module_data)
        return course

    def update(self, instance, validated_data):
        modules_data = validated_data.pop('syllabus_modules', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if modules_data is not None:
            # Replace all modules
            instance.syllabus_modules.all().delete()
            for module_data in modules_data:
                SyllabusModule.objects.create(course=instance, **module_data)

        return instance
