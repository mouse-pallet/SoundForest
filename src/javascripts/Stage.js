import PlaneObject from './threeObjects/PlaneObject.js';
import FloorObject from './threeObjects/FloorObject.js';
import WallObject from './threeObjects/WallObject.js';
import ImageObject from './threeObjects/ImageObject.js';
import FairyObject from './threeObjects/FairyObject.js';
import Music from './threeObjects/Music.js';
import * as THREE from 'three';

var canvas;
var scene;
var width;
var height;
var depth;
var aspect;
var renderer;
var camera;
var musicObjects=[];
var fairyobject;
var rendercnt=0;
var group;

var canvas2;
var scene2;
var renderer2;

var canvas3;
var scene3;
var renderer3;

export function createStage(){

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x292934, 0.03 );//奥行きの色をぼけさせる

	scene2 = new THREE.Scene();
	scene2.fog = new THREE.FogExp2( 0x292934, 0.03 );//奥行きの色をぼけさせる

	scene3 = new THREE.Scene();
	scene3.fog = new THREE.FogExp2( 0x292934, 0.03 );//奥行きの色をぼけさせる

	// カメラの作成 ------------------------------------------
	// fov: 画角(視野角)
	var fov = 75;

	height = 600; // 縦幅
	width = 600; // 横幅
	depth=600;
	// aspect: アスペクト比、カメラで撮影したものの縦横比
	aspect = height/width;

	// near： ニアークリップ、 カメラからの撮影開始位置、これより近いものは撮影しない
	var near = 1;
	// far: ファークリップ カメラからの撮影終了位置、これより遠いものは撮影しない
	var far = 1200;

	// カメラ作成
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	//カメラ配置
	camera.position.set(0, 0, 30); // (x, y, z)
	console.log(camera.position);

	// // レンダラーの追加 ----------------------------------------
	// renderer = new THREE.WebGLRenderer({antialias: true});
	// renderer.setSize(height, width); // Canvasのサイズ設定
	// renderer.shadowMapEnabled = true;//陰の有効化
	// document.body.appendChild(renderer.domElement);


	canvas = document.getElementById('layer1'); // div要素の取得
	canvas2 = document.getElementById('layer2'); // div要素の取得
	canvas3 = document.getElementById('layer3'); // div要素の取得


	// レンダラーの追加 ----------------------------------------
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(height, width); // Canvasのサイズ設定
	renderer.shadowMapEnabled = true;//陰の有効化
	// document.body.appendChild(renderer.domElement);
	canvas.appendChild(renderer.domElement);


	renderer2 = new THREE.WebGLRenderer({antialias: true,alpha: true});
	renderer2.setClearColor( 0x000000, 0 );//レンダラーの透過
	renderer2.setSize(height, width); // Canvasのサイズ設定
	renderer2.shadowMapEnabled = true;//陰の有効化
	// document.body.appendChild(renderer2.domElement);
	canvas2.appendChild(renderer2.domElement);

	renderer3 = new THREE.WebGLRenderer({antialias: true,alpha: true});
	renderer3.setClearColor( 0x000000, 0 );//レンダラーの透過
	renderer3.setSize(height, width); // Canvasのサイズ設定
	renderer3.shadowMapEnabled = true;//陰の有効化
	// document.body.appendChild(renderer2.domElement);
	canvas3.appendChild(renderer3.domElement);


	// ライティングを設定する ------------------------------------------
	var color = 'white'; // 光の色
	// ライトオブジェクトの作成
	var directionalLight = new THREE.DirectionalLight(color);
	directionalLight.position.set(0, 7, 10); // 光源の角度を設定

	directionalLight.castShadow = true; //影の有効化(光源)
	scene.add(directionalLight); // シーンに追加
	scene2.add(directionalLight); // シーンに追加
	scene3.add(directionalLight); // シーンに追加
	scene.add( new THREE.AmbientLight(0x333333) );
	scene2.add( new THREE.AmbientLight(0x333333) );
	scene3.add( new THREE.AmbientLight(0x333333) );

	//環境光
	var light = new THREE.AmbientLight(0xffffff);
	scene.add( light );
	scene2.add( light );
	scene3.add( light );




	//////以下からオブジェクト追加


	//  if ( group == null ) {
 // 		group = new THREE.Object3D();
	// 	scene3.add(group);
	// }


	// //jasonテスト
	// //オブジェクト
	// var pathLength=40;//道幅
	// for(var i=0;i<100;i++){　
	//     var loader = new THREE.JSONLoader();　
	//     var modelPath = "./model/Tree.json";//書き出したjsonファイル 　　
	//     loader.load(modelPath, function(geo, mat) {　　　
	//       var faceMat = new THREE.MeshFaceMaterial(mat);　　　
	//       var model = new THREE.Mesh(geo, faceMat);　　　
	//       model.position.set(Math.floor(pathLength/2 +Math.random() * width/100), -5, Math.floor( Math.random() * depth - depth/2));　　　
	//       model.scale.set(1, 1, 1);　　　
	//       // scene.add(model);
	//       group.add(model);　
	//       console.log("model:"+typeof(model));　
	//     });
 //    }




	//有象無象の木
	var tree=[];
	var treeNum =1200;//木の本数
	// var pathLength=40;//道幅

	var groupgeometry = new THREE.Geometry;
	var meshItem = new THREE.Mesh(new THREE.PlaneGeometry( 40,40, 1, 1));

	for(var i=0;i<treeNum/2;i++){//道の左右に木を配置　１ループで左右に一本ずつ


		var treeRX = Math.floor(Math.random() * width - width/2);
		var treeRY = 10;
		var treeRZ = Math.floor( Math.random() * depth - depth/2);
		var treeRrad = Math.random() * Math.PI;
		meshItem.position.x = treeRX;
		meshItem.position.y = treeRY;
		meshItem.position.z = treeRZ;
		meshItem.rotation.y = treeRrad;
		groupgeometry.mergeMesh(meshItem);

	}

	var loader = new THREE.TextureLoader();
	var map = loader.load( "../images/tree5.png");

	var groupmaterial = new THREE.MeshPhongMaterial( { map: map,transparent: true,side:THREE.DoubleSide});
	var groupmesh = new THREE.Mesh(groupgeometry,groupmaterial);
	scene2.add(groupmesh);



	musicObjects.push(new Music(-40,0,0,"../sounds/sample3.mp3",[width,height,depth]));
	musicObjects[0].setlistererPos(camera.position.x,camera.position.y,camera.position.z);
	scene.add(musicObjects[0].getObject()); // シーンに追加



    //床オブジェクト
	var floorobject = new FloorObject();
	scene.add(floorobject.getObject()); // シーンに追加

	//壁(球)オブジェクト
	var wallobject = new WallObject();
	scene.add(wallobject.getObject()); // シーンに追加

	//妖精オブジェクト
	fairyobject = new FairyObject();
	fairyobject.setPositionXZ(camera.position.x,camera.position.z,musicObjects[0].x,musicObjects[0].z);
	// fairyobject.setPositionXZ(camera.position.x-2,camera.position.y,camera.position.z-5);
	scene3.add(fairyobject.getObject()); // シーンに追加
}
//


// レンダリング ----------------------------------------
export function render() {
  // シーンとカメラを渡してレンダリング
  rendercnt+=0.025;
  fairyobject.setY(Math.sin(rendercnt*Math.PI/2));
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  renderer2.render(scene2, camera);
  renderer3.render(scene3, camera);
}



export function cameraMove(x,y,z){
	camera.position.x+=x;
	camera.position.y+=y;
	camera.position.z+=z;




	for(var i=0;i<musicObjects.length;i++){
		musicObjects[i].setlistererPos(camera.position.x,camera.position.y,camera.position.z);
	}
	// var dis=Math.sqrt((camera.position.x-musicObjects[0].x)*(camera.position.x-musicObjects[0].x) + (camera.position.z-musicObjects[0].z) * (camera.position.z - musicObjects[0].z));


	// console.log("musicObjects x:" + musicObjects[0].x + ",z:" + musicObjects[0].z);
	// console.log("listener x:" + camera.position.x + ",z:" + camera.position.z);

	// var fairyX=camera.position.x + 5*Math.abs(camera.position.x-musicObjects[0].x)/dis;
	// var fairyZ=camera.position.z - 5*Math.abs(camera.position.z-musicObjects[0].z)/dis;

	// console.log("fairy x:" + fairyX + ",z:" + fairyZ + ",dis:" + dis);

	// fairyobject.setX(fairyX);
	// fairyobject.setZ(fairyZ);
	fairyobject.setPositionXZ(camera.position.x,camera.position.z,musicObjects[0].x,musicObjects[0].z);

}

export function cameraRotation(ry){
	camera.rotation.y+=ry;
	fairyobject.setRotationY(ry*5);//現時点なんかへん。

}

