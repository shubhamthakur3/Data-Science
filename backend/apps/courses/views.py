"""
Views for Course discovery, comparison, and management.
"""

from django.db import models
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from core.permissions import IsAdmin, IsAdminOrReadOnly
from .models import Course, CourseCategory
from .serializers import (
    CourseCategorySerializer,
    CourseCompareSerializer,
    CourseCreateUpdateSerializer,
    CourseDetailSerializer,
    CourseListSerializer,
)


class CourseCategoryListView(generics.ListCreateAPIView):
    """
    GET /api/v1/courses/categories/ — List all categories
    POST /api/v1/courses/categories/ — Create category (admin)
    """
    serializer_class = CourseCategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    queryset = CourseCategory.objects.filter(is_active=True)
    search_fields = ['name']
    ordering = ['sort_order']
    pagination_class = None  # Categories are few, no pagination needed


class CourseListCreateView(generics.ListCreateAPIView):
    """
    GET /api/v1/courses/ — List courses with filters
    POST /api/v1/courses/ — Create course (admin)
    """
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = {
        'category__slug': ['exact'],
        'institute__slug': ['exact'],
        'difficulty': ['exact'],
        'mode': ['exact'],
        'placement_support': ['exact'],
        'certification': ['exact'],
        'is_featured': ['exact'],
        'is_trending': ['exact'],
        'fees': ['gte', 'lte'],
        'duration_weeks': ['gte', 'lte'],
    }
    search_fields = ['title', 'description', 'tools_covered', 'institute__name', 'institute__city']
    ordering_fields = ['fees', 'duration_weeks', 'avg_rating', 'total_reviews',
                       'total_enrollments', 'created_at']
    ordering = ['-is_featured', '-avg_rating']

    def get_queryset(self):
        qs = Course.objects.select_related('institute', 'category')
        if self.request.user.is_authenticated and getattr(self.request.user, 'role', '') == 'admin':
            return qs
        return qs.filter(is_active=True, institute__is_active=True)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CourseCreateUpdateSerializer
        return CourseListSerializer


class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET /api/v1/courses/<slug>/ — Course detail
    PUT/PATCH /api/v1/courses/<slug>/ — Update (admin)
    DELETE /api/v1/courses/<slug>/ — Soft delete (admin)
    """
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'

    def get_queryset(self):
        qs = Course.objects.select_related('institute', 'category').prefetch_related('syllabus_modules')
        if self.request.user.is_authenticated and getattr(self.request.user, 'role', '') == 'admin':
            return qs
        return qs.filter(is_active=True)

    def get_serializer_class(self):
        if self.request.method in ('PUT', 'PATCH'):
            return CourseCreateUpdateSerializer
        return CourseDetailSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        Course.objects.filter(pk=instance.pk).update(total_views=models.F('total_views') + 1)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def perform_destroy(self, instance):
        instance.soft_delete()


class CourseCompareView(APIView):
    """
    GET /api/v1/courses/compare/?ids=uuid1,uuid2,uuid3
    Compare up to 4 courses side by side.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        ids = request.query_params.get('ids', '')
        if not ids:
            return Response(
                {'error': 'Please provide course IDs as ?ids=id1,id2,...'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        id_list = [i.strip() for i in ids.split(',') if i.strip()]
        if len(id_list) < 1:
            return Response(
                {'error': 'Please provide at least 1 course ID to compare.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if len(id_list) > 4:
            return Response(
                {'error': 'You can compare a maximum of 4 courses.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        courses = Course.objects.filter(
            id__in=id_list, is_active=True
        ).select_related('institute', 'category')

        serializer = CourseCompareSerializer(courses, many=True)
        return Response({
            'count': courses.count(),
            'courses': serializer.data,
        })
