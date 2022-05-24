from rest_framework import serializers
from .models import *


class KnowledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowledgeBase
        fields = '__all__'


class AttributesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attributes
        fields = '__all__'


class ListAttrsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListAttributes
        fields = '__all__'
