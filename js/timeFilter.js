var timeF = { //time filters to manage tiles of different years
    start: function(containerDIV,tileArray,svgType, options) {
        this.divContainer = containerDIV;
        this.leafTiles = tileArray;
        this.assignNamesToDiv(containerDIV);
        if (this.leaflet == true) {this.startLeafDiv(); this.joinAllLeafDiv()
        }
        if (this.leaflet == false) {this.assingImgToDivs(tileArray)}
        if (svgType == null) {this.svgType = "circle" } else {this.svgType = svgType};
        this.makeSVG()
    },
    divContainer: "daMap",
    contDivAssigned: false,
    contDiv: null, // the container div 
    divNames : [], // array with the names of the divs which for example could be the date
    leafTiles: [], // array with the address to tiles or images 
    zoom: 17, // the leaflet zoom 
    center: [18, -65,], // the leaflet map center
    classType: "timeFdiv", // class assigned to the div in the container 
    leafMaps: [], // array where the leaflet maps are saved 
    leaflet: true, // true to work with leaflet tiles instead of static
    static: false,
    text:true,
    namesInDiv : false,
    divDimension: { width:"", height:"",xCenter:"",yCenter:"",r:"", fontSize:12, xProp:.5, yProp:.5},
    toRadians: function(angle) {return angle * (Math.PI / 180);},
    toDegrees: function(angle) {return angle * (180 / Math.PI);},
    assingImgToDivs: function(imgSrcArray){
        if (this.divNames.length == 0) {this.assignNamesToDiv()}
        if (this.divNames.length != imgSrcArray.length) {return console.log("array size different from div names")}
        if (imgSrcArray == null && this.leafTiles.length > 0) {imgSrcArray = this.leafTiles}
        if (imgSrcArray.length > 0) {this.leafTiles = imgSrcArray}
        for (i=0; i<this.divNames.length; i++){
            var daInnerHTML = '<img id="img_' + this.divNames[i] + '" src= '+ imgSrcArray[i] + ' class= "timeFimg" style="max-width:100%; max-height:100%; position:absolute; overflow: hidden"></img>'
            document.getElementById(this.divNames[i]).innerHTML = daInnerHTML;
        }
    },
    startLeafDiv: function(){
                        if (this.namesInDiv == false) {return console.log("no div names")}
                        for (i=0;i<this.divNames.length;i++){
                            this.assignTilesToDivs(this.divNames[i], this.leafTiles[i], i)
                        }    
                    },

    joinAllLeafDiv: function(){ 
                        for (i=0; i < this.leafMaps.length; i++){
                            for (j=0; j<this.leafMaps.length;j++){
                                if (i == j) {continue;}
                                this.leafMaps[i].sync(this.leafMaps[j])
                            }
                        }
                    },
    assignNamesToDiv : function(containerDIVid){
                            if (containerDIVid == undefined && this.divContainer) {
                                this.contDiv = document.getElementById(this.divContainer)
                                }
                            if (containerDIVid) {
                                this.divContainer = containerDIVid;
                                this.contDiv = document.getElementById(containerDIVid)
                                if (this.contDiv == null) {return console.log("no div whith that ID")} } else { this.contDivAssigned = true}
                            this.divNamesFunction()
                            if (this.namesInDiv == true) {return true}
                            for (i = 0; i < this.divNames.length; i++)
                            {
                                iDiv = document.createElement('div');
                                iDiv.setAttributeNS(null, 'id', this.divNames[i]);
                                iDiv.setAttributeNS(null, 'class', this.classType);
                                this.contDiv.appendChild(iDiv)
                            }
                            this.namesInDiv = true;
                            this.calcDivDimensions();
                        },
    assignTilesToDivs : function(iDIV, iTile, i){
        timeF.leafMaps[i] = L.map(iDIV, { zoomControl: false , attributionControl: false,}).setView(timeF.center, timeF.zoom);
        L.tileLayer(iTile, {} ).addTo(timeF.leafMaps[i]);
                        },

    divNamesFunction : function() {
                            if (this.divNames.length != this.leafTiles.length)
                            {for (i = 0; i < this.leafTiles.length; i++)
                                {this.divNames.push("tile" + i) }
                            }
                            else true},
    calcDivDimensions: function() {   
                            this.divDimension.width = this.contDiv.getBoundingClientRect().width;
                            this.divDimension.height = this.contDiv.getBoundingClientRect().height;
                            if(this.divDimension.height == 0)  {this.divDimension.height = Math.floor(window.innerHeight)}
                            this.divDimension.xCenter = this.divDimension.width/2;
                            this.divDimension.yCenter = this.divDimension.height/2;
                            if (this.divDimension.xCenter >= this.divDimension.yCenter && this.divDimension.r == "") {this.divDimension.r = this.divDimension.yCenter/3} else {this.divDimension.r = this.divDimension.xCenter/3}
                            
                        },
    svgArray : [],
    // haveButton: {a: true, aType: "all"}, // aTypes options: "all", "NS", "EW"
    svgType: "circle",
    svgButton:"", // svgTypes options: "circle", "pie", "circle-pie", "vertical", "horizontal",
    makeSVG : function(){ 
                    const xmlns = "http://www.w3.org/2000/svg";
                    xText = this.divDimension.xCenter - this.divDimension.fontSize;
                    yText = this.divDimension.yCenter - this.divDimension.fontSize - this.divDimension.r;
                     
                    //dealing with the annoying Safari I had to create an SVG that serves as a button that connects to the SVGs in the leaflet map
                    const svgParentElem = document.createElementNS(xmlns, "svg");
                    svgParentElem.setAttributeNS(null, "id", "SVGparent");
                    svgParentElem.setAttributeNS(null, "viewBox", "0 0 " + this.divDimension.width + " " +this.divDimension.height);
                    svgParentElem.setAttributeNS(null, "style", "position: absolute; -webkit-transform: translate3d(0,0,0); -webkit-user-select: none;-moz-user-select: none;-ms-user-select: none; user-select: none; pointer-events: none; z-index: 1000");
                    /// very important to have the user-select in none, otherwise I could not interact with the background
                    var daInnerHTML = ""
                    for (i=1; i<this.divNames.length; i++){
                        if(this.leaflet == true) {var iLeafMap = this.leafMaps[i]._container.getElementsByClassName("leaflet-control-container")[0]}
                        if (this.svgType == "circle" || this.svgType == "circle-pie") {
                        var xProp = i/this.divNames.length;
                        var yProp = 1/2;//the y prop is allowing for the svg to be placed in different places within the div
                        }
                        if (this.svgType == "horizontal") {
                            var xProp = 1/2;
                            var yProp = i/this.divNames.length;
                        }
                        if (this.svgType == "vertical") {
                            var xProp = i/this.divNames.length;
                            var yProp = 1/2;
                        }

                        const svgElem = document.createElementNS(xmlns, "svg");
                        svgElem.setAttributeNS(null, "id", "svg_"+this.divNames[i]);
                        svgElem.setAttributeNS(null, "viewBox", "0 0 " + this.divDimension.width + " " +this.divDimension.height);
                        svgElem.setAttributeNS(null, "style", "-webkit-transform: translate3d(0,0,0); -webkit-user-select: none;-moz-user-select: none;-ms-user-select: none; user-select: none; pointer-events: none; z-index: 1000");
                        if(this.leaflet == true){svgElem.setAttributeNS(null, "class", "leaflet-control")}
                        daID = this.divNames[i];
                        var posSVG = {id:daID, x:this.divDimension.width * xProp, y:this.divDimension.height * yProp,r: this.divDimension.r};
                        this.animateSVG.positionArray.push(posSVG)
                        /// The SVG witht the arrows
                        var daArrowN  = '<path id=\"daArrow_N_' + daID + '\" class=\"' + daID + ' arrow iAni\" d=\"M 250 235 L253.5 241.06217782649108 L246.5 241.06217782649108 Z\" fill=\"#000\" ></path>'   // check the stroke width in the CSS since it changes with the size of the container div
                        var daArrowS  = '<path id=\"daArrow_S_' + daID + '\" class=\"' + daID + ' arrow iAni\" d=\"M 250 265 L246.5 258.93782217350895 L253.5 258.93782217350895 Z\" fill=\"#000\" ></path>' 
                        var daArrowE  = '<path id=\"daArrow_E_' + daID + '\" class=\"' + daID + ' arrow iAni\" d=\"M 265 250 L258.93782217350895 253.5 L258.93782217350895 246.5 Z\" fill=\"#000\" ></path>'  
                        var daArrowW  = '<path id=\"daArrow_W_' + daID + '\" class=\"' + daID + ' arrow iAni\" d=\"M 235 250 L241.06217782649108 246.5 L241.06217782649108 253.5 Z\" fill=\"#000\" ></path>'  
                        
                        var svgStrokeTouch = '';
                        
                        if (this.svgType == "circle" ) {
                            svgStrokeTouch = '<circle id=\"daRadio_' + daID + '\" class=\"' + daID + ' daRadio daR\" cx=\"' + (timeF.divDimension.width * xProp)+ '\" cy=\"' + (timeF.divDimension.height * yProp) + '\" r=\"' + timeF.divDimension.r + '\" style=\"stroke: rgb(0, 0, 0); fill-opacity: 0; stroke-opacity: 0; cursor: pointer; stroke-width: 1%; animation: 0s ease 0s 1 normal none running none; pointer-events: stroke;' 
                                        + '\" onmousedown=\"timeF.animateSVG.moveLoupe.onMouseDown(evt)\" onmousemove=\"timeF.animateSVG.moveLoupe.onMouseMove(evt)\" onmouseup=\"timeF.animateSVG.moveLoupe.onMouseUp(evt)\" ontouchstart=\"timeF.animateSVG.moveLoupe.onMouseDown(evt)\" ontouchmove=\"timeF.animateSVG.moveLoupe.onMouseMove(evt)\" ontouchend=\"timeF.animateSVG.moveLoupe.onMouseUp(evt)\" ontouchcancel=\"timeF.animateSVG.moveLoupe.onMouseUp(evt)\"' 
                                        + '\"></circle></g>' 
                        }

                        if (this.svgType == "vertical") {
                            svgStrokeTouch = '<line id=\"daLine_' + daID + '\" class=\"' + daID + '  iAni verticalLine\" x1=\"' + (timeF.divDimension.width * xProp)+ '\" y1=\"' + (timeF.divDimension.height * 0) + '\" x2=\"' + (timeF.divDimension.width * xProp) + '\" y2=\"' + (timeF.divDimension.height) + '\" xprop=\"' + xProp + '\"' + ' yprop=\"' + yProp + '\"' + ' style=\"stroke: rgb(0, 0, 0); stroke-opacity: .0; cursor: ew-resize; stroke-width: 5%; animation: 0s ease 0s 1 normal none running none; pointer-events: stroke;' 
                                        + '\" onmousedown=\"timeF.animateSVG.moveLoupe.onMouseDown(evt)\" onmousemove=\"timeF.animateSVG.moveLoupe.onMouseMove(evt)\" onmouseup=\"timeF.animateSVG.moveLoupe.onMouseUp(evt)\" ontouchstart=\"timeF.animateSVG.moveLoupe.onMouseDown(evt)\" ontouchmove=\"timeF.animateSVG.moveLoupe.onMouseMove(evt)\" ontouchend=\"timeF.animateSVG.moveLoupe.onMouseUp(evt)\" ontouchcancel=\"timeF.animateSVG.moveLoupe.onMouseUp(evt)\"' 
                                        + '\"></line></g>' 
                        } 

                        if (this.svgType == "horizontal") {
                            svgStrokeTouch = '<line id=\"daLine_' + daID + '\" class=\"' + daID + '  iAni verticalLine\" x1=\"' + (timeF.divDimension.width * 0)+ '\" y1=\"' + (timeF.divDimension.height * yProp) + '\" x2=\"' + (timeF.divDimension.width) + '\" y2=\"' + (timeF.divDimension.height * yProp) + '\" xprop=\"' + xProp + '\"' + ' yprop=\"' + yProp + '\"' + ' style=\"stroke: rgb(0, 0, 0); stroke-opacity: .0; cursor: ns-resize; stroke-width: 5%; animation: 0s ease 0s 1 normal none running none; pointer-events: stroke;' 
                                        + '\" onmousedown=\"timeF.animateSVG.moveLoupe.onMouseDown(evt)\" onmousemove=\"timeF.animateSVG.moveLoupe.onMouseMove(evt)\" onmouseup=\"timeF.animateSVG.moveLoupe.onMouseUp(evt)\" ontouchstart=\"timeF.animateSVG.moveLoupe.onMouseDown(evt)\" ontouchmove=\"timeF.animateSVG.moveLoupe.onMouseMove(evt)\" ontouchend=\"timeF.animateSVG.moveLoupe.onMouseUp(evt)\" ontouchcancel=\"timeF.animateSVG.moveLoupe.onMouseUp(evt)\"' 
                                        + '\"></line></g>' 
                        } 
                        // Apply arrows depending on selection 
                        if (this.svgButton == "none"){var daArrowGroup = '';}
                        if (this.svgButton == "all"|| (timeF.svgButton == '' && (this.svgType == "circle" || this.svgType == "circle-pie"))) {var daArrowGroup =  daArrowN + daArrowS + daArrowE + daArrowW}
                        if (this.svgButton == "NS" || (timeF.svgButton == '' && this.svgType == "horizontal")) {var daArrowGroup =  daArrowN + daArrowS}
                        if (this.svgButton == "EW" || (timeF.svgButton == '' && this.svgType == "vertical")) {var daArrowGroup =  daArrowE + daArrowW}

                        var svgButtons = '<g id=\"gUp' + daID + '\"class=\"upB\"><g  class=\"' + daID + ' daCenterSVG\"' +
                        'stroke=\"none\" stroke-width=\"4\" style=\"pointer-events: fill; position: absolute; cursor: move;\" onmousedown=\"timeF.animateSVG.moveLoupe.onMouseDown(evt)\" onmousemove=\"timeF.animateSVG.moveLoupe.onMouseMove(evt)\" onmouseup=\"timeF.animateSVG.moveLoupe.onMouseUp(evt)\" ontouchstart=\"timeF.animateSVG.moveLoupe.onMouseDown(evt)\" ontouchmove=\"timeF.animateSVG.moveLoupe.onMouseMove(evt)\" ontouchend=\"timeF.animateSVG.moveLoupe.onMouseUp(evt)\" ontouchcancel=\"timeF.animateSVG.moveLoupe.onMouseUp(evt)\">'+
                                            
                                        '<circle id=\"_' + daID + '\" class=\"' + daID + ' iAni daArrowCircle\"' +
                                        'xprop=\"' + xProp + '\"' + 'yprop=\"' + yProp + '\"' +
                                        'cx= \"' + (timeF.divDimension.width * xProp) +
                                        '\" cy= \"' + (timeF.divDimension.height * yProp) +
                                        '\" r=\"20\"' +
                                        '></circle>'  +
                                        '<g id=\"arrowGroup\" transform= \"translate('+ ((timeF.divDimension.width*xProp)-250) + ' ' + ((timeF.divDimension.height*yProp)-250) + ')\" style=\"pointer-events: none\">' + // I had to do the translate to 500 500 since the original shape was based on 500 by 500
                                        daArrowGroup +
                                        '</g></g>' +
                                        svgStrokeTouch
                                        
                        // start If statement to make circle ring and circle mask 
                        if (this.svgType == "circle" || this.svgType == "circle-pie"){ 
                        var svgText = '<text></text>'
                        if (this.text == true){ 
                        var xText = (this.divDimension.width * xProp)// - this.divDimension.fontSize * 5;
                        var yText = (this.divDimension.height * yProp) - this.divDimension.fontSize/2 - this.divDimension.r;
                        svgText = '<text id=\"MaskText_' + daID + '\"' + ' class=\"textC\" x=\"' + xText + '\" y=\"' + yText + '\" style=\"fill:#fff; stroke:rgb(136, 57, 43); stroke-width:2; alignment-baseline: middle; text-anchor: middle; font-size: ' + timeF.divDimension.fontSize + 'px;\">'+ daID + '</text>' 
                        }

                        var svgCircleMaskAndRing = '<clipPath id=\"mask_' + daID + '\"' + 
                            '><circle id=\"maskC_' + daID + '\"' + 'class=\"daC daR' + 
                            '\" cx= \"' + (timeF.divDimension.width * xProp) +
                            '\" cy= \"' + (timeF.divDimension.height * yProp) +
                            '\" r=\"' + timeF.divDimension.r + '\"></circle>' + 
                            svgText +
                            '</clipPath>' +
                            '<circle id=\"daRadioB_' + daID + '\" class=\"' + daID + ' daAnim daRadio daR\" cx=\"' + (timeF.divDimension.width * xProp)+ '\" cy=\"' + (timeF.divDimension.height * yProp) + '\" r=\"' + timeF.divDimension.r + '\" ' 
                            +
                            'style=\"stroke: rgb(0, 0, 0); fill-opacity: 0; stroke-opacity: 0.5; cursor: pointer; stroke-width: 1%;'
                            + '\"></circle>' 
                        svgElem.innerHTML = svgCircleMaskAndRing 
                        } // End of IF creating circle ring and mask
                        // Apply selection of horizontal or vertical SVG 
                        if (this.svgType == "horizontal" || this.svgType == "vertical")
                        { 
                        if(this.svgType == "horizontal" ) {var xProp = 0}
                        if(this.svgType == "vertical" ) {var yProp = 0}

                        var svgRectMask = '<clipPath id=\"mask_' + daID + '\"' + 
                        '><rect id=\"maskC_' + daID + '\"' + 'class=\"daC daR' + 
                        '\" x= \"' + (timeF.divDimension.width * xProp) +
                        '\" y= \"' + (timeF.divDimension.height * yProp) +
                        '\" width=\"' + timeF.divDimension.width + 
                        '\" height=\"' + timeF.divDimension.height  + 
                        '\"></rect>' 
                        svgElem.innerHTML = svgRectMask 
                        }
                        // Apply masks to the leaflet map container div
                        if(this.leaflet == true){
                        iLeafMap.appendChild(svgElem)
                        this.leafMaps[i]._container.style.clipPath = 'url(#mask_' + daID + ')';
                        this.leafMaps[i]._container.style.webkitClipPath  = 'url(#mask_' + daID + ')';
                        this.leafMaps[i]._container.style.zIndex = "999";
                        }
                        // Apply masks to the containers of the imgs
                        if(this.leaflet == false){
                            document.getElementById(this.divNames[i]).appendChild(svgElem)
                            document.getElementById(this.divNames[i]).style.clipPath = 'url(#mask_' + daID + ')';
                            document.getElementById(this.divNames[i]).style.webkitClipPath  = 'url(#mask_' + daID + ')';
                            document.getElementById(this.divNames[i]).style.zIndex = "999";
                        }
                        document.getElementById(this.divContainer).append(document.getElementById(this.divNames[i]))// version i works with Firefox and Chrome however safari has the zindex issue. I am going to first try to put all svg in the same div then on the same
                        // I made this version for the safari issues
                        daInnerHTML = daInnerHTML + svgButtons
                        }                     
                            svgParentElem.innerHTML = daInnerHTML; // safari issue solved with parentSVG above all divs
                            // this is important 
                            if(this.leaflet == true){
                            svgParentElem.setAttributeNS(null, "class", "leaflet-control")
                            this.leafMaps[0]._container.getElementsByClassName("leaflet-control-container")[0].appendChild(svgParentElem)
                            }
                            if(this.leaflet == false){
                                document.getElementById(this.divNames[0]).appendChild(svgParentElem)
                            }

                        },
    filterArray:["none","sepia(25%)","sepia(50%)","sepia(75%)","sepia(100%)"],
    assignFilters: function(filterArray){
        if (filterArray == null){filterArray = this.filterArray};
        if (filterArray.length != this.divNames.length){return console.log("div array not equal size of filter array")};
        if (this.leaflet == true) {this.divNames.forEach((e,i)=>document.getElementById(e).querySelectorAll(".leaflet-tile-pane").forEach(pane=> pane.style.filter = this.filterArray[i])) }
        if (this.leaflet == false) {this.divNames.forEach((e,i)=>document.getElementById(e).style.filter = filterArray[i])}

    },
    makePies: function(divArray, iRad){ 
        if (iRad == null){iRad = .628;} // orginally was 36 degrees I changed it to radians
        var pies = divArray[0]
        var iInputAngle = iRad
        {for(i=1; i<divArray.length; i++)
                    {pies = pies+"."+divArray[i]}        
                }
        //var svgParent = document.getElementById('SVGparent');
        var daSVG0 = document.getElementById("svg_" + divArray[0])
        if (daSVG.getAttribute('pies') == null)
        {var maskOrPath = "maskC_"}
        else 
        {var maskOrPath = "path_"}
        var daMask0 = document.getElementById(maskOrPath + divArray[0])
        var daRadioB = document.getElementById("daRadioB_" + divArray[0])
        var viewBox0 = daSVG0.getAttribute('viewBox')
        var daRadioCX = daRadioB.getAttribute('cx')
        var daRadioCY = daRadioB.getAttribute('cy')
        var daRadioR = daRadioB.getAttribute('r')
        var r = parseFloat(daMask0.getAttribute("r"));
        var xCenter = parseFloat(daMask0.getAttribute("cx"));
        var yCenter = parseFloat(daMask0.getAttribute("cy"));
        var nSVG = divArray.length
        
        for (var i = 0; i < nSVG; i++){ 
            //remove the pointer from the rings 
            if(i>0){document.querySelectorAll("circle.daR."+divArray[i]).forEach(e=>e.style.pointerEvents = "none")}
            // remove the rotator circles
          if(timeF.animateSVG.moveLoupe.circleRotator == false){
          document.querySelectorAll("."+ divArray[i]+".rotator").forEach(e=>e.parentNode.remove())
        }
          var daSVGmerge = document.getElementById("svg_" + divArray[i])
          var daMask = document.getElementById("mask_" + divArray[i])
          var sAngle = (Math.PI*2)/nSVG
          var daMx = (xCenter + Math.sin(iRad)*r)
          var daMy = (yCenter - Math.cos(iRad)*r)
          var daMx2 = (xCenter + Math.sin(iRad+sAngle)*r)
          var daMy2 = (yCenter - Math.cos(iRad+sAngle)*r)
          //Need to make a better calculation of the size of the arc size. 
          var daMxText = (xCenter + Math.sin(iRad+(sAngle*.45))*(r+timeF.divDimension.fontSize/2))
          var daMyText = (yCenter - Math.cos(iRad+(sAngle*.45))*(r+timeF.divDimension.fontSize/2))
          var daMx2Text = (xCenter + Math.sin(iRad+(sAngle*.55))*(r+timeF.divDimension.fontSize/2))
          var daMy2Text = (yCenter - Math.cos(iRad+(sAngle*.55))*(r+timeF.divDimension.fontSize/2))

          iRad = iRad+sAngle
  
          var daSection = "M "+daMx+" "+daMy+
                          "A "+r+" "+r+", 0, 0, 1, "+daMx2+" "+daMy2+
                          "L "+xCenter+" "+yCenter+" Z"
          var daTextSection = "M "+daMxText+" "+daMyText+
                            "A "+(r+timeF.divDimension.fontSize/2)+" "+(r+timeF.divDimension.fontSize/2)+", 0, 0, 1, "+daMx2Text+" "+daMy2Text+
                            "L "+xCenter+" "+yCenter+" Z"
        // var daText =  '<text x=\"' + daMxText + '\" y=\"' + daMyText + '\" style=\"fill:#fff; stroke:rgb(136, 57, 43); stroke-width:2; alignment-baseline="middle" text-anchor="middle"; font-size: ' + timeF.divDimension.fontSize + 'px;\">'+ divArray[i] + '</text>' 
        // this previous version the text is like a ferryswheel. 

        // this next version the text is fallows the path  
        // var daText ='<text id=\"'+ 'textPath_'+ divArray[i]+'\" x=\"' + daMxText + '\" y=\"' + daMyText + '\"><textPath href=\"#path_' +divArray[i] + '\">'+
        //                     divArray[i] + '</textPath></text>'

          var daTextPath =  '<path id=\"pathText_'+divArray[i]+ '\" class=\"pies ' + divArray[0] + '\" cx=\"' + xCenter + '\" cy=\"' 
          + yCenter + '\" r=\"' + r + '\" d=\"' + daTextSection + '\" style=\"stroke-width:0; stroke: rgb(0, 0, 0); fill: none;\"></path>' 

          if (document.getElementById('pathText_'+divArray[i])){
            var daPath = document.getElementById('pathText_'+divArray[i])
            // daPath.outerHTML = daTextPath // another method but does not work well in Safari
            daPath.setAttribute('d',daTextSection)
   
        }
          var daText =  '<text style=\"alignment-baseline:middle;  ' + timeF.divDimension.fontSize +' ;\"><textPath href=\"#pathText_' + divArray[i] + '\">'+
                            divArray[i] + '</textPath></text>'
          
          daMask.innerHTML = '<path id=\"path_'+divArray[i]+ '\" class=\"daC pies ' + divArray[0] + '\" cx=\"' + xCenter + '\" cy=\"' 
                            + yCenter + '\" r=\"' + r + '\" d=\"' + daSection + '\" fill=\"#fdcc8a\"></path>' 
                            + daText
        var xmlns = "http://www.w3.org/2000/svg";
        var circle = document.createElementNS(xmlns, "g");
            circle.setAttributeNS('null', "class", "bRot");
                var daInnerHTML = '<circle id=\"rotator_' + divArray[i] + '\" class=\"' + divArray[0] + ' ' + divArray[i] + ' rotator'+ '\" cx=\"' + daMx + '\" cy=\"' + daMy + '\" r=\"' + 20 + '\" '
                                        + 'xprop=\"' + xCenter + '\" yprop=\"' + yCenter + '\" '
                                        + 'lpie=\"'  + divArray.toString() + '"\ '
                                        + 'pierot=\"'  + iInputAngle + '\" '
                                        + '\" style=\"stroke: rgb(0, 0, 0); fill-opacity: 0; stroke-opacity: 0; cursor: pointer; stroke-width: 1%;  pointer-events: fill;' 
                                        + '\" onmousedown=\"timeF.animateSVG.moveLoupe.onMouseDown(evt)\" onmousemove=\"timeF.animateSVG.moveLoupe.onMouseMove(evt)\" onmouseup=\"timeF.animateSVG.moveLoupe.onMouseUp(evt)\" ontouchstart=\"timeF.animateSVG.moveLoupe.onMouseDown(evt)\" ontouchmove=\"timeF.animateSVG.moveLoupe.onMouseMove(evt)\" ontouchend=\"timeF.animateSVG.moveLoupe.onMouseUp(evt)\" ontouchcancel=\"timeF.animateSVG.moveLoupe.onMouseUp(evt)\"' 
                                        + ' ></circle>' + daTextPath
                                        circle.innerHTML = daInnerHTML

        document.getElementById("SVGparent").appendChild(circle)                   
        // annoying Safari
        daSVGmerge.parentNode.appendChild(daSVGmerge).appendChild(daMask);
      
        if (i > 0){
        daRadioBi = document.getElementById("daRadioB_" + divArray[i])
        daSVGmerge.setAttributeNS(null,"viewBox",viewBox0)
        daRadioBi.setAttributeNS(null,"cx",daRadioCX)
        daRadioBi.setAttributeNS(null,"cy",daRadioCY)
        daRadioBi.setAttributeNS(null,"r",daRadioR)
    }
        daSVG.setAttributeNS("null","pies", pies)
        daSVG.setAttributeNS("null","rotation", iInputAngle)
          }
        },
    svgPiesObjs:[],
    svgPiesArray: [],
    animateSVG : {  
                    newP: { x: 0, y: 0 }, 
                    newR: 0,
                    position: { x: 0, y: 0 },
                    activeSVG: null, // the index of the active SVG
                    pieRot: 0,
                    activePies:"",
                    pieRotInit:0,
                    pieRotDelta:0,
                    setActiveSVG: function(){for(i=0; i<timeF.divNames.length;i++){
                                        if(this.moveLoupe.currentID == timeF.divNames[i]){timeF.animateSVG.activeSVG = i};};
                                    },
                    updatePosition: function(){
                                                this.positionArray = []
                                                var daC = document.getElementsByClassName("daC")
                                                for (i=0; i<daC.length; i++){
                                                    var daObj = {   id: daC[i].getAttribute("id").split("_")[1], 
                                                                    x: daC[i].getAttribute("cx"), 
                                                                    y: daC[i].getAttribute("cy"), 
                                                                    r: daC[i].getAttribute("r")
                                                                }
                                                                this.positionArray.push(daObj);
                                                }
                                            },
                    positionArray: [], // {id:"back",x:0,y:0,r:0} working with pies so each cicle "knows" their relative distance
                    mergeSVG: false, // i am going to use this to instruct if it is ok to merge the circles
                    distanceArray: [0],// an array that will know the relative distance to the active circle
                    insideArray: [false],
                    calculateDistance: function(){
                                        this.distanceArray = []
                                        this.insideArray = []
                                        var curI = 0;
                                        var curX = 0;
                                        var curY = 0;
                                        var curR = 0;
                        
                                        for (i=0;i < this.positionArray.length; i++){
                                            if (this.positionArray[i].id === this.moveLoupe.currentID) // make this better
                                            {   curI = i
                                                curX = this.positionArray[i].x; 
                                                curY = this.positionArray[i].y
                                                curR = this.positionArray[i].r
                                            }
                                        }
                            
                                        for(i=0;i < this.positionArray.length; i++){
                                            var isInside = 0
                                            var elObj = this.positionArray[i]
                                            var newDis = Math.sqrt( Math.pow((curX - elObj.x),2) + Math.pow((curY - elObj.y),2))
                                            this.distanceArray.push(newDis)
                                            if (newDis > 0 && newDis < curR/2 && this.positionArray[i].id != this.moveLoupe.currentID) { // made smaller rad
                                                                    isInside = 1;
                                                                    if (this.mergeSVG == true){
                                                                        var divArray = []
                                                                        if (daSVG.getAttribute('pies') == null) {
                                                                            divArray=[this.positionArray[curI].id, this.positionArray[i].id];
                                                                            document.querySelectorAll(".iAni."+this.positionArray[i].id).forEach(e=>e.parentNode.removeChild(e))
                                                                            // this.positionArray.splice(i,1)
                                                                        }
                                                                        else {  divArray = daSVG.getAttribute("pies").split('.');
                                                                                divArray.push(this.positionArray[i].id);
                                                                                document.querySelectorAll(".iAni."+this.positionArray[i].id).forEach(e=>e.parentNode.removeChild(e))
                                                                                var rotation = parseFloat(daSVG.getAttribute("rotation"))
                                                                                timeF.makePies(divArray, rotation);
                                                                                return false}
                                                                        timeF.makePies(divArray)}
                                            };
                                            if (this.positionArray[i].id === this.moveLoupe.currentID) {isInside = -1}
                                            this.insideArray.push(isInside)
                                            };
                                        },
                    minDistance: 10, // minimum distance for the circles to be merged 
                    mousedown: 0, 
                    addListerners: function(){
                        window.addEventListener("mouseup", timeF.animateSVG.moveLoupe.onMouseUp);
                    },
                    radioAnimationOn: function(classQuery) {
                        daAnim = document.querySelectorAll(classQuery)
                        for (i = 0; i < daAnim.length; i++) {
                          daAnim[i].style.strokeWidth= "1%";
                          daAnim[i].style.animation = "dash .4s linear"
                          daAnim[i].style.animationIterationCount = "1" ;
                        //   daAnim[i].style.animationDuration = ".4s";
                         daAnim[i].style.animationDirection = "reverse"
                              } 
                    },
                    radioAnimationOff: function(classQuery){
                        daAnim = document.querySelectorAll(classQuery)
                            for (i = 0; i < daAnim.length; i++) {
                              daAnim[i].style.strokeWidth= "1%";
                              daAnim[i].style.animation = "none"; 
                                  } 
                    },
                    aniArrowsInit: function(classQuery){ 
                                    setTimeout(function(){timeF.animateSVG.animationApagao(classQuery); timeF.animateSVG.radioAnimationOff(".daAnim")},4000);
                        },
                    animationApagao: function (classQuery){
                                daArrows = document.querySelectorAll(classQuery);
                                for (i = 0; i < daArrows.length; i++) {
                                daArrows[i].style.animation = "none" ;
                                    }
                        },
                    radioStrikeOn: function(classQuery) {
                        daAnim = document.querySelectorAll(classQuery);
                            for (i = 0; i < daAnim.length; i++) {
                              daAnim[i].style.strokeWidth= "6%";
                              daAnim[i].style.animation = "none"; 
                            }
                            },
                    moveLoupe: {
                        currentID:"",
                        ownerDiv: null,
                        ownerSVG: null,
                        circleMove: false,
                        circleRadio: false,
                        circleRotator: false,
                        xCirculo: 0,
                        yCirculo: 0,
                        offset: null,

                        onClick: function(){
                            timeF.animateSVG.moveLoupe.onMouseUp();
                        },

                        getMouse: function (evt){
                                    timeF.animateSVG.position.x = evt.clientX;
                                    timeF.animateSVG.position.y = evt.clientY;
                                    return timeF.animateSVG.position
                                    },
                   
                        onMouseDown: function(evt){
                                // Loop to dissable the Leaflet dragging // change to an arrow forEach function 
                                if(timeF.leaflet == true){
                                for (i=0; i<timeF.leafMaps.length; i++) {
                                    timeF.leafMaps[i].dragging.disable()
                                    }}
                                    // maybe do an if statemet to make it not ittarate eavery time, 
                                    document.querySelectorAll(".daAnim, .arrow").forEach(e=>e.style.animation = "none")
                                    timeF.animateSVG.moveLoupe.currentID = evt.target.getAttribute("class").split(" ")[0] // gets the ID from the class //there has to be a better way
                                    daSVG = document.getElementById("svg_" + timeF.animateSVG.moveLoupe.currentID)
                                    daSVGbutton = evt.target
                                    if (daSVGbutton.nodeName == 'line'){daSVGbutton = document.getElementById(daSVGbutton.id.split("daLine")[1])}
                                    var daCircle = evt.target
                                    if (daSVGbutton.nodeName == 'line'){daCircle = document.getElementById(daSVGbutton.id.split("daLine")[1])}
                                    timeF.divDimension.xProp = parseFloat(daCircle.getAttribute("xprop"))
                                    timeF.divDimension.yProp = parseFloat(daCircle.getAttribute("yprop"))
                                    
                                    //If statement has pie rotator
                                    if (evt.target.getElementsByClassName("rotator")){
                                    timeF.animateSVG.moveLoupe.activePies = daCircle.getAttribute('lpie')
                                    timeF.animateSVG.moveLoupe.pieRot = parseFloat(daCircle.getAttribute('pierot'))}
                                    timeF.animateSVG.moveLoupe.ownerSVG = daSVG;
                                    
                                    if (timeF.leaflet == true){timeF.animateSVG.moveLoupe.ownerDiv = timeF.animateSVG.moveLoupe.ownerSVG.parentElement.parentElement;}
                                    else {timeF.animateSVG.moveLoupe.ownerDiv = timeF.animateSVG.moveLoupe.ownerSVG.parentElement}
                                    
                                    timeF.animateSVG.moveLoupe.offset = timeF.animateSVG.moveLoupe.ownerDiv.getBoundingClientRect()
                                   
                                    daC = daSVG.getElementsByClassName("daC")
                                        for (i=0; i<daC.length;i++){ //THERE HAS TO BE A BETTER WAY
                                            timeF.animateSVG.moveLoupe.xCirculo = parseInt(daC[i].getAttribute("cx"))
                                            timeF.animateSVG.moveLoupe.yCirculo = parseInt(daC[i].getAttribute("cy"))
                                         }
                                        // TO DO make false statments of other circleMove circleRadio circleRotator
                                        //Start if statment of rotator
                                        if (evt.target.classList.contains("rotator") && timeF.animateSVG.moveLoupe.circleMove == false && timeF.animateSVG.moveLoupe.circleRadio == false) 
                                        {//
                                        timeF.animateSVG.moveLoupe.circleRotator = true; 
                                        
                                        daRadio = document.querySelectorAll('.'+timeF.animateSVG.moveLoupe.currentID+'.daR')
                                        for (i=0;i < daRadio.length; i++){
                                            daRadio[i].style.pointerEvents  = "none";
                                        }
                                        daRing = timeF.animateSVG.moveLoupe.ownerSVG.getElementsByClassName("iAni");
                                        for (i=0;i < daRing.length; i++){
                                            daRing[i].style.pointerEvents  = "none";
                                        }    
                                        timeF.animateSVG.bmousedown=3;
                                        } // END IF statement of Rotator

                                    //// Start IF statement of Radio (ring)
                                    if (evt.target.classList.contains("daRadio") && timeF.animateSVG.moveLoupe.circleMove == false) 
                                        {//
                                        timeF.animateSVG.moveLoupe.circleRadio = true; 
                                        
                                        if(daSVG.getAttribute('pies'))
                                            {daSVG.getAttribute("pies").split('.').forEach(e=>timeF.animateSVG.radioStrikeOn('.'+e+'.daR.daAnim'))}
                                        else{timeF.animateSVG.radioStrikeOn('.'+timeF.animateSVG.moveLoupe.currentID+'.daR.daAnim')}                                                
                                        

                                        daRing = timeF.animateSVG.moveLoupe.ownerSVG.getElementsByClassName("iAni");
                                        for (i=0;i < daRing.length; i++){
                                            daRing[i].style.pointerEvents  = "none";
                                        }    
                                        timeF.animateSVG.bmousedown=2;
                                        } // END IF statement of Radio 
                                    
                                    // Start if statement on Arrow and center button 
                                    if (evt.target.classList.contains("iAni") && timeF.animateSVG.moveLoupe.circleRadio == false) 
                                        {
                                        timeF.animateSVG.moveLoupe.circleMove = true; 
                                        if(daSVG.getAttribute('pies'))
                                        {daSVG.getAttribute("pies").split('.').forEach(e=>timeF.animateSVG.radioAnimationOff('.'+e+'.daR.daAnim'))}
                                        else{timeF.animateSVG.radioAnimationOff('.'+timeF.animateSVG.moveLoupe.currentID+'.daR.daAnim');}   
                                        daCenterSVG = document.querySelectorAll( '.'+timeF.animateSVG.moveLoupe.currentID+'.daCenterSVG')            
                                        
                                        for (i=0;i < daCenterSVG.length; i++){
                                            daCenterSVG[i].style.animation  = "none"
                                            daCenterSVG[i].style.opacity  = ".5"
                                        }    
                                
                                        daRadio = document.querySelectorAll('.'+timeF.animateSVG.moveLoupe.currentID+'.daR')
                                        for (i=0;i < daRadio.length; i++){
                                            daRadio[i].style.pointerEvents  = "none";
                                        }    
                                        timeF.animateSVG.bmousedown=1;                                      
                                        }
                                    // End IF statement on Arrow and center button                            
                                    
                                    // If statement for touch events // I should do more research on this but it worked at least for cellphones
                                    if (evt.touches){
                                            timeF.animateSVG.newP=timeF.animateSVG.moveLoupe.getMouse(evt.touches[0])
                                            if (timeF.animateSVG.moveLoupe.circleRotator == true)
                                            {timeF.animateSVG.moveLoupe.pieRotInit = Math.PI - Math.atan2((timeF.animateSVG.newP.x - timeF.divDimension.xProp),(timeF.animateSVG.newP.y - timeF.divDimension.yProp))
                                            }
                                            timeF.animateSVG.moveLoupe.doUpdate(evt) // veryfy touchscreen
                                           }
                                    else{
                                            timeF.animateSVG.newP=timeF.animateSVG.moveLoupe.getMouse(evt);
                                            if (timeF.animateSVG.moveLoupe.circleRotator == true)
                                            {timeF.animateSVG.moveLoupe.pieRotInit = Math.PI - Math.atan2((timeF.animateSVG.newP.x - timeF.divDimension.xProp),(timeF.animateSVG.newP.y - timeF.divDimension.yProp))
                                                }
                                           
                                            timeF.animateSVG.moveLoupe.doUpdate(evt);
                                        }
                                    
                                    window.addEventListener("mousemove", timeF.animateSVG.moveLoupe.onMouseMove);
                                    window.addEventListener("click", timeF.animateSVG.moveLoupe.onClick);
                                },

                            onMouseMove: function(evt) {

                                    // If statements to turn off radio pointer
                                    if((timeF.animateSVG.bmousedown == 1 || timeF.animateSVG.bmousedown == 3) && (timeF.animateSVG.moveLoupe.circleMove == true || timeF.animateSVG.moveLoupe.circleRotator == true)){
                                    daRadio = document.querySelectorAll('.'+timeF.animateSVG.moveLoupe.currentID+'.daR')
                                            for (i=0;i < daRadio.length; i++){
                                                daRadio[i].style.pointerEvents  = "none";
                                            }}
                                    // If statements to turn off center pointer
                                    if((timeF.animateSVG.bmousedown == 2 || timeF.animateSVG.bmousedown == 3) && (timeF.animateSVG.moveLoupe.circleRadio == true || timeF.animateSVG.moveLoupe.circleRotator == true)){
                                    daRing = timeF.animateSVG.moveLoupe.ownerSVG.getElementsByClassName("iAni");
                                        for (i=0;i < daRing.length; i++){
                                            daRing[i].style.pointerEvents  = "none";
                                        }  
                                    }

                                    if(timeF.animateSVG.bmousedown != 3 && (timeF.animateSVG.moveLoupe.circleRadio == true || timeF.animateSVG.moveLoupe.circleMove == true)){
                                        document.querySelectorAll(".rotator").forEach(e=>e.style.pointerEvents  = "none")}

                                    if(evt.touches)
                                    {timeF.animateSVG.newP = timeF.animateSVG.moveLoupe.getMouse(evt.touches[0])
                                        if (timeF.animateSVG.moveLoupe.circleRotator == true){
                                            var delta = (Math.PI - Math.atan2((timeF.animateSVG.newP.x - timeF.divDimension.xProp),(timeF.animateSVG.newP.y - timeF.divDimension.yProp))) - timeF.animateSVG.moveLoupe.pieRotInit
                                            if (!isNaN(delta)) {timeF.animateSVG.moveLoupe.pieRotDelta =  delta}
                                        }
                                        timeF.animateSVG.moveLoupe.doUpdate(evt)
                                    }
                                    else{timeF.animateSVG.newP = timeF.animateSVG.moveLoupe.getMouse(evt);
                                        if (timeF.animateSVG.moveLoupe.circleRotator == true){
                                            var delta = (Math.PI - Math.atan2((timeF.animateSVG.newP.x - timeF.divDimension.xProp),(timeF.animateSVG.newP.y - timeF.divDimension.yProp))) - timeF.animateSVG.moveLoupe.pieRotInit
                                            if (!isNaN(delta)) {timeF.animateSVG.moveLoupe.pieRotDelta =  delta}
                                            }
                                        timeF.animateSVG.moveLoupe.doUpdate(evt)};
                                    },
                                
                            onMouseUp: function() {
                                    if (timeF.animateSVG.moveLoupe.circleRotator == true)
                                    {timeF.animateSVG.bmousedown=0;
                                    timeF.animateSVG.moveLoupe.circleRotator = false;
                                    timeF.makePies( timeF.animateSVG.moveLoupe.activePies.split(","),(timeF.animateSVG.moveLoupe.pieRot + timeF.animateSVG.moveLoupe.pieRotDelta))
                                    daRadio = document.querySelectorAll('.'+timeF.animateSVG.moveLoupe.currentID+'.daR');
                                            for (i=0;i < daRadio.length; i++){
                                                daRadio[i].style.pointerEvents  = "stroke";
                                            } 
                                    if(timeF.leaflet == true){
                                    for (i=0; i<timeF.leafMaps.length; i++) {
                                        timeF.leafMaps[i].dragging.enable()
                                    }
                                    }}
                                    //If statements to activate the radio animation
                                    if(timeF.animateSVG.bmousedown==2) {
                                        if(daSVG.getAttribute('pies'))
                                        {daSVG.getAttribute("pies").split('.').forEach(e=>timeF.animateSVG.radioAnimationOn('.'+e+'.daR.daAnim'))}
                                        else{timeF.animateSVG.radioAnimationOn('.'+timeF.animateSVG.moveLoupe.currentID+'.daR.daAnim');}                                           
                                        //Enable leaflet dragging 
                                        if(timeF.leaflet == true){
                                        for (i=0; i<timeF.leafMaps.length; i++) {
                                            timeF.leafMaps[i].dragging.enable()
                                        } 
                                    }}
                                    //Enable leaflet dragging
                                    if(timeF.leaflet == true){
                                    for (i=0; i<timeF.leafMaps.length; i++) {
                                        timeF.leafMaps[i].dragging.enable()
                                    }}
                                    // Start IF statment if working moving the center of the circle
                                    if (timeF.animateSVG.moveLoupe.circleMove == true) {
                                        daRadio = document.querySelectorAll('.'+timeF.animateSVG.moveLoupe.currentID+'.daR');

                                            for (i=0;i < daRadio.length; i++){
                                                daRadio[i].style.pointerEvents  = "stroke";
                                            }    
                                        timeF.animateSVG.bmousedown=0;
                                        timeF.animateSVG.moveLoupe.circleMove=false;
                                        daCenterSVG = document.querySelectorAll( '.'+timeF.animateSVG.moveLoupe.currentID+'.daCenterSVG')            
                                        
                                        for (i=0;i < daCenterSVG.length; i++){
                                            daCenterSVG[i].style.opacity  = "0"
                                            daCenterSVG[i].style.animation  = "cirCenterAni2 1.5s linear"

                                        }  
                                    } // End IF statement of moving center
                                    // Start IF statment if working with the Radio (ring)
                                    if (timeF.animateSVG.moveLoupe.circleRadio == true){
                                        timeF.animateSVG.bmousedown=0;
                                        timeF.animateSVG.moveLoupe.circleRadio=false;
                                        daRing = timeF.animateSVG.moveLoupe.ownerSVG.getElementsByClassName("iAni");
                                        for (i=0;i < daRing.length; i++){
                                            daRing[i].style.pointerEvents  = "fill";
                                        }
                                        daC = daSVG.getElementsByClassName("daC")
                                        for (i=0; i<daC.length;i++){ //THERE HAS TO BE A BETTER WAY
                                            timeF.animateSVG.moveLoupe.xCirculo = parseInt(daC[i].getAttribute("cx"))
                                            timeF.animateSVG.moveLoupe.yCirculo = parseInt(daC[i].getAttribute("cy"))
                                         }
                                    }  // End IF statement of radio     
                                },       
                                doUpdate: function (){  
                                    
                                    daMap = timeF.animateSVG.moveLoupe.ownerDiv
                                    daSVG = timeF.animateSVG.moveLoupe.ownerSVG
                                    //Start IF statement for rotator
                                    if (timeF.animateSVG.moveLoupe.circleRotator == true)
                                        {
                                            if(isNaN(timeF.animateSVG.moveLoupe.pieRotDelta)) {timeF.animateSVG.moveLoupe.pieRotDelta = 0}
                                            timeF.makePies( timeF.animateSVG.moveLoupe.activePies.split(","),(timeF.animateSVG.moveLoupe.pieRot + timeF.animateSVG.moveLoupe.pieRotDelta))
                                        }
                                    // Start IF statment if working with the Radio (ring)
                                    if (timeF.animateSVG.moveLoupe.circleRadio == true) {
                                        

                                        xD = Math.sqrt( Math.pow((timeF.animateSVG.newP.x - timeF.animateSVG.moveLoupe.offset.x - timeF.animateSVG.moveLoupe.xCirculo),2) + Math.pow((timeF.animateSVG.newP.y - timeF.animateSVG.moveLoupe.offset.y -timeF.animateSVG.moveLoupe.yCirculo),2))
                                        if (xD > 0 ){ 

                                            rRadio = xD    
                                            daRadio = document.querySelectorAll('.'+timeF.animateSVG.moveLoupe.currentID+'.daR')
                                                for (i=0; i<daRadio.length;i++){
                                              daRadio[i].setAttributeNS(null,'r',rRadio) 
                                                }       
                                            var daProp = daSVG.getBoundingClientRect().height/timeF.divDimension.height                 
                                            daC = daSVG.getElementsByClassName("daC") //
                                            for (i=0; i<daC.length;i++){
                                            daC[i].setAttributeNS(null,'r',rRadio * daProp);
                                            } 
                                            if (daSVG.getAttribute('pies') != null){
                                                var rotation = parseFloat(daSVG.getAttribute("rotation"))
                                                timeF.makePies(daSVG.getAttribute('pies').split('.'),rotation)}
                                             document.getElementById(timeF.divContainer).append(daMap)
                                            //  timeF.animateSVG.newR = rRadio;
                                             timeF.animateSVG.updatePosition()
            
                                        }
                                    } // End IF statement of radio size change 
                                    // Start IF statment if working moving the center of the circle
                                    else if(timeF.animateSVG.moveLoupe.circleMove == true){
                                        bboxX= -1*(timeF.animateSVG.newP.x- 
                                            timeF.divDimension.xProp * timeF.divDimension.width
                                            - timeF.animateSVG.moveLoupe.offset.x);// CHECK THE 250 math 
                                        bboxY = -1*(timeF.animateSVG.newP.y- // bef -1 using bbox
                                            timeF.divDimension.yProp * timeF.divDimension.height 
                                            - timeF.animateSVG.moveLoupe.offset.y);
                                        if (timeF.svgType == "vertical") {
                                            bboxY = 0
                                            if (bboxX > timeF.divDimension.width/2) {bboxX = timeF.divDimension.width/2}    // change the 2 to a xProp value
                                            if (bboxX < -1*timeF.divDimension.width/2) {bboxX = -1*timeF.divDimension.width/2}
                                            }
                                        if (timeF.svgType == "horizontal") {
                                            bboxX = 0
                                            if (bboxY > timeF.divDimension.height/2) {bboxY = timeF.divDimension.height/2}    // change the 2 to a xProp value
                                            if (bboxY < -1*timeF.divDimension.height/2) {bboxY = -1*timeF.divDimension.height/2}
                                            
                                        }
                                        newViewBox = bboxX + "," + bboxY + "," + timeF.divDimension.width + "," + timeF.divDimension.height;
                                        daSVG.setAttributeNS(null, "viewBox", newViewBox)
                                     
                                        daSVGbutton.parentElement.parentElement.setAttributeNS(null, "transform", 'translate(' +  -1*bboxX + ' ' +  -1*bboxY + ')')                                      
                                        xdis = daSVGbutton.getBoundingClientRect().x - document.getElementById(timeF.divContainer).getBoundingClientRect().x + daSVGbutton.getBoundingClientRect().width/2
                                        ydis = daSVGbutton.getBoundingClientRect().y - document.getElementById(timeF.divContainer).getBoundingClientRect().y + daSVGbutton.getBoundingClientRect().height/2                                        
                                        var daC = daSVG.getElementsByClassName("daC")
                                        if (timeF.svgType == "circle"){
                                        for (i=0; i<daC.length;i++){
                                            daC[i].setAttributeNS(null,'cx',xdis)
                                            daC[i].setAttributeNS(null,'cy',ydis) 
                                            
                                            if (daSVG.getAttribute('pies') != null){
                                                var rotation = parseFloat(daSVG.getAttribute("rotation"))
                                                timeF.makePies(daSVG.getAttribute('pies').split('.'),rotation)}
                                            }
                                            if (timeF.text == true){
                                                daText = daSVG.getElementsByClassName('textC')
                                                for (i=0; i<daText.length;i++){
                                                    daText[i].setAttributeNS(null,'x',xdis)
                                                    daText[i].setAttributeNS(null,'y',ydis - timeF.divDimension.fontSize/2 - timeF.divDimension.r) 
                                            }};
                                        }

                                        if (timeF.svgType == "vertical" && xdis > 0){ 
                                            for (i=0; i<daC.length;i++){
                                                daC[i].setAttributeNS(null,'x',xdis)
                                                }
                                        }
                                        if (timeF.svgType == "horizontal" && ydis > 0){ // ydis might be usefull to make the moving windows
                                            for (i=0; i<daC.length;i++){
                                                daC[i].setAttributeNS(null,'y',ydis)
                                                }
                                        }
                                        timeF.animateSVG.updatePosition()
                                        timeF.animateSVG.calculateDistance()
                                        document.getElementById(timeF.divContainer).append(daMap)                                    
                                    } // End IF statmenet if moving the center of the circle
                                },
                                                    }, // End of moveLoupe object                      
                } //End of animSVG object
 
} // end of Time Filter Object