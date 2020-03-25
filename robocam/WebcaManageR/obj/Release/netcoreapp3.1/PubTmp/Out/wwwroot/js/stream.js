"use strict";

let video = document.getElementById("video");
var myMediaStream;


const signalRController = (() => {

    const connection = new signalR.HubConnectionBuilder().withUrl("/centralHub").build();
    let isWorking = false;

    connection.start().then(function () {
        isWorking = true;
    }).catch(function (err) {
        return console.error(err.toString());
    });

    //listen to new commands and print them
    connection.on("ReceiveCommand", message => document.querySelector('.commands').insertAdjacentHTML('afterbegin', `<p>${message}</p>`));

    return {
        sendMessage: (message) => {
            connection.invoke("SendCommand", message).then(() => console.log(`Message sent with content: ${message}`));
        },
        sendImage: (message) => {
            connection.invoke("SendImage", message);
        }
    }

})();


const manageVideo = (() => {

    //Capture video
    return {

        startVideo: () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
                alert("streaming");
                video.srcObject = stream;
                video.play();

                setInterval(() => {

                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;

                    //Draw the video to canvas
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    //take snapshot of canvas
                    const imgScreenshot = canvas.toDataURL("image/jpeg", 0.2);

                    //send image to hub, so it can be distributed to clients
                    signalRController.sendImage(JSON.stringify(imgScreenshot));

                }, 100);

            }).catch((err) => console.log(err));

        },

        pauseVideo: () => {
            video.srcObject.getTracks().forEach(t => t.enabled = false);
        }

    }
})();

document.getElementById('startVideo').addEventListener('click', () => {
    manageVideo.startVideo();
})

document.getElementById('stopVideo').addEventListener('click', () => {
    manageVideo.pauseVideo();
})
