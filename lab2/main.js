window.onload=function()
{
    //document.write("HelloJavaScript");
    $("#date").val(dtos(startDate));
    
};


function settable()
{
    $("#courseTable").html('');
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
    var topicCount = topic.length;
    let millisecsPerDay = 24*60*60*1000;
    for(var x=0;x<topicCount;x++)
    {
        var newd=new Date(startDate.getTime()+7*x*millisecsPerDay);
        if(topic[x]=="國定假日")
        {
            $("#courseTable").append(
                "<tr id =\"t2\">"+
                `<td>${x+1}</td>`+
                //`<td>${(new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString()}</td>`+
                //{ weekday:"long", year:"numeric", month:"short", day:"numeric"}
                `<td>${(newd).toLocaleDateString('zh-TW', {year:"numeric", month:"short", day:"numeric"})}</td>`+
                `<td>${topic[x]}</td>`+
                "</tr>");
        }
        else{
            if(x%2==0)
            {
                $("#courseTable").append(
                "<tr id =\"t1\">"+
                `<td>${x+1}</td>`+
                //`<td>${(new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString()}</td>`+
                //{ weekday:"long", year:"numeric", month:"short", day:"numeric"}
                `<td>${(newd).toLocaleDateString('zh-TW', {year:"numeric", month:"short", day:"numeric"})}</td>`+
                `<td>${topic[x]}</td>`+
                "</tr>");
            }
            else
            {
                $("#courseTable").append(
                "<tr>"+
                `<td>${x+1}</td>`+
                //`<td>${(new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString()}</td>`+
                //{ weekday:"long", year:"numeric", month:"short", day:"numeric"}
                `<td>${(newd).toLocaleDateString('zh-TW', {year:"numeric", month:"short", day:"numeric"})}</td>`+
                `<td>${topic[x]}</td>`+
                "</tr>");
            }
        }
    }
}

$(function()
{
    
    settable();
    $("#button").on("click",function()
    {
        var dateControl = document.querySelector('#date');
        //dateControl.value = '2017-06-01';
        startDate = stod(dateControl.value);
        //document.write(dateControl.value);
        //console.log(dateControl.value); // prints "2017-06-01"
        //console.log(dateControl.valueAsNumber);
        settable();
    });

    $("#button2").on("click",function()
    {
        var newp=document.querySelector('#newp');
        topic.push(newp.value);
        newp.value="";
        settable();
    });

    
})


