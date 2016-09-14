import PlaneObject from './PlaneObject.js';
// import InformationObjct from './InformationObjct.js';
import * as THREE from 'three';

class Music extends PlaneObject{

    	constructor(posX,posY,posZ,music,spaceXYZ) {
        		super(posX,posY,posZ,spaceXYZ);

            //オブジェクト
            this.musicObject;
            this.geometry;
            this.material;

            //音源操作
        		this.music=music;
        		this.AudioContext = window.AudioContext || window.webkit.AudioContext;
        		this.audioCtx = new AudioContext();
        		this.panner = this.audioCtx.createPanner();
        		this.listener = this.audioCtx.listener;
            this.panner.setPosition(posX/this.width,posY/this.height,posZ/this.depth);//音源の位置を設定
            this.gainNode = this.audioCtx.createGain();//音量調整
           

      }


      setInformation(artistName,title,smallDesc,bigDesc,url,img){
        this.info={ArtistName:artistName,Title:title,SmallDesc:smallDesc,BigDesc:bigDesc,URL:url,Image:img};
      }

      getInformation(){
         return this.info;
      }

      createMesh(){


            // this.geometry = new THREE.SphereGeometry(10, 300,300 ); // サイズ設定（x, y, z）
            // マテリアルの作成
            this.geometry = new THREE.BoxGeometry(10, 10,10 );

            this.loader = new THREE.TextureLoader();
            // this.map = this.loader.load( '../../images/starsky.jpg');
            this.map=this.loader.load(this.info.Image);
            // this.material = new THREE.MeshBasicMaterial({map:this.map,transparent: true,opacity : 1,side: THREE.DoubleSide,depthWrite: false});
            this.material = new THREE.MeshBasicMaterial({map:this.map,emissive:'white'});
            // メッシュの作成
            this.musicObject = new THREE.Mesh(this.geometry, this.material);
            this.musicObject.position.set(this.x, this.y, this.z);
            this.musicObject.castShadow = true;
            this.musicObject.rotation.z=-45*(Math.PI/180);


      }

      rollingObject(){
        this.musicObject.rotation.y+=0.001;
        // this.musicObject.rotation.z+=0.001;

      }

      getLight(){
        this.light = new THREE.PointLight( 0xff00ff, 20, 20 );  // 白、強さ5、距離100まで減衰
        this.light.position.set( this.x, 10, this.z);
        return this.light;
      }

      setObject(){
        // this.analyzeSound();
        this.createMesh();
      	this.setProperty();
      	this.getData();

      	return　this.musicObject;
      }

      getObject(){
        return　this.musicObject;
      }


      setProperty(){
            this.panner.panningModel = 'HRTF';
            this.panner.distanceModel = 'inverse';
            this.panner.refDistance = 1;
            this.panner.maxDistance = 100;
            this.panner.rolloffFactor = 1;
            this.panner.coneInnerAngle = 360;
            this.panner.coneOuterAngle = 0;
            this.panner.coneOuterGain = 0;
            this.panner.setOrientation(1,0,0);

            this.listener.dopplerFactor = 1;
            this.listener.speedOfSound = 343.3;
            this.listener.setOrientation(0,0,-1,0,1,0);//最初の方向が鼻の向いている方向、後半が脳天の方向

      }


      getDistance(){
            var lx=this.listener.positionX.value;
            // var ly=this.listener.positionY.value;
            var lz=this.listener.positionZ.value;
            var px=this.panner.positionX.value;
            // var py=this.panner.positionY.value;
            var pz=this.panner.positionZ.value;
            var distanse=Math.sqrt((lx-px)*(lx-px)+(lz-pz)*(lz-pz));
            return distanse;

      }

      manageVolume(){
            var drate=1;//この値が大きいほど、音の再生許容範囲が大きくなる

            //音源と　リスナーとの距離を知る。
            var distanse = this.getDistance();
            if(distanse<=0.1*drate){
              if(this.audioCtx.state=='suspended'){
                this.audioCtx.resume();
                // this.info.visible();
              }
              this.gainNode.gain.value =20*Math.log10(2-(distanse/drate)*10);
              // this.info.translate(3*Math.log10(2-(distanse/drate)*20));
              // this.info.draw();

            }
            else if(distanse>0.1*drate){
              this.gainNode.gain.value=0;
              this.audioCtx.suspend();
              // this.info.unvisible();

            }
          }

          //リスナーの位置を設定
      setlistererPos(lposX,lposY,lposZ){
          	this.listener.setPosition(lposX/this.width,lposY/this.height,lposZ/this.depth);
            this.manageVolume();//リスナーの位置によって、音の出力を調整する。
      }

      //音源の位置を設定
      setpannerPos(pposX,pposY,pposZ){
      	this.panner.setPosition(pposX/this.width,pposY/this.height,pposZ/this.depth);
            super.setPosition(pposX,pposY,pposZ);//オブジェクトの位置も変更
      }


      getData() {
      	this.source = this.audioCtx.createBufferSource();
      	var request = new XMLHttpRequest();

      	request.open('GET', this.music, true);
      	request.responseType = 'arraybuffer';

    	  request.onload = () => {
      		var audioData = request.response;
      		console.log(audioData);
      		this.audioCtx.decodeAudioData(audioData, (buffer) =>{

    			var myBuffer = buffer;
    			this.source.buffer = myBuffer;

    			this.source.connect(this.panner);
    			this.panner.connect(this.audioCtx.destination);
          this.source.connect(this.gainNode);
          this.gainNode.connect(this.audioCtx.destination);
          // this.source.connect(this.analyser);
          // this.analyser.connect(this.audioCtx.destination);

          this.source.start(0);
          this.source.loop=true;
          this.manageVolume();
        },
        function(e){"Error with decoding audio data" + e.err});

      	}

      	request.send();
      }

      mouseover(){

        this.musicObject.scale.set(1.2,1.2,1.2);  


      }

      mouseout(){

        this.musicObject.scale.set(1/1.2,1/1.2,1/1.2);  


      }

      // play(){
      // 	// this.source.start(0);
      //   this.source.start(0);
      //   this.flag=1;
      // }

      // stop(){
      // 	this.source.stop(0);
      //   this.flag=0;
      // }

}

export default Music;
