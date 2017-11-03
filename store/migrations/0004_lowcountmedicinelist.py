# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-10-31 12:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_auto_20171006_2248'),
    ]

    operations = [
        migrations.CreateModel(
            name='lowCountMedicineList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('low_count_medicine_name', models.CharField(max_length=150)),
                ('low_count_medicine_count', models.IntegerField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('username', models.CharField(max_length=30)),
                ('is_updated', models.BooleanField(default=True)),
            ],
        ),
    ]
