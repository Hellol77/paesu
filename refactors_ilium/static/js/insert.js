const toggleBtn = document.querySelector(".navbar__toogleBtn");
const menu = document.querySelector(".navbar__menu");
const toggleSelect = document.querySelector(".select__button");
const selectContent = document.querySelector(".select__content");
toggleSelect.addEventListener("change", () => {
  selectContent.classList.toggle("active");
});

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

function onChange(value,id) {
  const usage = document.getElementById(id);
  usage.textContent = value;
}

//한글적용을 위해 추가
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
  $("#datepicker").datepicker();

  $("#datepicker").datepicker("setDate", "today"); //(
});
$(function () {
  $(".time1").timepicker({
    timeFormat: "HH:mm",
    interval: 60,
    minTime: "1",
    maxTime: "23:00",
    defaultTime: "9",
    startTime: "01:00",
    dynamic: false,
    dropdown: true,
    scrollbar: true,
  });
});
$(function () {
  $(".time2").timepicker({
    timeFormat: "HH:mm",
    interval: 60,
    minTime: "1",
    maxTime: "23:00",
    defaultTime: "9",
    startTime: "01:00",
    dynamic: false,
    dropdown: true,
    scrollbar: true,
  });
});
