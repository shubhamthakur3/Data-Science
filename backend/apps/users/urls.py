"""
URL patterns for user authentication and profile management.
"""

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

app_name = 'users'

urlpatterns = [
    # Authentication
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token-refresh'),

    # Profile
    path('me/', views.ProfileView.as_view(), name='profile'),

    # Password management
    path('password-change/', views.PasswordChangeView.as_view(), name='password-change'),
    path('password-reset/', views.PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset-confirm/', views.PasswordResetConfirmView.as_view(), name='password-reset-confirm'),

    # Admin user management
    path('users/', views.AdminUserListView.as_view(), name='user-list'),
    path('users/<uuid:id>/', views.AdminUserDetailView.as_view(), name='user-detail'),
]
