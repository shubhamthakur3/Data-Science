from django.urls import path
from . import views

app_name = 'enquiries'

urlpatterns = [
    path('', views.EnquirySubmitView.as_view(), name='enquiry-submit'),
    path('list/', views.EnquiryListView.as_view(), name='enquiry-list'),
    path('<uuid:id>/', views.EnquiryDetailView.as_view(), name='enquiry-detail'),
    path('<uuid:id>/assign/', views.EnquiryAssignView.as_view(), name='enquiry-assign'),
    path('<uuid:id>/status/', views.EnquiryStatusUpdateView.as_view(), name='enquiry-status'),
    path('<uuid:id>/notes/', views.EnquiryNoteCreateView.as_view(), name='enquiry-note'),
]
