import $ from "jquery";

var images=[];
var cnt;

export function ModalWindow(imgArray){

    for(var i=0; i<imgArray.length;i++){
        images.push(imgArray[i]);
        console.log("images",images[i]);
    }

    cnt=0;//メソッドが呼ばれるたびに初期化

	console.log("modal");
      console.log($("body"));
      	$("body").append('<img id="modal-main" src='+images[0]+'></img>');
        // $("body").append('<div id="modal-main"></div>');
        $("body").append('<div id="modal-bg"></div>');
        // $("#modal-main").append('<img id="modal-img" src="images/keyboadInput.jpg"></img>');


        //css編集
        $("#modal-main").css({"display": "none",
		　　"width": "75%",
		　　"height": "75%",
		　　"margin": 0,
		　　"padding": 0,
		　　"background-color": "#ffffff",
		　　"color": "#666666",
		　　"position":"fixed",
		　　"z-index": 6});

        $("#modal-bg").css({
        	"display":"none",
		　　"width":"100%",
		　　"height":"100%",
		　　"background-color": "rgba(0,0,0,0.8)",
		　　"position":"fixed",
		　　"top":0,
		　　"left":0,
		　　"z-index": 5,
        });
 
    //画面中央を計算する関数を実行
    modalResize();
 
    //モーダルウィンドウを表示
    $("#modal-bg,#modal-main").fadeIn("slow");

        
 
    //画面のどこかをクリックしたらモーダルを閉じる
    $("#modal-bg,#modal-main").click(function(){
        if(cnt==imgArray.length-1){
            $("#modal-main,#modal-bg").fadeOut("slow",function(){
          //挿入した<div id="modal-bg"></div>を削除
                $('#modal-bg').remove() ;
                $('#modal-main').remove() ;
            });
        }else{
            //画像を変える
            // console.log("modal",document.getElementById("modal-main").src);
            //画像番号を進める
            if(cnt<imgArray.length-1){cnt++;}
            $("#modal-main").fadeOut("slow",function(){
                document.getElementById("modal-main").src=images[cnt];
                $("#modal-main").fadeIn("slow");
            });
              
            //画像を切り替える
            
        }

    });
        
 
    //画面の左上からmodal-mainの横幅・高さを引き、その値を2で割ると画面中央の位置が計算できます
        $(window).resize(modalResize);
        function modalResize(){
 
            var w = $(window).width();
            var h = $(window).height();
 
            var cw = $("#modal-main").outerWidth();
            var ch = $("#modal-main").outerHeight();

            // var iw = $("#modal-img").outerWidth();
            // var ih = $("#modal-img").outerHeight();

            console.log("left:"+((w - cw)/2));
            console.log("top:"+((h - ch)/2));
 
        //取得した値をcssに追加する
            $("#modal-main").css({
                "left": ((w - cw)/2) + "px",
                "top": ((h - ch)/2) + "px"
            });

            // $("#modal-img").css({
            //     "left": ((w - iw)/2) + "px",
            //     "top": ((h - ih)/2) + "px"
            // });

            $("#blank1").css({
                "width": ((w - cw)/2)-10 + "px",
                // "top": ((h - ch)/2) + "px"
            });
        }
}
