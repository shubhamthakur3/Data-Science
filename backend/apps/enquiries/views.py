"""
Views for Enquiry management.
"""

from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from core.permissions import IsAdmin, IsAdminOrCounsellor
from .models import Enquiry, EnquiryNote
from .serializers import (
    EnquiryAssignSerializer,
    EnquiryDetailSerializer,
    EnquiryListSerializer,
    EnquiryNoteSerializer,
    EnquiryStatusUpdateSerializer,
    EnquirySubmitSerializer,
)

User = get_user_model()


class EnquirySubmitView(generics.CreateAPIView):
    """
    POST /api/v1/enquiries/
    Submit a new enquiry (public access).
    """
    serializer_class = EnquirySubmitSerializer
    permission_classes = [permissions.AllowAny]
    throttle_scope = 'anon'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = serializer.save()
        return Response(
            {
                'success': True,
                'message': 'Your enquiry has been submitted successfully. We will contact you soon!',
                'data': {'id': str(enquiry.id)},
            },
            status=status.HTTP_201_CREATED,
        )


class EnquiryListView(generics.ListAPIView):
    """
    GET /api/v1/enquiries/list/
    List enquiries (admin/counsellor only).
    """
    serializer_class = EnquiryListSerializer
    permission_classes = [IsAdminOrCounsellor]
    filterset_fields = ['status', 'source', 'priority', 'assigned_counsellor']
    search_fields = ['name', 'email', 'phone', 'course__title']
    ordering_fields = ['created_at', 'status', 'priority']
    ordering = ['-created_at']

    def get_queryset(self):
        qs = Enquiry.objects.select_related('course', 'institute', 'assigned_counsellor')
        if self.request.user.role == 'counsellor':
            return qs.filter(assigned_counsellor=self.request.user)
        return qs


class EnquiryDetailView(generics.RetrieveUpdateAPIView):
    """
    GET /api/v1/enquiries/<id>/
    PATCH /api/v1/enquiries/<id>/
    View or update an enquiry (admin/counsellor).
    """
    serializer_class = EnquiryDetailSerializer
    permission_classes = [IsAdminOrCounsellor]
    lookup_field = 'id'

    def get_queryset(self):
        qs = Enquiry.objects.select_related(
            'course', 'institute', 'assigned_counsellor', 'student'
        ).prefetch_related('enquiry_notes')
        if self.request.user.role == 'counsellor':
            return qs.filter(assigned_counsellor=self.request.user)
        return qs


class EnquiryAssignView(APIView):
    """
    PATCH /api/v1/enquiries/<id>/assign/
    Assign a counsellor to an enquiry (admin only).
    """
    permission_classes = [IsAdmin]

    def patch(self, request, id):
        serializer = EnquiryAssignSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            enquiry = Enquiry.objects.get(id=id)
        except Enquiry.DoesNotExist:
            return Response({'error': 'Enquiry not found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            counsellor = User.objects.get(
                id=serializer.validated_data['counsellor_id'],
                role='counsellor',
            )
        except User.DoesNotExist:
            return Response({'error': 'Counsellor not found.'}, status=status.HTTP_404_NOT_FOUND)

        enquiry.assigned_counsellor = counsellor
        if enquiry.status == 'new':
            enquiry.status = 'contacted'
        enquiry.save()

        return Response({
            'success': True,
            'message': f'Enquiry assigned to {counsellor.full_name}.',
        })


class EnquiryStatusUpdateView(APIView):
    """
    PATCH /api/v1/enquiries/<id>/status/
    Update enquiry status (admin/counsellor).
    """
    permission_classes = [IsAdminOrCounsellor]

    def patch(self, request, id):
        serializer = EnquiryStatusUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            enquiry = Enquiry.objects.get(id=id)
        except Enquiry.DoesNotExist:
            return Response({'error': 'Enquiry not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check counsellor can only update their assigned enquiries
        if request.user.role == 'counsellor' and enquiry.assigned_counsellor != request.user:
            return Response({'error': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)

        enquiry.status = serializer.validated_data['status']
        if serializer.validated_data['status'] == 'enrolled':
            enquiry.converted_at = timezone.now()
        enquiry.save()

        # Add note if provided
        notes = serializer.validated_data.get('notes', '')
        if notes:
            EnquiryNote.objects.create(
                enquiry=enquiry,
                author=request.user,
                content=notes,
            )

        return Response({
            'success': True,
            'message': f'Enquiry status updated to {enquiry.get_status_display()}.',
        })


class EnquiryNoteCreateView(generics.CreateAPIView):
    """
    POST /api/v1/enquiries/<id>/notes/
    Add a note to an enquiry (admin/counsellor).
    """
    serializer_class = EnquiryNoteSerializer
    permission_classes = [IsAdminOrCounsellor]

    def perform_create(self, serializer):
        enquiry_id = self.kwargs['id']
        serializer.save(
            enquiry_id=enquiry_id,
            author=self.request.user,
        )
