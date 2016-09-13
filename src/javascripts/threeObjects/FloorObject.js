import * as THREE from 'three';
import PlaneObject from './PlaneObject.js';

class FloorObject　extends PlaneObject{

	constructor(posX,posY,posZ,spaceXYZ,width,height,rateX,rateY,img){
		super(posX,posY,posZ,spaceXYZ);

		this.loader = new THREE.TextureLoader();
		this.map = this.loader.load( img);
		this.map.wrapS = this.map.wrapT = THREE.RepeatWrapping;
		this.map.repeat.set(rateX,rateY);

		this.geometry = new THREE.PlaneGeometry( width, height, 1, 1 );
		this.material = new THREE.MeshPhongMaterial( { map: this.map,bumpMap:this.map, bumpScale: 100} )
		// メッシュの作成
		this.floor = new THREE.Mesh(this.geometry, this.material);

		this.floor.rotation.x=-Math.PI/2;
		this.floor.receiveShadow = true;//影の有効化
	}


	getObject(x,y,z){
		this.floor.position.set(x,y,z);
		return this.floor;
	}
}




export default FloorObject;
