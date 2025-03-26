from django.urls import path
from . import views

urlpatterns=[
    # path('',views.HomeViewClass,name="Home"),
    path("signup/",views.RegisterClass,name="Signup"),
    path('Assosation/Members/',views.AssosationViewClass,name="Assosation members"),
    path('placment/',views.PlacmentViewClass,name="List of top placed and batch"),
    path('placment/<str:Batch>/',views.PlacmentBatchViewClass,name="placment of a batch")
]