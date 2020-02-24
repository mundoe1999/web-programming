
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";

var cx = canvas.width/2;
var cy = canvas.height/2;

var posx = 50;
var posy = 50;
console.log(canvas.width);
console.log(canvas.height);


function doKeyDown(e) {
    // W

    if(e.key == 'w'){
        posy++;

    }

    // S
    if(e.key == 's'){
        posy--;
    }

    // A
    if(e.key == 'a'){
        posx++;
        cx--;
    }

    // D
    if(e.key == 'd'){
        posx--;
        cx++;
    }
}


document.addEventListener('keypress', doKeyDown);

function renderSquare(){
    requestAnimationFrame(renderSquare);
    ctx.clearRect(0,0,cx*2,cy*2);
    ctx.fillRect(cx-posx+posy,cy-posy+posx,posx,posy);
}

renderSquare();