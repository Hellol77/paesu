from django.urls import path, include
from . import views

app_name = 'paesu_app'

urlpatterns = [
    path('paesu_list/', views.paesu_list_view, name='paesu_list'),      
    path('paesu_record/', views.paesu_record_view, name='paesu_record'),      
]