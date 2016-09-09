//孤立ソース。他に影響はなし
//再生する/音源やリスナーの位置を変えることができる

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();
var source;
var request;
var panner = audioCtx.createPanner()
var listener = audioCtx.listener;


function setPropaty(){
  console.log("setPropaty");
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1;
    panner.maxDistance = 100;
    panner.rolloffFactor = 1;
    panner.coneInnerAngle = 360;
    panner.coneOuterAngle = 0;
    panner.coneOuterGain = 0;
    panner.setOrientation(1,0,0);

    listener.dopplerFactor = 1;
    listener.speedOfSound = 343.3;
    listener.setOrientation(0,0,-1,0,1,0);//最初の方向が鼻の向いている方向、後半が脳天の方向

  }


function positionPanner(){
  console.log("positionPanner");
  panner.setPosition(-1,0,0);
  // panner.setVelocity(0,0,0);
  listener.setPosition(0,0,0);
}

function getData(music) {
  source = audioCtx.createBufferSource();
  request = new XMLHttpRequest();

  request.open('GET', music, true);

  request.responseType = 'arraybuffer';


  request.onload = function() {
    var audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
        var myBuffer = buffer;
        source.buffer = myBuffer;


        console.log("setpan");
        setPropaty();
        source.connect(panner);
        panner.connect(audioCtx.destination);
        // positionPanner();
        source.loop = true;

    // source.connect(audioCtx.destination);

        source.start(0);
        console.log(source);

        
        
        // fn(buffer);
      },

      function(e){"Error with decoding audio data" + e.err});

  }

  request.send('');
}


getData("../sounds/sample3.mp3");