import Vaadin = require("Vaadin");


interface MyConnector  extends Vaadin.Connector {
    setRGB:(r:number, g:number, b:number) => void;    
    clicked:() => void; // server RPC function that can be called from the client
}

interface RGB {
    r:number;
    g:number;
    b:number;
}

var com_github_mjvesa_tsdemo_widget_DemoWidget = function() {
	
    var that:MyConnector = this;
    var ctx:CanvasRenderingContext2D;
    var theT = 0;
    var colorR = 1.0;
    var colorG = 1.0;
    var colorB = 1.0;
    var curve:Array<number> = [];
       


    // Shared state example
    that.onStateChange = function ():void {
        console.log("Description: " + that.getState().description);    
    }

    var initCurve = function () {
        for (var i = 0 ; i < 256 ; i++) {
            curve[i] = (Math.sin(i / 128 * Math.PI) * 128 + 128)|0;
        }
    }

    // This function will be called trough RPC from the server side    
    that.setRGB = function(r, g, b) {
        colorR = r;
        colorG = g;        
        colorB = b;
        
    }

    var createCanvas = function(el: HTMLElement): CanvasRenderingContext2D {
        var canvas = document.createElement("canvas");
        canvas.setAttribute("style", "width: 512px; height: 512px;");
        canvas.onclick = function() {
            that.clicked();
        }
        el.appendChild(canvas);
        canvas.width = 128;
        canvas.height = 128;
        var ctx = canvas.getContext("2d");
        return ctx;
    }

    var drawEffect = function() {

        var t = theT;
        theT++;
        var data: ImageData = ctx.getImageData(0, 0, 128, 128);
        var i: number;
        var colors: Array<RGB> = [];

        for (i = 0; i < 256; i++) {
            colors[i] = <RGB>{};
            colors[i].r = 128 + (Math.sin(i / 128 * Math.PI) * colorR * 128) | 0;
            colors[i].g = 128 + (Math.sin(i / 128 * Math.PI) * colorG * 128) | 0;
            colors[i].b = 128 + (Math.sin(i / 128 * Math.PI) * colorB * 128) | 0;
        }

        i = 0;

        for (var y = 0; y < 128; y++) {
            for (var x = 0; x < 128; x++) {
                var color: RGB = colors[(curve[(x + y + curve[t & 255]) & 255] + curve[t + curve[x] & 255] + curve[y & 255]) & 255];
                data.data[i] = color.r;
                data.data[i + 1] = color.g;
                data.data[i + 2] = color.b;
                data.data[i + 3] = 255;
                i += 4;
            }
        }
        ctx.putImageData(data, 0, 0);
        window.requestAnimationFrame(drawEffect);
    }

    // "Main"

    ctx = createCanvas(that.getElement());
    initCurve();
    drawEffect();
}






