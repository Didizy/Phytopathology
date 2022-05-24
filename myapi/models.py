from django.contrib.postgres.fields import ArrayField
from django.db import models


class KnowledgeBase(models.Model):
    pathology_name = models.CharField(max_length=255, primary_key=True)


class Attributes(models.Model):
    pathology = models.ForeignKey(KnowledgeBase, on_delete=models.CASCADE)
    attr_name = models.CharField(max_length=255)
    attr_value = models.CharField(max_length=255, blank=True, default='')
    attr_type = models.CharField(max_length=50, blank=True, default='')


class ListAttributes(models.Model):
    la_name = models.CharField(max_length=50)
    la_type = models.CharField(max_length=50, blank=True, default='')
    la_value = models.CharField(max_length=50, blank=True, default='')
