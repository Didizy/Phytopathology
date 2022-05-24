# Generated by Django 4.0.4 on 2022-05-23 02:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0002_attributes_attr_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='ListAttributes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('la_name', models.CharField(max_length=50)),
                ('la_type', models.CharField(max_length=50)),
                ('la_value', models.CharField(max_length=50)),
            ],
        ),
        migrations.AlterField(
            model_name='attributes',
            name='pathology',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapi.knowledgebase'),
        ),
    ]