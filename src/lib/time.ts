import { intervalToDuration } from "date-fns";
import { pluralize } from "./inflection";

export const differenceInWords = (start: Date, end: Date) => {
  const interval = { start: start, end: end };
  const duration = intervalToDuration(interval);
  let diffStr = "";

  const years = duration?.years || 0;
  if (years > 0) {
    diffStr += pluralize(years, "year") + " ";
  }

  const months = duration?.months || 0;
  if (months > 0) {
    diffStr += pluralize(months, "month") + " ";
  }

  const days = duration?.days || 0;
  if (days > 0) {
    diffStr += pluralize(days, "day") + " ";
  }

  const hours = duration?.hours || 0;
  if (hours > 0) {
    diffStr += pluralize(hours, "hr") + " ";
  }

  const minutes = duration?.minutes || 0;
  if (minutes > 0) {
    diffStr += pluralize(minutes, "min") + " ";
  }

  const seconds = duration?.seconds || 0;
  diffStr += pluralize(seconds, "sec");

  return diffStr;
};
