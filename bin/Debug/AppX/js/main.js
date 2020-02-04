var canvas = document.getElementById("gc");
var ctx = canvas.getContext("2d");
var canvasJugador = document.getElementById("pc");
var ctxJugador = canvasJugador.getContext("2d");



canvas.style.left = "0px";
canvas.style.top = "0px";
canvas.style.position = "absolute";


canvasJugador.style.left = "0px";
canvasJugador.style.top = "0px";
canvasJugador.style.position = "absolute";




var vy = 2;
var vx = 2;
var blobs = [];
var jugador;
var posXJugador = 300;
var posYJugador = 300;
var posXMouse;
var posYMouse;
var colorJugador = getRandomColor();    

window.onload = function () {
    var fps = 60;
    dibujarBlobs();
    canvas.addEventListener('mousemove', function (evt) {

        var mousePos = calculateMousePos(evt);
        posXMouse = mousePos.x;
        posYMouse = mousePos.y;

    })
    setInterval(seguirCursor, 1000 / fps / 2);
    setInterval(function(){
        dibujar();
        ctx.translate(1, 0);
    }, 1000 / fps );
    setInterval(dibujarJugador, 1000 / fps);  
    
    }
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}


//Otorga valores x,y,z a los blobs  
function dibujarBlobs() {
    for (i = 0; i < 30; i++) {
        var x = (Math.floor(Math.random() * 600 + 1));
        var y = (Math.floor(Math.random() * 600 + 1));
        
        blobs[i] = new BlobAgar(x, y, 10, getRandomColor() ,ctx);
    }
}
function seguirCursor() {
    

    posXJugador += (posXMouse-posXJugador)*0.01;      
    posYJugador += (posYMouse-posYJugador)*0.01;
 

   
    
}
function dibujar() {

    

    ctx.fillStyle = 'black';
  
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Dibuja los otros circulos
    for (i = 0; i < blobs.length; i++) {
        blobs[i].dibujarBlob();
        
    }  

}
function dibujarJugador() {
    //Dibuja el jugador
    //jugador = new BlobAgar(posXJugador, posYJugador, 50, 'white', ctxJugador);

    //Dibuja el canvas
     
    jugador = new BlobAgar(canvas.clientWidth / 2, canvas.height / 2, 50, 'pink', ctxJugador);  
   
    jugador.dibujarBlob();
    
}

//Color random
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class BlobAgar {
   
    constructor(x, y, r,color,ctx1) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.ctx = ctx1 ;
    }

    dibujarBlob()
    {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
            this.ctx.fill();
    }  

    actualizar(x,y) {
        this.x = x;
        this.y = y;
    }
    
}




