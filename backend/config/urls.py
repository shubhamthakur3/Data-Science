"""
URL Configuration for Data Science Course Platform.
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

# ─── API v1 URL patterns ───
api_v1_patterns = [
    path('auth/', include('apps.users.urls')),
    path('institutes/', include('apps.institutes.urls')),
    path('courses/', include('apps.courses.urls')),
    path('enquiries/', include('apps.enquiries.urls')),
    path('admissions/', include('apps.admissions.urls')),
    path('placements/', include('apps.placements.urls')),
    path('reviews/', include('apps.reviews.urls')),
    path('analytics/', include('apps.analytics.urls')),
    path('seo/', include('apps.seo.urls')),
]

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # API v1
    path('api/v1/', include(api_v1_patterns)),

    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    # Debug toolbar
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]
