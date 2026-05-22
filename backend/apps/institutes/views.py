"""
Views for Institute management.
"""

from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from core.permissions import IsAdminOrReadOnly
from .models import Institute
from .serializers import (
    InstituteCreateUpdateSerializer,
    InstituteDetailSerializer,
    InstituteListSerializer,
)


class InstituteListCreateView(generics.ListCreateAPIView):
    """
    GET /api/v1/institutes/ — List all active institutes
    POST /api/v1/institutes/ — Create a new institute (admin only)
    """
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['city', 'state', 'is_featured']
    search_fields = ['name', 'city', 'state', 'description']
    ordering_fields = ['name', 'avg_rating', 'total_courses', 'created_at']
    ordering = ['-is_featured', '-avg_rating']

    def get_queryset(self):
        if self.request.user.is_authenticated and getattr(self.request.user, 'role', '') == 'admin':
            return Institute.objects.all()
        return Institute.objects.filter(is_active=True)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return InstituteCreateUpdateSerializer
        return InstituteListSerializer


class InstituteDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET /api/v1/institutes/<slug>/ — Institute detail
    PUT/PATCH /api/v1/institutes/<slug>/ — Update (admin)
    DELETE /api/v1/institutes/<slug>/ — Soft delete (admin)
    """
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'

    def get_queryset(self):
        if self.request.user.is_authenticated and getattr(self.request.user, 'role', '') == 'admin':
            return Institute.objects.all()
        return Institute.objects.filter(is_active=True)

    def get_serializer_class(self):
        if self.request.method in ('PUT', 'PATCH'):
            return InstituteCreateUpdateSerializer
        return InstituteDetailSerializer

    def perform_destroy(self, instance):
        """Soft delete instead of hard delete."""
        instance.soft_delete()
