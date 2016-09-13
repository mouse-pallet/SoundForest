import * as THREE from 'three';
window.THREE = THREE;
import {createStage,render,cameraMove,cameraRotation,clickPosition} from './Stage.js';

var raycaster = new THREE.Raycaster(); 
var mouse = new THREE.Vector2();


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
		cameraRotation(+0.1);
	}else if(e.keyCode == 88){//X key
		// cameraMove(+1,0,0);
		cameraRotation(-0.1);
	}

};
// マウスクリックイベントのリスナー登録
document.addEventListener( 'mousedown', clickPosition, false );



// window.addEventListener( 'mousedown', onDocumentMouseDown, false );
// function onDocumentMouseDown( event ) {

//     // イベントの伝播の無効化
//     event.preventDefault();

//     // マウスポインタの位置座標の取得
//     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1; 
//     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1; 

//     // 光線を発射
//     raycaster.setFromCamera( mouse, camera );
//     // 光線と交わるオブジェクトを収集
//     var intersects = raycaster.intersectObjects( rayReceiveObjects );

//     // 連想配列をとりだす
//     var bookAry = {
//         '火花' : 'http://www.amazon.co.jp/dp/4163902309',
//         '流' : 'http://www.amazon.co.jp/dp/4062194856',
//         '朝が来る' : 'http://www.amazon.co.jp/dp/4163902732',
//         '王とサーカス' : 'http://www.amazon.co.jp/dp/4488027512',
//         '君の膵臓をたべたい' : 'http://www.amazon.co.jp/dp/4575239054'
//     };

//     // 交わるオブジェクトが１個以上の場合
//     if ( intersects.length > 0 ) {
//         // 最も近いオブジェクトの名前をアラート表示する
//         alert(intersects[0].object.name + "をご購入ですね？");
//         console.log("カメラ位置座標からの距離：" + intersects[0].distance);
//         console.log("光線との交差座標(" + intersects[0].point.x + ", " + intersects[0].point.y + ", " + intersects[0].point.z + ")" );
//         console.log(intersects[0]);

//         for(var i in bookAry){
//             if (intersects[0].object.name == i) {
//                 window.location.href = bookAry[i];
//             }
//         }
//     }
// }




