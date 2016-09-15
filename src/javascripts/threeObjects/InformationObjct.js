//シングルトン

class InformationObjct{
	
	constructor(canvasID,artistNameID,titleID,smallDescID,bigDescID){//Idから取得した値
		this.canvas = document.getElementById('layer4');
		this.artistName = document.getElementById("ArtistName").appendChild(document.createTextNode(""));
		this.title = document.getElementById("Title").appendChild(document.createTextNode(""));
		this.smallDesc = document.getElementById("smallDec").appendChild(document.createTextNode(""));
		this.bigDesc = document.getElementById("bigDec").appendChild(document.createTextNode(""));
		this.canvas.style.color = "rgba(" + [0,0,0, 0] + ")";
	}

	// setInformation(artistName,title,smallDesc,bigDesc,url,img){
	// 	this.artistName = artistName;		
	// 	this.title = title;
	// 	this.smallDesc = smallDesc;	
	// 	this.bigDesc =bigDesc;	
	// 	this.url = url;
	// 	this.img = img;
	// }

	// setInformation(info){
	// 	this.artistName = info.artistName;		
	// 	this.title = info.title;
	// 	this.smallDesc = info.smallDesc;	
	// 	this.bigDesc =info.bigDesc;	
	// 	this.url = info.url;
	// 	this.img = info.img;
	// }

	writeInformation(info){
		this.artistName.nodeValue = info.ArtistName;		
		this.title.nodeValue = info.Title;
		this.smallDesc.nodeValue = info.SmallDesc;	
		this.bigDesc.nodeValue = info.BigDesc;
		// console.log("bigDesc"+info.SmaDesc);
		// console.log("bigDesc"+info.bigDesc);	
	}

	getImgurl(){
		return this.img;
	}


	translate(alpha){
		// console.log("alpha:"+alpha);
		this.canvas.style.color = "rgba(" + [255,255, 255, alpha] + ")";
		this.canvas.style.backgroundColor = "rgba(" + [0,0, 0, alpha] + ")";

		console.log("layer4:",this.canvas);

	}


	visible(){
		this.canvasID.hidden = false;
	}

	unvisible(){
		this.canvasID.hidden = true;
	}


	// setMovie(movieURL){
	// 	this.movieURL = movieURL;
	// }

	// setImae(imageURL){
	// 	this.imageURL = imageURL;
	// }
}

export default InformationObjct;