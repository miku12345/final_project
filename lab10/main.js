let thisButton=document.getElementsByTagName("button")[0];
let showData=document.getElementById("showData");

thisButton.addEventListener("click", loadServerData);

function loadServerData()
{
    var D=new Date();
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
    thisDate+=".txt";
    console.log(thisDate);

    console.log("Load Server Data!");
    let xmlHttpRequest;
    if(window.XMLHttpRequest)
    {
        xmlHttpRequest=new XMLHttpRequest();
    }
    else
    { 
        alert("No XMLHttpRequest!");
        return;
    }
    xmlHttpRequest.open("GET",thisDate,true);
    xmlHttpRequest.send();
    xmlHttpRequest.onreadystatechange=function()
    {
        if(xmlHttpRequest.readyState==4&&xmlHttpRequest.status==200)
        {
            showData.innerHTML=xmlHttpRequest.responseText;
            thisButton.style.visibility="hidden";
        }
    }
}
