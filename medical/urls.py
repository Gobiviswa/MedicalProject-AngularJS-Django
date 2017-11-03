"""medical URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin

#from django.views.generic import TemplateView
#from django.contrib.auth.views import login, logout

from . import views
from .views import ListView


urlpatterns = [

    url(r'^admin/', admin.site.urls),  #admin url
	url(r'^$', views.login_page, name="login"), 	#Base Page Url

    url(r'^userlogin/', ListView , name="loginview"),
	url(r'^order/', include('order.urls', namespace="order")),  #User Data Url
    url(r'^store/', include('store.urls', namespace="store")),   #medicineListUrl


]
