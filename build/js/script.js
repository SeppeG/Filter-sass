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