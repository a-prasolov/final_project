"use strict"

$(document).ready(function() {
    function setTestName(name) {
        localStorage.setItem('testName', name)
    }
    window.setTestName = setTestName;

    function searchTest() {
        var search = $('#searchInput').val();
        if (search == '') {
            $('#pNum0').click();
        } else {
            var reg = new RegExp(search, 'i')
            $('.testBlock').each(function() {
                if ($(this).text().search(reg) == -1) {
                    //console.log($(this).text());
                    $(this).addClass('hideTest');
                } else {
                    $(this).removeClass('hideTest');
                }
            });
        }
    }
    window.searchTest = searchTest;

    function showTests(i) {
        $('.pageNavigation').removeClass('activPagination');
        $('.pNum' + i).addClass('activPagination');
        $('.testBlock').addClass('hideTest');
        $('.page' + i).removeClass('hideTest');
    }
    window.showTests = showTests;

    function createPagination(pageNumber, toElement) {
        if (pageNumber > 1) {
            for (var i = 0; i <= pageNumber; i++) {
                if (i == 0) {
                    $(toElement).each(function() {
                        $(this).append('<li class="pageNavigation activPagination pNum' + i + '" onclick="showTests(' + i + ')">' + (i + 1) + '</li>');
                    });
                } else {
                    $(toElement).each(function() {
                        $(this).append('<li class="pageNavigation pNum' + i + '" onclick="showTests(' + i + ')">' + (i + 1) + '</li>');
                    });
                }
            }
        }
    }

    $.getJSON("inf.json", function(data) {
        try {
            var pageNumber = 0,
                k = 1;
            for (var i = 0; i < data.themes.length; i++) {
                for (var j = 0; j < data.themes[i].tests.length; j++) {
                    $('#testsPreview').append('\
                <a href="test.html" class="testBlock page' + pageNumber + '" onclick="setTestName(\'' + data.themes[i].tests[j].testName + '\')">\
                    <img src="' + data.themes[i].tests[j].testImgUrl + '" alt="">\
                    <div class="testBlockText">\
                        <p class="testTitle">' + data.themes[i].tests[j].testName + '</p>\
                        <p class="testThema">' + data.themes[i].theme + '</p>\
                    </div>\
                </a>');
                    if (pageNumber > 0) {
                        $('.page' + pageNumber).addClass('hideTest');
                    }
                    k++;
                    if (k == 11) {
                        pageNumber++;
                        k = 1;
                    }
                }
            }
            createPagination(pageNumber, '.pagination');
        } catch (e) {
            alert('Помилка в опрацюванні даних з json(вівід переліку тестів). Помилка ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    });

});