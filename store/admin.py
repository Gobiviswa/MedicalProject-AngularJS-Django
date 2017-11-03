from django.contrib import admin

# Register your models here.

from .models import Store, lowCountMedicineList



class StoreListAdmin(admin.ModelAdmin):
	list_display = ['medicine_id', 'medicine_name', 'medicine_count', 'medicine_price', 'timestamp', 'updated']
	search_fields  = ['medicine_id']

	class Meta:
		model = Store

class lowCountMedicineListAdmin(admin.ModelAdmin):
	list_display = ['low_count_medicine_name', 'low_count_medicine_count', 'username', 'is_updated', 'message', 'timestamp', 'updated']
	readonly_fields = ('low_count_medicine_name', 'username', 'is_updated', 'timestamp', 'updated')

	class Meta:
		model = lowCountMedicineList


	def has_add_permission(self, request):
		return False;

	def has_delete_permission(self, request, object=None):
		return False;

admin.site.register(Store, StoreListAdmin)
admin.site.register(lowCountMedicineList, lowCountMedicineListAdmin)