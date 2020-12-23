var bmousedown=0;
// var svgRoot = document.getElementById("daSVG");
// var newP = svgRoot.createSVGPoint();
window.addEventListener("mouseup", onMouseUpR);
function getMouseR(evt){
    var position = svgRoot.createSVGPoint();

    position.x = evt.clientX;
    position.y = evt.clientY;
    return position
    }
 
 function onMouseDownR(evt){
    radioStrikeOn()
    console.log("boder click")
    window.addEventListener("mousemove", onMouseMoveR);
    offset = document.getElementById("map1937").getBoundingClientRect()
    evt.preventDefault()
    map1937.dragging.disable() // WORK ON THIS
    document.getElementById("daRing").style.pointerEvents = "none";

    if (evt.touches){
        bmousedown=2
        newP=getMouseR(evt.touches[0])
        doUpdateR()
        }

    else{
    bmousedown=2;
    newP=getMouseR(evt);
    doUpdateR();
    }
 }
 function onMouseMoveR(evt){
    if(bmousedown != 2) return false; 
    evt.preventDefault()
    map1937.dragging.disable() // WORK ON THIS
    document.getElementById("daRing").style.pointerEvents = "none"
        if(evt.touches)
        {newP=getMouseR(evt.touches[0])
        doUpdateR()}
        else{newP=getMouseR(evt);
        doUpdateR()

        };
    }
 
 function onMouseUpR(evt){
     if(bmousedown==2) {radioAnimationOn();     document.getElementById("daCenterSVG").style.animation  = "cirCenterAni 1s linear"
    }
     else {
        console.log(bmousedown)
  bmousedown=0;
  document.getElementById("daRing").style.pointerEvents = "fill";
  xCirculo = parseInt(document.getElementById("daC").getAttribute("cx"))
  yCirculo = parseInt(document.getElementById("daC").getAttribute("cy"))
  map1937.dragging.enable() }// WORK ON THIS
  
    }
 
 function doUpdateR(){
    
//   rRadio = parseInt(document.getElementById("daC").getAttribute("r"))
   console.log(newP.x,offset.x, xCirculo, newP.y, offset.y, yCirculo)
  xD = Math.sqrt( Math.pow((newP.x - offset.x - xCirculo),2) + Math.pow((newP.y - offset.y -yCirculo),2))

  if (xD > 0 ){
  rRadio = xD    
    document.getElementById("daC").setAttributeNS(null,'r',rRadio) 
    document.getElementById("daRadio").setAttributeNS(null, 'r', rRadio)
    document.getElementById("container").append(document.getElementById('map1937'))

  }
};

function radioAnimationOn() {
    daAnim = document.getElementsByClassName("daAnim")
    for (i = 0; i < daAnim.length; i++) {
      daAnim[i].style.strokeWidth= "1%";
      daAnim[i].style.animation = "dash .4s linear"
      daAnim[i].style.animationIterationCount = "1" ;
    //   daAnim[i].style.animationDuration = ".4s";
     daAnim[i].style.animationDirection = "reverse"
          } 
          console.log("animation ON")
}

function radioAnimationOff(){
    daAnim = document.getElementsByClassName("daAnim");
        for (i = 0; i < daAnim.length; i++) {
          daAnim[i].style.strokeWidth= "1%";
          daAnim[i].style.animation = "none"; 
            console.log("animation off")
              } 
}

function radioStrikeOn() {
    daAnim = document.getElementsByClassName("daAnim");
    for (i = 0; i < daAnim.length; i++) {
      daAnim[i].style.strokeWidth= "6%";
      daAnim[i].style.animation = "none"; 
        console.log("animation off")      
}
}

