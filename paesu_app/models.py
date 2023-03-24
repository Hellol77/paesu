from .choices import *
from django.db import models
from django.conf import settings

class Paesu_Record(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, verbose_name='아이디')

    #작성 일자 DB
    chkholiday = models.CharField(max_length=4, verbose_name="휴일체크", null=True)
    report_date = models.CharField(max_length=20, verbose_name="기록날짜", null=True)
    weather = models.CharField(max_length=20, verbose_name="날씨", null=True)
    temperature = models.CharField(max_length=20, verbose_name="기온", null=True)

    # 운영시간, 배출시설가동시간, 방지시설가동시간 DB
    chkop = models.CharField(max_length=4, verbose_name="운영시간체크박스", null=True)
    starttime = models.CharField(choices=TIME_CHOICES, max_length=10, verbose_name="운영시작시간", default=9)
    endtime = models.CharField(choices=TIME_CHOICES, max_length=10, verbose_name="운영종료시간", default=18)

    chkput = models.CharField(max_length=4, verbose_name="배출시설 체크박스", null=True)
    discharge_sttime = models.CharField(choices=TIME_CHOICES, max_length=10, verbose_name="배출시설가동 시작시간", default=9)
    discharge_endtime = models.CharField(choices=TIME_CHOICES, max_length=10, verbose_name="배출시설 가동 종료시간", default=18)

    chkprevent = models.CharField(max_length=4, verbose_name="방지시설 체크박스", null=True)
    prevent_sttime = models.CharField(choices=TIME_CHOICES, max_length=10, verbose_name="방지시설가동 시작시간", default=9)
    prevent_endtime = models.CharField(choices=TIME_CHOICES, max_length=10, verbose_name="방지시설 가동 종료시간", default=18)

    #사용량 관련 DB
    pre_waterworks = models.CharField(max_length=10, verbose_name="전일 상수도 계측값", null=True)
    today_waterworks = models.CharField(max_length=10, verbose_name="금일 상수도 계측값", null=True)
    use_waterworks = models.CharField(max_length=10, verbose_name="사용 상수도 계측값", null=True)
    waterworks_time = models.CharField(max_length=10, verbose_name=" 상수도 계측시간", null=True)

    pre_underwater = models.CharField(max_length=10, verbose_name="전일 지하수 계측값", null=True)
    today_underwater = models.CharField(max_length=10, verbose_name="금일 지하수 계측값", null=True)
    use_underwater = models.CharField(max_length=10, verbose_name="사용 지하수 계측값", null=True)
    underwater_time = models.CharField(max_length=10, verbose_name=" 지하수 계측시간", null=True)

    # 폐수발생량 DB
    chk_diswaste = models.CharField(max_length=4, verbose_name="배출량계 사용유무 체크박스", null=True)
    pre_diswaste = models.CharField(max_length=10, verbose_name="전일 폐수배출량", null=True)
    today_diswaste = models.CharField(max_length=10, verbose_name="금일 폐수배출량", null=True)    
    use_diswaste = models.CharField(max_length=10, verbose_name="사용 폐수배출량", null=True)

    #전력량계 관련 DB
    pre_powerusing = models.CharField(max_length=10, verbose_name="전일 전력량계 사용량", null=True)
    compute_guidelines = models.CharField(max_length=10, verbose_name="금일 전력량계 사용량", null=True)      
    working_use = models.CharField(max_length=10, verbose_name="전력량계 사용량 ", null=True)
    reading_time = models.CharField(max_length=10, verbose_name="전력량계 기록 시간", null=True)  
    startworking_time = models.CharField(max_length=10, verbose_name="전력량계 가동 시작시간", null=True)
    endworking_time = models.CharField(max_length=10, verbose_name="전력량계 가동 종료시간", null=True)
    etc = models.CharField(max_length=60, verbose_name="전력량계 참고사항", null=True)
    
    #폐수 발생량 / 재사용량 관련 DB
    chkdiswastereuse = models.CharField(max_length=4, verbose_name="폐수발생량/재사용량 체크박스", null=True)
    pre_genwaste = models.CharField(max_length=10, verbose_name="전일 폐수발생량", null=True)
    today_genwaste = models.CharField(max_length=10, verbose_name="금일 폐수발생량", null=True)
    use_genwaste = models.CharField(max_length=10, verbose_name="사용 폐수발생량", null=True)
    
    pre_reuse = models.CharField(max_length=10, verbose_name="전일 재사용량", null=True)
    today_reuse = models.CharField(max_length=10, verbose_name="금일 재사용량", null=True)
    use_reuse = models.CharField(max_length=10, verbose_name="사용 재사용량", null=True)
    
    #원료 또는 첨가제등의 사용량(선택항목) DB    
    carwash_num = models.CharField(max_length=10, verbose_name="세차대수", null=True)
    detergent = models.CharField(max_length=10, verbose_name="세제", null=True)
    ml1 = models.CharField(max_length=10, verbose_name="세차1대당 세제사용량", null=True)
    wax = models.CharField(max_length=10, verbose_name="왁스", null=True)
    ml2 = models.CharField(max_length=10, verbose_name="세차1대당 왁스사용량", null=True)
    pom = models.CharField(max_length=10, verbose_name="폼", null=True)
    ml3 = models.CharField(max_length=10, verbose_name="세차1대당 폼사용량", null=True)
    subtitle1 = models.CharField(max_length=40, verbose_name="추가 원료1", null=True)
    extra1 = models.CharField(max_length=40, verbose_name="추가 원료1", null=True)
    ml4 = models.CharField(max_length=10, verbose_name="세차1대당 추가원료1사용량", null=True)
    subtitle2 = models.CharField(max_length=40, verbose_name="추가 원료2", null=True)
    extra2 = models.CharField(max_length=40, verbose_name="추가 원료2", null=True)
    ml5 = models.CharField(max_length=10, verbose_name="세차1대당 추가원료2사용량", null=True)
    subtitle3 = models.CharField(max_length=40, verbose_name="추가 원료3", null=True)
    extra3 = models.CharField(max_length=40, verbose_name="추가 원료3", null=True)
    ml6 = models.CharField(max_length=10, verbose_name="세차1대당 추가원료3사용량", null=True)

    #약품 사용량 관련 DB
    chkmed = models.CharField(max_length=4, verbose_name="약품 사용 체크박스", null=True)
    med_name1 = models.CharField(max_length=60, verbose_name="약품명1", null=True)
    use_mount1 = models.CharField(max_length=10, verbose_name="약품명1 사용량", null=True)
    subuse1 = models.CharField(max_length=10, verbose_name="약품명1 잔고량", null=True)
    buy_mount1 = models.CharField(max_length=10, verbose_name="약품명1 구입량", null=True)
    bal_mount1 = models.CharField(max_length=10, verbose_name="약품명1 미정항목", null=True)
    sub_ect1 = models.CharField(max_length=60, verbose_name="약품명1 비고", null=True)

    med_name2 = models.CharField(max_length=60, verbose_name="약품명2", null=True)
    use_mount2 = models.CharField(max_length=10, verbose_name="약품명2 사용량", null=True)
    subuse2 = models.CharField(max_length=10, verbose_name="약품명2 잔고량", null=True)
    buy_mount2 = models.CharField(max_length=10, verbose_name="약품명2 구입량", null=True)
    bal_mount2 = models.CharField(max_length=10, verbose_name="약품명2 미정항목", null=True)
    sub_ect2 = models.CharField(max_length=60, verbose_name="약품명2 비고", null=True)

    med_name3 = models.CharField(max_length=60, verbose_name="약품명3", null=True)
    use_mount3 = models.CharField(max_length=10, verbose_name="약품명3 사용량", null=True)
    subuse3 = models.CharField(max_length=10, verbose_name="약품명3 잔고량", null=True)
    buy_mount3 = models.CharField(max_length=10, verbose_name="약품명3 구입량", null=True)
    bal_mount3 = models.CharField(max_length=10, verbose_name="약품명3 미정항목", null=True)
    sub_ect3 = models.CharField(max_length=60, verbose_name="약품명3 비고", null=True)
    
    med_name4 = models.CharField(max_length=60, verbose_name="약품명4", null=True)
    use_mount4 = models.CharField(max_length=10, verbose_name="약품명4 사용량", null=True)
    subuse4 = models.CharField(max_length=10, verbose_name="약품명4 잔고량", null=True)
    buy_mount4 = models.CharField(max_length=10, verbose_name="약품명4 구입량", null=True)
    bal_mount4 = models.CharField(max_length=10, verbose_name="약품명4 미정항목", null=True)
    sub_ect4 = models.CharField(max_length=60, verbose_name="약품명4 비고", null=True)

    #슬러지 관련 DB
    chksluge = models.CharField(max_length=4, verbose_name="슬러지 체크박스", null=True)
    sluge_gen = models.CharField(max_length=10, verbose_name="슬러지발생량", null=True)
    sluge_use = models.CharField(max_length=10, verbose_name="슬러지처리량", null=True)
    sluge_keep = models.CharField(max_length=10, verbose_name="슬러지보관량", null=True)
    sluge_func = models.CharField(max_length=10, verbose_name="슬러지함수률", null=True)
    sluge_place = models.CharField(max_length=60, verbose_name="슬러지보관장소", null=True)
    sluge_selfplace = models.CharField(max_length=60, verbose_name="슬러지처리장소", null=True)
    instead_name = models.CharField(max_length=60, verbose_name="위탁처리업소명", null=True)

    #특이사항 및 지도사항DB
    remarks = models.CharField(max_length=200, verbose_name="특이사항", null=True)
    advise = models.CharField(max_length=200, verbose_name="지도사항", null=True)

    def __str__(self):
        return str(self.user_id)

    class Meta:
        db_table="PAESU_RECORD_TB"
        verbose_name="레포트정보"
        verbose_name_plural="레포트정보"

    def save(self, *args, **kwargs):
        super().sava(*args, **kwargs)
