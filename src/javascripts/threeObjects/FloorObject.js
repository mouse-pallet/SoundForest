import * as THREE from 'three';
import PlaneObject from './PlaneObject.js';

class FloorObject　extends PlaneObject{

	constructor(posX,posY,posZ){
		super(posX,posY,posZ);

		this.loader = new THREE.TextureLoader();
		this.map = this.loader.load( '../../images/green.jpg');
		this.map.wrapS = this.map.wrapT = THREE.RepeatWrapping;
		console.log(this.map);
		this.map.repeat.set( 20, 20 );

		this.geometry = new THREE.PlaneGeometry( 800, 1200, 1, 1 );
		this.material = new THREE.MeshPhongMaterial( { map: this.map,bumpMap:this.map, bumpScale: 100} )
		// メッシュの作成
		this.floor = new THREE.Mesh(this.geometry, this.material);

		this.floor.rotation.x=-Math.PI/2;
		this.floor.receiveShadow = true;//影の有効化
	}


	getObject(){
		this.floor.position.set(0,-10,-20);
		return this.floor;
	}
}




export default FloorObject;
