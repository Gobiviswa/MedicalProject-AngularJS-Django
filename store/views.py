from django.shortcuts import render


from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.
from .models import Store, lowCountMedicineList

from .serializers import StoreSerializer, LowCountMedicineListSerializer





@api_view(['GET'])
def getMedicineListView(request):

	if request.method == "GET":
		medicines = Store.objects.all()
		serializer = StoreSerializer(medicines, many=True)
		medicine_list  = [];
		for x in serializer.data:
			medicine_list.append(x)

		# print((medicine_list[0]['medicine_id']))
		return Response(medicine_list)

@api_view(['POST'])
def lowCountMedicineListView(request):

	if request.method == "POST":
		data = request.data;
		lowcountmedicinelist = lowCountMedicineList.objects.all().order_by('-id')
		lowcountlist = []
		for row in lowcountmedicinelist:
			if(len(lowcountlist) > 0):
				if(row.low_count_medicine_name in lowcountlist):
					continue;
			lowcountlist.append(row.low_count_medicine_name)
		print (len(lowcountlist))
		
		for row in data['lowCountMedicineList']:
			dic = {
				'low_count_medicine_name':row['medicine_name'], 
				'low_count_medicine_count':row['medicine_count'], 
				'username':data['user'], 
				'message':data['message'] 
				}

			if dic['low_count_medicine_name'] not in lowcountlist:
				serializer = LowCountMedicineListSerializer(data = dic)
				if serializer.is_valid():
					serializer.save()
			else:
				row = lowcountmedicinelist.filter(low_count_medicine_name = dic['low_count_medicine_name'])[0]
				if(row.is_updated == True):
					serializer = LowCountMedicineListSerializer(data = dic)
					if serializer.is_valid():
						serializer.save()
				else:
					if(dic['low_count_medicine_count'] < row.low_count_medicine_count):
						row.low_count_medicine_count = dic['low_count_medicine_count']
						row.save() 



				# serializer = LowCountMedicineListSerializer(data = dic)
				# if serializer.is_valid():
				# 	break;
				# 	serializer.save()


		return Response({})



