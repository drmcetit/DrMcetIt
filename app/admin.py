from django.contrib import admin

from .models import AssosiationMembersModel,PlacementModel,StudentModel,EventModel

admin.site.register(StudentModel)

class EventCertificateAdmin(admin.ModelAdmin):
    list_filter=('year','event','date','type','category','student')
    list_display=('student','event','date','award')

admin.site.register(EventModel,EventCertificateAdmin,)

class AssosiationAdmin(admin.ModelAdmin):
    list_filter=('Year',) 
admin.site.register(AssosiationMembersModel)

class PlacementAdmin(admin.ModelAdmin):
    list_filter=('Batch','Placed','StartUp')
    list_display=('Name','Batch','Company','LPA')
admin.site.register(PlacementModel)
