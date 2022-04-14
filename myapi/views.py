from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import KnowledgeBase
from .serializers import KnowledgeSerializer


class KnowledgeBaseView(APIView):
    def get(self, arg):
        data_list = KnowledgeBase.objects
        serilizer = KnowledgeSerializer(data_list, many=True)

        return Response(serilizer.data)