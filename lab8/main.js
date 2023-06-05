$(function()
{
    $("[type='checkbox']").on("change",updateProgress);
    $("progress").attr("min",0);
    $("progress").attr("max", $("[type='checkbox']").length);
    $("progress").attr("value", 0);
});

function updateProgress()
{
    let hasChecked=0;
    for(let x=0;x<$("[type='checkbox']").length;x++)
    {
        var u=$("[type='checkbox']")[x];
        var v=$("span")[x];
        if(u.checked)
        {
            hasChecked+=1;
            v.style.color="gray";
            v.className="t0";
            console.log(v.class)
        }
        else
        {
            v.className="t1";
            v.style.color = "black";
        }
    }
    $("progress").attr("min",0);
    $("progress").attr("max", $("[type='checkbox']").length);
    $("progress").attr("value", hasChecked);
}