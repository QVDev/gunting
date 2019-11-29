var audioBridge = (function () {

  var lastTimeStamp = new Date().getTime();
  var initial = true;

  function init() {

    gunDB.get('audio').map().once(function (stream, id) {
      gunDB.get(id).on(function (data, id) {
        if(!id.includes("audio_")) {
          return;
        }
        if (initial) {
          initial = false;
          return;
        }

        if (lastTimeStamp == data.timestamp) {
          return;
        }
        lastTimeStamp = data.timestamp;

        if (data.user == gunDB._.opt.pid) {
          return;
        }

        audioReceiver.receive(data)
      })
    });    
  }

  function sendToGun(data) {
    var user = gunDB.get("audio_" + STREAM_ID).put(data);
    gunDB.get('audio').set(user);
  }

  return {
    init: init,
    send: sendToGun
  };

})();
