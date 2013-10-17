function Hangman(sandbox, opts){
    this.stages = [];
    var x = opts.x;
    var y = opts.y;
    var w = opts.w;
    var h = opts.h;
    this.stages[0] = function(ctx){
        ctx.moveTo(x+w, y); 
        ctx.lineTo(x,y);
    };
    this.stages[1] = function(ctx){
        ctx.moveTo(x, y);
        ctx.lineTo(x, y-h);
    };
    this.stages[2] = function(ctx){
        ctx.moveTo(x, y - (h/5)); 
        ctx.lineTo(x+(h/5), y);
    };
    this.stages[3] = function(ctx){
        ctx.moveTo(x, y-h);
        ctx.lineTo(x+(2*w/3), y-h);
    };
    this.stages[4] = function(ctx){
        ctx.moveTo(x, y - (4*h/5)); 
        ctx.lineTo(x+(h/5), y-h);
    };
    this.stages[5] = function(ctx){
        ctx.moveTo(x+(2*w/3), y-h);
        ctx.lineTo(x+(2*w/3), y-(4*h/5));
    };
    this.stages[6] = function(ctx){
        ctx.moveTo(x+(2*w/3), y-(7*h/10));
        ctx.arc(x+(2*w/3), y-(7*h/10), h/10, 0, 2*Math.PI, true);  
    };
    this.stages[7] = function(ctx){
        ctx.moveTo(x+(2*w/3), y-(3*h/5));
        ctx.lineTo(x+(2*w/3), y-(2*h/5));
    };
    this.stages[8] = function(ctx){
        ctx.lineTo(x+(2*w/3) - w/20, y-(2*h/10));
    };
    this.stages[9] = function(ctx){
        ctx.moveTo(x+(2*w/3), y-(2*h/5));
        ctx.lineTo(x+(2*w/3) + w/20, y-(2*h/10));
    };
    this.stages[10] = function(ctx){
        ctx.moveTo(x+(2*w/3), y-(1*h/2));
        ctx.lineTo(x+(2*w/3) - w/20, y-(1*h/2));
    };
    this.stages[11] = function(ctx){
        ctx.moveTo(x+(2*w/3), y-(1*h/2));
        ctx.lineTo(x+(2*w/3) + w/20, y-(1*h/2));
    };
    sandbox.on("game:draw", this.draw, this);
    
}

Hangman.prototype = {
    
    draw: function(ctx, num){
        for(var i = 0; i < num; i++){
            this.stages[i](ctx);
        }
        ctx.stroke();
    }

};
