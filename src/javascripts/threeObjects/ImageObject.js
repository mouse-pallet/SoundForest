import * as THREE from 'three';
import PlaneObject from './PlaneObject.js';

class ImageObject　extends PlaneObject{

	constructor(posX,posY,posZ,spaceXYZ,sizeX,sizeY,img){
		super(posX,posY,posZ,spaceXYZ);

		this.loader = new THREE.TextureLoader();
		this.map = this.loader.load( img);

		this.geometry = new THREE.PlaneGeometry( sizeX,sizeY, 1, 1 );
		this.material = new THREE.MeshBasicMaterial( { map: this.map,transparent: true,side:THREE.DoubleSide,depthWrite: false,blending:THREE.NoBlending} );
		// メッシュの作成
		this.imgObj = new THREE.Mesh(this.geometry, this.material);

	}


	getObject(){

		this.imgObj.position.set(this.x, this.y, this.z);
		return this.imgObj;
	}
}




export default ImageObject;
