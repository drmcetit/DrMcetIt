from rest_framework import serializers

from .models import AssosiationMembersModel,PlacementModel,EventModel

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

class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model=EventModel
        fields=[
            'department',
            'year',
            'student',
            'rollNo',
            'level',
            'event',
            'type',
            'mode',
            'category',
            'place',
            'date',
            'organizer',
            'club',
            'award',
            'teamInd',
            'description',
            'proofAttachment'

        ]

