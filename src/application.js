import moment from "moment";
import danceGif from "./images/dance.gif";
import { pluralize, formatDateDiff } from "./utils";
import registerServiceWorker from "./register";

/*!
 * Copyright (c) 2015 Rob Bettis
 * @license MIT
 */
(function() {
  "use strict";

  registerServiceWorker();

  const THIS_EVENT_YEAR = "2019";
  const NEXT_EVENT_YEAR = "2020";

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
      start: moment("2019-05-29T18:15:00-04:00"),
      end: moment("2019-06-01T23:00:00-04:00")
    },
    "2020": {
      start: moment("2020-05-29T18:15:00-04:00")
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
        "The chicken plant smell has been overtaken by the sweet smell of funnel cakes and regret."
    },
    {
      message:
        "Nope. We’re still in the throes of it. I just heard some of our beloved, local panhandlers discuss investing in cryptocurrency."
    },
    {
      message:
        "Not as long as the world contains one original, living member of Lynyrd Skynyrd."
    },
    {
      message:
        "May showers left Spring flowers. But Riverbenders left a bottle full of pee-pee in our parking lot."
    },
    {
      message:
        "As tumbleweeds of trash blow down Broad Street, the end is near."
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
