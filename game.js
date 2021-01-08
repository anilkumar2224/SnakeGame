
 var canvas=document.getElementById('can');
function game(){
    var snake = new Snake(); 

    var ctx=canvas.getContext('2d');


 let food={
     x:Math.floor(Math.random()*19)*15,
     y:Math.floor(Math.random()*17)*6
 }


 document.addEventListener("keydown",direction);
 let d="RIGHT";
 snake.dir(1,0);
 function direction(e){
     if(e.keyCode==37 && d!="RIGHT"){
        d="LEFT";
        snake.dir(-1,0);
     }else if(e.keyCode==38 && d!="DOWN" ){
         d="UP";
         snake.dir(0,-1);
     }else if(e.keyCode==39 && d!="LEFT"){
         d="RIGHT";
         snake.dir(1,0);
    }else if(e.keyCode==40 && d!="UP"){
         d="DOWN";
         snake.dir(0,1);
    }

 }





document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 && d!="RIGHT" ) {
            d="LEFT";
            snake.dir(-1,0);
            /* left swipe */ 
        } else if( xDiff < 0 && d!="LEFT") {
            /* right swipe */
            d="RIGHT";
            snake.dir(1,0);
        }                       
    } else {
        if ( yDiff > 0 && d!="DOWN" ) {
            /* up swipe */ 
            d="UP";
            snake.dir(0,-1);
        } else if(yDiff < 0 && d!="UP") { 
            /* down swipe */
            d="DOWN";
            snake.dir(0,1);
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};



initialInterval = 100;

var id=window.setInterval( function(){
ctx.clearRect(0,0, canvas.width, canvas.height);
ctx.save();

snake.update();
snake.show();
ctx.fillStyle="brown";
ctx.fillRect(food.x,food.y,15,6);
ctx.restore();
},initialInterval);                                                                                 

function Snake(){
    this.x=0;
    this.y=0;
    this.vx=0;
    this.vy=0;
    this.tail=[];
    this.score=0;

    this.dir=function(x,y){
        this.vx=x;
        this.vy=y;
    }

    this.update=function(){
      

        for(let i=0;i<this.tail.length-1;i++){
            if(this.x===this.tail[i].xx && this.y===this.tail[i].yy)
            {
                window.clearInterval(id);
                console.log(this.score);
                card.classList.remove('hide');
                t.classList.add('hide');
                score.classList.remove('hide');
                num.innerText=this.score;
                start.innerText='Restart';
                topp.classList.add('hide');
            }
            this.tail[i]=this.tail[i+1];

        }
        this.tail[this.score]={
            xx:this.x,
            yy:this.y
        }
  
        this.x=this.x+this.vx*15;
        this.y=this.y+this.vy*6;
        if(this.x===300 || this.y===150 ){
            window.clearInterval(id);
            console.log(this.score);
            card.classList.remove('hide');
                t.classList.add('hide');
                score.classList.remove('hide');
                num.innerText=this.score;
                start.innerText='Restart';
                topp.classList.add('hide');
        }
        if(this.x===-15&& d=='LEFT' ){
            window.clearInterval(id);
            console.log(this.score);
            card.classList.remove('hide');
                t.classList.add('hide');
                score.classList.remove('hide');
                num.innerText=this.score;
                start.innerText='Restart';
                topp.classList.add('hide');
        }
        if(this.y===-6&& d=='UP' ){
            window.clearInterval(id);
            console.log(this.score);
            card.classList.remove('hide');
                t.classList.add('hide');
                score.classList.remove('hide');
                num.innerText=this.score;
                start.innerText='Restart';
                topp.classList.add('hide');
        }
        if(this.x===food.x && this.y===food.y){
            this.score++;
            n.innerHTML=this.score;
            food={
                x:Math.floor(Math.random()*19)*15,
                y:Math.floor(Math.random()*17)*6
            }
            
            
            }
          

    }
    this.show=function(){  
        for(let i=0;i<this.tail.length;i++){
            if(i==this.tail.length-1){
                ctx.fillStyle="orange";
                ctx.fillRect(this.tail[i].xx,this.tail[i].yy,15,6); 
                if(d=="LEFT" || d=="RIGHT" || d==null){
                    ctx.strokeStyle="black";
                ctx.beginPath();
                ctx.arc(this.tail[i].xx+12,this.tail[i].yy+1, 0.5, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(this.tail[i].xx+12,this.tail[i].yy+5, 0.5, 0, 2 * Math.PI);
                ctx.stroke();
                }else if(d=="UP" || d=="DOWN"){
                    ctx.strokeStyle="black";
                    ctx.beginPath();
                    ctx.arc(this.tail[i].xx+12,this.tail[i].yy+1, 0.5, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(this.tail[i].xx+3,this.tail[i].yy+1, 0.5, 0, 2 * Math.PI);
                    ctx.stroke();
                }
 
            }else{
            ctx.fillStyle="white";
            ctx.fillRect(this.tail[i].xx,this.tail[i].yy,15,6);
        }  
    }
  
    }
    
}

}
var elem=document.documentElement;
var start=document.getElementById('start');
var topp=document.getElementById('top');
var card=document.getElementById('card');
var score=document.getElementById('score');
var num=document.getElementById('num');
var n=document.getElementById('n');
var t=document.getElementById('t');
start.addEventListener('click',()=>{
    n.innerHTML='0';
card.classList.add('hide');
topp.classList.remove('hide');
canvas.style.backgroundColor='aquamarine';
if(elem.requestFullscreen){ elem.requestFullscreen();}
game();
});

