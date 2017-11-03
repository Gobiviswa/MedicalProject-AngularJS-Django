from django.contrib import admin

# Register your models here.
from .models import  OrderList





class OrderListAdmin(admin.ModelAdmin):
	list_display = ['id', 'medicineNo', 'medicineName', 'qtyRequired', 'price',  'cost', 'invoiceNo', 'timestamp', 'updated']

	class Meta:
		model = OrderList


admin.site.register(OrderList, OrderListAdmin)
