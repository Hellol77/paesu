from django.urls import path, include
from . import views

app_name = 'lists'

urlpatterns = [
    path('list/', views.ListView, name='list_view'),
    path('insert/<slug:date>', views.InsertData, name='insert_data'),   
]