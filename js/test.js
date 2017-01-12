"use strict"
$(document).ready(function() {

    var start_time_interval;

    function start_time() {
        try {
            $('#time').text('00:00:00')
            var this_date = new Date();
            start_time_interval = setInterval(function() {
                var new_date = new Date() - this_date;
                var sec = Math.abs(Math.floor(new_date / 1000) % 60);
                var min = Math.abs(Math.floor(new_date / 1000 / 60) % 60);
                var hours = Math.abs(Math.floor(new_date / 1000 / 60 / 60) % 24);
                if (sec.toString().length == 1) sec = '0' + sec;
                if (min.toString().length == 1) min = '0' + min;
                if (hours.toString().length == 1) hours = '0' + hours;
                $('#time').text(hours + ':' + min + ':' + sec);
            }, 1000);
        } catch (e) {
            alert('Помилка з секундоміром. Помилка ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    };

    function start() {
        start_time();
        document.getElementById('questionsBlock').style.display = 'block'; //
        document.getElementById('start').style.display = 'none';
        document.getElementById('finish').style.display = 'block';
    }
    $('#start').on("click", start);
    //window.start = start;

    function getTestName(data) {
        var test = {};
        var name = localStorage.testName;
        for (var i = 0; i < data.themes.length; i++) {
            for (var j = 0; j < data.themes[i].tests.length; j++) {
                if (name == data.themes[i].tests[j].testName) {
                    test.themeNum = i;
                    test.nameNum = j;
                    return test;
                }
            }
        }
    }

    function displayQuestion(i) {
        $('.questionWrapper').removeClass('active');
        $('#num' + i).addClass('active');
        $('.numberOfQuestion').removeClass('activeNum');
        $('#listNum' + i).addClass('activeNum');
    }
    window.displayQuestion = displayQuestion;

    function findCorrectAnswers() {
        var myAnswers = [];
        for (var i = 0; i < answer.length; i++) {
            var temp = $('input[name="test' + i + '"]:checked').val();
            myAnswers.push(temp);
        }
        return myAnswers;
    }

    function countCorrectAnswers() {
        var correct = 0;
        var myAnswers = findCorrectAnswers();
        for (var i = 0; i < answer.length; i++) {
            if (answer[i] == myAnswers[i]) {
                correct++;
            }
        }
        return correct;
    }

    function generateResult() {
        var correct = countCorrectAnswers();
        var time = $('#time').text();
        var per = 100 * correct / answer.length;
        var testResultData = 'Результат: ' + per.toFixed(0) + '% (' + correct + '/' + answer.length + ')';
        var testResultTime = 'Час виконання: ' + time;
        clearInterval(start_time_interval);
        $('#questionsBlock').hide();
        $('#buttonBlock').hide();
        $('#answerBlock').show();
        $('#resultData').text(testResultData);
        $('#resultTime').text(testResultTime);
        progressBar(per);
    }

    function createDetailsResultMarkup(jsonData) {
        var myAnswers = findCorrectAnswers();
        var detailResult = '<div>';
        for (var i = 0; i < jsonData.themes[jsonDataIndex.themeNum].tests[jsonDataIndex.nameNum].questions.length; i++) {
            if (answer[i] == myAnswers[i]) {
                detailResult += '<p class="question greenAnswer">' + (i + 1) + ') ' + jsonData.themes[jsonDataIndex.themeNum].tests[jsonDataIndex.nameNum].questions[i].questionTitle + '</p>';
                for (var j = 0; j < jsonData.themes[jsonDataIndex.themeNum].tests[jsonDataIndex.nameNum].questions[i].answers.length; j++) {

                    if (answer[i] == j) {
                        detailResult += '<p class="greenAnswer">' + jsonData.themes[jsonDataIndex.themeNum].tests[jsonDataIndex.nameNum].questions[i].answers[j] + '</p>';
                    } else {
                        detailResult += '<p class="orangeAnswer">' + jsonData.themes[jsonDataIndex.themeNum].tests[jsonDataIndex.nameNum].questions[i].answers[j] + '</p>';
                    }

                }
            } else {
                detailResult += '<p class="question redAnswer">' + (i + 1) + ') ' + jsonData.themes[jsonDataIndex.themeNum].tests[jsonDataIndex.nameNum].questions[i].questionTitle + '</p>';
                for (var j = 0; j < jsonData.themes[jsonDataIndex.themeNum].tests[jsonDataIndex.nameNum].questions[i].answers.length; j++) {
                    if (myAnswers[i] == j) {
                        detailResult += '<p class="redAnswer">' + jsonData.themes[jsonDataIndex.themeNum].tests[jsonDataIndex.nameNum].questions[i].answers[j] + '</p>';
                    } else if (answer[i] == j) {
                        detailResult += '<p class="yellowAnswer">' + jsonData.themes[jsonDataIndex.themeNum].tests[jsonDataIndex.nameNum].questions[i].answers[j] + '</p>';
                    } else {
                        detailResult += '<p class="orangeAnswer">' + jsonData.themes[jsonDataIndex.themeNum].tests[jsonDataIndex.nameNum].questions[i].answers[j] + '</p>';
                    }
                }
            }
        }
        detailResult += '</div>';
        $('#details').append(detailResult);
    }

    function finish() {
        try {
            generateResult();
            createDetailsResultMarkup(jsonData);
        } catch (e) {
            alert('Помилка в опрацюванні та виводі результатів тесту. Помилка ' + e.name + ":" + e.message + "\n" + e.stack);
        }

        //alert(str);
    }
    $('#finish').on("click", finish);
    //window.finish = finish;

    function generateTestQuestionsMarkup(data, index) {
        $('#headerBlock').append('<p>' + data.themes[index.themeNum].tests[index.nameNum].testName + '</p><p>' + data.themes[index.themeNum].theme + '</p>');
        for (var i = 0; i < data.themes[index.themeNum].tests[index.nameNum].questions.length; i++) {
            answer[i] = data.themes[index.themeNum].tests[index.nameNum].questions[i].correctAnswer;
            if (i == 0) {
                $('#questions').append('\
                    <div class="questionWrapper active" id="num' + i + '">\
                        <p class="question">' + (i + 1) + ') ' + data.themes[index.themeNum].tests[index.nameNum].questions[i].questionTitle + '</p>\
                        <div class="ansver">\
                            <input type="radio" name="test' + i + '" id="test' + i + '0" value="0" />\
                            <label for="test' + i + '0">' + data.themes[index.themeNum].tests[index.nameNum].questions[i].answers[0] + '</label>\
                        </div>\
                        <div class="ansver">\
                            <input type="radio" name="test' + i + '" id="test' + i + '1" value="1" />\
                            <label for="test' + i + '1">' + data.themes[index.themeNum].tests[index.nameNum].questions[i].answers[1] + '</label>\
                        </div>\
                        <div class="ansver">\
                            <input type="radio" name="test' + i + '" id="test' + i + '2" value="2" />\
                            <label for="test' + i + '2">' + data.themes[index.themeNum].tests[index.nameNum].questions[i].answers[2] + '</label>\
                        </div>\
                            <div class="ansver">\
                            <input type="radio" name="test' + i + '" id="test' + i + '3" value="3" />\
                            <label for="test' + i + '3">' + data.themes[index.themeNum].tests[index.nameNum].questions[i].answers[3] + '</label>\
                        </div>\
                    </div>');
                $('#questionsList').append('<a class="numberOfQuestion activeNum" id="listNum' + i + '" onclick="displayQuestion(' + i + ')">' + (i + 1) + '</a>');

            } else {
                $('#questions').append('\
                    <div class="questionWrapper" id="num' + i + '">\
                        <p class="question">' + (i + 1) + ') ' + data.themes[index.themeNum].tests[index.nameNum].questions[i].questionTitle + '</p>\
                        <div class="ansver">\
                            <input type="radio" name="test' + i + '" id="test' + i + '0" value="0" />\
                            <label for="test' + i + '0">' + data.themes[index.themeNum].tests[index.nameNum].questions[i].answers[0] + '</label>\
                        </div>\
                        <div class="ansver">\
                            <input type="radio" name="test' + i + '" id="test' + i + '1" value="1" />\
                            <label for="test' + i + '1">' + data.themes[index.themeNum].tests[index.nameNum].questions[i].answers[1] + '</label>\
                        </div>\
                        <div class="ansver">\
                            <input type="radio" name="test' + i + '" id="test' + i + '2" value="2" />\
                            <label for="test' + i + '2">' + data.themes[index.themeNum].tests[index.nameNum].questions[i].answers[2] + '</label>\
                        </div>\
                            <div class="ansver">\
                            <input type="radio" name="test' + i + '" id="test' + i + '3" value="3" />\
                            <label for="test' + i + '3">' + data.themes[index.themeNum].tests[index.nameNum].questions[i].answers[3] + '</label>\
                        </div>\
                    </div>');
                $('#questionsList').append('<a class="numberOfQuestion" id="listNum' + i + '" onclick="displayQuestion(' + i + ')">' + (i + 1) + '</a>');
            }
        }
    }
    // get data from json to use in other functions
    var answer = [];
    var jsonData;
    var jsonDataIndex;

    $.getJSON("inf.min.json", function(data) {
        jsonData = data;
        try {
            var index = getTestName(data);
        } catch (e) {
            alert('Помилка з отриманням даних про тест з localStorage. Помилка ' + e.name + ":" + e.message + "\n" + e.stack);
        }
        jsonDataIndex = index;

        generateTestQuestionsMarkup(data, index);
    });
});

// progress bar

function progressBar(res) {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 10);

    function frame() {
        if (width >= res) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            document.getElementById("label").innerHTML = width * 1 + '%';
        }
    }
}