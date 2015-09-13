//WHITE BACKGROUND
function whiteBack()
{
    var c = document.getElementById("canvas1");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle="#FFFFFF";
    ctx.fillRect(0,0,500,500); 
}    
//Global variables
//x and y are coordinates used for mouse detection
var y = 0;
var x = 0;
var globalColorStopColors = [];
var x0l = 0;
var y0l = 0;
var x1l = 0;
var y1l = 0;
var x0r = 0;
var y0r = 0;
var r0r = 0;
var x1r = 0;
var y1r = 0;
var r1r = 0;
var fillColor;
var grd;
var grdYesOrNo; //boolean
var grdLinear; //boolean so we know which Grad type
var globalFillStyle;
var shapeType;



//Functions

//mouse coordinates, passes event so we can use with onclick - event is a keyword
function assignCoordinates(event)
{
    var rect = document.getElementById("canvas1").getBoundingClientRect();
    x = event.pageX - rect.left -4;
    y = event.pageY - rect.top -4;
    x = Math.round(x);
    y = Math.round(y);
}

//clears canvas
function clearCanvas() {
    var c = document.getElementById("canvas1");
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,10000,10000);
}

function saveImage() {
    alert("This will take you to another page where you can right click on your image and choose the download destination! Enjoy!!");
    var canvas = document.getElementById("canvas1");
    var img = canvas.toDataURL("image/png");
    document.write('<img src = "'+img+'"/>');
}
    
//gradient chooser
function chooseStyleGrad()
{
    var startGrad = document.getElementById("startGrad");
    var styleGrad1 = document.getElementById("styleGrad1");
    var styleGrad2 = document.getElementById("styleGrad2");
    var styleGrad3 = document.getElementById("styleGrad3");
    startGrad.style.display = "none";
    styleGrad1.style.display = "inline";
    styleGrad2.style.display = "inline";
    styleGrad3.style.display = "inline";
}
//3 options for different styles of gradients - this stuff doesn't really do all that much
function ifNoneGrad()
{
    var styleGrad1 = document.getElementById("styleGrad1");
    var styleGrad2 = document.getElementById("styleGrad2");
    var styleGrad3 = document.getElementById("styleGrad3");
    styleGrad1.style.display = "none";
    styleGrad2.style.display = "none";
    styleGrad3.style.display = "none";
    var c=document.getElementById("canvas1");
    var ctx=c.getContext("2d");
    ctx.fillStyle="#FFFFFF";
    var startGrad = document.getElementById("startGrad");
    startGrad.style.display = "inline";
    grdYesOrNo =  false;
}

function ifLinearGrad()
{
    var styleGrad1 = document.getElementById("styleGrad1");
    var styleGrad2 = document.getElementById("styleGrad2");
    var styleGrad3 = document.getElementById("styleGrad3");
    styleGrad1.style.display = "none";
    styleGrad2.style.display = "none";
    styleGrad3.style.display = "none";
    var linearGradOptions = document.getElementById("linearGradOptions");
    linearGradOptions.style.display = "inline";
    grdYesOrNo = true;
    grdLinear = true;
}

function ifRadialGrad()
{
    var styleGrad1 = document.getElementById("styleGrad1");
    var styleGrad2 = document.getElementById("styleGrad2");
    var styleGrad3 = document.getElementById("styleGrad3");
    styleGrad1.style.display = "none";
    styleGrad2.style.display = "none";
    styleGrad3.style.display = "none";
    var radialGradOptions = document.getElementById("radialGradOptions");
    radialGradOptions.style.display = "inline";
    grdYesOrNo = true;
    grdLinear = false;
}
//linear variable collect
function linearGradCollect()
{
    x0l = document.getElementById("x0l").value;
    y0l = document.getElementById("y0l").value;
    x1l = document.getElementById("x1l").value;
    y1l = document.getElementById("y1l").value;
}
//radial variable collect
function radialGradCollect()
{
    x0r = document.getElementById("x0r").value;
    y0r = document.getElementById("y0r").value;
    r0r = document.getElementById("r0r").value;
    x1r = document.getElementById("x1r").value;
    y1r = document.getElementById("y1r").value;
    r1r = document.getElementById("r1r").value;
}
//gets how many color stops then prompts for all the colors
function colorStopsGrad()
{
    linearGradCollect();
    radialGradCollect();
    var linearGradOptions = document.getElementById("linearGradOptions");
    linearGradOptions.style.display = "none";
    var radialGradOptions = document.getElementById("radialGradOptions");
    radialGradOptions.style.display = "none";
    var tempVar = prompt("How many colors should be present in the gradient? Please enter an integer.");
    var numberOfColorStops = tempVar;
    alert("Please enter valid colors when prompted. Valid colors can be recognized HTML5 color names like 'red' or can be hex values like '#00FF00'.");
    var colorStopColors = [];
    for(var i = 0; i < numberOfColorStops; i++)
        {
            colorStopColors.push(prompt("Please enter a valid color:"));
        }
    globalColorStopColors = colorStopColors;
    var startGrad = document.getElementById("startGrad");
    startGrad.style.display = "inline";
}

//Get color
function getColor() {
    fillColor = document.getElementById("colorPref").value;
}

//figures out what the fill style is - fill type radio button starts this off
function getFillStyle()
{
    var empty = document.getElementById("empty").checked; //boolean
    var filled = document.getElementById("filled").checked; //boolean
    if (empty) 
    {
        globalFillStyle = "#FFFFFF";
    }
    else if (filled) 
    {
        if (!(grdYesOrNo))
            {
                globalFillStyle = fillColor;
            }
    };
}

//gradient makers
//linear
function createLinearGradient()
{
    var c = document.getElementById("canvas1");
    var ctx = c.getContext("2d");
    var grd = ctx.createLinearGradient(x0l,y0l,x1l,y1l);
    var n = globalColorStopColors.length;
    var j = globalColorStopColors;
    for (var i = 0; i < n; i++) 
    {
        grd.addColorStop(i/(n-1), j[i]);
    };
    globalFillStyle = grd;
}
//radial
function createRadialGradient()
{
    var c = document.getElementById("canvas1");
    var ctx = c.getContext("2d");
    var grd = ctx.createRadialGradient(x0r,y0r,r0r,x1r,y1r,r1r);
    var n = globalColorStopColors.length;
    var j = globalColorStopColors;
    for (var i = 0; i < n; i++) 
    {
        grd.addColorStop(i/(n-1), j[i]);
    };
    globalFillStyle = grd;
}

//allshapes
//rectangle
function drawRect()
{   
    var c = document.getElementById("canvas1");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    var w = document.getElementById("xd").value;
    var h = document.getElementById("yd").value;
    var x0d = x-(w/2);
    var y0d = y-(h/2);
    var x1d = w;
    var y1d = h;
    ctx.fillStyle=globalFillStyle;
    ctx.fillRect(x0d,y0d,x1d,y1d);
}
function drawEmpRect()
{
    var c = document.getElementById("canvas1");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    var w = document.getElementById("xd").value;
    var h = document.getElementById("yd").value;
    var x0d = x-(w/2);
    var y0d = y-(h/2);
    var x1d = w;
    var y1d = h;
    ctx.strokeStyle=fillColor;
    ctx.rect(x0d,y0d,x1d,y1d);
    ctx.stroke();
}
//circle
function drawCirc()
{   
    var c = document.getElementById("canvas1");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(x,y,document.getElementById("rc").value,0*Math.PI,2*Math.PI);
    ctx.strokeStyle=fillColor;
    ctx.fillStyle=globalFillStyle;
    ctx.stroke();
    ctx.fill();
}
//lines
function drawLine()
{
    var c=document.getElementById("canvas1");
    var ctx=c.getContext("2d");
    var ll = document.getElementById("ll").value;
    var ang = document.getElementById("ang").value;
    ctx.beginPath();
    ctx.moveTo(x,y);
    var degToRad = (1/360)*2*Math.PI;
    var nextX = Math.cos(ang*degToRad)*ll+x;
    var nextY = Math.sin(ang*degToRad)*ll*-1+y;
    ctx.lineTo(nextX,nextY);
    ctx.lineWidth=document.getElementById("lw").value;
    ctx.strokeStyle=fillColor;
    ctx.stroke();
}

//onclick - list of functions - needs to be last
function finalDrawStuff(event)
{  
    assignCoordinates(event);
    if (grdYesOrNo)
    {
        if (grdLinear)
        {
            createLinearGradient();
        }
        else
        {
            createRadialGradient();  
        };
    };
    getFillStyle();
    var c = document.getElementById("canvas1");
    var ctx = c.getContext("2d");
    ctx.fillStyle=globalFillStyle;
    if (document.getElementById("shapeChoose").value == "Rectangle") 
    {
        if(document.getElementById("empty").checked)
        {
            drawEmpRect();
        }
        else
        {
            drawRect();
        };
    }
    else if (document.getElementById("shapeChoose").value == "Circle")
    {
        drawCirc();
    }
    else
    {
        drawLine();
    }

}