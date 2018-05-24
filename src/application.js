import moment from "moment";
import danceGif from "./images/dance.gif";
import { pluralize, formatDateDiff } from "./utils";

/*!
 * Copyright (c) 2015 Rob Bettis
 * @license MIT
 */
(function() {
  "use strict";

  const THIS_EVENT_YEAR = "2018";
  const NEXT_EVENT_YEAR = "2019";

  var heading = document.querySelector(".countdown .heading");
  var message = document.querySelector(".countdown .message");
  var remaining = document.querySelector(".countdown .remaining");
  var imageContainer = document.querySelector(".countdown .special-image");

  var riverbendEvents = {
    "2018": {
      start: moment("2018-06-08T17:00:00-04:00"),
      end: moment("2018-06-16T23:00:00-04:00")
    },
    "2019": {
      start: moment("2019-06-09T01:00:00-04:00")
    }
  };

  var snarkyMessages = [
    {
      message:
        "Get out your clean tank top and polish up the ol' pontoon - Riverbend fever is in full swing. Penicillin can be purchased with tokens at the first aid tent."
    },
    {
      message:
        "Downtown Chattanooga now leads the nation in truck-nuts per capita."
    },
    {
      message:
        "Did you know? Riverbend is home to the 8th Wonder of The World. That's right, the Porta-John lines are so long, they can be seen from outer space. #dadjoke"
    },
    {
      message:
        "Pause for Riverbend's bastard child, The Strut - which ironically is the only tolerable day of of the festival.",
      image: danceGif
    },
    {
      message:
        "The chicken plant smell has been overtaken by the sweet smell of funnel cakes and regret."
    },
    {
      message:
        "Judging by how flush with cash the panhandlers are... I'm guessing 'no'."
    },
    {
      message:
        "Not as long as the world contains one original, living member of Lynyrd Skynyrd."
    },
    {
      message:
        "As tumbleweeds of trash blow down Broad Street, the end is near."
    },
    {
      message:
        "If you weren't able to make it to the Riverbend Run this morning, don't worry! You can still get the runs from any of the concession stands located throughout the festival grounds."
    }
  ];

  function updatePage() {
    var now = moment();
    var days = now.diff(riverbendEvents[THIS_EVENT_YEAR].start, "days");
    message.dataset.days = days;

    if (
      now.isAfter(riverbendEvents[THIS_EVENT_YEAR].start) &&
      now.isBefore(riverbendEvents[THIS_EVENT_YEAR].end)
    ) {
      if (days >= 0 && days < snarkyMessages.length) {
        message.innerHTML = snarkyMessages[days].message;
        updateImage(snarkyMessages[days].image);
      }
      heading.innerHTML = "Nope.";
      remaining.innerHTML = formatDateDiff(
        now,
        riverbendEvents[THIS_EVENT_YEAR].end
      );
    } else if (now.isBefore(riverbendEvents[THIS_EVENT_YEAR].start)) {
      heading.innerHTML = "Yep.";
      message.innerHTML =
        "But don't get too excited. The whole thing starts again in:";
      remaining.innerHTML = formatDateDiff(
        now,
        riverbendEvents[THIS_EVENT_YEAR].start
      );
    } else if (now.isAfter(riverbendEvents[THIS_EVENT_YEAR].end)) {
      heading.innerHTML = "Yep.";
      message.innerHTML =
        "But don't get too excited. The whole thing starts again in:";
      remaining.innerHTML = formatDateDiff(
        now,
        riverbendEvents[NEXT_EVENT_YEAR].start
      );
    }
  }

  function updateImage(src) {
    // Empty out image container
    if (!src) {
      while (imageContainer.hasChildNodes()) {
        imageContainer.removeChild(imageContainer.lastChild);
      }
      imageContainer.classList.remove("d-block");
      imageContainer.classList.add("d-none");
      return;
    }

    // Make container visible
    if (imageContainer.classList.contains("d-none")) {
      imageContainer.classList.remove("d-none");
      imageContainer.classList.add("d-block");
    }

    // Prevent repeat updates for the image
    if (imageContainer.hasChildNodes()) {
      var currentImg = imageContainer.querySelector("img");
      if (currentImg.src.endsWith(src)) {
        return;
      }
    }

    // Actually add image to page
    var newImage = document.createElement("img");
    newImage.src = src;
    imageContainer.appendChild(newImage);
  }

  /**
   * Entrypoint
   */
  updatePage();
  window.setInterval(updatePage, 500);
})();
