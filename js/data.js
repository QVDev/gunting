function incommingStream(data) {
    var remote = document.getElementById(data.name);
    if(remote != undefined) {
        remote.src = data.image;
    } else {
        addNewCandidate(data);
    }
}

function addNewCandidate(data) {
    var remoteImage = document.createElement("img");
    remoteImage.src = data.image;
    remoteImage.id = data.name;
    remoteImage.classList.add("remote_video");
    var remoteContainer = document.getElementById("remote_container");
    remoteContainer.appendChild(remoteImage);
}