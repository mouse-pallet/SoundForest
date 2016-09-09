import * as THREE from 'three';

class PlaneObject{

	constructor(posX,posY,posZ,spaceXYZ){
		this.x = posX;
		this.y = posY;
		this.z = posZ;


		//空間設定
    	// this.width = spaceXYZ[0]/2;//画面幅
    	// this.height = spaceXYZ[1]/2;//画面高さ
    	// this.depth = spaceXYZ[2]/2;

    	this.width = 300;//画面幅
    	this.height = 300;//画面高さ
    	this.depth = 300;
	}

	createObject(){

		this.geometry = new THREE.CylinderGeometry(0, 10, 30,20,20,true); // サイズ設定（x, y, z）
		// マテリアルの作成
		this.material = new THREE.MeshPhongMaterial({color: 'green'});
		// メッシュの作成
		this.cube = new THREE.Mesh(this.geometry, this.material);
		
		this.cube.position.set(this.x, this.y, this.z);
		this.cube.castShadow = true;
	}	

	// setMusic(music){
	// 	this.music=music;
	// }

	setImage(img){
		this.img= img;
	}

	setColor(color){

		this.material = new THREE.MeshPhongMaterial({color: color});
		this.cube = new THREE.Mesh(this.geometry, this.material);
		this.cube.position.set(this.x, this.y, this.z);

	}



	getObject(){
		return this.cube;
	}

	setPosition(x,y,z){
		this.cube.position.set(x, y, z);  // 位置を設定(x, y, z)	
	}

}

export default PlaneObject;