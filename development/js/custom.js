/**************** CUSTOM IIFE *****************/

(function (win, doc, $) {
    /****************************
     * LOADS IN HEADER
     ****************************/

    // current time
    var curTime = new Date().getTime();

    // time left in ms
    var timeLeft =
        time_left.secs * 1000 +
        time_left.mins * 1000 * 60 +
        time_left.hours * 1000 * 60 * 60 +
        time_left.days * 1000 * 60 * 60 * 24;

    // cookies fns
    var setCookie = function (cname, cvalue, exptime) {
        var d = new Date();
        d.setTime(d.getTime() + exptime);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };

    var getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    var checkCookie = function (cname) {
        var user = getCookie(cname);
        if (user && user != "" && user != "undefined" && user != null) {
            return true;
        } else {
            return false;
        }
    };

    // check if cookies exists
    if (checkCookie("ctimeleft") && checkCookie("ccurrtime")) {
        var timePassed = curTime - parseInt(getCookie("ccurrtime"));
        if ((parseInt(getCookie("ctimeleft")) - timePassed) > 0) {
            timeLeft = parseInt(getCookie("ctimeleft")) - timePassed;
        }
    }

    setCookie("ctimeleft", timeLeft, timeLeft);
    setCookie("ccurrtime", curTime, timeLeft);

    // development - change initial time
    // setCookie("ctimeleft", timeLeft, 0);
    // setCookie("ccurrtime", curTime, 0);

    /****************************
     * LOADS ON DOCUMENT READY
     ****************************/

    $(doc).ready(function () {

        // counter
        var counter = {
            $dt: $(".days-cell .tens"),
            $du: $(".days-cell .units"),
            $ht: $(".hours-cell .tens"),
            $hu: $(".hours-cell .units"),
            $mt: $(".mins-cell .tens"),
            $mu: $(".mins-cell .units"),
            $st: $(".secs-cell .tens"),
            $su: $(".secs-cell .units"),
            prevD: 9,
            prevH: 9,
            prevM: 9,
            prevS: 9,
            init: function () {
                var that = this;
                var countingInterval = setInterval(function () {

                    if (timeLeft <= 0) {
                        clearInterval(countingInterval);
                    }

                    var days = parseInt(timeLeft / (1000 * 60 * 60 * 24));
                    if (days < 1) {
                        days = 0;
                    }

                    var left = timeLeft - days * 1000 * 60 * 60 * 24;
                    var hours = parseInt(left / (1000 * 60 * 60));
                    if (hours < 1) {
                        hours = 0;
                    }

                    left = left - hours * 1000 * 60 * 60;
                    var mins = parseInt(left / (1000 * 60));
                    if (mins < 1) {
                        mins = 0;
                    }

                    left = left - mins * 1000 * 60;
                    var secs = parseInt(left / 1000);
                    if (secs < 1) {
                        secs = 0;
                    }

                    timeLeft -= 1000;

                    that.tick(days, hours, mins, secs);

                    that.prevD = days;
                    that.prevH = hours;
                    that.prevM = mins;
                    that.prevS = secs;

                }, 1000);
            },
            tick: function (d, h, m, s) {
                var that = this;

                // previous
                var prevDT = this.initiated || parseInt(that.prevD / 10);
                var prevDU = parseInt(that.prevD % 10);

                var prevHT = this.initiated || parseInt(that.prevH / 10);
                var prevHU = parseInt(that.prevH % 10);

                var prevMT = this.initiated || parseInt(that.prevM / 10);
                var prevMU = parseInt(that.prevM % 10);

                var prevST = this.initiated || parseInt(that.prevS / 10);
                var prevSU = parseInt(that.prevS % 10);

                // current
                var cDT = parseInt(d / 10);
                var cDU = parseInt(d % 10);

                var cHT = parseInt(h / 10);
                var cHU = parseInt(h % 10);

                var cMT = parseInt(m / 10);
                var cMU = parseInt(m % 10);

                var cST = parseInt(s / 10);
                var cSU = parseInt(s % 10);

                // change nmbs
                if (cDT !== prevDT) {
                    this.changeNmb(that.$dt, cDT);
                }
                if (cDU !== prevDU) {
                    this.changeNmb(that.$du, cDU);
                }

                if (cHT !== prevHT) {
                    this.changeNmb(that.$ht, cHT);
                }
                if (cHU !== prevHU) {
                    this.changeNmb(that.$hu, cHU);
                }

                if (cMT !== prevMT) {
                    this.changeNmb(that.$mt, cMT);
                }
                if (cMU !== prevMU) {
                    this.changeNmb(that.$mu, cMU);
                }

                if (cST !== prevST) {
                    this.changeNmb(that.$st, cST);
                }
                if (cSU !== prevSU) {
                    this.changeNmb(that.$su, cSU);
                }

                this.initiated = 0;
            },
            initiated: 9,
            changeNmb: function ($el, nmb) {
                $el.addClass("tick");
                setTimeout(function () {
                    $el.html(nmb);
                }, 100);
                setTimeout(function () {
                    $el.removeClass("tick");
                }, 250);
            }
        };

        counter.init();

        // survey

        var surveyControler = {
            $qcont: $("article .right .round"),
            $ansBigCont: $(".footer-top .right"),
            $ansSmallCont: $("article .right"),

            init: function () {
                this.createQuestions();
                this.createBtns();
            },

            createQuestions: function () {
                this.$qcont.append('<h1 class="q1">' + survey.q1.question + '</h1>');
                this.$qcont.append('<h1 class="q2 tobe">' + survey.q2.question + '</h1>');
                this.$qcont.append('<h1 class="q3 tobe">' + survey.q3.question + '</h1>');
            },

            createBtns: function () {
                // big
                this.$ansBigCont.append('<a href="' + survey.redirect_URL + '" class="links fra a1">' + survey.q1.ans1 + '</a>');
                this.$ansBigCont.append('<a href="' + survey.redirect_URL + '" class="links a1">' + survey.q1.ans2 + '</a>');

                this.$ansBigCont.append('<a href="' + survey.redirect_URL + '" class="links fra a2 tobe">' + survey.q2.ans1 + '</a>');
                this.$ansBigCont.append('<a href="' + survey.redirect_URL + '" class="links a2 tobe">' + survey.q2.ans2 + '</a>');

                this.$ansBigCont.append('<a href="' + survey.redirect_URL + '" class="links fra a3 tobe">' + survey.q3.ans1 + '</a>');
                this.$ansBigCont.append('<a href="' + survey.redirect_URL + '" class="links a3 tobe">' + survey.q3.ans2 + '</a>');

                // small
                this.$ansSmallCont.append('<a href="' + survey.redirect_URL + '" class="links a1">' + survey.q1.ans1 + '</a>');
                this.$ansSmallCont.append('<a href="' + survey.redirect_URL + '" class="links a1">' + survey.q1.ans2 + '</a>');

                this.$ansSmallCont.append('<a href="' + survey.redirect_URL + '" class="links a2 tobe">' + survey.q2.ans1 + '</a>');
                this.$ansSmallCont.append('<a href="' + survey.redirect_URL + '" class="links a2 tobe">' + survey.q2.ans2 + '</a>');

                this.$ansSmallCont.append('<a href="' + survey.redirect_URL + '" class="links a3 tobe">' + survey.q3.ans1 + '</a>');
                this.$ansSmallCont.append('<a href="' + survey.redirect_URL + '" class="links a3 tobe">' + survey.q3.ans2 + '</a>');

                // get new elems
                this.getNewElems();
            },

            getNewElems: function () {
                // questions
                $q1 = $("article .right .round h1.q1");
                $q2 = $("article .right .round h1.q2");
                $q3 = $("article .right .round h1.q3");

                //answers
                $a1 = $("article .right a.a1, .footer-top .right a.a1");
                $a2 = $("article .right a.a2, .footer-top .right a.a2");
                $a3 = $("article .right a.a3, .footer-top .right a.a3");

                // create survey
                $a1.click(function (event) {
                    event.preventDefault();
                    $q1.fadeOut(400, function () {
                        $q2.removeClass("tobe");
                    });
                    $a1.fadeOut(400);
                    setTimeout(function () {
                        $a2.removeClass("tobe");
                    }, 400);
                });

                $a2.click(function (event) {
                    event.preventDefault();
                    $q2.fadeOut(400, function () {
                        $q3.removeClass("tobe");
                    });
                    $a2.fadeOut(400);
                    setTimeout(function () {
                        $a3.removeClass("tobe");
                    }, 400);
                });

                $a3.click(function () {
                    $(".loader").css("display", "table");
                });
            }
        };

        surveyControler.init();

    }); //document ready end


}(window, document, jQuery));