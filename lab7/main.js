var ctx, thisImage;
var color;
$(function(){
    $("[type='date']").on("change",showDate);
    $("[type='color']").on("change",change_color);
    ctx=$("#myCanvas")[0].getContext("2d");
    showDate();
});

function showDate()
{
    var thisDate
    if(this.value==null)
    {
        //console.log("0");
        var D=new Date();
        //console.log(thisDate);
        //console.log(D.getFullYear());
        //console.log(D.getMonth()+1);
        //console.log(D.getDate());
        //console.log(Math.round((D.getMonth()+1)/10));
        thisDate=""+D.getFullYear();
        if(Math.trunc((D.getMonth()+1)/10)==0)
        {
            thisDate+='0'
            thisDate+=(D.getMonth()+1);
        }
        else
        {
            thisDate+=(D.getMonth()+1);
        }
        if(Math.trunc(D.getDate()/10)==0)
        {
            thisDate+="0"+D.getDate();
        }
        else
        {
            thisDate+=D.getDate();
        }
        
        
    }
    else
    {
        //console.log("1");
        thisDate=this.value;
        
    }
    thisDate=thisDate.replace(/-/g,"");
    //console.log(thisDate);
    thisImage=new Image();
    thisImage.src="flipClockNumbers.png";



    thisImage.onload=function() 
    {
        for(var x=0;x<thisDate.length;x++)
        {
            ctx.drawImage(thisImage, thisDate[x] *80, 0, 90, 130, 60*x, 0, 60, 100);
            if(color!=null)
            {
                //var imgData = ctx.getImageData(0, 0, 60, 60);
                //var data = imgData.data;
                /*
                for(var i = 0; i < data.length; i += 4)
                {
                    //利用回圈將顏色全部替換
                      // red
                    if(data[i]>=200&&data[i+1]>=200&&data[i+2]>=200)
                    {
                        data[i] = 255;
                      // green
                        data[i + 1] = 0;
                      // blue
                        data[i + 2] = 0;
                    }
                }
                ctx.putImageData(imgData,0,0)
                */
            }
        }
    };
}
function change_color()
{
    color=this.value;
    console.log(color);
    document.body.style.backgroundColor = color;
}
