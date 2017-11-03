from rest_framework import serializers

from django.contrib.auth.models import User
from .models import OrderList



class OrderListSerializer(serializers.ModelSerializer):
	class Meta:
		model = OrderList
		fields =   ('medicineNo', 'medicineName', 'qtyRequired', 'price',  'cost', 'invoiceNo')