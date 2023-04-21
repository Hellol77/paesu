from django.contrib import admin
from .models import Paesu_Record

class UserAdmin(admin.ModelAdmin):
    list_display = (
        'user_id',
        'date_ck',
        )
    search_fields = ('user_id','date_ck',)

admin.site.register(Paesu_Record, UserAdmin)