# Generated by Django 4.0.4 on 2022-05-15 07:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='attributes',
            name='attr_type',
            field=models.CharField(max_length=50, null=True),
        ),
    ]