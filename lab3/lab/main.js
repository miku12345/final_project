$(function ()
{
    var currentQuiz = null;
    $("#startButton").on("click",function(){

        if(currentQuiz==null)
        {
            currentQuiz=0;
            $("#question").text(questions[currentQuiz]);
            $("#options").empty();
            for(var i=1;i<=5;i++)
            {
                $("#options").append(`<input name='options' type='radio' value='${i}'><label>${i}</label><br><br>`);
                  
            }
            $("#startButton").attr("value","Next");
        }
        else
        {
            if(currentQuiz==29)
            {
                var noclick=0;
                $.each($(":radio"),function(i,val){
                    if(val.checked)
                    {
                        point[currentQuiz]=i+1;
                        console.log(point[currentQuiz]);
                        currentQuiz=null;
                        return false;
                    }
                    else
                    {
                        noclick+=1;
                    }
                    
                });
                if(noclick==5)
                {
                    alert("請選擇")
                }

                $("#question").text("最終結果");
                $("#options").empty();
                var p=[0,0,0,0,0];
                p[0]=point[4]+point[9]+point[13]+point[17]+point[23]+point[29];
                p[1]=point[2]+point[5]+point[12]+point[19]+point[21]+point[28];
                p[2]=point[1]+point[7]+point[14]+point[16]+point[24]+point[27];
                p[3]=point[0]+point[6]+point[10]+point[15]+point[20]+point[25];
                p[4]=point[3]+point[8]+point[11]+point[18]+point[22]+point[26];
                for(var i=0;i<5;i++)
                {
                    $("#options").append(`<div>分數--> ${p[i]}  ${finalAnswers[i]}</div><br><br>`);
                }
                currentQuiz=null;
                $("#startButton").attr("value","重新開始");
            }
            else
            {
                var noclick=0;
                $.each($(":radio"),function(i,val){
                    if(val.checked)
                    {
                        point[currentQuiz]=i+1;
                        console.log(point[currentQuiz]);
                        currentQuiz+=1;
                        //顯示新的題目
                        $("#question").text(questions[currentQuiz]);
                        $("#options").empty();
                        for(var i=1;i<=5;i++)
                        {
                            $("#options").append(`<input name='options' type='radio' value='${i}'><label>${i}</label><br><br>`);
                        }
                        return false;
                    }
                    else
                    {
                        noclick+=1;
                    }
                    
                });
                if(noclick==5)
                {
                    alert("請選擇")
                }
            }
        }

    });
});