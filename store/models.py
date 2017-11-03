from django.db import models
import datetime

# Create your models here.

class Store(models.Model):
	medicine_id = models.CharField(max_length=8, unique=True)
	medicine_name = models.CharField(max_length=150, unique=True)
	medicine_count = models.IntegerField()
	medicine_price = models.DecimalField(max_digits=10, decimal_places=2)
	timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)
	updated = models.DateTimeField(auto_now=True, auto_now_add=False)

	def save(self, *args, **kwargs):
		
		print("inside model save function store")
		print(self.medicine_count)
		super(Store, self).save(*args, **kwargs);



class lowCountMedicineList(models.Model):
	low_count_medicine_name = models.CharField(max_length=150)
	low_count_medicine_count = models.IntegerField()
	username =  models.CharField(max_length=30)
	message = models.CharField(max_length=500, default="")
	is_updated = models.BooleanField(default=False)
	timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)
	updated = models.DateTimeField(auto_now=True, auto_now_add=False)

	def save(self, *args, **kwargs):
		print("inside model save function low count")
		print(self.low_count_medicine_count)
		if (self.low_count_medicine_count < 15):
			self.is_updated = False;
		else:
			self.is_updated = True;

		super(lowCountMedicineList, self).save(*args, **kwargs);
	


