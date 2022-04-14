from django.urls import path, include
from .views import KnowledgeBaseView

urlpatterns = [
    path('KnowledgeBase/', KnowledgeBaseView.as_view()),
]
