from django.db import models


class KnowledgeBase(models.Model):
    attribute: models.CharField(max_length=100)
    description: models.CharField(max_length=255)