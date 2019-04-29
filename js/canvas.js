
var canvas = document.getElementById('canvas');
var stock;
var stockTouch;
function Canvas()
{
    var thisCanvas = this;
    this.ctx = canvas.getContext('2d');
    this.mouseX;
    this.mouseY;
    this.mouseDown = 0;
    this.touchX;
    this.touchY;
    this.color = 'rgb(0,0,0)';
    this.widhtBrusch = 3;
    
    
    this.drawDot = function (ctx,x,y,size) 
    {
        ctx.fillStyle = thisCanvas.color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
    } 

    this.clearCanvas = function () 
    {
        thisCanvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
        stock = null; 
        stockTouch = null;
        reservationBtnElt.style.display = 'none';
        emptyCanvasElt.style.display = 'none'; 
        FailElt.style.display = 'none'; 
        resaOKElt.style.display = 'none'; 
    }

    this.sketchpadMouseDown = function () 
    {
        thisCanvas.mouseDown=1;
        thisCanvas.drawDot(thisCanvas.ctx,thisCanvas.mouseX,thisCanvas.mouseY,thisCanvas.widhtBrusch);
    }

    this.sketchpadMouseUp = function () 
    {
        thisCanvas.mouseDown=0;
    }

    this.sketchpadMouseMove = function (e) 
    { 
        thisCanvas.getMousePos(e);

        if (thisCanvas.mouseDown==1) 
        {
            thisCanvas.drawDot(thisCanvas.ctx,thisCanvas.mouseX,thisCanvas.mouseY,thisCanvas.widhtBrusch);
            localStorage.setItem('drawClick', thisCanvas.mouseX);
            localStorage.setItem('drawClick', thisCanvas.mouseY);
            stock = localStorage.getItem('drawClick');
        }
    }

    this.getMousePos = function (e) 
    {
        if (!e)
        {
            var e = event;
        }
            
        if (e.offsetX) 
        {
            thisCanvas.mouseX = e.offsetX;
            thisCanvas.mouseY = e.offsetY;
            
        }
        else if (e.layerX) 
        {
            thisCanvas.mouseX = e.layerX;
            thisCanvas.mouseY = e.layerY;
            
        }
     }

    this.sketchpadTouchStart = function () 
    {
        thisCanvas.getTouchPos();
        thisCanvas.drawDot(thisCanvas.ctx,thisCanvas.touchX,thisCanvas.touchY,thisCanvas.widhtBrusch);
        event.preventDefault();
    }

    this.sketchpadTouchMove = function (e) 
    { 
        thisCanvas.getTouchPos(e);
        thisCanvas.drawDot(thisCanvas.ctx,thisCanvas.touchX,thisCanvas.touchY,thisCanvas.widhtBrusch); 
        event.preventDefault();
    }
    
    this.getTouchPos = function (e) 
    {
        if (!e)
        {
           var e = event; 
        }
           
        if(e.touches) 
        {
            if (e.touches.length == 1) 
            { 
                var touch = e.touches[0]; 
                thisCanvas.touchX=touch.pageX-touch.target.offsetLeft;
                thisCanvas.touchY=touch.pageY-touch.target.offsetTop;
                localStorage.setItem('drawTouch', thisCanvas.touchX);
                stockTouch = localStorage.getItem('drawTouch');
            }
        }
    }
    
    this.init = function () 
    {
        if (thisCanvas.ctx) 
        {
            canvas.addEventListener('mousedown', thisCanvas.sketchpadMouseDown, false);
            canvas.addEventListener('mousemove', thisCanvas.sketchpadMouseMove, false);
            window.addEventListener('mouseup', thisCanvas.sketchpadMouseUp, false);
            canvas.addEventListener('touchstart', thisCanvas.sketchpadTouchStart, false);
            canvas.addEventListener('touchmove', thisCanvas.sketchpadTouchMove, false);
        }
    }
}
    