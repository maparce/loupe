var bmousedown=0;

// var svgRoot = document.getElementById("daSVG");
// var newP = svgRoot.createSVGPoint();
window.addEventListener("mouseup", onMouseUp);
function getMouse(evt){
    var position = svgRoot.createSVGPoint();
    // console.log(evt)
    position.x = evt.clientX;
    position.y = evt.clientY;
    return position
    }
 
 function onMouseDown(evt){
    radioAnimationOff();
    console.log("mouse down on center")
    document.getElementById("daCenterSVG").style.animation  = "cirCenterAni2 .5s linear"
    window.addEventListener("mousemove", onMouseMove);
    offset = document.getElementById("map1937").getBoundingClientRect()
    map1937.dragging.disable() // WORK ON THIS
    document.getElementById("daRadio").style.pointerEvents = "none";
    offset = document.getElementById("map1937").getBoundingClientRect()
    // console.log(offset.y)
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
    if(bmousedown==2) {radioAnimationOn()} {
  map1937.dragging.enable() // WORK ON THIS
  document.getElementById("daRadio").style.pointerEvents = "stroke"
    bmousedown=0;
    }}
 
 function doUpdate(){
    bboxX= -1*(newP.x-250 - offset.x)
    bboxY = -1*(newP.y-250 - offset.y)
    newViewBox = bboxX + "," + bboxY  + ",500,500"
    // console.log(bboxX, bboxY)
    document.getElementById("daSVG").setAttributeNS(null, "viewBox", newViewBox)
    document.getElementById("daC").setAttributeNS(null,'cx',newP.x - offset.x)
    document.getElementById("daC").setAttributeNS(null,'cy',newP.y - offset.y) 
    document.getElementById("container").append(document.getElementById('map1937'))
  }
