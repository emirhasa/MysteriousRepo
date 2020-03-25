"use strict";

var peerConnection;
createConnection();

const signalRController = (() => {

    const connection = new signalR.HubConnectionBuilder().withUrl("/centralHub").build();

    connection.start().then(function () {
        document.getElementById("sendButton").disabled = false;
    }).catch(function (err) {
        document.getElementById("sendButton").disabled = true;
        return console.error(err.toString());
    });

    //console log to test
    connection.on("ReceiveRTCMessage", (message) => {
        message = JSON.parse(message);
        console.log(message);
        if (message.type == 'answer') {
            (async () => {
                //received an answer from other side
                await peerConnection.setRemoteDescription(new RTCSessionDescription(message));
            })();
        }
    });

    return {
        sendMessage: (message) => {
            connection.invoke("SendCommand", message).then(() => console.log(`Message sent with content: ${message}`));
        },
        sendRTCMessage: (message) => {
            connection.invoke("SendRTCMessage", message);
        }
    }

})();

document.getElementById("sendButton").addEventListener('click', () => {
    let message = document.querySelector('input[name="message"]').value;
    if (message.length > 0) {
        signalRController.sendMessage(message);
    } else {
        alert("Type something please");
    }
});

document.getElementById("openVideo").addEventListener('click', () => {

    //create an offer to send over SignalR
    peerConnection.createOffer()
        .then(sdp => peerConnection.setLocalDescription(sdp))
        .then(() => {
            signalRController.sendRTCMessage(JSON.stringify({ "sdp": peerConnection.localDescription.toJSON() }));
        });
});

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
    peerConnection.onicecandidate = (event) => {
        alert("candidate");
        if (event.candidate) {
            //If there is a new ICE candidate send it to our peer over SignalR
            signalRController.sendRTCMessage(JSON.stringify({ "candidate": event.candidate }));
        }
    }

    peerConnection.ontrack = ({ track, streams }) => {
        alert("playing");
        track.onunmute = () => {
            if (video.srcObject) {
                return;
            }
            video.srcObject = streams[0];
        };
        video.play();
    };

    peerConnection.ontrack = function (event) {
        alert("Ale");
        //success, we got a stream from the other end
        //add the stream from the event to the video receiver on page
        const video = document.getElementById("video");
        video.srcObject = event.stream;
        video.play();

    };

}