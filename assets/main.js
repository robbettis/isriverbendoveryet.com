$(function() {
    var riverbendStart = moment('2015-06-10T17:00:00-04:00');
    var riverbendEnd = moment('2015-06-18T23:30:00-04:00');
    var futureEventStart = moment('2017-06-10T17:00:00-04:00');

    function formatDateDiff(start, end, opts) {
        opts = opts || {};
        opts.long = opts.long || false;

        var duration = moment.duration(end.diff(start));
        var diffStr = "";
        if (opts.long) {
            if (duration.years() > 0) {
                diffStr += duration.years() + ' years ';
            }
            diffStr += duration.months() + ' months ';
        }
        diffStr += duration.days() + ' days ' +
            duration.hours() + ' hrs ' +
            duration.minutes() + ' mins ' +
            duration.seconds() + ' secs';

        return diffStr;
    }

    function updatePage() {
        var now = moment();

        if (now.isBetween(riverbendStart, riverbendEnd)) {
            $('.yep').hide();
            $('.nope').show();
            $('.countdown').html(formatDateDiff(now, riverbendEnd));
        } else {
            $('.yep').show();
            $('.nope').hide();
            $('.countdown').html(formatDateDiff(now, futureEventStart, {long: true}));
        }
    }

    updatePage();
    window.setInterval(updatePage, 1000);
});
