let serch=document.getElementById("serch");
$(function()
{
    $("button").on("click",loadServerData);
});

function loadServerData()
{
    var str="";
    if(serch.value=="")
    {
        str="https://api.chucknorris.io/jokes/random";
    }
    else
    {
        str="https://api.chucknorris.io/jokes/search?query="+serch.value;
    }
    $.getJSON(str)
        .done(function(data) 
        {
            console.log("Success");
            if(serch.value=="")
            {
                str=data.value;
            }
            else if(data.total==0)
            {
                str="沒有笑話"
            }
            else
            {
                str="";
                for(var i=0;i<data.total;i++)
                {
                    str+=+i.toString()+": "+data.result[i].value+"\n\n";
                }
            };           
            $("#showData").text(str);
        })
            .fail(function()
            {
                console.log("Error");
            })
                .always(function()
                {
                    console.log("Always");
                });
}