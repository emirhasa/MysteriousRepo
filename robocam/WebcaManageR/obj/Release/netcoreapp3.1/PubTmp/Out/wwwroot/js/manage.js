"use strict";

const signalRController = (() => {

    const connection = new signalR.HubConnectionBuilder().withUrl("/centralHub").build();

    connection.start().then(function () {
        document.getElementById("sendButton").disabled = false;
    }).catch(function (err) {
        document.getElementById("sendButton").disabled = true;
        return console.error(err.toString());
    });

    connection.on("ReceiveImage", (message) => {
        console.log(message);
        video.src = JSON.parse(message);
    });

    return {
        sendMessage: (message) => {
            connection.invoke("SendCommand", message).then(() => console.log(`Message sent with content: ${message}`));
        }
    }

})();

var counter = 1;

document.getElementById("sendButton").addEventListener('click', () => {
    let inputElem = document.querySelector('input[name="message"]');
    if (inputElem.value.length > 0) {
        signalRController.sendMessage(`Info: ${inputElem.value}`);
        inputElem.value = '';
    } else {
        alert("Type something please");
    }
});

const elements = document.querySelectorAll('.command-button');

//make a foreach for list - works like arr foreach
const nodeListforEach = function (list, callback) {
    for (let i = 0; i < list.length; i++) {
        callback(list[i], i);
    }
}

nodeListforEach(elements, (curr, index) => {
    curr.addEventListener('click', () => {
        signalRController.sendMessage(`Command: GO ${curr.dataset.command}`);
    });
});

//document.querySelectorAll('.command-button').addEventListener('click', (e) => {
//    console.log(e.target);
//    const elem = e.target.closest('.command-button');
//    console.log(elem.dataset.command);
//});
