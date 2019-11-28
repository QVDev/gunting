var localCanvas = document.getElementById('local_canvas');
var ctx = localCanvas.getContext('2d');
var localVideo = document.getElementById('local_video');

localVideo.addEventListener('play', function () {
    var $this = this;
    (function loop() {
        if (!$this.paused && !$this.ended) {
            ctx.drawImage($this, 0, 0);
            setTimeout(loop, 1000 / 10); // drawing at 30fps
        }
    })();
}, 0);

var handleSuccess = function (stream) {
    localVideo.srcObject = stream;

    var width = stream.getVideoTracks()[0].getSettings().width
    var height = stream.getVideoTracks()[0].getSettings().height

    localCanvas.width = width;
    localCanvas.height = height;
};

navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(handleSuccess)