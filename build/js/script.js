"use strict";

$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });
});
var scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: "#navbar"
});
/* function isWorkingHour(now) {
	let openDays = [2, 3, 4, 5, 6];
	return openDays.includes(now.getDay()) && now.getHours() >= 9 && now.getHours() < 17.3;
} */