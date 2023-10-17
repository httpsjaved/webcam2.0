let video = document.querySelector("video");
let recordBtnContainer = document.querySelector(".record-btn-container"); // for recording
let captureBtnContainer = document.querySelector(".capture-btn-container");
let recordBtn = document.querySelector(".record-btn"); // for animation
let captureBtn = document.querySelector(".capture-btn")

let recordFlag = false;


let recorder;

let constrains = {
    video: true,
    audio: true
}
console.log("calleds")
navigator.mediaDevices.getUserMedia(constrains) // return promise
    .then((stream) => {
        video.srcObject = stream

        recorder = new MediaRecorder(stream)
    })

recordBtnContainer.addEventListener("click", (event) => {
    if(!record) return;

    recordFlag = !recordFlag;

    if(recordFlag){ // start recording
        recorder.start();
        recordBtn.classList.add("scale-record")

    }else{ // stop
        recorder.stop();
        recordBtn.classList.remove("scale-record")

    }


})    
captureBtnContainer.addEventListener("click",(event) => {

})