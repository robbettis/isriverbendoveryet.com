import moment from "moment";

export function pluralize(count, singular, plural) {
  var word = "";
  if (count === 1) {
    word = singular;
  } else {
    word = plural || singular + "s";
  }
  return (count || 0) + " " + word;
}

export function formatDateDiff(start, end) {
  var duration = moment.duration(end.diff(start));
  var diffStr = "";

  if (duration.years() > 0) {
    diffStr += pluralize(duration.years(), "year") + " ";
  }
  if (duration.months() > 0) {
    diffStr += pluralize(duration.months(), "month") + " ";
  }
  if (duration.days() > 0) {
    diffStr += pluralize(duration.days(), "day") + " ";
  }
  if (duration.hours() > 0) {
    diffStr += pluralize(duration.hours(), "hr") + " ";
  }
  if (duration.minutes() > 0) {
    diffStr += pluralize(duration.minutes(), "min") + " ";
  }

  diffStr += pluralize(duration.seconds(), "sec");

  return diffStr;
}
