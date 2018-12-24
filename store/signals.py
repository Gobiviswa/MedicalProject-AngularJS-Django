from django.dispatch import receiver;
from django.db.models.signals import post_save, pre_save

from .models import Store, lowCountMedicineList

@receiver(pre_save, sender=Store)
def ensure_low_count_medicines_update_store_update(sender, **kwargs):
	print("Signals...")
	medicine_count = kwargs['instance'].medicine_count
	medicine_name = kwargs['instance'].medicine_name
	if (medicine_count > 15):
		data = lowCountMedicineList.objects.all().order_by('-id').filter(low_count_medicine_name=medicine_name)
		
		if(data):
			obj = data[0]
			print(obj.low_count_medicine_name)
			obj.is_updated == True;
			obj.save()




@receiver(pre_save, sender=lowCountMedicineList)
def ensure_low_count_medicines_update_lowcount_update(sender, **kwargs):
	print("insdie signal low count")
	medicine_count = kwargs['instance'].low_count_medicine_count
	medicine_name = kwargs['instance'].low_count_medicine_name

	print(medicine_count)

	obj = Store.objects.get(medicine_name = medicine_name)

	if(obj.medicine_count != medicine_count):
		obj.medicine_count = medicine_count;
		obj.save();


		



	# for dic in data_lowcount:
	# 	if (dic.low_count_medicine_name == medicine_name):
	# 		if( medicine_count >= 15):
	# 				dic.is_updated = True;
	# 				dic.save()
	# 		else:
	# 			dic.is_updated = False;
	# 			dic.save()

	# 		obj = Store.objects.get(medicine_name = medicine_name)
	# 		obj.medicine_count = medicine_count;
	# 		obj.save()

	# 		break;


	

