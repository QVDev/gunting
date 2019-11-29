var localCanvas;
var ctx;
var localVideo;
var webp;

function startLocalVideo() {
    localCanvas = document.getElementById('local_canvas');
    ctx = localCanvas.getContext('2d');
    localVideo = document.getElementById('local_video');
    webp;

    localVideo.addEventListener('play', function () {
        var $this = this;
        (function loop() {
            if (!$this.paused && !$this.ended) {
                ctx.drawImage($this, 0, 0);
                webp = localCanvas.toDataURL("image/webp", 0.1);
                writeImageToGun(webp);
                updateCandidatesAppearance();
                setTimeout(loop, 1000 / 30); // drawing at 30fps
            }
        })();
    }, 0);

    navigator.mediaDevices.getUserMedia({
        audio: false, video: {
            width: { min: 200, ideal: 200, max: 200 },
            height: { min: 200, ideal: 200, max: 200 }
        }
    }).then(handleSuccess)
}

var handleSuccess = function (stream) {
    localVideo.srcObject = stream;

    var width = stream.getVideoTracks()[0].getSettings().width
    var height = stream.getVideoTracks()[0].getSettings().height

    localCanvas.width = width;
    localCanvas.height = height;
};

