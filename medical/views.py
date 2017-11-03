from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User
from .serializers import LoginSerializer
from django.contrib.auth import authenticate


import datetime
from decimal import Decimal

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render


def login_page(request):
	return render(request, 'base.html')


@api_view(['GET', 'POST' ])
def ListView(request):
	if request.method == "GET":
		username = request.GET.get('username')
		password = request.GET.get('password')
		print(username, password)
		#user = User.objects.filter(username=username).exists()
		user = authenticate(username=username, password=password)
		if user is not None:
			data = User.objects.all()
			serializer = LoginSerializer(data, many=True)
			#print(serializer.data[0]['username'])
			return Response(serializer.data)

	return Response(status= status.HTTP_204_NO_CONTENT)
