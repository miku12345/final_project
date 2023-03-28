var mapArray, ctx, currentImgMain;
var imgMountain, imgMain, imgEnemy;
var test;
var killed=0;
//mapArray-決定地圖中每個格子的元素
//ctx-HTML5Canvas用
//currentImgMainX, currentImgMainY-決定主角所在座標
//imgMountain,imgMain,imgEnemy-障礙物,主角,敵人的圖片物件

function getRandomInt(max)
{
    return Math.floor(Math.random() * max);
}

function loadImages(sources, callback)
{
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
      numImages++;
    }
    for(var src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if(++loadedImages >= numImages) {
          callback(images);
        }
      };
      images[src].src = sources[src];
    }
}

function dfs(x,y)
{
    if(x==15&&y==15)
    {
        return true;
    }

    test[y][x]=1;
    var t=[[-1,0],[1,0],[0,-1],[0,1]]
    var ty=0,tx=0;
    var tt=false;

    for(var i=0;i<4;i++)
    {
        ty=y+t[i][0];
        tx=x+t[i][1];
        if(ty<16&&ty>=0&&tx<16&&tx>=0)
        {
            if(test[ty][tx]==0&&mapArray[ty][tx]!=1)
            {
                tt=tt||dfs(tx,ty);
            }
        }
    }
    test[y][x]=0;
    
    return tt;
    
}

const gridLength = 40;
//網頁載入完成後初始化動作
$(function()
{
     //0-可走,1-障礙,2-敵人,3-終點
    mapArray = [];
    test = [];
    for(var i=0;i<16;i++)
    {
        var vec=[]
        for(var j=0;j<16;j++)
        {
            vec.push(0);
        }
        test.push(vec);
    }
    
    while(true)
    {
        mapArray = [];
        for(var i=0;i<16;i++)
        {
            var vec=[]
            for(var j=0;j<16;j++)
            {
                vec.push(getRandomInt(3));
            }
            mapArray.push(vec);
        }
        mapArray[0][0]=0;
        mapArray[15][15]=3;

        if(dfs(0,0))
        {
            break;
        }
    }
    

    ctx = $("#myCanvas")[0].getContext("2d");
    imgMain = new Image();
    imgMain.src="images/spriteSheet.png";
    currentImgMain={"x":0,"y":0};

    imgMain.onload = function()
    {
        ctx.drawImage(imgMain,0,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    };

    
    var sources = {
        Mountain: "images/material.png",
        Enemy: "images/Enemy.png"
    };

    loadImages(sources, function(images) {
        for(var x in mapArray)
        {
            for(var y in mapArray[x])
            {
                if(mapArray[x][y]==1)
                {
                    ctx.drawImage(images.Mountain,32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                }
                else if(mapArray[x][y]==2)
                {
                    ctx.drawImage(images.Enemy,7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
                }
            }
        }
    });
    
      

});


//處理使用者按下按鍵
$(document).on("keydown",function(event)
{
    let targetImg,targetBlock,cutImagePositionX;
    //cutImagePositionX-決定主角臉朝向哪個方向
    targetImg=
    {
        //主角的目標座標
        "x":-1,"y":-1
    };

    targetBlock=
    {
        //主角的目標(對應2維陣列)
        "x":-1,"y":-1
    }

    event.preventDefault();
    //避免鍵盤預設行為發生，如捲動/放大/換頁...
    //判斷使用者按下什麼並推算目標座標

    switch(event.code)
    {
        case"ArrowLeft":
            targetImg.x=currentImgMain.x-gridLength;
            targetImg.y=currentImgMain.y;
            cutImagePositionX=175;
            //臉朝左
            break;
        case"ArrowUp":
            targetImg.x=currentImgMain.x;
            targetImg.y=currentImgMain.y-gridLength;
            cutImagePositionX=355;
            //臉朝上
            break;
        case"ArrowRight":
            targetImg.x=currentImgMain.x+gridLength;
            targetImg.y=currentImgMain.y;
            cutImagePositionX=540;
            //臉朝右
            break;
        case"ArrowDown":
            targetImg.x=currentImgMain.x;
            targetImg.y=currentImgMain.y+gridLength;
            cutImagePositionX=0;
            //臉朝下
            break;
        default:
            //其他按鍵不處理
            return;
    }

    //確認目標位置不會超過地圖
    if(targetImg.x<=600&&targetImg.x>=0&&targetImg.y<=600&&targetImg.y>=0)
    {
        targetBlock.x=targetImg.y/gridLength;
        targetBlock.y=targetImg.x/gridLength;
    }
    else
    {
        targetBlock.x=-1;
        targetBlock.y=-1;
    }
    //清空主角原本所在的位置
    ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength);

    if(targetBlock.x!=-1&&targetBlock.y!=-1)
    {
        switch(mapArray[targetBlock.x][targetBlock.y])
        {
            case 0:
                //一般道路(可移動)
            $("#talkBox").text("");
                currentImgMain.x=targetImg.x;
                currentImgMain.y=targetImg.y;
                break;
            case 1:
                //有障礙物(不可移動)
                $("#talkBox").text("有山");
                break;
            case 2:
                //敵人(可移動)
                killed+=1;
                currentImgMain.x=targetImg.x;
                currentImgMain.y=targetImg.y;
                $("#talkBox").text("Killed Enemy"+killed);
                break;
            case 3:
                //終點(可移動)
                $("#talkBox").text("抵達終點");
                currentImgMain.x=targetImg.x;
                currentImgMain.y=targetImg.y;
                break;
            
        }
    }
    else
    {
        $("#talkBox").text("邊界");
    }
    
    //重新繪製主角
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);

});
