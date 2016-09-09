import * as THREE from 'three';
window.THREE = THREE;
import {createStage,render,cameraMove,cameraRotation} from './Stage.js';


createStage();//ステージを作る
render();

document.onkeydown = function (e){
	if(!e) e = window.event; // レガシー

	// console.log("キーボードが押された");
	if(e.keyCode == 87){// W key
		// upgain();
		cameraMove(0,0,-1);
	}else if(e.keyCode == 83){//S key
		// downgain();
		cameraMove(0,0,+1);
	}else if(e.keyCode == 65){//A key
		// up2gain();
		cameraMove(-1,0,0);
		// cameraRotation(+0.1);
	}else if(e.keyCode == 68){//D key
		cameraMove(+1,0,0);
		// cameraRotation(-0.1);
	}else if(e.keyCode == 90){//Z key
		// up2gain();
		// cameraMove(-1,0,0);
		cameraRotation(+0.1);
	}else if(e.keyCode == 88){//X key
		// cameraMove(+1,0,0);
		cameraRotation(-0.1);
	}

};


//孤立ソース。他に影響はなし
//再生する/音源やリスナーの位置を変えることができる



// var AudioContext = window.AudioContext || window.webkitAudioContext;
// var audioCtx = new AudioContext();
// var source;
// var request;
// var panner = audioCtx.createPanner()
// var listener = audioCtx.listener;
// var gainNode = audioCtx.createGain();


// function setPropaty(){
//   console.log("setPropaty");
//     panner.panningModel = 'HRTF';
//     panner.distanceModel = 'inverse';
//     panner.refDistance = 1;
//     panner.maxDistance = 100;
//     panner.rolloffFactor = 1;
//     panner.coneInnerAngle = 360;
//     panner.coneOuterAngle = 0;
//     panner.coneOuterGain = 0;
//     panner.setOrientation(1,0,0);

//     listener.dopplerFactor = 1;
//     listener.speedOfSound = 343.3;
//     listener.setOrientation(0,0,-1,0,1,0);//最初の方向が鼻の向いている方向、後半が脳天の方向

//   }


// function positionPanner(){
//   console.log("positionPanner");
//   panner.setPosition(-1,0,0);
//   // panner.setVelocity(0,0,0);
//   listener.setPosition(0,0,0);
// }

// function getData(music) {
//   source = audioCtx.createBufferSource();
//   request = new XMLHttpRequest();

//   request.open('GET', music, true);

//   request.responseType = 'arraybuffer';


//   request.onload = function() {
//     var audioData = request.response;

//     audioCtx.decodeAudioData(audioData, function(buffer) {
//         var myBuffer = buffer;
//         source.buffer = myBuffer;


//         console.log("setpan");
//         setPropaty();
//         source.connect(panner);
//         panner.connect(audioCtx.destination);
//         // positionPanner();
//         // source.loop = true;
//         source.connect(gainNode);
// 		gainNode.connect(audioCtx.destination);

//     // source.connect(audioCtx.destination);

//         source.start(0);
//         console.log(source);
//         // audioCtx.suspend();
//         // audioCtx.resume();
//         gainNode.gain.value = 0;
//         console.log(gainNode);


//         // fn(buffer);
//       },

//       function(e){"Error with decoding audio data" + e.err});

//   }

//   request.send('');
// }


// function upgain(){
// 	gainNode.gain.value = 3;
//     console.log("upgain:" + gainNode);
// }

// function downgain(){
// 	gainNode.gain.value = 0;
//     console.log("downgain" + gainNode);
// }

// function up2gain(){
// 	gainNode.gain.value = 50;
//     console.log("up2gain" + gainNode);
// }
// getData("../sounds/sample3.mp3");

