import calendar
import datetime

from .models import Paesu_Record
from django.shortcuts import render, redirect


def ListView(request):
    if request.user.is_authenticated:
        if request.method == 'GET':

            days_in_month = calendar.monthrange(int(request.GET['year']), int(request.GET['month']))[1]
            days_query = set()

            for i in range(days_in_month):
                days_query.add(i)
            
            print(days_query)

            return render(request, 'lists/list.html')
        

        return render(request, 'lists/list.html')
    else:
        return redirect('/')
    

def InsertData(request, date):

    # page url 형식 맞추기"
    try:
        datetime.datetime.strptime(date, '%Y-%m-%d')
    except:
        return redirect('/insert/'+str(datetime.date.today()))
    

    if request.user.is_authenticated:

        if request.method == 'POST':
            record = request.POST

            rest = 'off'
            if record.get('rest'):
                rest = record['rest']

            diswaste_ck = 'off'
            if record.get('diswaste_ck'):
                diswaste_ck = record['rediswaste_ckst']

            updated_values = {
                'date_ck' : rest,
                'date_weather' : record.get('weather'),
                'date_temperature' : record.get('temperature'),

                'waterworks_prevd' : record.get('waterworks_prevd'),
                'waterworks_used' : record.get('waterworks_used'),
                'waterworks_today' : record.get('waterworks_today'),

                'underwater_prevd' : record.get('underwater_prevd'),
                'underwater_used' : record.get('underwater_used'),
                'underwater_today' : record.get('underwater_today'),

                'diswaste_prevd' : record.get('diswaste_prevd'),
                'diswaste_used' : record.get('diswaste_used'),
                'diswaste_today' : record.get('diswaste_today'),
                'diswaste_ck' : diswaste_ck,

                'poweruse_prevd' : record.get('poweruse_prevd'),
                'poweruse_used' : record.get('poweruse_used'),
                'poweruse_today' : record.get('poweruse_today'),
                'poweruse_start' : record.get('time1'),
                'poweruse_end' : record.get('time2'),
                'poweruse_etc' : record.get('poweruse_etc'),
                
                'genwaster' : record.get('genwaster'),
                'reuse' : record.get('reuse'),

                'at_washnum' : record.get('at_washnum'),
                'at_detergent' : record.get('at_detergent'),
                'at_detergent_use' : record.get('at_detergent_use'),
                'at_wax' : record.get('at_wax'),
                'at_wax_use' : record.get('at_wax_use'),
                'at_pom' : record.get('at_pom'),
                'at_pom_use' : record.get('at_pom_use'),
                'at_sub1' : record.get('at_sub1'),
                'at_sub1_memo' : record.get('at_sub1_memo'),
                'at_sub1_use' : record.get('at_sub1_use'),
                'at_sub2' : record.get('at_sub2'),
                'at_sub2_memo' : record.get('at_sub2_memo'),
                'at_sub2_use' : record.get('at_sub2_use'),
                'at_sub3' : record.get('at_sub3'),
                'at_sub3_memo' : record.get('at_sub3_memo'),
                'at_sub3_use' : record.get('at_sub3_use'),

                'op_start' : record.get('op_start'),
                'op_end' : record.get('op_end'),

                'emission_start' : record.get('emission_start'),
                'emission_end' : record.get('emission_end'),

                'prev_start' : record.get('prev_start'),
                'prev_end' : record.get('prev_end'),

                'med1_name' : record.get('med1_name'),
                'med1_used' : record.get('med1_used'),
                'med1_buy' : record.get('med1_buy'),
                'med1_balance' : record.get('med1_balance'),
                'med1_etc' : record.get('med1_etc'),

                'med2_name' : record.get('med2_name'),
                'med2_used' : record.get('med2_used'),
                'med2_buy' : record.get('med2_buy'),
                'med2_balance' : record.get('med2_balance'),
                'med2_etc' : record.get('med2_etc'),

                'med3_name' : record.get('med3_name'),
                'med3_used' : record.get('med3_used'),
                'med3_buy' : record.get('med3_buy'),
                'med3_balance' : record.get('med3_balance'),
                'med3_etc' : record.get('med3_etc'),

                'med4_name' : record.get('med4_name'),
                'med4_used' : record.get('med4_used'),
                'med4_buy' : record.get('med4_buy'),
                'med4_balance' : record.get('med4_balance'),
                'med4_etc' : record.get('med4_etc'),

                'sluge_gene' : record.get('sluge_gene'),
                'sluge_used' : record.get('sluge_used'),
                'sluge_keep' : record.get('sluge_keep'),
                'sluge_func' : record.get('sluge_func'),
                'sluge_place' : record.get('sluge_place'),
                'sluge_selfplace' : record.get('sluge_selfplace'),
                'sluge_corp' : record.get('sluge_corp'),

                'remarks' : record.get('remarks'),
                'advise' : record.get('advise')
            }

            Paesu_Record.objects.update_or_create(
                user_id = request.user,
                date = record['date'],

                defaults = updated_values
                )

            return redirect('/list')

        else:
            try:
                yesterday = (datetime.datetime.strptime(date, '%Y-%m-%d') - datetime.timedelta(days=1)).strftime('%Y-%m-%d')
                psrecord = Paesu_Record.objects.filter(user_id = request.user).get(date = date)

                waterworks_prevd = Paesu_Record.objects.filter(user_id = request.user).get(date = yesterday).waterworks_today if Paesu_Record.objects.filter(user_id = request.user).filter(date = yesterday).exists() else 0
                waterworks_prevd = 0 if waterworks_prevd is None else waterworks_prevd
                underwater_prevd = Paesu_Record.objects.filter(user_id = request.user).get(date = yesterday).underwater_today if Paesu_Record.objects.filter(user_id = request.user).filter(date = yesterday).exists() else 0
                underwater_prevd = 0 if underwater_prevd is None else underwater_prevd
                diswaste_prevd = Paesu_Record.objects.filter(user_id = request.user).get(date = yesterday).diswaste_today if Paesu_Record.objects.filter(user_id = request.user).filter(date = yesterday).exists() else 0
                diswaste_prevd = 0 if diswaste_prevd is None else diswaste_prevd
                poweruse_prevd = Paesu_Record.objects.filter(user_id = request.user).get(date = yesterday).poweruse_today if Paesu_Record.objects.filter(user_id = request.user).filter(date = yesterday).exists() else 0
                poweruse_prevd = 0 if poweruse_prevd is None else poweruse_prevd

                context = {
                    "psrecord" : psrecord,
                    "date" : date,
                    "waterworks_prevd" : waterworks_prevd,
                    "underwater_prevd" : underwater_prevd,
                    "diswaste_prevd" : diswaste_prevd,
                    "poweruse_prevd" : poweruse_prevd,
                }

                return render(request, 'lists/insert.html', context)
            except:
                context = {
                    "date" : date,
                }
                return render(request, 'lists/insert.html', context)
        
    else:
        return redirect('/')
