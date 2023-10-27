let video = document.querySelector("video");
let recordBtnContainer = document.querySelector(".record-btn-container"); // for recording
let captureBtnContainer = document.querySelector(".capture-btn-container");
let recordBtn = document.querySelector(".record-btn"); // for animation
let captureBtn = document.querySelector(".capture-btn");
let transparentColor = "transparent";

let recordFlag = false;
let recorder;
let chunks = []; // media data in chunks

let constrains = {
  video: true,
  audio: true,
};
navigator.mediaDevices
  .getUserMedia(constrains) // return promise
  .then((stream) => {
    video.srcObject = stream;
    recorder = new MediaRecorder(stream);

    recorder.addEventListener("start", (event) => {
      chunks = [];
    });

    //store recorder data into chunks array
    recorder.addEventListener("dataavailable", (event) => {
      chunks.push(event.data);
    });

    recorder.addEventListener("stop", (event) => {
      // conversion of media chunks data into video
      let blob = new Blob(chunks, { type: "video/mp4" });
      // get URL of that mp4
      let videoURl = window.URL.createObjectURL(blob);
      // to download using URL
      let a = document.createElement("a"); // create anchor element to download
      a.href = videoURl;
      a.download = "stream.mp4";
      a.click();
    });
  });

recordBtnContainer.addEventListener("click", (event) => {
  if (!recorder) return;

  recordFlag = !recordFlag;

  if (recordFlag) {
    // start recording
    recorder.start();
    recordBtn.classList.add("scale-record");
    startTimer();
  } else {
    // stop
    recorder.stop();
    recordBtn.classList.remove("scale-record");
    stopTimer();
  }
});

captureBtnContainer.addEventListener("click", (event) => {
  console.log("capture");
  let canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  let tool = canvas.getContext("2d");
  tool.drawImage(video, 0, 0, canvas.width, canvas.height);

  // filtering
  tool.fillStyle = transparentColor;
  tool.fillRect(0, 0, canvas.width, canvas.height);

  let imageURl = canvas.toDataURL();
  let a = document.createElement("a"); // create anchor element to download
  a.href = imageURl;
  a.download = "image.jpg";
  a.click();
});
let timerId;
let counter = 0;
let timer = document.querySelector(".timer");

function startTimer() {
  timer.style.display = "block";
  function displayTimer() {
    let totalSeconds = counter; // total value

    let hours = Number.parseInt(totalSeconds / 3600);
    totalSeconds = totalSeconds % 3600; // remaining value

    let minutes = Number.parseInt(totalSeconds / 60);
    totalSeconds = totalSeconds % 60; // remaining value

    let seconds = totalSeconds;
    console.log({ hours, minutes, seconds, totalSeconds });

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    timer.innerText = `${hours} : ${minutes} : ${seconds}`;

    counter++;
  }
  timerId = setInterval(displayTimer, 1000);
}
function stopTimer() {
  clearInterval(timerId);
  timer.innerHTML = "00:00:00";
  timer.style.display = "none";
}

let filterLayer = document.querySelector(".filter-layer");

// filtering logic
let allFilter = document.querySelectorAll(".filter");
allFilter.forEach((filterElement) => {
  filterElement.addEventListener("click", (e) => {
    //filterElement.style.backgroundcolor = "lightblue"; this is to set but we require to get the color

    // get
    transparentColor =
      getComputedStyle(filterElement).getPropertyValue("background-color");
    filterLayer.style.backgroundColor = transparentColor;
  });
});
