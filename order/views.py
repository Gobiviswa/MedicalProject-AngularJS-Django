from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from django.views.decorators.csrf import ensure_csrf_cookie

from .serializers import  OrderListSerializer
from store.serializers import StoreSerializer


from .models import OrderList
from store.models import Store

import datetime
from decimal import Decimal


def getinvoiceNumber(no, total):
	invoicePrefix = "INV000";
	no = no + 1;
	date = (datetime.datetime.now().strftime("%Y-%m-%d"))

	timeIn24Hour = (datetime.datetime.now().strftime("%H:%M"))
	timeFormat = datetime.datetime.strptime(timeIn24Hour, '%H:%M')
	timeIn12Hour = timeFormat.strftime('%I:%M %p')

	invoiceNo =invoicePrefix + str(no) + '_' + str(total) + '_' + date + '_' + timeIn12Hour

	return invoiceNo;

def updateStoreCount(medicineName, qtyRequired):

	row = Store.objects.get(medicine_name=medicineName)
	row.medicine_count = row.medicine_count - qtyRequired;
	row.save()



@api_view(['GET', 'POST' ])
def ListView(request):

	if request.method == "GET":
		orderList = OrderList.objects.all().order_by('-id')

		serializer = OrderListSerializer(orderList, many=True)

		return Response(serializer.data)

	if request.method == "POST":
		
		data = request.data
		#print(data[''])

		if OrderList.objects.all().count() == 0:
			no = 0;
		else:
			no = int(OrderList.objects.latest('id').invoiceNo.split('_')[0][6:])

		invoiceNo = getinvoiceNumber(no, data['total']);
		
		

		for dic in data['invoiceData']:
			dic['invoiceNo'] = invoiceNo;
			dic['price'] = Decimal(dic['price'])
			dic['cost'] = Decimal(dic['cost'])

			serializer = OrderListSerializer(data = dic)
			if serializer.is_valid():
				serializer.save()
				updateStoreCount(dic['medicineName'], dic['qtyRequired'])

		return Response( status = status.HTTP_201_CREATED )

	return Response(status= status.HTTP_204_NO_CONTENT)
		
		