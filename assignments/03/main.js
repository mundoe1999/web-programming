

// Setting up Canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";


// Getting Center of Canvas
var cx = canvas.width/2;
var cy = canvas.height/2;

var posx = 50;
var posy = 50;


// Directional Key inputs
function doKeyDown(e) {
    // W

    if(e.key == 'w'){
        cy--;
        posy-= 0.3;

    }

    // S
    if(e.key == 's'){
        cy+= 2;
        posy += 0.3;
    }

    // A
    if(e.key == 'a'){
        cx--;
        posx -= 0.3;
    }

    // D
    if(e.key == 'd'){
        cx += 2;
        posx += 0.3;
    }
}


//Renders the entire square per frame
function renderSquare(){
    requestAnimationFrame(renderSquare);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillRect(cx-posx,cy-posy,posx,posy);
}

// Function for Submitting Form
async function start(){
    // Gets the fields of the form
    let form = document.getElementById("mainForm");

    let address = form.elements.address.value;
    let zip = form.elements.zip.value;
    let city = form.elements.city.value;
    let state = form.elements.state.value;

    let query = `${address}, ${city}, ${state}, ${zip}`;
    // Calls Open Cage API
    await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=b4fb2e152a3d49d1a60a8a7d8ce2790d`)
    .then(res => res.json())
    .then(res => {
        // Gets the Latitude and Longitude of inputted destination
        let coords = res.results[0].geometry;
        if(!coords){
            alert("ADDRESS NOT FOUND!!");
        }
        else {
            // Hunter address lat = 40.7683107, lng =-73.964406
            let lat = Math.abs(40.7683107 - coords.lat);
            let lng = Math.abs(-73.964406 - coords.lng);
            posx = lat * 100000;
            posy = lng * 10000;
            console.log(posx, posy);


        }
    });
}
renderSquare();


/* Event Listeners */

// Prevents page from refreshing
document.getElementById("submit").addEventListener('click', e => {
    e.preventDefault();
})

// Does the key presses
document.addEventListener('keypress', doKeyDown);