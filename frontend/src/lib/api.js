/**
 * Axios-based API client for the Data Science Course Platform.
 * Handles JWT authentication, token refresh, and consistent error handling.
 */

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// ─── Request Interceptor: Attach JWT Token ───
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor: Handle 401 & Token Refresh ───
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem('access_token', access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Clear tokens and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ─── API Service Methods ───

export const authAPI = {
  register: (data) => apiClient.post('/auth/register/', data),
  login: (data) => apiClient.post('/auth/login/', data),
  refreshToken: (refresh) => apiClient.post('/auth/refresh/', { refresh }),
  getProfile: () => apiClient.get('/auth/me/'),
  updateProfile: (data) => apiClient.patch('/auth/me/', data),
  changePassword: (data) => apiClient.post('/auth/password-change/', data),
  resetPasswordRequest: (email) => apiClient.post('/auth/password-reset/', { email }),
};

export const institutesAPI = {
  list: (params) => apiClient.get('/institutes/', { params }),
  detail: (slug) => apiClient.get(`/institutes/${slug}/`),
  create: (data) => apiClient.post('/institutes/', data),
  update: (slug, data) => apiClient.put(`/institutes/${slug}/`, data),
  delete: (slug) => apiClient.delete(`/institutes/${slug}/`),
};

export const coursesAPI = {
  list: (params) => apiClient.get('/courses/', { params }),
  detail: (slug) => apiClient.get(`/courses/${slug}/`),
  compare: (ids) => apiClient.get('/courses/compare/', { params: { ids: ids.join(',') } }),
  categories: () => apiClient.get('/courses/categories/'),
  create: (data) => apiClient.post('/courses/', data),
  update: (slug, data) => apiClient.put(`/courses/${slug}/`, data),
  delete: (slug) => apiClient.delete(`/courses/${slug}/`),
};

export const enquiriesAPI = {
  submit: (data) => apiClient.post('/enquiries/', data),
  list: (params) => apiClient.get('/enquiries/list/', { params }),
  detail: (id) => apiClient.get(`/enquiries/${id}/`),
  updateStatus: (id, data) => apiClient.patch(`/enquiries/${id}/status/`, data),
  assign: (id, counsellorId) => apiClient.patch(`/enquiries/${id}/assign/`, { counsellor_id: counsellorId }),
  addNote: (id, content) => apiClient.post(`/enquiries/${id}/notes/`, { content }),
};

export default apiClient;
