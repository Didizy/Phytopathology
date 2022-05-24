from django.urls import path, include
from .views import *

urlpatterns = [
    path('KnowledgeBase/', KnowledgeBaseView.as_view()),
    path('check/', CheckPathology.as_view()),
    path('get_pathology/', GetPathology.as_view()),
    path('Attributes/', AttributesView.as_view()),
    path('list_attrs/', ListAttrs.as_view()),
    path('list_values/', SetValue.as_view()),
    path('attrs_desc/', AttrsDesc.as_view()),
    path('attrs_val_desc/', ListAttrsDesc.as_view()),
    path('attrs_val_desc_pat/', ListAttrsDescPath.as_view()),
    path('attrs_val_desc_pat_val/', ListAttrsDescPathValues.as_view()),
    path('check_integrity/', CheckIntegrity.as_view()),
]
