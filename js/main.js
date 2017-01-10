"use strict"
$(document).ready(function() {
    // adaptive menu
    $('#menuTrigger').click(function() {
        $('#subMenu').hide(400);
        $('#menu').slideToggle(500);
    });
    $('#aboutUsSmall').click(function() {
        $('#subMenu').slideToggle(500);

    });
    $(window).resize(function() {
        if ($(window).width() > 580) {
            $('#menu').removeAttr('style');
            $('#subMenu').removeAttr('style');
        }
    });
    // end

    // fixed menu
    var navPos, winPos, navHeight;

    function refreshVar() {
        if ($(window).width() > 580) {
            navPos = $('#navBar').offset().top;
            navHeight = $('#navBar').outerHeight(true);
        } else {
            $('.cloneNav').show();
        }
    }


    function fixNav() {
        if ($(window).width() > 580) {
            winPos = $(window).scrollTop();

            if (winPos >= navPos) {
                $('#navBar').addClass('fixed shadow');
                $('.cloneNav').show();
            } else {
                $('#navBar').removeClass('fixed shadow');
                $('.cloneNav').hide();
            }
        } else {
            $('.cloneNav').show();
        }
    }

    refreshVar();
    $(window).resize(fixNav);

    $('.cloneNav').css('height', '60px').hide();

    fixNav();
    $(window).scroll(fixNav);

    $(".unActive").click(function() {
        return false;
    });

    $(".slider").each(function() {
        var obj = $(this);
        $(obj).append("<div class='nav'></div>");
        $(obj).find("li").each(function() {
            $(obj).find(".nav").append("<span rel='" + $(this).index() + "'></span>");
            $(this).addClass("slider" + $(this).index());
        });
        $(obj).find("span").first().addClass("on");
    });

    function sliderJS(obj, sl) {
        var ul = $(sl).find("ul");
        var bl = $(sl).find("li.slider" + obj);
        var step = $(window).width();
        $(ul).animate({ marginLeft: "-" + step * obj }, 500);
    }

    $(document).on("click", ".slider .nav span", function() {
        try {
            $('.slider ul li img').width($(document).width());
            var sl = $(this).closest(".slider");
            $('.slider').find("span").removeClass("on");
            $(this).addClass("on");
            var obj = $(this).attr("rel");
            sliderJS(obj, sl);
            return false;
        } catch (e) {
            alert('Помилка в перемикачі слайдера. Помилка ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    });

    function update() {
        try {
            if ($(window).width() > 600) {
                $('.slider ul li img').width($(document).width());
                var step = $('.on').attr('rel');
                var ulMargin = ($('.slider ul li img').width()) * step * (-1);
                $('.slider ul').css('margin-left', ulMargin);
            }
        } catch (e) {
            alert('Помилка в функції зміни розміру вікна. ПомилкаЖ:' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }

    update();
    $(window).resize(function() {
        update();
    });
});