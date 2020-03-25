"use strict";

const video = document.getElementById("video");
var peerConnection;
var myMediaStream;

createConnection();

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
    connection.on("ReceiveRTCMessage", message => {
        message = JSON.parse(message);
        if (message.sdp.type == 'offer') (async () => {
            //we got offer to stream video to manager so he can watch and give commands
            //set our remote description as what was the local description from stream manager.
            await peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp));

            try {
                // Add our stream to the connection to be shared
                for (const track of myMediaStream.getTracks()) {
                    peerConnection.addTrack(track, myMediaStream);
                }
            }
            catch (err) {
                console.log(err);
            }
            //respond by sending own connection info
            peerConnection.createAnswer()
                .then(sdp => peerConnection.setLocalDescription(sdp))
                .then(() => {
                    signalRController.sendRTCMessage(JSON.stringify(peerConnection.localDescription.toJSON()));
                });
        })();

    });
    //if it's not an offer it's an ICE candidate

    return {
        sendMessage: (message) => {
            connection.invoke(message).then(() => console.log(`Message type sent with content: ${message}`));
        },
        sendRTCMessage: (message) => {
            connection.invoke("SendRTCMessage", message);
        }
    }
    
})();

const manageVideo = (() => {

    //Capture video
    return {

        startVideo: () => {

            navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
                myMediaStream = stream;
                video.srcObject = stream;
                video.play();

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

function createConnection() {

    //add stun server to connection config
    const config = {
        'iceServers': [{
            'urls': ['stun:stun.l.google.com:19302']
        }]
    }

    //make new peer connection
    peerConnection = new RTCPeerConnection(config);

    //the local description set here will become the remote description on the other end.
    //we need to add "ICE" candidates and send them over too. ICE candidates are potential IP/Port combinations the other side can use to connect
    peerConnection.onicecandidate = ({ candidate }) => {

        alert("candidate");
        if (event.candidate) {
            //If there is a new ICE candidate send it to our peer over SignalR
            signalRController.sendRTCMessage(JSON.stringify({ "candidate": candidate }));
        }

    }

}


