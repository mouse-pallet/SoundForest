import * as THREE from 'three';
window.THREE = THREE;
import {createStage,render,cameraMove,cameraRotation,clickPosition,mouseoverPosition,mouseoutPosition,arrive} from './Stage.js';
// import Init from './Init.js'
import $ from "jquery";
import {ModalWindow} from './ModalWindow.js'

var raycaster = new THREE.Raycaster(); 
var mouse = new THREE.Vector2();
// var init = new Init();

// $('[data-remodal-id=modal]').remodal();

createStage();//ステージを作る

render();

document.onkeydown = function (e){
	if(!e) e = window.event; // レガシー

	// console.log("キーボードが押された");
	if(e.keyCode == 87){// W key
		// upgain();
		cameraMove(0,0,-2);
	}else if(e.keyCode == 83){//S key
		// downgain();
		cameraMove(0,0,+2);
	}else if(e.keyCode == 65){//A key
		// up2gain();
		cameraMove(-2,0,0);
		// cameraRotation(+0.1);
	}else if(e.keyCode == 68){//D key
		cameraMove(+2,0,0);
		// cameraRotation(-0.1);
	}
	else if(e.keyCode == 90){//Z key
		// up2gain();
		// cameraMove(-1,0,0);
		cameraRotation(+Math.PI/18);
	}else if(e.keyCode == 88){//X key
		// cameraMove(+1,0,0);
		cameraRotation(-Math.PI/18);
	}
	// if(e.keyCode == 80){//テスト操作このキーボードを押すと P key
	// 	// cameraMove(+1,0,0);
	// 	init.fadeOut();
	// }

};


$('#nextGuide').click(function(e) {arrive();});


// マウスクリックイベントのリスナー登録
// document.addEventListener( 'mousedown', clickPosition, false );

// document.addEventListener('mousemove', mouseoverPosition, false );
// document.addEventListener("mouseout", mouseoutPosition, false );

//モーダルウィンドウ
$(function(){
 	ModalWindow(["images/keyboadInput.jpg","images/ageha.png"]);

});



