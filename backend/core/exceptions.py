"""
Custom exception handler for consistent API error responses.
"""

from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    """
    Returns a standardized error response format:
    {
        "success": false,
        "error": {
            "code": "ERROR_CODE",
            "message": "Human-readable message",
            "details": { ... }
        }
    }
    """
    response = exception_handler(exc, context)

    if response is not None:
        error_data = {
            'success': False,
            'error': {
                'code': _get_error_code(response.status_code),
                'message': _get_error_message(response),
                'details': response.data if isinstance(response.data, dict) else {'errors': response.data},
            }
        }
        response.data = error_data

    return response


def _get_error_code(status_code):
    """Map HTTP status codes to error codes."""
    codes = {
        400: 'BAD_REQUEST',
        401: 'UNAUTHORIZED',
        403: 'FORBIDDEN',
        404: 'NOT_FOUND',
        405: 'METHOD_NOT_ALLOWED',
        409: 'CONFLICT',
        429: 'RATE_LIMIT_EXCEEDED',
        500: 'INTERNAL_SERVER_ERROR',
    }
    return codes.get(status_code, 'UNKNOWN_ERROR')


def _get_error_message(response):
    """Extract a human-readable message from the response."""
    if isinstance(response.data, dict):
        if 'detail' in response.data:
            return str(response.data['detail'])
        if 'non_field_errors' in response.data:
            errors = response.data['non_field_errors']
            return str(errors[0]) if isinstance(errors, list) else str(errors)
    if isinstance(response.data, list) and response.data:
        return str(response.data[0])
    return 'An error occurred.'
