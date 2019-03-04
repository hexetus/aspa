window.addEventListener("load", function(){

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    document.getElementById("video").srcObject = stream;
    
    let recorder = new MediaRecorder(stream);
    let recordedChunks = [];
    
    let isRecording = false;
    let record = document.getElementById("record");
    record.addEventListener("click", function(event){
        if(isRecording) {
            isRecording = false;
            record.innerHTML = "Record";
            recorder.stop();
        } else {
            isRecording = true;
            record.innerHTML = "Stop";
            recordedChunks = []
            recorder.ondataavailable = event => recordedChunks.push(event.data);
            recorder.start();
        }
    });
    
    let send = document.getElementById("send");
    send.addEventListener("click", function(event){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function() {
            alert("Request " + xhr.status);
        };
        
        let description = document.getElementById("description");
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        // TODO use multipart form instead of base64
        var reader = new FileReader();
        reader.onload = (function(er){
            let recordedBase64 = reader.result;
            xhr.send(JSON.stringify({"description" : description.value, "recording" : recordedBase64}));
        });
        reader.readAsDataURL(recordedBlob);
    });
});

});
