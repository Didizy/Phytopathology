# Generated by Django 4.0.4 on 2022-05-10 13:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='KnowledgeBase',
            fields=[
                ('pathology_name', models.CharField(max_length=255, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Attributes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attr_name', models.CharField(max_length=255)),
                ('attr_value', models.CharField(max_length=255)),
                ('pathology', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='myapi.knowledgebase')),
            ],
        ),
    ]
