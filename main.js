//2,7,14
//json-server --watch db.json
var locat=
{
    "全國":"0",
    "新北市":"1",
    "台北市":"2",
    "基隆市":"3",
    "宜蘭縣":"4",
    "桃園市":"5",
    "新竹市":"6",
    "新竹縣":"7",
    "苗栗縣":"8",
    "台中市":"9",
    "彰化縣":"10",
    "南投縣":"11",
    "雲林縣":"12",
    "嘉義市":"13",
    "嘉義縣":"14",
    "台南市":"15",
    "高雄市":"16",
    "屏東縣":"17",
    "花蓮縣":"18",
    "台東縣":"19",
    "澎湖縣":"20",
    "連江縣":"21",
    "金門縣":"22"
}

var date;
var current_locat;
var thisImage;
var sdate=new Date("2020-1-11");
var edate=new Date("2023-05-17");

var choose=document.getElementById('choose');
var c_locat=document.getElementById('c_locat');
var canvas=document.getElementById("myCanvas");  
var charts=document.getElementById("myCharts"); 
var iarea=document.getElementById('iarea');
var isdate=document.getElementById('isdate');
var iedate=document.getElementById('iedate');
var down=document.getElementById("down");
//var table=document.getElementById('table');
//var tbody=document.getElementById('tbody');

$(function()
{
    /*
    $("#read").on("click", readHandler);
    $("#write").on("click", writeHandler);
    $("#update").on("click", updateHandler);
    $("#delete").on("click", deleteHandler);
    
    add.onclick=function()
    {
        writeHandler(input.value);
    };
    */
    date=new Date();
    current_locat="全國";
    c_locat.textContent=current_locat;
    set_button();
    
    set_table();
    iarea.addEventListener('change', set_table);
    isdate.addEventListener('change', set_table);
    iedate.addEventListener('change', set_table);
    
    //test();
});

function set_button()
{
    //href="data\2023-cdc-Age_County_Gender_day_19Cov_v1_全國_全區.json"
    //download="2023-cdc-Age_County_Gender_day_19Cov_v1_全國_全區"></a>
    for(var key in locat)
    {
        var b = document.createElement('button');
        b.textContent=key;
        b.onclick=function()
        {
            current_locat=this.textContent;
            c_locat.textContent=current_locat;
            down.href="data\\2023-cdc-Age_County_Gender_day_19Cov_v1_"+current_locat+"_全區.json";
            down.download="2023-cdc-Age_County_Gender_day_19Cov_v1_"+current_locat+"_全區.json";
            down.textContent="下載"+current_locat+"的表單資料(API)";
            console.log(down.href);
            console.log(down.download);
            set_table();
        };
        choose.appendChild(b);
        down.href="data\\2023-cdc-Age_County_Gender_day_19Cov_v1_"+current_locat+"_全區.json";
        down.download="2023-cdc-Age_County_Gender_day_19Cov_v1_"+current_locat+"_全區.json";
        down.textContent="下載"+current_locat+"的表單資料(API)";
    }
}

function set_table()
{
    var url="http://localhost:3000/";
    
    var t;
    if(locat[iarea.value]!=undefined)
    {
        current_locat=iarea.value
    }
    url+=locat[current_locat];

    t=isdate.value.split('-');
    
    if(t.length==3)
    {
        if(!isNaN(t[0])&&!isNaN(t[1])&&!isNaN(t[2]))
        {
            sdate=new Date(t);
        }
    }
    
    t=iedate.value.split('-');
    if(t.length==3)
    {
        if(!isNaN(t[0])&&!isNaN(t[1])&&!isNaN(t[2]))
        {
            edate=new Date(t);
        }
    }
    
    $.getJSON(url)
    .done(function(msg)
    {
        show_canvas(msg[0].a05.toString());
        //console.log(msg);
        var tbody=document.getElementById('tbody');
        tbody.remove();
        tbody=document.createElement('tbody');
        tbody.id="tbody";

        var i=0;
        var td=new Date();
        for(var v in msg)
        {
            /*
            if(i==20)
            {
                break;
            }
            */
            td=new Date(msg[i].a01);
            if(sdate<=td&&td<=edate)
            {
                var tr = document.createElement('tr');
                var td=[];
                for(var j=0;j<5;j++)
                {
                    td[j]= document.createElement('td');
                }
                td[0].textContent=msg[i].a01;
                td[1].textContent=msg[i].a02;
                td[2].textContent=msg[i].a04;
                td[3].textContent=msg[i].a05;
                td[4].textContent=msg[i].a06;

                for(var j=0;j<5;j++)
                {
                    tr.appendChild(td[j]);
                }
                tbody.appendChild(tr);
            }
            i++;
        }
        table.appendChild(tbody);
        show_chart(msg);
    })
    .fail(function(msg)
    {
        console.log("Fail!");
    });
    
}

function test()
{
    var url=[];
    var str;
    var result;
    c_locat.textContent="";
    
    for(var key in locat)
    {
        //console.log(key);
        $.get("2023-cdc-Age_County_Gender_day_19Cov_v1_"+key+"_全區.json").then(function(context)
        {
            //result=$.pareJSON(url[5]);
            
            for(var j=0;j<context.length;j++)
            {
                var p=document.createElement('div');
                p.textContent+=JSON.stringify(context[j])+",";
                c_locat.append(p);
            }
            
        })
    }
}

function show_canvas(num)
{
    var ctx=canvas.getContext("2d");
    canvas.width = num.length*60;

    thisImage=new Image();
    thisImage.src="Numbers.png";

    thisImage.onload=function() 
    {
        for(var x=0;x<num.length;x++)
        {
            if(num[x]==9)
            {
                ctx.drawImage(thisImage, num[x] *80, 0, 78, 130, 60*x, 0, 60, 100);
            }
            else
            {
                ctx.drawImage(thisImage, num[x] *80, 0, 90, 130, 60*x, 0, 60, 100);
            }
        }
    };
}

function show_chart(msg)
{
    var ctx = charts.getContext('2d');
    var data=[];
    for(var i=msg.length-1;i>=0;i--)
    {
        data.push({t:msg[i].a01,n:msg[i].a04});
    }

    
    var chart = new Chart(ctx, 
    {
        type: 'line',
        data: 
        {
            labels: data.map(x=>x.t.slice(11,16)),
            datasets: 
            [{
                label: '人數',
                data: data.map(x=>x.n),
                // ... 待會美化的部分加在這裡
                lineTension: 0,                    // 預設為把線段繪製成貝茲曲線，如果只是要用直線連接設為0即可
                backgroundColor: '#FF5376',        // 線段的背景填色
                borderColor: '#FF5376',            // 線段顏色
                fill: false,                       // 不要將線段以下的區域填色
                borderWidth: 2,                    // 減少線段的寬度(預設為3)
                // Point
                pointRadius: 5,                    // 點的半徑大小
                pointHoverRadius: 7, 
            }]
        },
        options: 
        {
            title:
            {
                display: true,                 // 顯示標題
                text: data[0].t+"至"+data[data.length-1].t+"的"+c_locat.textContent+"新增確診人數趨勢圖",   
                position: 'bottom',            // 在圖表下方顯示
                fontSize: 24,                  // 字體相關的參數           
                fontStyle: 'normal',
                fontFamily: 'Century Gothic'
            },
            legend:
            {
                display: false                 // 不顯示圖例
            },
            responsive: false    
        // ... 圖表標題和圖例在這裡修改
        }
    });
}
