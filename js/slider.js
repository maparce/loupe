var moveSlider = function(slider, direction) {
    var value = slider.value;
    //console.log(value)
    // var circle = document.getElementById("target");
    if (direction == 'r') { 
                 document.getElementById("daC").setAttributeNS(null,'r',value);
                  }
    else {
      var coord = "c" + direction;
      document.getElementById("daC").setAttributeNS(null, coord, value);
    }
    document.getElementById("container").append(document.getElementById('map1937'))
    //this is a very annoying way that I have to come up with to solve the fact that it did not work properly in Safari. 
    //Is appending the map1937 div in the container to cause a refresh
   };

var daFrame = { // this will have the limits on how far the circle can go 
n: parseInt(document.getElementById("daC").getAttribute("r")),
e: document.getElementById('map1937').getBoundingClientRect().width - parseInt(document.getElementById("daC").getAttribute("r")),
s: document.getElementById('map1937').getBoundingClientRect().height - parseInt(document.getElementById("daC").getAttribute("r")),
w: parseInt(document.getElementById("daC").getAttribute("r"))
} 
