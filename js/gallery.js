"use strict"

$(document).ready(function() {
    $(".gImages li a").click(function() {
        var mainImage = $(this).attr("href");
        $("#mainPicture img").attr({ src: mainImage });
        return false;
    });

});