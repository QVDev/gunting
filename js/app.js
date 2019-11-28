const DB_RECORD = 'gunting'

var STREAM_ID = Date.now();
if (window.location.hash.replace('#', '').length != 0) {
    STREAM_ID = window.location.hash.replace('#', '');
}

var peers = ['https://livecodestream-us.herokuapp.com/gun', 'https://livecodestream-eu.herokuapp.com/gun'];
var opt = { peers: peers, localStorage: false, radisk: false };
var gunDB = Gun(opt);

