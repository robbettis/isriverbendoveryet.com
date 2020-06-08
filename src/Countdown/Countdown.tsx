import React from "react";
import { differenceInDays, isAfter, isBefore } from "date-fns";

import { currentEvent, nextEvent } from "../lib/events";
import { differenceInWords } from "../lib/time";
import { messages } from "../lib/messages";

type CountdownProps = {
  now: Date;
}

type CountdownState = {
  heading: string;
  message: string;
  remaining: string;
}

const computeState = (now: Date): CountdownState => {
  var days = differenceInDays(now, currentEvent.start);

  if (isAfter(now, currentEvent.start) && isBefore(now, currentEvent.end)) {
    return {
      heading: "Nope.",
      message: messages[days],
      remaining: differenceInWords(now, currentEvent.end)
    };
  }

  if (isBefore(now, currentEvent.start)) {
    return {
      heading: "Yep.",
      message: "But don't get too excited. The whole thing starts again in:",
      remaining: differenceInWords(now, currentEvent.start)
    };
  }

  if (isAfter(now, currentEvent.end) && isBefore(now, nextEvent.start)) {
    return {
      heading: "Yep.",
      message: "But don't get too excited. The whole thing starts again in:",
      remaining: differenceInWords(now, nextEvent.start)
    };
  }

  return {
    heading: "???",
    message: "We're not sure when the next Riverbend is starting.",
    remaining: ":)"
  };
};

const Countdown: React.FC<CountdownProps> = ({ now }) => {
  const state = computeState(now);

  return (
    <div className="countdown">
      <h1 className="heading">{state.heading}</h1>
      <p className="message">{state.message}</p>
      <div className="remaining">{state.remaining}</div>
    </div>
  );
};

export default Countdown;
