"""
Serializers for Enquiry management.
"""

from rest_framework import serializers
from .models import Enquiry, EnquiryNote


class EnquirySubmitSerializer(serializers.ModelSerializer):
    """Serializer for students submitting enquiries (public)."""

    class Meta:
        model = Enquiry
        fields = ['name', 'email', 'phone', 'message', 'course', 'institute', 'source']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['student'] = request.user
        return super().create(validated_data)


class EnquiryNoteSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.full_name', read_only=True)

    class Meta:
        model = EnquiryNote
        fields = ['id', 'content', 'author', 'author_name', 'created_at']
        read_only_fields = ['id', 'author', 'author_name', 'created_at']


class EnquiryListSerializer(serializers.ModelSerializer):
    """Serializer for listing enquiries (admin/counsellor)."""
    course_title = serializers.CharField(source='course.title', read_only=True, default=None)
    institute_name = serializers.CharField(source='institute.name', read_only=True, default=None)
    counsellor_name = serializers.CharField(
        source='assigned_counsellor.full_name', read_only=True, default=None
    )

    class Meta:
        model = Enquiry
        fields = [
            'id', 'name', 'email', 'phone', 'status', 'source', 'priority',
            'course_title', 'institute_name', 'counsellor_name',
            'follow_up_date', 'created_at', 'updated_at',
        ]


class EnquiryDetailSerializer(serializers.ModelSerializer):
    """Full serializer for enquiry detail (admin/counsellor)."""
    course_title = serializers.CharField(source='course.title', read_only=True, default=None)
    institute_name = serializers.CharField(source='institute.name', read_only=True, default=None)
    counsellor_name = serializers.CharField(
        source='assigned_counsellor.full_name', read_only=True, default=None
    )
    enquiry_notes = EnquiryNoteSerializer(many=True, read_only=True)
    student_name = serializers.CharField(source='student.full_name', read_only=True, default=None)

    class Meta:
        model = Enquiry
        fields = [
            'id', 'name', 'email', 'phone', 'message',
            'student', 'student_name',
            'course', 'course_title',
            'institute', 'institute_name',
            'status', 'source', 'priority',
            'assigned_counsellor', 'counsellor_name',
            'notes', 'follow_up_date', 'metadata',
            'converted_at', 'conversion_value',
            'enquiry_notes',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'student', 'created_at', 'updated_at']


class EnquiryAssignSerializer(serializers.Serializer):
    """Serializer for assigning a counsellor to an enquiry."""
    counsellor_id = serializers.UUIDField(required=True)


class EnquiryStatusUpdateSerializer(serializers.Serializer):
    """Serializer for updating enquiry status."""
    status = serializers.ChoiceField(choices=Enquiry._meta.get_field('status').choices)
    notes = serializers.CharField(required=False, allow_blank=True)
