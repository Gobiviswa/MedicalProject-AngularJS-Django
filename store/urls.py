from django.conf.urls import url,include
from django.contrib import admin

from .views import getMedicineListView, lowCountMedicineListView

urlpatterns = [

    url(r'^getmedicinelist/', getMedicineListView , name="StoreList"),
    url(r'^postLessCountMedicinelist/', lowCountMedicineListView , name="LowCountMedicineList")
  
]
