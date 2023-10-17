let video = document.querySelector("video");
let recordBtnContainer = document.querySelector(".record-btn-container"); // for recording
let captureBtnContainer = document.querySelector(".capture-btn-container");
let recordBtn = document.querySelector(".record-btn"); // for animation
let captureBtn = document.querySelector(".capture-btn")

let recordFlag = false;
let recorder;
let chunks = [] // media data in chunks

let constrains = {
    video: true,
    audio: true
}
console.log("calleds")
navigator.mediaDevices.getUserMedia(constrains) // return promise
    .then((stream) => {
        video.srcObject = stream
        recorder = new MediaRecorder(stream)
        recorder.addEventListener("start", (event) => {
            chunks= []
        })
        //store recorder data into chunks array
        recorder.addEventListener("dataavailable",(event) => {
            chunks.push(event.data)
        })
        recorder.addEventListener("stop", (event) => {
            // conversion of media chunks data into video
            let blob = new Blob(chunks, {type:"video/mp4"});
            // get URL of that mp4
            let videoURl = window.URL.createObjectURL(blob)
            // to download using URL
            let a = document.createElement("a") // create anchor element to download
            a.href = videoURl;
            a.download = "stream.mp4"
            a.click();
        })

    })

recordBtnContainer.addEventListener("click", (event) => {
    if(!recorder) return;

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