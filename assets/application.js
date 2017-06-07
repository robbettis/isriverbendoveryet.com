/* global moment */

var heading = document.querySelector('.countdown .heading')
var message = document.querySelector('.countdown .message')
var remaining = document.querySelector('.countdown .remaining')

var riverbendDates = {
  '2016': {
    'start': '2016-06-10T17:00:00-04:00',
    'end': '2016-06-10T17:00:00-04:00'
  },
  '2017': {
    'start': '2017-06-18T23:30:00-04:00',
    'end': ''
  }
}

var myTickHandler = function (now, riverbend, message) {
  console.log('here!')
}

function pluralize (count, singular, plural) {
  var word = ''
  if (count === 1) {
    word = singular
  } else {
    word = plural || (singular + 's')
  }
  return (count || 0) + ' ' + word
}

function formatDateDiff (start, end) {
  var duration = moment.duration(end.diff(start))
  var diffStr = ''

  if (duration.years() > 0) {
    diffStr += pluralize(duration.years(), 'year') + ' '
  }
  if (duration.months() > 0) {
    diffStr += pluralize(duration.months(), 'month') + ' '
  }
  if (duration.days() > 0) {
    diffStr += pluralize(duration.days(), 'day') + ' '
  }
  if (duration.hours() > 0) {
    diffStr += pluralize(duration.hours(), 'hr') + ' '
  }
  if (duration.minutes() > 0) {
    diffStr += pluralize(duration.minutes(), 'min') + ' '
  }

  diffStr += pluralize(duration.seconds(), 'sec')

  return diffStr
}
