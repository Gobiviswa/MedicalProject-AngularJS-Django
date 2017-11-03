# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-10-31 18:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_lowcountmedicinelist'),
    ]

    operations = [
        migrations.AddField(
            model_name='lowcountmedicinelist',
            name='low_count_medicine_price',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='lowcountmedicinelist',
            name='is_updated',
            field=models.BooleanField(default=False),
        ),
    ]