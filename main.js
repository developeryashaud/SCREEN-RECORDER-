const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const recordedVideo = document.getElementById('video');

let mediaRecorder;
let chunks = [];

startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);

async function startRecording() {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true
  });

  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function(e) {
    chunks.push(e.data);
  };

  mediaRecorder.onstop = function() {
    const blob = new Blob(chunks, { type: 'video/webm' });
    chunks = [];
    const videoURL = URL.createObjectURL(blob);
    recordedVideo.src = videoURL;
  };

  mediaRecorder.start();

  startButton.disabled = true;
  stopButton.disabled = false;
}

function stopRecording() {
  mediaRecorder.stop();
  startButton.disabled = false;
  stopButton.disabled = true;
}