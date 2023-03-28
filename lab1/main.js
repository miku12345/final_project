window.onload=function()
{
    //document.write("HelloJavaScript");
};

let imgarray=[
    "https://bpic.51yuansu.com/pic3/cover/01/88/84/5981ff76c771a_610.jpg",
    "https://t12.pimg.jp/091/135/542/1/91135542.jpg",
    "https://png.pngtree.com/png-clipart/20190617/original/pngtree-beginning-of-winter-winter-solstice-cartoon-dumplings-png-image_3882131.jpg",
    "https://png.pngtree.com/element_our/20190603/ourlarge/pngtree-delicious-snack-pizza-illustration-image_1461938.jpg"
];

var pnumber=-1;
$(function(){
    $("input").on("click",function()
    {
        //alert("Hi");
        var numberOfListItem = $("li").length;
        var randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        
        while(pnumber==randomChildNumber)
        {
            randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        }
        pnumber=randomChildNumber;
        $("h1").text($("li").eq(randomChildNumber).text());
        $("img").attr("src",imgarray[randomChildNumber]);
    });
});

