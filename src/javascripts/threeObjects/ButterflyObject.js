import * as THREE from 'three';

class ButterflyObject{

	constructor(){
		/////いる？///
		this.x;
		this.y;
		this.z;
		////////////////

		this.countButterfly = 0;

		var loader = new THREE.TextureLoader();

		this.mapR = loader.load('../../images/wingR.png');
		this.mapR.needsUpdate;
		this.mapL = loader.load('../../images/wingL.png');
		this.mapL.needsUpdate;


		this.butterfly = new THREE.Object3D();
	        // 蝶
	        // 蝶の羽の素材を作成(PNGファイルを読み込み)
	        // var texture = new THREE.Texture(this.image);
	        this.mapR.needsUpdate = true;
	        var materialR = new THREE.MeshBasicMaterial({
	            map: this.mapR,
	            transparent: true,
	            side: THREE.DoubleSide
	        });

	        var materialL = new THREE.MeshBasicMaterial({
	            map: this.mapL,
	            transparent: true,
	            side: THREE.DoubleSide
	        });

	        // 蝶の羽を貼り付ける平面を作成
	        var wingLPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 1, 1, 1), materialR);
	        var wingRPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 1, 1, 1), materialL);
	        // 蝶の羽を作成
	        this.wingL = new THREE.Object3D();
	        this.wingR = new THREE.Object3D();
	        // 蝶の羽平面の座標や角度を調整
	        // wingLPlane.scale.x = -1;
	        wingLPlane.position.x = 0.25;
	        wingRPlane.position.x = -0.25;
	        // // 蝶の羽をコンテナーの表示リストに追加
	        this.wingL.add(wingLPlane);
	        this.wingR.add(wingRPlane);
	        this.butterfly.add(this.wingL);
	        this.butterfly.add(this.wingR);


	        this.butterfly.rotation.y = 180* (Math.PI / 180);
	        this.butterfly.rotation.x = 60* (Math.PI / 180);
	        // this.butterfly.rotation.y = 90* (Math.PI / 180);


	}

	wing(){
		// 蝶の揺らぎを設定しています
	            this.butterfly.position.y = Math.sin(this.countButterfly) * 0.2 ;

	            this.wingL.rotation.y = Math.sin(this.countButterfly) * -60 * Math.PI / 180;
	            this.wingR.rotation.y = -this.wingL.rotation.y;
	            this.countButterfly += 5 * Math.PI / 180;
	}


	getObject(){
		return this.butterfly;
	}

	setPosition(x,y,z){
		// console.log("x:"+x+",y:"+y+",z:"+z);
		this.x = x;
		this.y = y;
		this.z = z;
		this.butterfly.position.set(x, y, z);  // 位置を設定(x, y, z)
	}

	setPositionXZ(cameraX,cameraZ,objX,objZ){


		var dis=Math.sqrt((cameraX-objX)*(cameraX-objX) + (cameraZ-objZ) * (cameraZ - objZ));

		var butterflyX=cameraX - 5*(cameraX-objX)/dis;
		var butterflyZ=cameraZ - 5*(cameraZ-objZ)/dis;


		this.butterfly.position.x = butterflyX;
		this.butterfly.position.z = butterflyZ;
	}

	setX(x){
		// console.log("x:"+x+",y:"+y+",z:"+z);
		this.x = x;
		this.butterfly.position.x = x;
	}

	setY(y){
		// console.log("x:"+x+",y:"+y+",z:"+z);
		this.y = y;
		this.butterfly.position.y = y;
	}

	setZ(z){
		// console.log("x:"+x+",y:"+y+",z:"+z);
		this.z = z;
		this.butterfly.position.z = z;
	}

	setRotationY(ry){
		this.butterfly.rotation.y = ry;
	}

	// * @param {THREE.Vector3} objPos 開始点
	//  * @param {THREE.Vector3} lisPos 終了点
	setRotation(objPos,lisPos){//オブジェクトとリスナーの位置(カメラの位置)から回転角度を取得
		var objVec = objPos.clone();
		var lisVec = lisPos.clone();
		var pVec = new THREE.Vector3(objPos.x,0,0);//objのxベクトル
		var pobjVec = new THREE.Vector3();//pVec-objVec
		var lisobjVec = new THREE.Vector3();//lisVec-objVec

		// console.log(objPos);
		// console.log(objVec);
		pobjVec = pobjVec.subVectors(pVec,objVec);
		lisobjVec= lisobjVec.subVectors(lisVec,objVec);
		// console.log(pobjVec);

		// // ２つのベクトルの回転軸
		// var axis = objVec.clone().cross(lisVec);
		// // 軸ベクトルを単位ベクトルに
		// axis.normalize();

		// ２つのベクトルのなす角度
		var angle = pobjVec.angleTo(lisobjVec);
		
		if(objPos.x>lisPos.x){
			this.butterfly.rotation.y = angle;
			// console.log("angle:"+(angle*180/(Math.PI)));
		}else{
			this.butterfly.rotation.y = -angle;
			// console.log("angle:"+(-angle*180/(Math.PI)));
		}

	}

}

export default ButterflyObject;
