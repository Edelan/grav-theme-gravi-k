$(document).ready(function(){/*
   * jQuery Accessible tab panel system, using ARIA
   * Website: http://a11y.nicolas-hoffmann.net/tabs/
   * License MIT: https://github.com/nico3333fr/jquery-accessible-tabs-aria/blob/master/LICENSE
   */
// Store current URL hash.
var t=window.location.hash.replace("#",""),e=$(".js-tabs");if(e.length){var a=e.find(".js-tablist");
// search if hash is IN tabs
if(a.each(function(){var t=$(this),e=t.data(),a="undefined"!=typeof e.tabsPrefixClass?e.tabsPrefixClass+"-":"",i="undefined"!=typeof e.hx?e.hx:"",s="undefined"!=typeof e.existingHx?e.existingHx:"",l=t.children(".js-tablist__item"),n=t.find(".js-tablist__link");
// roles init
t.attr("role","tablist"),// ul        
l.attr("role","presentation"),// li
n.attr("role","tab"),// a
// classes init
t.addClass(a+"tabs__list"),l.addClass(a+"tabs__item"),n.addClass(a+"tabs__link"),
// controls/tabindex attributes
n.each(function(){var t=$(this),e=t.attr("href"),a=$(e),l=t.html();""!==i&&a.prepend("<"+i+' class="invisible" tabindex="0">'+l+"</"+i+">"),""!==s&&a.find(s+":first-child").attr("tabindex",0),"undefined"!=typeof e&&""!==e&&"#"!==e&&t.attr({"aria-controls":e.replace("#",""),tabindex:-1,"aria-selected":"false"}),t.removeAttr("href")})}),/* Tabs content ---------------------------------------------------------------------------------------------------- */
$(".js-tabcontent").attr({role:"tabpanel",// contents
"aria-hidden":"true"}).each(function(){var t=$(this),e=t.attr("id"),a=$("#label_"+e).parents(".js-tablist").attr("data-tabs-prefix-class"),i="undefined"!=typeof a?a+"-":"";
// label by link
t.attr("aria-labelledby","label_"+e),t.addClass(i+"tabs__content")}),
// search if hash is ON tabs
""!==t&&0!==$("#"+t+".js-tabcontent").length&&(
// display
$("#"+t+".js-tabcontent").removeAttr("aria-hidden"),
// selection menu
$("#label_"+t+".js-tablist__link").attr({"aria-selected":"true",tabindex:0})),""!==t&&0===$("#"+t+".js-tabcontent").length&&$("#"+t).parents(".js-tabcontent").length){var i=$("#"+t),s=i.parents(".js-tabcontent"),l=s.attr("id");s.removeAttr("aria-hidden"),
// selection menu
$("#label_"+l+".js-tablist__link").attr({"aria-selected":"true",tabindex:0})}
// if no selected => select first
e.each(function(){var t=$(this),e=t.find('.js-tablist__link[aria-selected="true"]'),a=t.find(".js-tablist__link:first"),i=t.find(".js-tabcontent:first");0===e.length&&(a.attr({"aria-selected":"true",tabindex:0}),i.removeAttr("aria-hidden"))}),/* Events ---------------------------------------------------------------------------------------------------------- */
/* click on a tab link */
$("body").on("click",".js-tablist__link",function(t){var e=$(this),a=e.attr("aria-controls"),i=$("#"+e.attr("aria-controls")),s=e.parents(".js-tabs"),l=s.find(".js-tablist__link"),n=s.find(".js-tabcontent");
// aria selected false on all links
l.attr({tabindex:-1,"aria-selected":"false"}),
// add aria selected on $this
e.attr({"aria-selected":"true",tabindex:0}),
// add aria-hidden on all tabs contents
n.attr("aria-hidden","true"),
// remove aria-hidden on tab linked
i.removeAttr("aria-hidden"),
// add fragment (timeout for transitions)
setTimeout(function(){history.pushState(null,null,location.pathname+location.search+"#"+a)},1e3),t.preventDefault()}).on("keydown",".js-tablist",function(t){var e=$(this).parents(".js-tabs"),a=e.find('.js-tablist__link[aria-selected="true"]').parent(),i=e.find(".js-tablist__item:last-child .js-tablist__link"),s=e.find(".js-tablist__item:first-child .js-tablist__link"),l=!1;
// some event should be activated only if the focus is on tabs (not on tabpanel)
$(document.activeElement).is(e.find(".js-tablist__link"))&&(l=!0),
// catch keyboard event only if focus is on tab
l&&!t.ctrlKey&&(
// strike up or left in the tab
37==t.keyCode||38==t.keyCode?(
// if we are on first => activate last
a.is(".js-tablist__item:first-child")?i.click().focus():a.prev().children(".js-tablist__link").click().focus(),t.preventDefault()):40==t.keyCode||39==t.keyCode?(
// if we are on last => activate first
a.is(".js-tablist__item:last-child")?s.click().focus():a.next().children(".js-tablist__link").click().focus(),t.preventDefault()):36==t.keyCode?(
// activate first tab
s.click().focus(),t.preventDefault()):35==t.keyCode&&(
// activate last tab
i.click().focus(),t.preventDefault()))}).on("keydown",".js-tabcontent",function(t){var e=$(this),a=e.attr("aria-labelledby"),i=$("#"+a),s=i.parent(),l=s.parent();
// CTRL up/Left
37!=t.keyCode&&38!=t.keyCode||!t.ctrlKey||(i.focus(),t.preventDefault()),
// CTRL PageUp
33==t.keyCode&&t.ctrlKey&&(i.focus(),
// if we are on first => activate last
s.is(".js-tablist__item:first-child")?l.find(".js-tablist__item:last-child .js-tablist__link").click().focus():s.prev().children(".js-tablist__link").click().focus(),t.preventDefault()),
// CTRL PageDown
34==t.keyCode&&t.ctrlKey&&(i.focus(),
// if we are on last => activate first
s.is(".js-tablist__item:last-child")?l.find(".js-tablist__item:first-child .js-tablist__link").click().focus():s.next().children(".js-tablist__link").click().focus(),t.preventDefault())}).on("click",".js-link-to-tab",function(t){var e=$(this),a=$(e.attr("href")),i=$("#"+a.attr("aria-labelledby"));
// activate tabs
i.click(),
// give focus to the good button
setTimeout(function(){i.focus()},10)})}});