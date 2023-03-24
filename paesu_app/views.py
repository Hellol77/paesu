import modules

from .models import *

from users.decorators import *

from django.shortcuts import render
from django.template.response import TemplateResponse

@login_message_required
def paesu_list_view(request):
    if request.user.is_authenticated:
        paesu_sets = Paesu_Record.objects.filter(user_id = request.user)
        context = {
            'paesu_sets' : paesu_sets
        }        

        return render(request, 'paesu/paesu_list.html', context)
    else:
        return render(request, 'paesu/paesu_list.html')


@login_message_required
def paesu_record_view(request):
    return render(request, 'paesu/paesu_record.html')