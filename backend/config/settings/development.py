"""
Development-specific Django settings.
"""

from .base import *  # noqa: F401, F403

DEBUG = True

# Add debug toolbar
INSTALLED_APPS += ['debug_toolbar', 'django_extensions']  # noqa: F405

MIDDLEWARE.insert(0, 'debug_toolbar.middleware.DebugToolbarMiddleware')  # noqa: F405

INTERNAL_IPS = ['127.0.0.1', 'localhost']

# Allow browsable API in development
REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = [  # noqa: F405
    'rest_framework.renderers.JSONRenderer',
    'rest_framework.renderers.BrowsableAPIRenderer',
]

# Relaxed throttling in development
REST_FRAMEWORK['DEFAULT_THROTTLE_RATES'] = {  # noqa: F405
    'anon': '1000/hour',
    'user': '10000/hour',
}

# Email to console in development
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
