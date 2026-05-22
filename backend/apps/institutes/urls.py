from django.urls import path
from . import views

app_name = 'institutes'

urlpatterns = [
    path('', views.InstituteListCreateView.as_view(), name='institute-list'),
    path('<slug:slug>/', views.InstituteDetailView.as_view(), name='institute-detail'),
]
