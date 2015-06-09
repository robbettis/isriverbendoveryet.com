$(function() {
    var riverbendStart = moment('2015-06-05T17:00:00-04:00');
    var riverbendEnd = moment('2015-06-13T23:30:00-04:00');
    var futureEventStart = moment('2016-06-05T17:00:00-04:00');

    function formatDateDiff(start, end) {
        var duration = moment.duration(end.diff(start));
        return duration.days() + ' days ' +
            duration.hours() + ' hrs ' +
            duration.minutes() + ' mins ' +
            duration.seconds() + ' secs';
    }

    function updatePage() {
        var now = moment();

        if (now.isBetween(riverbendStart, riverbendEnd)) {
            $('.nope').show();
            $('.countdown').html(formatDateDiff(now, riverbendEnd));
        } else {
            $('.yep').show();
            $('.countdown').html(formatDateDiff(now, futureEventStart));
        }
    }

    updatePage();
    window.setInterval(updatePage, 1000);
});
