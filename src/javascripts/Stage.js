import PlaneObject from './threeObjects/PlaneObject.js';
import FloorObject from './threeObjects/FloorObject.js';
import WallObject from './threeObjects/WallObject.js';
import ImageObject from './threeObjects/ImageObject.js';
import FairyObject from './threeObjects/FairyObject.js';
import ButterflyObject from './threeObjects/ButterflyObject.js';
import Music from './threeObjects/Music.js';
import InformationObjct from './threeObjects/InformationObjct.js'
import musicList from './MusicList.js';
import * as THREE from 'three';
import {ModalWindow} from './ModalWindow.js'

var canvas;
var scene;
var width;
var height;
var depth;
var aspect;
var renderer;
var camera;
var musicObjects=[];
var musicDistance=[];
var butterflyobject;
var rendercnt=0;
var group;
var InfoObj;


var canvas2;
var scene2;
var renderer2;

var canvas3;
var scene3;
var renderer3;

var rayReceiveObjects = []; // 光線を受けるオブジェクト配列
var raycaster = new THREE.Raycaster(); 
var mouse = new THREE.Vector2();

var canvas;
var artistName;
var title;
var smallDesc;
var bigDesc;

var pathLength=30;//道幅はpathLengthx2


var guide = 0 ;//何番目のオブジェクトを蝶は案内するか

var modalfalg=0;//ゴール地点のモーダル表示ポジションの到着判定




export function createStage(){

	
	var fogcolor = 0xFFFAF0;
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( fogcolor, 0.03 );//奥行きの色をぼけさせる

	scene2 = new THREE.Scene();
	scene2.fog = new THREE.FogExp2( fogcolor, 0.005 );//奥行きの色をぼけさせる
	
	scene3 = new THREE.Scene();
	

	// カメラの作成 ------------------------------------------
	// fov: 画角(視野角)
	var fov = 75;

	// height = 600; // 縦幅
	// width = 800; // 横幅
	// depth=600;

	height = window.innerHeight*0.75;
	width = window.innerWidth*0.75;
	depth = width;
	// aspect: アスペクト比、カメラで撮影したものの縦横比
	// aspect = height/width;
	aspect = width/height;

	// near： ニアークリップ、 カメラからの撮影開始位置、これより近いものは撮影しない
	var near = 1;
	// far: ファークリップ カメラからの撮影終了位置、これより遠いものは撮影しない
	var far = 2500;

	// カメラ作成
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	//カメラ配置
	camera.position.set(0, 0, 300); // (x, y, z)


	canvas = document.getElementById('layer1'); // div要素の取得
	canvas2 = document.getElementById('layer2'); // div要素の取得
	canvas3 = document.getElementById('layer3'); // div要素の取得


	// レンダラーの追加 ----------------------------------------
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(width,height); // Canvasのサイズ設定
	renderer.shadowMapEnabled = true;//陰の有効化
	canvas.appendChild(renderer.domElement);


	renderer2 = new THREE.WebGLRenderer({antialias: true,alpha: true});
	renderer2.setClearColor( 0x000000, 0 );//レンダラーの透過
	renderer2.setSize(width,height); // Canvasのサイズ設定
	renderer2.shadowMapEnabled = true;//陰の有効化
	canvas2.appendChild(renderer2.domElement);

	renderer3 = new THREE.WebGLRenderer({antialias: true,alpha: true});
	renderer3.setClearColor( 0x000000, 0 );//レンダラーの透過
	renderer3.setSize(width,height); // Canvasのサイズ設定
	renderer3.shadowMapEnabled = true;//陰の有効化
	canvas3.appendChild(renderer3.domElement);

	InfoObj = new InformationObjct();//音楽情報を提示するオブジェクトの生成


	// ライティングを設定する ------------------------------------------
	var color = 'white'; // 光の色
	// ライトオブジェクトの作成
	var directionalLight = new THREE.DirectionalLight(color);
	directionalLight.position.set(0, 7, 10); // 光源の角度を設定

	directionalLight.castShadow = true; //影の有効化(光源)
	scene.add(directionalLight); // シーンに追加
	scene2.add(directionalLight); // シーンに追加
	scene3.add(directionalLight); // シーンに追加

	scene.add( new THREE.AmbientLight(0xaaaaaa) );
	
	console.log("musicList:" + musicList[0].artistName);



	//有象無象の木
	var tree=[];
	var treeNum =1200;//木の本数
	// var pathLength=40;//道幅

	var groupgeometry = new THREE.Geometry;
	var meshItem = new THREE.Mesh(new THREE.PlaneGeometry( 40,40, 1, 1));

	for(var i=0;i<treeNum/2;i++){//道の左右に木を配置　１ループで左右に一本ずつ


		var treeRX = Math.floor(pathLength + Math.random() * width/2);
		var treeRY = 10;
		var treeRZ = Math.floor( Math.random() * depth - depth/2);
		var treeRrad = Math.random() * Math.PI;
		meshItem.position.x = treeRX;
		meshItem.position.y = treeRY;
		meshItem.position.z = treeRZ;
		meshItem.rotation.y = treeRrad;
		groupgeometry.mergeMesh(meshItem);

		// var treeLX = Math.floor(Math.random() * width - width/2);
		var treeLX = Math.floor(-(pathLength)-Math.random() * width/2);
		var treeLY = 10;
		var treeLZ = Math.floor( Math.random() * depth - depth/2);
		var treeLrad = Math.random() * Math.PI;
		meshItem.position.x = treeLX;
		meshItem.position.y = treeLY;
		meshItem.position.z = treeLZ;
		meshItem.rotation.y = treeLrad;
		groupgeometry.mergeMesh(meshItem);

	}

	var loader = new THREE.TextureLoader();
	var map = loader.load( "../images/tree5.png");

	var groupmaterial = new THREE.MeshPhongMaterial( { map: map,transparent: true,side:THREE.DoubleSide});
	var groupmesh = new THREE.Mesh(groupgeometry,groupmaterial);
	scene2.add(groupmesh);


	var spaceXYZ=[width,height,depth];//今後オブジェクト生成に使う空間のベクトル

	for(var i=0;i<musicList.length;i++){
		musicObjects.push(new Music(musicList[i].x,0,musicList[i].z,musicList[i].music,spaceXYZ));
		musicObjects[i].setInformation(musicList[i].artistName,musicList[i].title,musicList[i].smallDesc,musicList[i].bigDesc,musicList[i].url,musicList[i].img);
		musicObjects[i].setlistererPos(camera.position.x,camera.position.y,camera.position.z);
		scene.add(musicObjects[i].setObject()); // シーンに追加
		scene.add(musicObjects[i].getLight());//オブジェクト事態を光らせるライト
		rayReceiveObjects.push(musicObjects[i]);//クリック判定に使用
		musicDistance.push(i);//距離の初期値
	}


    //床オブジェクト
	var floorobject = new FloorObject(0,0,0,spaceXYZ,800, 1200,20,20,'../../images/green.jpg');
	scene.add(floorobject.getObject(0,-12,0)); // シーンに追加
	//道オブジェクト
	var pathobject = new FloorObject(0,0,0,spaceXYZ,30, 1200,1,20,'../../images/path.jpg');
	scene.add(pathobject.getObject(0,-10,0)); // シーンに追加

	//壁(球)オブジェクト
	var wallobject = new WallObject(0,0,0,spaceXYZ);
	scene.add(wallobject.getObject()); // シーンに追加

	// //妖精オブジェクト
	// fairyobject = new FairyObject();
	// fairyobject.setPositionXZ(camera.position.x,camera.position.z,musicObjects[0].x,musicObjects[0].z);
	// scene3.add(fairyobject.getObject()); // シーンに追加
	//妖精オブジェクト
	butterflyobject = new ButterflyObject();
	butterflyobject.setPositionXZ(camera.position.x,camera.position.z,musicObjects[guide].x,musicObjects[guide].z);
	scene3.add(butterflyobject.getObject()); // シーンに追加
	// butterflyobject.wingL.visible = false;//オブジェクト非表示テスト


}
//


// レンダリング ----------------------------------------
export function render() {
  // シーンとカメラを渡してレンダリング
  rendercnt+=0.025;
  butterflyobject.wing();
  for(var i=0;i<musicObjects.length;i++){
 	musicObjects[i].rollingObject();
  }	
  raycaster.setFromCamera( mouse, camera );//マウスポジションの更新
  // scene.remove(pointObj);
  // pointObj=musicObjects[0].analyzeSound();
  // scene.add(pointObj);
  // musicObjects[0].updateAnalyze();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  renderer2.render(scene2, camera);
  renderer3.render(scene3, camera);
}



export function cameraMove(x,y,z){


	//＊＊＊＊＊＊＊＊＊＊カメラの方向にあわせた操作＊＊＊＊＊＊＊＊＊＊＊＊＊＊
	//回転軸
	var axis = new THREE.Vector3(0,1,0).normalize();

	//視点を動かす
	var lookDirection = new THREE.Vector3();
	// var cameramove = new THREE.Vector3(x,y,z);
	var moveVect = new THREE.Vector3();
	// moveVect.copy(cameramove);


	camera.getWorldDirection(lookDirection);//カメラのみている方向
	moveVect.copy(lookDirection);

	//操作にあわせてベクトルか移転
	if(x<0){//left
		moveVect.applyAxisAngle(axis, Math.PI/2);
	}
	if(x>0){//right
		moveVect.applyAxisAngle(axis, -Math.PI/2);
	}
	if(z>0){//back
		moveVect.applyAxisAngle(axis, Math.PI);
	}

	

	moveVect.normalize();
	
	


	//＊＊＊＊＊＊＊カメラの移動範囲の制限＊＊＊＊＊＊＊＊＊＊＊＊＊＊

	var stopLine=120;


	//道の恥じっこにいったら(butterfly guides you の画像を提示)
	if(((-pathLength<camera.position.x && camera.position.x<pathLength) 
		&& (camera.position.z<-depth/2+stopLine || camera.position.z>depth/2-stopLine))){
		if(modalfalg == 0){
			console.log("Modal");
			ModalWindow("images/keyboadInput.jpg");
			modalfalg = 1;
		}
	}else{
		modalfalg = 0;
	}

	//恥じっこに行けば、それ以上進めなくなるようにする
	if((-width/2+stopLine<camera.position.x && moveVect.x<0) ||(camera.position.x<width/2-stopLine && moveVect.x>0)){
		// camera.position.x+=x;
		camera.position.x+=moveVect.x;
	}

	if((-depth/2+stopLine<camera.position.z && moveVect.z<0) ||(camera.position.z<depth/2-stopLine && moveVect.z>0)){
		camera.position.z+=moveVect.z;
	}

	//＊＊＊＊＊＊＊蝶のガイドを調整する＊＊＊＊＊＊＊＊＊＊＊＊＊

	// console.log("guide["+guide+"] distant:" + musicObjects[guide].getDistance());


	//蝶の位置をセットし直してる。
	butterflyobject.setPositionXZ(camera.position.x,camera.position.z,musicObjects[guide].x,musicObjects[guide].z);

	for(var i=0;i<musicObjects.length;i++){
		musicObjects[i].setlistererPos(camera.position.x,camera.position.y,camera.position.z);
		musicDistance[i]=musicObjects[i].getDistance();
		
	}

	var min=musicDistance.indexOf(Math.min.apply(null,musicDistance));
	InfoObj.writeInformation(musicObjects[min].getInformation());
	var drate=1;//この値が大きいほど、情報の提示許容範囲が大きくなる(Music.jsにも同様の変数あり)
	if(musicDistance[min]<0.1*drate){
		InfoObj.translate(0.2+3*Math.log10(2-(musicDistance[min]/drate)*15));
	}

	
	var objPos = new THREE.Vector3(musicObjects[guide].x,musicObjects[guide].y,musicObjects[guide].z);
	butterflyobject.setRotation(objPos,camera.position);

}

export function cameraRotation(ry){
	camera.rotation.y+=ry;

}

export function clickPosition(event){

	// 画面上のマウスクリック位置
	var x = event.clientX;
	var y = event.clientY;
	 
	// マウスクリック位置を正規化
	var mouse = new THREE.Vector2();
	mouse.x =  ( x / window.innerWidth ) * 2 - 1;
	mouse.y = -( y / window.innerHeight ) * 2 + 1;
	 
	// Raycasterインスタンス作成
	// var raycaster = new THREE.Raycaster();
	// 取得したX、Y座標でrayの位置を更新
	// raycaster.setFromCamera( mouse, camera );
	// オブジェクトの取得
	var intersects = raycaster.intersectObjects( scene.children );
	for(var i =0; i < intersects.length;i++){
		for(var j =0; j < musicObjects.length;j++)
		if(musicObjects[j].getObject()==intersects[i].object){
			// console.log("click["+j+"]:"+musicObjects[j].getInformation().URL);
			window.open(musicObjects[j].getInformation().URL,'_blank');
		}
	}
	 


}

export function mouseoverPosition(event){

	event.preventDefault();

		// 画面上のマウスクリック位置
	var x = event.clientX;
	var y = event.clientY;
	 
	// マウスクリック位置を正規化
	var mouse = new THREE.Vector2(), INTERSECTED;
	mouse.x =  ( x / width ) * 2 - 1;
	mouse.y = -( y / height ) * 2 + 1;
	 
	// 取得したX、Y座標でrayの位置を更新
	// raycaster.setFromCamera( mouse, camera );
	// オブジェクトの取得
	var intersects = raycaster.intersectObjects( scene.children );
	// for(var i =0; i < intersects.length;i++){
	console.log("intersects", intersects);
	for(var j =0; j < musicObjects.length;j++){
		// console.log("mouseover:" + intersects[i].object);
		const musicObject = musicObjects[j].getObject();
		console.log('musicObject', musicObject);
		const filtered = intersects.filter(function(intersect) {
          return musicObject === intersect.object;
		});
		if(filtered.length>0){
			musicObjects[j].mouseover();
			console.log("mouseover:"+j);
		}else{
			console.log("mouseout:"+j);
			musicObjects[j].mouseout();
		}
	}
	// }







	// if ( intersects.length > 0 ) {
	// 	if ( INTERSECTED != intersects[ 0 ].object ) {
	// 		if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
	// 		INTERSECTED = intersects[ 0 ].object;
	// 		// INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
	// 		// INTERSECTED.material.emissive.setHex( 0xff0000 );
	// 		}
	// } else {
	// 	if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
	// 	INTERSECTED = null;
	// }
}


export function mouseoutPosition(event){
	// console.log("mouseout");
	// 	// 画面上のマウスクリック位置
	// var x = event.clientX;
	// var y = event.clientY;
	 
	// // マウスクリック位置を正規化
	// var mouse = new THREE.Vector2();
	// mouse.x =  ( x / window.innerWidth ) * 2 - 1;
	// mouse.y = -( y / window.innerHeight ) * 2 + 1;
	 
	// // Raycasterインスタンス作成
	// var raycaster = new THREE.Raycaster();
	// // 取得したX、Y座標でrayの位置を更新
	// raycaster.setFromCamera( mouse, camera );
	// // オブジェクトの取得
	// var intersects = raycaster.intersectObjects( scene.children );
	// for(var i =0; i < intersects.length;i++){
	// 	for(var j =0; j < musicObjects.length;j++){
	// 		if(musicObjects[j].getObject()==intersects[i].object){
	// 			musicObjects[j].mouseout();
	// 			console.log("mouseout:"+j);
	// 		}else{
	// 			musicObjects[j].mouseout();
	// 		}
	// 	}
	// }
}

export function arrive(){//到着判定
	console.log("guide distant:" + musicObjects[guide].getDistance());
	if(guide< musicObjects.length){
		guide++;
	}
}

// export default Music;
