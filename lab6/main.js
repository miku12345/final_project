var video_list=["sample-mp4-file.mp4","【赤井心】心廚房之第一次的鬆餅.mp4","【VT翻譯系列】はあちゃま廚房主題曲【赤井はあと】.mp4","【魔乃アロエ】ハッピーシンセサイザ（中日字幕）【Vtuber歌枠】.mp4"]
var num,volume,rate;
$(function(){
    num=0;
    volume=1;
    rate=1;
    $("#myAudio").attr("src","海願.mp3");
    document.getElementById("myAudio").loop=true;
    $("#myVideo").attr("src",video_list[num]);
    $("#myVideo")[0].volume=volume;
    $("#myVideo")[0].playbackRate=rate;
    $("#playBtn").on("click",function(){
        $("#volumeDisplay").text($("#myVideo")[0].volume.toFixed(2));
        $("#rateDisplay").text($("#myVideo")[0].playbackRate.toFixed(2));
        $("#progressBar")[0].max =$("#myVideo")[0].duration
        if($("#myVideo")[0].paused)
        {
            $("#myVideo")[0].play();
            $("#playBtn").text("Pause");
        }
        else
        {
            $("#myVideo")[0].pause();
            $("#playBtn").text("Play");
        }
    });
    $("#play_audio").on("click",function(){
        if($("#myAudio")[0].paused)
        {
            $("#myAudio")[0].play();
            $("#play_audio").text("Pause audio");
        }
        else
        {
            $("#myAudio")[0].pause();
            $("#play_audio").text("Play audio");
        }
    });
    $("#fullBtn").on("click",function(){
        $("#myVideo")[0].webkitEnterFullscreen();
    });
    $("#lowerVolumeBtn").on("click", downVolume);
    $("#higherVolumeBtn").on("click", upVolume);
    $("#lowerRate").on("click", downRate);
    $("#higherRate").on("click", upRate);

    $("#myVideo").on("timeupdate",updateProgress);
    $("#progressBar").on("change",changeProgress);
    $("#next").on("click",function(){
        $("#myVideo")[0].pause();
        $("#playBtn").text("Play");
        num+=1;
        num%=4;
        $("#myVideo").attr("src",video_list[num]);
        $("#myVideo")[0].volume=volume;
        $("#myVideo")[0].playbackRate=rate;
    })
});

function downVolume()
{
    varmyVideo=$("#myVideo")[0];
    if(myVideo.volume==0) 
    {

    } 
    else if(myVideo.volume<0.1) 
    {
        myVideo.volume=0;
    } 
    else
    {
        myVideo.volume=myVideo.volume-0.1;
    }
    volumeDisplay.innerHTML=myVideo.volume.toFixed(2);
    volume=myVideo.volume;
}

function upVolume() 
{
    varmyVideo=$("#myVideo")[0];
    if(myVideo.volume==1) 
    {

    } 
    else if(myVideo.volume>0.9) 
    {
        myVideo.volume=1;
    } 
    else
    {
        myVideo.volume=myVideo.volume+0.1;
    }
    volumeDisplay.innerHTML=myVideo.volume.toFixed(2);
    volume=myVideo.volume;
}

function downRate()
{
    varmyVideo=$("#myVideo")[0];
    if(myVideo.playbackRate==0.25) 
    {

    }
    else
    {
        myVideo.playbackRate=myVideo.playbackRate-0.25;
    }
    rateDisplay.innerHTML=myVideo.playbackRate.toFixed(2);
    rate=myVideo.playbackRate;
}

function upRate() 
{
    varmyVideo=$("#myVideo")[0];
    if(myVideo.playbackRate==2) 
    {

    }
    else
    {
        myVideo.playbackRate=myVideo.playbackRate+0.25;
    }
    rateDisplay.innerHTML=myVideo.playbackRate.toFixed(2);
    rate=myVideo.playbackRate;
}

function updateProgress()
{
    $("#timeDisplay").text(Math.floor($("#myVideo")[0].currentTime));
    $("#timeDisplay").append(`/${Math.floor($("#myVideo")[0].duration)}秒`);
    $("#progressBar")[0].value =$("#myVideo")[0].currentTime;
}

function changeProgress()
{
    $("#myVideo")[0].currentTime=$("#progressBar")[0].value;
}
