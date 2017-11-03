from django.db import models

# Create your models here.

class OrderList(models.Model):
	medicineNo = models.IntegerField()
	medicineName = models.CharField(max_length=150)
	qtyRequired = models.IntegerField()
	price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
	cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
	invoiceNo = models.CharField(max_length=40)
	timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)
	updated = models.DateTimeField(auto_now=True, auto_now_add=False)

		
