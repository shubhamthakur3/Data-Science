from django.urls import path
from . import views

app_name = 'courses'

urlpatterns = [
    path('categories/', views.CourseCategoryListView.as_view(), name='category-list'),
    path('compare/', views.CourseCompareView.as_view(), name='course-compare'),
    path('', views.CourseListCreateView.as_view(), name='course-list'),
    path('<slug:slug>/', views.CourseDetailView.as_view(), name='course-detail'),
]
