from rest_framework import serializers
from .models import KnowledgeBase


class KnowledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowledgeBase
        fields = ['attribute', 'description']