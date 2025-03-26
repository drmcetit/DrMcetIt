from rest_framework import serializers

from .models import AssosiationMembersModel,PlacementModel
from django.contrib.auth.models import User

# class carouselSerializer(serializers.ModelSerializer):

#     class Meta:
#         model=carouselModel
#         fields=[
#             'Titile',
#             'Description',
#             'ButtonText',
#             'Image',
#             'Display'
#         ]

class AssositationSerializer(serializers.ModelSerializer):

    class Meta:
        model=AssosiationMembersModel
        fields=[
            'Name',
            'Desigination',
            'Year',
            'ProfilePic'
        ]

class PlacmentSerializer(serializers.ModelSerializer):

    class Meta:
        model=PlacementModel
        fields=[
            'Name',
            'Batch',
            'Placed',
            'Desigination',
            'LPA',
            'StartUp',
            'Company',
            'ProfilePic'
        ]

class RegisterSerializers(serializers.ModelSerializer):

    confirmPassword=serializers.CharField(write_only=True)
    collegeMail=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=[
            'username',
            'collegeMail',
            'password',
            'email',
            'confirmPassword'
        ]