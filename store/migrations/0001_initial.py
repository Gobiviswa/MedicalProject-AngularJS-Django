# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-10-06 15:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Store',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('medicine_id', models.CharField(max_length=8)),
                ('medicine_name', models.CharField(max_length=150)),
                ('medicine_count', models.IntegerField()),
                ('medicine_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
