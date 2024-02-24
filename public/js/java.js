var owl = $('.slider-1');
owl.owlCarousel({
autoplay:true,
autoplayTimeout:3500,
smartSpeed:450,
animateOut: 'fadeOut',
animateIn: 'fadeIn',
lazyLoad:true,
loop:true,
touchDrag:true,
mouseDrag:true,
rtl:true,
nav:true,
navText:["<i class='fa fa-angle-right'></i>","<i class='fa fa-angle-left'></i>"],
margin:0,
items:1
})

var owl = $('.slider-4');
owl.owlCarousel({
autoplay:true,
autoplayTimeout:4500,
smartSpeed:450,
lazyLoad:true,
animateOut: 'fadeOut',
animateIn: 'fadeIn',
loop:true,
rtl:true,
nav:true,
navText:["<i class='fa fa-angle-right'></i>","<i class='fa fa-angle-left'></i>"],
responsive:{1000:{items:4},730:{items:3},480:{items:2},0:{items:1}},
margin:0
})


var owl = $('.slider-5');
owl.owlCarousel({
autoplay:true,
autoplayTimeout:4500,
smartSpeed:450,
lazyLoad:true,
animateOut: 'fadeOut',
animateIn: 'fadeIn',
loop:true,
rtl:true,
nav:true,
navText:["<i class='fa fa-angle-right'></i>","<i class='fa fa-angle-left'></i>"],
responsive:{1000:{items:5},730:{items:4},480:{items:2},0:{items:2}},
margin:0
})


$(document).ready(function(){
$('#menu-btn').click(function(){
$('#close-menu-bg').toggleClass('active');
$('#mob-menu').toggleClass('active');
});
$('#close-menu-bg').click(function(){
$('#close-menu-bg').toggleClass('active');
$('#mob-menu').toggleClass('active');
});
$('#req-site-btn').click(function(){
$('#req-site').fadeTo("normal",2);
});
$('.close-cmboxb').click(function(){
$('.modal').fadeOut("normal");
});
$('.close-cmbox').click(function(){
$('.modal').fadeOut("normal");
});
$('#social-share-btn').click(function(){
$('#social-share').slideToggle(300);
});
$('#tab-2').hide();
$('#tab-1').addClass('active');
$('#tab-11').addClass('active');
$('#tab-11').click(function(){
$('#tab-11').addClass('active');
$('#tab-22').removeClass('active');
$('#tab-1').slideDown(400);
$('#tab-2').hide();
});
$('#tab-22').click(function(){
$('#tab-22').addClass('active');
$('#tab-11').removeClass('active');
$('#tab-2').slideDown(400);
$('#tab-1').hide();
});
$("#itsmassage").fadeIn().delay(3000).fadeOut();
});


$(function() {
var Accordionb = function(el, multiple) {
this.el = el || {};
this.multiple = multiple || false;
var links = this.el.find('.link');
links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
}
Accordionb.prototype.dropdown = function(e) {
var $el = e.data.el;
$this = $(this),
$next = $this.next();
$next.slideToggle();
$this.parent().toggleClass('open');
if (!e.data.multiple) {
$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
};
}	
var accordionb = new Accordionb($('#accordionb'), false);
});


$(function() {
$('a[href*=#]:not([href=#])').click(function() {
if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
var target = $(this.hash);
target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
if (target.length) {
$('html,body').animate({
scrollTop: target.offset().top
}, 1000);
return false;
}
}
});
});

