from django.conf.urls import url,include
from django.contrib import admin

from .views import ListView

urlpatterns = [

    # url(r'^list/', ListView , name="OrderLogin"),
    url(r'^postorderlist/', ListView , name="OrderList"),
    url(r'^getorderlist/', ListView , name="OrderList"),
    
]
