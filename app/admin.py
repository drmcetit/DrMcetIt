from django.contrib import admin

from .models import AssosiationMembersModel,PlacementModel,StudentModel,EventModel,BadgeModel

admin.site.register(StudentModel)

class EventCertificateAdmin(admin.ModelAdmin):
    list_filter=('year','event','date','type','category','student')
    list_display=('student','event','date','award')
    list_per_page=15

admin.site.register(EventModel,EventCertificateAdmin,)

class AssosiationAdmin(admin.ModelAdmin):
    list_filter=('Year',) 
admin.site.register(AssosiationMembersModel)

class PlacementAdmin(admin.ModelAdmin):
    list_filter=('Batch','Placed','StartUp')
    list_display=('Name','Batch','Company','LPA')
    list_per_page=15
admin.site.register(PlacementModel)

class BadgeAdmin(admin.ModelAdmin):
    list_filter=('Category',)
    list_display=('Title','Category','Count')
    

admin.site.register(BadgeModel,BadgeAdmin)