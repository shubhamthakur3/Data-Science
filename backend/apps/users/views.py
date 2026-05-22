"""
Views for user authentication and profile management.
"""

from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from core.permissions import IsAdmin
from .serializers import (
    AdminUserSerializer,
    CustomTokenObtainPairSerializer,
    PasswordChangeSerializer,
    PasswordResetConfirmSerializer,
    PasswordResetRequestSerializer,
    UserProfileSerializer,
    UserRegistrationSerializer,
    UserUpdateSerializer,
)

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """
    POST /api/v1/auth/register/
    Register a new user account.
    """
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                'success': True,
                'message': 'Registration successful.',
                'data': UserProfileSerializer(user).data,
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(TokenObtainPairView):
    """
    POST /api/v1/auth/login/
    Authenticate user and return JWT tokens with user profile.
    """
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [permissions.AllowAny]


class TokenRefreshView(TokenRefreshView):
    """
    POST /api/v1/auth/refresh/
    Refresh JWT access token.
    """
    permission_classes = [permissions.AllowAny]


class ProfileView(generics.RetrieveUpdateAPIView):
    """
    GET /api/v1/auth/me/
    PUT/PATCH /api/v1/auth/me/
    Get or update the current user's profile.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):
        if self.request.method in ('PUT', 'PATCH'):
            return UserUpdateSerializer
        return UserProfileSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            'success': True,
            'message': 'Profile updated successfully.',
            'data': UserProfileSerializer(instance).data,
        })


class PasswordChangeView(APIView):
    """
    POST /api/v1/auth/password-change/
    Change the current user's password.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response({
            'success': True,
            'message': 'Password changed successfully.',
        })


class PasswordResetRequestView(APIView):
    """
    POST /api/v1/auth/password-reset/
    Request a password reset email.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        # Always return success to prevent email enumeration
        try:
            user = User.objects.get(email=email)
            # TODO: Send password reset email via Celery task
            # tasks.send_password_reset_email.delay(user.id)
        except User.DoesNotExist:
            pass

        return Response({
            'success': True,
            'message': 'If an account with that email exists, a reset link has been sent.',
        })


class PasswordResetConfirmView(APIView):
    """
    POST /api/v1/auth/password-reset-confirm/
    Confirm password reset with token.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # TODO: Implement token validation and password reset
        return Response({
            'success': True,
            'message': 'Password has been reset successfully.',
        })


class AdminUserListView(generics.ListAPIView):
    """
    GET /api/v1/auth/users/
    List all users (admin only).
    """
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdmin]
    queryset = User.objects.all()
    filterset_fields = ['role', 'is_active', 'is_email_verified']
    search_fields = ['email', 'first_name', 'last_name', 'phone']
    ordering_fields = ['created_at', 'email', 'first_name']


class AdminUserDetailView(generics.RetrieveUpdateAPIView):
    """
    GET /api/v1/auth/users/<id>/
    PUT/PATCH /api/v1/auth/users/<id>/
    View or update a specific user (admin only).
    """
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdmin]
    queryset = User.objects.all()
    lookup_field = 'id'
