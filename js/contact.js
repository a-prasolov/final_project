"use strict"
$(document).ready(function() {
    function validateForm() {
        try {
            var res = 1;
            var neme = /^[A-Za-zА-Яа-яыъёіЇ ]{3,}$/;
            var nameReg = new RegExp(neme);
            var email = /(?!.*\.\.)("[!-~ ]+"|[0-9A-Z!#-\'*-\/=?^-~]+)@((?![-])[A-Za-z0-9-]*[A-Za-z-]+[A-Za-z0-9-]*(?![-])\.*)+\.[a-z]+/i;
            var emailReg = new RegExp(email);

            $('.text').each(function() {
                var input = $(this).val();
                if (!nameReg.test(input)) {
                    $(this).css('border', '2px solid red');
                    res = 0;
                } else {
                    $(this).css('border', '0');
                }
            });
            $('.mail').each(function() {
                var input = $(this).val();
                if (!emailReg.test(input)) {
                    $(this).css('border', '2px solid red');
                    res = 0;
                } else {
                    $(this).css('border', '0');
                }
            });
            $('.contactInfo textarea').each(function() {
                var input = $(this).val();
                if (input == '') {
                    $(this).css('border', '2px solid red');
                    res = 0;
                } else {
                    $(this).css('border', '0');
                }
            });
            if (res == 0) {
                return false;
            } else {
                return true;
            }
        } catch (e) {
            alert('Помилка з валідацією форми. Помилка ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }
    window.validateForm = validateForm;
});