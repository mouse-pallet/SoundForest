import PlaneObject from './threeObjects/PlaneObject.js';
import FloorObject from './threeObjects/FloorObject.js';
import WallObject from './threeObjects/WallObject.js';
import ImageObject from './threeObjects/ImageObject.js';
import FairyObject from './threeObjects/FairyObject.js';
import ButterflyObject from './threeObjects/ButterflyObject.js';
import Music from './threeObjects/Music.js';
import InformationObjct from './threeObjects/InformationObjct.js'
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



export function createStage(){

	

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0xcccccc, 0.03 );//奥行きの色をぼけさせる

	scene2 = new THREE.Scene();
	
	scene3 = new THREE.Scene();
	

	// カメラの作成 ------------------------------------------
	// fov: 画角(視野角)
	var fov = 75;

	height = 600; // 縦幅
	width = 800; // 横幅
	depth=600;
	// aspect: アスペクト比、カメラで撮影したものの縦横比
	// aspect = height/width;
	aspect = width/height;

	// near： ニアークリップ、 カメラからの撮影開始位置、これより近いものは撮影しない
	var near = 1;
	// far: ファークリップ カメラからの撮影終了位置、これより遠いものは撮影しない
	var far = 1200;

	// カメラ作成
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	//カメラ配置
	camera.position.set(0, 0, 100); // (x, y, z)
	console.log(camera.position);


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
	



	//有象無象の木
	var tree=[];
	var treeNum =1200;//木の本数
	// var pathLength=40;//道幅

	var groupgeometry = new THREE.Geometry;
	var meshItem = new THREE.Mesh(new THREE.PlaneGeometry( 40,40, 1, 1));

	for(var i=0;i<treeNum/2;i++){//道の左右に木を配置　１ループで左右に一本ずつ


		var treeRX = Math.floor(30+Math.random() * width/2);
		var treeRY = 10;
		var treeRZ = Math.floor( Math.random() * depth - depth/2);
		var treeRrad = Math.random() * Math.PI;
		meshItem.position.x = treeRX;
		meshItem.position.y = treeRY;
		meshItem.position.z = treeRZ;
		meshItem.rotation.y = treeRrad;
		groupgeometry.mergeMesh(meshItem);

		// var treeLX = Math.floor(Math.random() * width - width/2);
		var treeLX = Math.floor(-30-Math.random() * width/2);
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
	musicObjects.push(new Music(-80,0,-50,"../sounds/Aimer/darekaumiwo.mp3",spaceXYZ));
	// setInformation(artistName,title,smallDesc,bigDesc,url,img);
	musicObjects[0].setInformation("Aimer","誰か、海を","smallhoge","bighoge","https://www.amazon.co.jp/%E8%AA%B0%E3%81%8B%E3%80%81%E6%B5%B7%E3%82%92%E3%80%82EP-Aimer/dp/B00LL7N5X0/ref=sr_1_1?ie=UTF8&qid=1473739590&sr=8-1&keywords=%E8%AA%B0%E3%81%8B+%E6%B5%B7%E3%82%92",'https://images-na.ssl-images-amazon.com/images/I/51Q7vL967kL.jpg')
	musicObjects[0].setlistererPos(camera.position.x,camera.position.y,camera.position.z);
	musicObjects[0].name = musicObjects[0].getInformation().Title;;
	scene.add(musicObjects[0].setObject()); // シーンに追加
	scene.add(musicObjects[0].getLight());//オブジェクト事態を光らせるライト
	rayReceiveObjects.push(musicObjects[0]);//クリック判定に使用
	musicDistance.push(0);//距離の初期値




	musicObjects.push(new Music(0,0,0,"../sounds/sample3.mp3",spaceXYZ));
	// setInformation(artistName,title,smallDesc,bigDesc,url,img);
	musicObjects[1].setInformation("Hoge","Sample3","smallhoge","bighoge","https://www.amazon.co.jp/%E3%82%A2%E3%82%A4%E3%82%BD%E3%83%88%E3%83%8B%E3%83%83%E3%82%AF%E3%83%BB%E3%82%B5%E3%82%A6%E3%83%B3%E3%83%89-Forest%E2%80%BE%E6%A3%AE-%E5%85%89%E6%B0%B7%E6%AB%93/dp/B00005F1O2/ref=sr_1_3?ie=UTF8&qid=1473738055&sr=8-3&keywords=%E3%80%80%E6%A3%AE%E3%80%80%E3%83%92%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0",'https://images-na.ssl-images-amazon.com/images/I/51FJYQN64VL.jpg')
	musicObjects[1].setlistererPos(camera.position.x,camera.position.y,camera.position.z);
	musicObjects[1].createObject();
	scene.add(musicObjects[1].setObject()); // シーンに追加
	scene.add(musicObjects[1].getLight());//オブジェクト事態を光らせるライト
	rayReceiveObjects.push(musicObjects[1]);//クリック判定に使用
	musicDistance.push(1);//距離の初期値



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
	butterflyobject.setPositionXZ(camera.position.x,camera.position.z,musicObjects[0].x,musicObjects[0].z);
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

	var stopLine=70;

	if((-width/2+stopLine<camera.position.x && x<=0) ||(camera.position.x<width/2-stopLine && x>0)){
		camera.position.x+=x;
	}

	if((-depth/2+stopLine<camera.position.z && z<=0) ||(camera.position.z<depth/2-stopLine && z>0)){
		camera.position.z+=z;
	}

	butterflyobject.setPositionXZ(camera.position.x,camera.position.z,musicObjects[0].x,musicObjects[0].z);




	for(var i=0;i<musicObjects.length;i++){
		musicObjects[i].setlistererPos(camera.position.x,camera.position.y,camera.position.z);
		musicDistance[i]=musicObjects[i].getDistance();
		// console.log(musicDistance.indexOf(Math.min.apply(null,musicDistance)));//最小値を求める
	}

	var min=musicDistance.indexOf(Math.min.apply(null,musicDistance));
	InfoObj.writeInformation(musicObjects[min].getInformation());
	var drate=3;//この値が大きいほど、音の再生許容範囲が大きくなる(Music.jsにも同様の変数あり)
	if(musicDistance[min]<0.1*drate){
		InfoObj.translate(3*Math.log10(2-(musicDistance[min]/drate)*15));
	}

	
	var objPos = new THREE.Vector3(musicObjects[0].x,musicObjects[0].y,musicObjects[0].z);
	// console.log(musicObjects[0]);
	// console.log(camera.position);
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
	var raycaster = new THREE.Raycaster();
	// 取得したX、Y座標でrayの位置を更新
	raycaster.setFromCamera( mouse, camera );
	// オブジェクトの取得
	var intersects = raycaster.intersectObjects( scene.children );
	for(var i =0; i < intersects.length;i++){
		for(var j =0; j < musicObjects.length;j++)
		if(musicObjects[j].getObject()==intersects[i].object){
			console.log("click["+j+"]:"+musicObjects[j].getInformation().URL);
			window.open(musicObjects[j].getInformation().URL,'_blank');
		}
	}
	 


}

// export default Music;
