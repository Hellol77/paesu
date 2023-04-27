$.datepicker.setDefaults({
    dateFormat: "yy-mm-dd",
    prevText: "이전 달",
    nextText: "다음 달",
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    showMonthAfterYear: true,
    yearSuffix: "년",
  });
  $(function () {
    $(".datepicker").datepicker();
  
    $(".datepicker").datepicker("setDate", "today"); //(
  });
  
  var initialSounds = [
    "",
    "ㄱ",
    "ㄴ",
    "ㄷ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅅ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  
  function createInitialSoundOptions() {
    var select = document.getElementById("initial-select");
  
    // 전체 옵션 추가
    var allOption = document.createElement("option");
    allOption.value = "";
    allOption.innerHTML = "전체";
    select.appendChild(allOption);
  
    for (var i = 1; i < initialSounds.length; i++) {
      var option = document.createElement("option");
      option.value = initialSounds[i];
      option.innerHTML = initialSounds[i];
      select.appendChild(option);
    }
  }
  createInitialSoundOptions();
  
  // 데이터
  const data = [
    "가게",
    "가구",
    "나무",
    "다리",
    "라면",
    "마을",
    "바다",
    "사과",
    "아이",
    "자전거",
    "차량",
    "카페",
    "파란색",
    "하늘",
  ];
  
  function filterDataByInitial(initial) {
    const filteredData = data.filter((item) => {
      const unicode = Hangul.disassemble(item)[0].charCodeAt(0);
      // console.log("unicode", unicode);
      const initialUnicode = initial.charCodeAt(0);
      // console.log("initialUnicode", initialUnicode);
      return initialUnicode === unicode;
    });
    console.log(filteredData);
    return filteredData;
  }
  
  const select1 = document.getElementById("initial-select");
  const select2 = document.getElementById("filtered-select");
  
  // 초기화
  select2.innerHTML = "";
  for (const item of data) {
    const option = document.createElement("option");
    option.text = item;
    option.value = item;
    select2.add(option);
  }
  
  // 이벤트 리스너 등록
  select1.addEventListener("change", () => {
    const initial = select1.value;
    if (!initial) {
      // 전체 선택된 경우
      select2.innerHTML = "";
      for (const item of data) {
        const option = document.createElement("option");
        option.text = item;
        option.value = item;
        select2.add(option);
      }
    } else {
      // 초성으로 필터링된 경우
      const filteredData = filterDataByInitial(initial);
      select2.innerHTML = "";
      for (const item of filteredData) {
        const option = document.createElement("option");
        option.text = item;
        option.value = item;
        select2.add(option);
      }
    }
  });
  