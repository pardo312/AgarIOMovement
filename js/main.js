var canvas = document.getElementById("gc");
var ctx = canvas.getContext("2d");



var blobs = [];
var jugador;
var posXJugador = 300;
var posYJugador = 300;
var posXMouse = 300;
var posYMouse = 300;
var colorJugador = getRandomColor();   
var radioBolas = 10;

var posMapX = canvas.height;
var posMapY = canvas.width;

var alturaMapa = 1200;
var anchuraMapa = 1200;
var vel = 0.005;

window.onload = function () {
    var fps = 60;
    
    canvas.addEventListener('mousemove', function (evt) {

        var mousePos = calculateMousePos(evt);
        posXMouse = mousePos.x;
        posYMouse = mousePos.y;


    })

    setInterval(function () {
        dibujar();

    }, 1000 / fps);
    
    crearBlobs();
    setInterval(seguirCursor, 500 / fps);
    
   
    
    }
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - (root.scrollTop / (canvas.height/600));
   
    return {
        x: mouseX,
        y: mouseY
        
    } 
    ;
}

//Otorga valores x,y,z a los blobs  
    function crearBlobs() {

        for (i = 0; i < 300; i++) {
            var x = (Math.floor(Math.random() * anchuraMapa + 20));
            var y = (Math.floor(Math.random() * alturaMapa + 20));

            blobs[i] = new BlobAgar(x, y, radioBolas, getRandomColor(), ctx);
           
        }
        //Dibuja el jugador
        jugador = new BlobAgar(300,300,  50, 'blue', ctx);
   
    }
    function seguirCursor() {

        //for (i = 0; i < blobs.length; i++) {
        //    var x = blobs[i].x;
        //    var y = blobs[i].y;

        //    x -= ((posXMouse - posYJugador) * 0.005);
        //    y -= ((posYMouse - posYJugador) * 0.005);

        //    blobs[i].actualizar(x, y);
        //}

        posMapX -= ((posXMouse - posYJugador) * vel);
        posMapY -= ((posYMouse - posYJugador) * vel);
        
    }
    function dibujar() {

        

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, anchuraMapa, alturaMapa );

        
        
        //Dibuja los otros circulos
        for (i = 0; i <blobs.length;i++) {
            blobs[i].dibujarBlobs();

            if (jugador.comer(blobs[i], posMapX, posMapY)) {
                var x = (Math.floor(Math.random() * anchuraMapa  + 20));
                var y = (Math.floor(Math.random() * alturaMapa  + 20));

                vel -= 0.00001;
                blobs.splice(i, 1);
                radioBolas -= 0.01;
                blobs.push(new BlobAgar(x, y, radioBolas, getRandomColor(), ctx))
                
            }
        }

        //Dibuja el jugador
        jugador.dibujarBlob();
    }

//CLASES-------------------------------------------
class BlobAgar {

    constructor(x, y, r, color, ctx1) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.ctx = ctx1;
    }

    comer(blob2, posxMapa, posyMapa) {
        var distanciaX = Math.abs((this.x - (blob2.x + (posxMapa - 600))));
        var distanciaY = Math.abs((this.y - (blob2.y + (posyMapa - 600))));
        if (distanciaY < this.r && distanciaX < this.r ) {

            
                this.r += blob2.r / 15;
           
            
            return true;
        }


    }

    dibujarBlob() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
        this.ctx.fill();

    }

    dibujarBlobs() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x + (posMapX - 600), this.y + (posMapY - 600), radioBolas, 0, 2 * Math.PI, true);
        this.ctx.fill();
        //if (this.x + (posMapX - 600) < 600 && this.x + (posMapX - 600) > 0) {
        //    console.log(this.x + (posMapX - 600));
        //}
    }

    actualizar(x, y) {
        this.x = x;
        this.y = y;
    }


    }
    
//EXTRAS

//Color random
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}




