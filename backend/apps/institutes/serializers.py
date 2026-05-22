"""
Serializers for Institute management.
"""

from rest_framework import serializers
from .models import Institute


class InstituteListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for listing institutes."""

    class Meta:
        model = Institute
        fields = [
            'id', 'name', 'slug', 'short_description', 'city', 'state',
            'logo', 'avg_rating', 'total_reviews', 'total_courses',
            'total_placements', 'is_featured',
        ]


class InstituteDetailSerializer(serializers.ModelSerializer):
    """Full serializer for institute detail view."""

    class Meta:
        model = Institute
        fields = [
            'id', 'name', 'slug', 'description', 'short_description',
            'address', 'city', 'state', 'pincode', 'latitude', 'longitude',
            'website', 'email', 'phone',
            'logo', 'banner',
            'avg_rating', 'total_reviews', 'total_courses', 'total_placements',
            'meta_title', 'meta_description',
            'established_year', 'is_featured', 'is_active',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'avg_rating', 'total_reviews', 'total_courses',
                            'total_placements', 'created_at', 'updated_at']


class InstituteCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating/updating institutes (admin only)."""

    class Meta:
        model = Institute
        fields = [
            'name', 'slug', 'description', 'short_description',
            'address', 'city', 'state', 'pincode', 'latitude', 'longitude',
            'website', 'email', 'phone',
            'logo', 'banner',
            'meta_title', 'meta_description',
            'established_year', 'is_featured', 'is_active',
        ]
