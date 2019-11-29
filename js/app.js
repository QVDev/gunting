var DB_RECORD = Date.now();
var STREAM_ID = getStreamId();

var peers = ['https://livecodestream-us.herokuapp.com/gun', 'https://livecodestream-eu.herokuapp.com/gun'];
var opt = { peers: peers, localStorage: false, radisk: false };
var gunDB = Gun(opt);

initApp();

function startMeeting() {
    var roomInput = document.getElementById("room_id");
    var startModal = document.getElementById("start_modal");

    if (roomInput.value === "") {
        roomInput.classList.add("is-danger")
        location.hash = "";
    } else {
        roomInput.classList.remove("is-danger")
        location.hash = roomInput.value.replace(/\s/g, '');
        startModal.classList.remove("is-active")
    }
}

function initApp() {
    var startModal = document.getElementById("start_modal");

    if (location.hash === "" || location.hash === "#") {
        startModal.classList.add("is-active")
    } else {
        DB_RECORD = window.location.hash.replace('#', '');
        startListeningForIncomingCandidates();
        startLocalVideo();
        audioTransmitter = audioTransmitter();
    }

    var roomInput = document.getElementById("room_id");
    roomInput.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("go_button").click();
        }
    });

    function locationHashChanged() {
        if (location.hash === "" || location.hash === "#") {
            startModal.classList.add("is-active")
        } else {
            startModal.classList.remove("is-active")
            window.location.hash.replace('#', '');
            DB_RECORD = window.location.hash.replace('#', '');
            startLocalVideo();
            startListeningForIncomingCandidates();
            audioTransmitter = audioTransmitter();
        }
    }

    window.onhashchange = locationHashChanged;

    audioBridge.init();
}

