// this is an example of an update //
//document.getElementsByClassName("clipy")[0].style.clipPath = "inset(0 75% 0 0)"

// make the center line have a bigger strock and a pointer event related to stroke
// get the coordintaes and move only on the x or y depending to the selection of 
// console.log("open js")

function addPointer(SVGid){
   daLine = document.getElementById(SVGid)
   daLine.style.pointerEvents = "stroke";
   daLine.style.cursor = "ew-resize";
   daLine.style.strokeWidth = "3%";
   daLine.setAttributeNS(null,"onmousedown","onMouseDown(evt)");
   daLine.setAttributeNS(null,"onmouseover","onMouseOverAni()");
   daLine.setAttributeNS(null,"onmouseout", "onMouseOverOut()");
   daLine.setAttributeNS(null,"onmouseup", "onMouseUp(evt)");
   daLine.setAttributeNS(null,"ontouchstart", "onMouseDown(evt)"); 
   daLine.setAttributeNS(null,"ontouchmove", "onMouseMove(evt)");
   daLine.setAttributeNS(null,"ontouchend", "onMouseUp(evt)");
   daLine.setAttributeNS(null,"ontouchcancel", "onMouseUp(evt)");
   
}

var bmousedown=0;
var mouseOver = 0
// var svgRoot = document.getElementById("daSVG");
// var newP = svgRoot.createSVGPoint();
window.addEventListener("mouseup", onMouseUp);
function onMouseOverAni(){
if (mouseOver == 0) {
   // document.getElementById('daLineAni').style.animation = "none"
   document.getElementById('daLineAni').style.animation = "aniLine .75s linear"
   document.getElementById('daLineAni').style.strokeWidth = "3%"
   document.getElementById('daLineAni').style.opacity = "1"
   
   document.getElementById("container").append(daSVG) // to reactivate the animation
   console.log(mouseOver)
   mouseOver = 1

   }
else {
   document.getElementById('daLineAni').style.opacity = "0";
   document.getElementById("container").append(daSVG);
}
   // document.getElementById('daLine').style.opacity = "0"
};

 function onMouseOverOut() { 
   
   if (bmousedown == 0 && mouseOver == 1){
      document.getElementById('daLineAni').style.animation = "aniLine .75s linear reverse"
      document.getElementById('daLineAni').style.strokeWidth = "0%"
      document.getElementById("container").append(daSVG)
      mouseOver = 0   
   } 
      else {
   document.getElementById('daLineAni').style.opacity = "0"}
   mouseOver = 0
   }



function getMouse(evt){
    var position = svgRoot.createSVGPoint();
   //  console.log(evt)
    position.x = evt.clientX;
    position.y = evt.clientY;
    return position
    }
 
 function onMouseDown(evt){
   //  radioAnimationOff();
   //  console.log("mouse down on center")
   //  document.getElementById('daLine').style.animationDirection = ""

    document.getElementById("container").append(daSVG) // to reactivate the animation

   //  document.getElementById("daCenterSVG").style.animation  = "cirCenterAni2 .5s linear"
    window.addEventListener("mousemove", onMouseMove);
    offset = document.getElementById("map1937").getBoundingClientRect()
    map1937.dragging.disable() // WORK ON THIS
    offset = document.getElementById("map1937").getBoundingClientRect()
   //  console.log(offset.y)
    if (evt.touches){
        bmousedown=1
        newP=getMouse(evt.touches[0])
        doUpdate()
        }

    else{
    bmousedown=1;
    newP=getMouse(evt);
    doUpdate();
    }
 }
 function onMouseMove(evt){
    if(bmousedown != 1) return false; 
    map1937.dragging.disable() // WORK ON THIS

        if(evt.touches)
        {newP=getMouse(evt.touches[0])
        doUpdate()}
        else{newP=getMouse(evt);
        doUpdate()};
        
    }
 
 function onMouseUp(evt){
    if(bmousedown==2) {radioAnimationOn()} {
  map1937.dragging.enable() // WORK ON THIS
    bmousedown=0;
    }}
 
 function doUpdate(){
   
    newPercent = ((500-newP.x + offset.x)/500)*100
    newPX = newP.x - offset.x;
   //  console.log(newPX)
    if (newPX < 500 && newPX > 0) {
    document.getElementsByClassName("clipy")[0].style.clipPath = "inset(0 " + newPercent +"% 0 0)"
    document.getElementById('daLineBack').setAttributeNS(null, 'x1', newPX)
    document.getElementById('daLineBack').setAttributeNS(null, 'x2', newPX)
    document.getElementById('daLineAni').setAttributeNS(null, 'x1', newPX)
    document.getElementById('daLineAni').setAttributeNS(null, 'x2', newPX)
    document.getElementById('daLineAni').style.opacity = "0"
    document.getElementById('daLineAni').style.animation = "aniLine .75s linear reverse"
    document.getElementById("container").append(document.getElementById('map1937'))
    document.getElementById("container").append(daSVG) // to reactivate the animation
    mouseOver = 2
    console.log(mouseOver)
   
   }
  }
