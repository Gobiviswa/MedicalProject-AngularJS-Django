# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-10-06 16:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='medicine_id',
            field=models.CharField(max_length=8, unique=True),
        ),
    ]