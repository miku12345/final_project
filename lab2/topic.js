var topic = 
[
    "尚未開學",
    "國定假日",
    "環境準備",
    "隨機性",
    "重複性",
    "快要開學",
    "環境準備",
    "隨機性",
    "國定假日",
    "重複性"
];

var startDate= new Date();
function setYMD(startYear,startMonth, startDay)
{
    //一次設定好月份與日期
    startDate.setFullYear(startYear);
    startDate.setMonth(startMonth-1);
    startDate.setDate(startDay);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}

function dtos(d)
{
    var str = d.getFullYear()
    str+='-';
    str+=('0' + (d.getMonth()+1)).slice(-2);
    str+='-';
    str+=('0' + d.getDate()).slice(-2);
    return str;
}

function stod(s)
{
    var date= new Date();
    var str=s.split('-');
    var y=Number(str[0]);
    var m=Number(str[1]);
    var d=Number(str[2]);
    date.setFullYear(y);
    date.setMonth(m-1);
    date.setDate(d);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
}
setYMD(startDate.getFullYear(),startDate.getMonth()+1,startDate.getDate());
