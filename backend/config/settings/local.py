"""
Local development settings — uses SQLite when PostgreSQL is unavailable.
For use without Docker. Switch to development.py for full Docker stack.
"""

from .base import *  # noqa: F401, F403
import os

DEBUG = True

# ─── Override Database: Use SQLite locally ───
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Add debug toolbar
INSTALLED_APPS += ['debug_toolbar', 'django_extensions']  # noqa: F405
MIDDLEWARE.insert(0, 'debug_toolbar.middleware.DebugToolbarMiddleware')  # noqa: F405
INTERNAL_IPS = ['127.0.0.1', 'localhost']

# Browsable API
REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = [  # noqa: F405
    'rest_framework.renderers.JSONRenderer',
    'rest_framework.renderers.BrowsableAPIRenderer',
]

# Relaxed throttling
REST_FRAMEWORK['DEFAULT_THROTTLE_RATES'] = {  # noqa: F405
    'anon': '1000/hour',
    'user': '10000/hour',
}

# Console email
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Use simple static storage for SQLite dev
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'

# Celery: eager mode (runs tasks synchronously without Redis)
CELERY_TASK_ALWAYS_EAGER = True
CELERY_TASK_EAGER_PROPAGATES = True
