define(["lib/zepto.js","lib/fastclick.js"],function(n,o){function e(){s()?o.attach(document.body):c(),t(),i(),a()}function t(){n(window).on("resize",u(function(){n(window).width()<320&&alert("再小就要压扁了。")},250)),n(document).on("click",".menu-icon",function(){var o=n(".menu");o.hasClass("menu-expand")?n(".menu").removeClass("menu-expand"):n(".menu").addClass("menu-expand")}),n(document).on("click",function(o){var e=n(".menu");e.hasClass("menu-expand")&&(e[0]==o.target||n.contains(e[0],o.target)||e.removeClass("menu-expand"))})}function a(){!function(n,o,e,t,a,c,i){n.GoogleAnalyticsObject=a,n[a]=n[a]||function(){(n[a].q=n[a].q||[]).push(arguments)},n[a].l=1*new Date,c=o.createElement(e),i=o.getElementsByTagName(e)[0],c.async=1,c.src=t,i.parentNode.insertBefore(c,i)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-68588758-1","auto"),ga("send","pageview")}function c(){var o=n('<a class="github-fork" href="http://github.com/yooungt13"><img src="http://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" alt="Fork me on GitHub" /></a>');n("body").append(o)}function i(){var o=n('<div class="backToTop icon icon-up-big"></div>');n("body").append(o),n(window).on("scroll",u(function(){n("body").scrollTop()>0?o.css("display","block"):o.css("display","none")},250)),n(document).on("click",".backToTop",function(){document.body.scrollTop=0})}function s(){var n=navigator.userAgent;return!!n.match(/.*Mobile.*/)}function u(n,o){var e;return function(){var t=this,a=arguments;clearTimeout(e),e=setTimeout(function(){n.apply(t,a)},o)}}return{init:e}});