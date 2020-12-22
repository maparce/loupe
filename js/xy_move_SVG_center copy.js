var bmousedown=0;
// var svgRoot = document.getElementById("daSVG");
// var newP = svgRoot.createSVGPoint();
window.addEventListener("mouseup", onMouseUp);
function getMouse(evt){
    var position = svgRoot.createSVGPoint();
    position.x = evt.clientX;
    position.y = evt.clientY;
    return position
    }
 
 function onMouseDown(evt){
    window.addEventListener("mousemove", onMouseMove);
    map1937.dragging.disable() // WORK ON THIS
    document.getElementById("daRadio").style.pointerEvents = "none";

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
    document.getElementById("daRadio").style.pointerEvents = "none"

        if(evt.touches)
        {newP=getMouse(evt.touches[0])
        doUpdate()}
        else{newP=getMouse(evt);
        doUpdate()};
        
    }
 
 function onMouseUp(evt){
  map1937.dragging.enable() // WORK ON THIS
  document.getElementById("daRadio").style.pointerEvents = "stroke"
  console.log("mouse up centro")
    bmousedown=0;
    }
 
 function doUpdate(){
    myCirc.setAttributeNS(null, "cx", newP.x );
    myCirc.setAttributeNS(null, "cy", newP.y );
    document.getElementById("daC").setAttributeNS(null,'cx',newP.x)
    document.getElementById("daC").setAttributeNS(null,'cy',newP.y) 
    document.getElementById("daRadio").setAttributeNS(null, 'cx', newP.x);
    document.getElementById("daRadio").setAttributeNS(null, 'cy', newP.y);
    document.getElementById("daRing").setAttributeNS(null, 'cx', newP.x);
    document.getElementById("daRing").setAttributeNS(null, 'cy', newP.y);
    rRadio = parseInt(document.getElementById("daC").getAttribute("r"))
    xRadio = newP.x + rRadio - 3
    xText = newP.x  - parseInt(document.getElementById("daTextC").style.getPropertyValue("font-size"));
    yText = newP.y - rRadio - 10;
    document.getElementById("daTextC").setAttributeNS(null, 'x', xText);
    document.getElementById("daTextC").setAttributeNS(null, 'y', yText);
    document.getElementById("container").append(document.getElementById('map1937'))
  }
