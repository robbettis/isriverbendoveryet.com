var today = new Date();
var startdate = new Date('June 5, 2015 17:00:00');
var enddate =  new Date('June 14, 2015 23:30:00');

if (today >= startdate & today <= enddate) {
    document.getElementById('response').innerHTML = 'Nope.';
    document.getElementById('text').innerHTML = "The riverfront is trampled & downtown is covered with trash. <br />It's almost done. Hang in there.";
    CountDownTimer('06/14/2015 11:30 PM', 'countdown');
}
else {
    document.getElementById('response').innerHTML = 'Yep.';
    document.getElementById('text').innerHTML = "But don't get too excited. The whole thing starts again in:";
    CountDownTimer('06/06/2016 5:30 PM', 'countdown');
}

// Borrowed from http://stackoverflow.com/questions/9335140/how-to-countdown-to-a-date
function CountDownTimer(dt, id)
{
    var end = new Date(dt);

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById(id).innerHTML = 'EXPIRED!';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById(id).innerHTML = days + 'days ';
        document.getElementById(id).innerHTML += hours + 'hrs ';
        document.getElementById(id).innerHTML += minutes + 'mins ';
        document.getElementById(id).innerHTML += seconds + 'secs';
    }

    timer = setInterval(showRemaining, 1000);
}
