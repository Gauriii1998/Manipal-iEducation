burger = document.querySelector('.burger');
navbar = document.querySelector('.navbar');
navList = document.querySelector('.nav-list');
rightNav = document.querySelector('.rightNav');

// hidden search button
$(function() {
    $( "#search" ).hide();
    $(".btn-sm").click(function(){
        $( "#search" ).toggle("slow");
    });
});

// Circle clock
function getTime(timeZone) {
    let today = new Date().toLocaleString("en-US", {timeZone, timeStyle:'short', hourCycle:'h24'});
    return today;
}

function getDateString(){
    let today = new Date();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let curWeekDay = days[today.getDay()];
    let curDay = today.getDate();
    let curMonth = months[today.getMonth()];
    let curYear = today.getFullYear();
    let date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
    return date;

}

function onPageLoad(){
    getDateString();
    startTime();
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

// watch
// var getIndiaTime = function() {
//     let istTime = getTime("Asia/Kolkata");
//     document.getElementById("indiaTime").innerHTML = istTime;
// }
// getIndiaTime();
// setInterval(getIndiaTime,1000);

// var getLondonTime = function() {
//     let europeTime = getTime("Europe/London");
//     document.getElementById("londonTime").innerHTML = europeTime;
// }
// getLondonTime();
// setInterval(getLondonTime,1000);

// var getNewyorkTime = function() {
//     let usTime = getTime("America/New_york");
//     document.getElementById("newyorkTime").innerHTML = usTime;
// }
// getNewyorkTime();
// setInterval(getNewyorkTime,1000);

// var getSydneyTime = function() {
//     let australiaTime = getTime("Australia/Sydney");
//     document.getElementById("sydneyTime").innerHTML = australiaTime;
// }
// getSydneyTime();
// setInterval(getSydneyTime,1000);

// var getTokyoTime = function() {
//     let asiaTime = getTime("Asia/Tokyo");
//     document.getElementById("tokyoTime").innerHTML = asiaTime;
// }
// getTokyoTime();
// setInterval(getTokyoTime,1000);


/* Cascaading image */
document.addEventListener("DOMContentLoaded", startApp);

var intervals = [];

function startApp() {
  let activeTarget;

  //mark first child as active on page load

  let firstDiv = document.getElementById("image-container").firstElementChild;
  firstDiv.classList.add("active");
  activeTarget = firstDiv;

  document
    .getElementById("image-container")
    .addEventListener("click", (event) => {
      let targetDiv = event.target.parentElement;

      //remove active class from activeTarget
      activeTarget.classList.remove("active");

      //mark new target as active
      targetDiv.classList.add("active");
      activeTarget = targetDiv;
    });

  //bind clocks to the divs
  let clockTimeZones = [
    "Asia/Kolkata",
    "Australia/Sydney",
    "Europe/London",
    "America/Los_Angeles",
  ];

  const clocksDivs = document.querySelector("#image-container").children;
  let intervals = clockTimeZones.map((timeZone, index) => {
    return bindClocks(clocksDivs[index], timeZone);
  });

  //remove interval on page unload
  window.addEventListener("unload", () => {
    if (intervals && intervals.length > 0) {
      intervals.forEach((interval) => {
        clearInterval(interval);
      });
    }
  });
}

function bindClocks(htmlElement, timeZone) {
  function timer() {
    let date_str = getLocaleDateString(timeZone);
    let time_str = getAMPMTime(date_str);
    htmlElement.getElementsByClassName("halftime")[0].innerHTML = time_str;
    htmlElement.getElementsByClassName("fulltime")[0].innerHTML = date_str;
  }
  timer();
  return setInterval(timer, 1000);
}

function getLocaleDateString(timeZone) {
  return new Date().toLocaleString("en-US", { timeZone });
}
/*
Get time for a given time-zone
*/
function getAMPMTime(datestring) {
  // create new Date object
  let datetime = new Date(datestring);

  let hours = datetime.getHours();
  let minutes = datetime.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
