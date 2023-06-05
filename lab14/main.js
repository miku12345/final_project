var input=document.getElementById('input');
var add=document.getElementById('add');
//var table=document.getElementById('table');
//var tbody=document.getElementById('tbody');
$(function()
{
    /*
    $("#read").on("click", readHandler);
    $("#write").on("click", writeHandler);
    $("#update").on("click", updateHandler);
    $("#delete").on("click", deleteHandler);
    */
    add.onclick=function()
    {
        writeHandler(input.value);
    };
    readHandler();
});

function readHandler()
{
    //let url="http://localhost:3000/to-do";
    var url="https://my-json-server-db.azurewebsites.net/to-do"
    $.getJSON(url)
    .done(function(msg)
    {
        //console.log(msg);
        var tbody=document.getElementById('tbody');
        tbody.remove();
        tbody=document.createElement('tbody');
        tbody.id="tbody";
        var i=0;
        for(var v in msg)
        {
            var tr = document.createElement('tr');
            var td=[];
            var button=[];
            tr.className=msg[i].id.toString();
            for(var j=0;j<4;j++)
            {
                td[j]= document.createElement('td');
            }
            td[0].innerHTML=i;
            td[1].innerHTML=msg[i].task;

            button[0]=document.createElement('button');
            button[1]=document.createElement('button');
            button[0].innerHTML="Updata";
            button[1].innerHTML="Delete";
            button[0].onclick=function()
            {
                console.log(this.parentNode.parentNode.className);
                updateHandler(this.parentNode.parentNode.className,input.value);
            };
            button[1].onclick=function()
            {
                deleteHandler(this.parentNode.parentNode.className);
            };
            td[2].appendChild(button[0])
            td[3].appendChild(button[1])

            for(var j=0;j<4;j++)
            {
                tr.appendChild(td[j]);
            }
            tbody.appendChild(tr);
            i++;
        }
        table.appendChild(tbody);
    })
    .fail(function(msg)
    {
        console.log("Fail!");
    });
    
}

function updateHandler(n,s) 
{
    let url="http://localhost:3000/to-do/"+n.toString();
    var s='task='+s;
    $.ajax(
    {
        url:url,
        type:'PUT',
        data:s,
        success:function(data)
        {
            //console.log(data);
            readHandler();
        }
    });
    
}

function writeHandler(s) 
{
    let url="http://localhost:3000/to-do";
    $.post(url,
    {
        task:s
    })
    .done(function(msg)
    {
        //console.log(msg);
        readHandler();
    })
    .fail(function(msg) 
    {
        console.log("Fail!");
    });
}

function deleteHandler(n) 
{
    let url="http://localhost:3000/to-do/"+n.toString();
    $.ajax(
    {
        url: url,
        type: 'DELETE',
        success: function(data) 
        {
            //console.log(data);
            readHandler();
        }
    });
}

