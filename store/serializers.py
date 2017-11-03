from rest_framework import serializers

from .models import Store, lowCountMedicineList

class StoreSerializer(serializers.ModelSerializer):
	class Meta:
		model = Store
		fields = ( "medicine_id", "medicine_name", "medicine_count", "medicine_price" )


class LowCountMedicineListSerializer(serializers.ModelSerializer):
	class Meta:
		model = lowCountMedicineList
		fields = ( "low_count_medicine_name", "low_count_medicine_count", "username", "is_updated")


		