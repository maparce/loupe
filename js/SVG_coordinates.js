var daWidth = document.getElementById('map1937').getBoundingClientRect().width
var daHeight = document.getElementById('map1937').getBoundingClientRect().height
var xCenter = daWidth/2
var yCenter = daHeight/2
var rRadio = parseInt(document.getElementById("daC").getAttribute("r"))
var xRadio = xCenter + rRadio - 3
var xText = xCenter - parseInt(document.getElementById("daTextC").style.getPropertyValue("font-size"));
var yText = yCenter - rRadio - 10;

// MAKE THE DISK SVG HAVE THE WIDTH AND HEIGHT OF THE BOUNDING CLIENT 
document.getElementById("daSVG").setAttributeNS(null, "viewBox", "0 0 " + daWidth + " " + daHeight);
document.getElementById("daRing").setAttributeNS(null, 'cx', xCenter);
document.getElementById("daRing").setAttributeNS(null, 'cy', yCenter);
document.getElementById("daRadio").setAttributeNS(null, 'cx', xCenter);
document.getElementById("daRadio").setAttributeNS(null, 'cy', yCenter);

document.getElementById("daTextC").setAttributeNS(null, 'x', xText);
document.getElementById("daTextC").setAttributeNS(null, 'y', yText);
document.getElementById("daC").setAttributeNS(null, 'cx', xCenter);
document.getElementById("daC").setAttributeNS(null, 'cy', yCenter);

var xCirculo = parseInt(document.getElementById("daC").getAttribute("cx"))
var yCirculo = parseInt(document.getElementById("daC").getAttribute("cy"))