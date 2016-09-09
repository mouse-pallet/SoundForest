import * as THREE from 'three';

class ButterflyObject{

	constructor(){

		this.x;
		this.y;
		this.z;

		var loader = new THREE.TextureLoader();

		this.mapR = loader.load('../../images/ageha.png');
		this.mapL = loader.load('../../images/ageha.png');

		this.butterfly = new THREE.Object3D();

		this.geometryL = new THREE.PlaneGeometry( 1, 2, 1, 1 );//右羽
		this.geometryR = new THREE.PlaneGeometry( 1, 2, 1, 1 );//左羽
		this.materialL = new THREE.MeshLambertMaterial( { map: this.mapR,transparent: true,side:THREE.DoubleSide} );
		this.materialR = new THREE.MeshLambertMaterial( { map: this.mapL,transparent: true,side:THREE.DoubleSide} );
		// メッシュの作成
		this.objR = new THREE.Mesh(this.geometryR, this.materialR);
		this.objL = new THREE.Mesh(this.geometryL, this.materialL);
		this.butterfly.add(this.objR);
		this.butterfly.add(this.objL);

		this.theta;//左右反転すればいいだけなので一つ

		this.butterfly.rotation.x=-Math.PI/8;

	}

	wing(){

	}	


	getObject(){
		return this.fairy;
	}

	setPosition(x,y,z){
		// console.log("x:"+x+",y:"+y+",z:"+z);
		this.x = x;
		this.y = y;
		this.z = z;
		this.fairy.position.set(x, y, z);  // 位置を設定(x, y, z)	
	}

	setPositionXZ(cameraX,cameraZ,objX,objZ){


		var dis=Math.sqrt((cameraX-objX)*(cameraX-objX) + (cameraZ-objZ) * (cameraZ - objZ));

		var fairyX=cameraX - 5*(cameraX-objX)/dis;
		var fairyZ=cameraZ - 5*(cameraZ-objZ)/dis;


		this.fairy.position.x = fairyX;	
		this.fairy.position.z = fairyZ;	
	}

	setX(x){
		// console.log("x:"+x+",y:"+y+",z:"+z);
		this.x = x;
		this.fairy.position.x = x;	
	}

	setY(y){
		// console.log("x:"+x+",y:"+y+",z:"+z);
		this.y = y;
		this.fairy.position.y = y;	
	}

	setZ(z){
		// console.log("x:"+x+",y:"+y+",z:"+z);
		this.z = z;
		this.fairy.position.z = z;	
	}

}

export default FairyObject;