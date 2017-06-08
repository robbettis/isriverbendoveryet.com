/* global moment */

var heading = document.querySelector('.countdown .heading')
var message = document.querySelector('.countdown .message')
var remaining = document.querySelector('.countdown .remaining')
var image = document.querySelector('.countdown .special-image')

var riverbendEvents = {
  '2016': {
    start: moment('2016-06-10T17:00:00-04:00'),
    end: moment('2016-06-18T23:30:00-04:00')
  },
  '2017': {
    start: moment('2017-06-09T01:45:00-04:00'),
    end: moment('2017-06-18T23:30:00-04:00')
  },
  '2018': {
    start: moment('2017-06-09T01:45:00-04:00')
  }
}

var snarkyMessages = [
  {
    message: "Get out your clean tank top and polish up the ol' pontoon - Riverbend fever is in full swing. Penicillin can be purchased with tokens at first aid tent. "
  },
  {
    message: 'Downtown Chattanooga now leads the nation in truck-nuts per capita.'
  },
  {
    message: "Did you know? Riverbend is home to the 8th Wonder of The World. That's right, the Porta-John lines are so long, they can be seen from outer space. #dadjoke"
  },
  {
    message: "Pause for Riverbend's bastard child, The Strut - which ironically is the only tolerable day of of the festival.",
    image: '/images/dance.gif'
  },
  {
    message: 'The chicken plant smell has been overtaken by the sweet smell of funnel cakes and regret.'
  },
  {
    message: "Judging by how flush with cash the panhandlers are... I'm guessing 'no'."
  },
  {
    message: 'Not as long as the world contains one original, living member of Lynyrd Skynyrd.'
  },
  {
    message: 'As tumbleweeds of trash blow down Broad Street, the end is near.'
  },
  {
    message: "If you weren't able to make it to the Riverbend Run this morning, don't worry! You can still get the runs from any of the concession stands located throughout the festival grounds."
  }
]

function updatePage () {
  var now = moment()
  var days = now.diff(riverbendEvents['2017'].start, 'days')
  message.dataset.days = days

  if (now.isAfter(riverbendEvents['2017'].start) && now.isBefore(riverbendEvents['2017'].end)) {
    if (days >= 0 && days < snarkyMessages.length) {
      message.innerHTML = snarkyMessages[days].message
      updateImage(snarkyMessages[days].image)
    }
    heading.innerHTML = 'Nope.'
    remaining.innerHTML = formatDateDiff(now, riverbendEvents['2017'].end)
  } else if (now.isBefore(riverbendEvents['2017'].start)) {
    heading.innerHTML = 'Yep.'
    message.innerHTML = "But don't get too excited. The whole thing starts again in:"
    remaining.innerHTML = formatDateDiff(now, riverbendEvents['2017'].start)
  } else if (now.isAfter(riverbendEvents['2017'])) {
    heading.innerHTML = 'Yep.'
    message.innerHTML = "But don't get too excited. The whole thing starts again in:"
    remaining.innerHTML = formatDateDiff(now, riverbendEvents['2018'].start)
  }
}

function updateImage (src) {
  if (!src) {
    image.src = ''
    image.classList.remove('d-block')
    image.classList.add('hidden')
    return
  }

  if (image.classList.contains('hidden')) {
    image.classList.remove('hidden')
    image.classList.add('d-block')
  }

  if (!image.src.endsWith(src)) {
    image.src = src
  }
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

/**
 * Entrypoint
 */
updatePage()
window.setInterval(updatePage, 500)
