function incommingStream(data) {
    var remote = document.getElementById(data.name);
    if (remote != undefined) {
        remote.src = data.image;
        remote.lastUpdate = data.timestamp;
    } else {
        if (check(data)) {
            addNewCandidate(data);
        }
    }
}

function addNewCandidate(data) {
    var remoteImage = document.createElement("img");
    remoteImage.src = data.image;
    remoteImage.id = data.name;
    remoteImage.lastUpdate = data.timestamp;
    remoteImage.classList.add("remote_video");
    var remoteContainer = document.getElementById("remote_container");
    remoteContainer.appendChild(remoteImage);
}

function writeImageToGun(webPData) {
    let lastUpdate = new Date().getTime();
    var user = gunDB.get(STREAM_ID).put({ image: webPData, name: STREAM_ID, timestamp: lastUpdate });
    gunDB.get(DB_RECORD).set(user);
}

startListeningForIncomingCandidates();

function startListeningForIncomingCandidates() {
    gunDB.get(DB_RECORD).map().once(function (stream, id) {
        gunDB.get(id).on(function (data) {
            if (data.name == STREAM_ID) {
                return;
            }
            incommingStream(data);
        });
    });
}

function updateCandidatesAppearance() {
    var remoteContainer = document.getElementById("remote_container")
    for (var i = 0; i < remoteContainer.children.length; i++) {
        var remote = remoteContainer.children[i];
        if(!check({ name: remote.id, timestamp: remote.lastUpdate })) {
            remote.remove()
        }
    }
}

function check(data) {
    console.log(JSON.stringify(data.timestamp));

    let currentTime = new Date().getTime();
    var difference = (currentTime - data.timestamp) / 1000;
    console.log("TIME::" + difference)  
    if (difference > 5) {
        console.log("remove::" + data.name);
        removeFromGun(data.name);
        return false;
    } else {
        console.log("keep::" + data.name);
        return true;
    }
}

function removeFromGun(id) {
    localStorage.clear();
    var user = gunDB.get(id)
    gunDB.get(DB_RECORD).unset(user);
    user.put(null)
}