import * as THREE from 'three';

class SnowObject{

    constructor(){
        this.particlesNum = 100;
        this.dx = 0.00001;
        this.dy = 0.000008;
    }
        
    makeMaterial{         
        this.texture = THREE.ImageUtils.loadTexture("http://jsrun.it/assets/u/X/i/p/uXipB.png");

        this.material = new THREE.PointCloudMaterial({
            color: 0xFFFFFF,
            size: 0.01,
            map: this.texture,
            transparent: true
        });  
    };
    
   makeParticles{
        var px, py, pz, particle;
        
        this.particles = new THREE.Geometry();
                
        for(var i=0, len=this.particlesNum; i<len; i++) {
            px = Math.random()*1000-500;
            py = Math.random()*1000-500;
            pz = Math.random()*1000-500;
            particle = new THREE.Vector3(px, py, pz);
            particle.velocity = new THREE.Vector3(0, -Math.random(), 0);
            this.particles.vertices.push(particle);
        }
        
        this.pointCloud = new THREE.PointCloud(this.particles, this.material);
        this.pointCloud.sortParticles = true;
        
        this.scene.add(this.pointCloud);
    };
    
    Main.prototype.updateParticles = function() {
        this.pointCloud.rotation.y += this.dy;
        
        for(var i=0, len=this.particlesNum; i<len; i++) {
            var particle = this.particles.vertices[i];
            if(particle.y < -win.innerHeight) {
                particle.y = win.innerHeight;
                particle.velocity.y = -Math.random();
            }
            particle.velocity.y -= Math.random()*this.dy;
            particle.add(particle.velocity);
        }
        
        this.pointCloud.geometry.__dirtyVerticies = true;
    };

    Main.prototype.update = function() {
        this.updateParticles();
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
    }; 
    
    Main.prototype.run = function() {
        win.requestAnimationFrame = (function(){
            return win.requestAnimationFrame     ||
                win.webkitRequestAnimationFrame  ||
                win.mozRequestAnimationFrame     ||
                win.oRequestAnimationFrame       ||
                win.msRequestAnimationFrame      ||
                function(callback, element){                                                                                                                                                                 
                    win.setTimeout(callback, 1000 / 60);
                };                                                                                                                                                                                           
        })();

        
        var loop = function() {                                                                                                                                                                              
            this.update(); 
            win.requestAnimationFrame(loop);  
        }.bind(this);
        loop();
        
        
        //this.update();
    };
    
    var main = new Main();
    
})(jQuery, window, window.document);