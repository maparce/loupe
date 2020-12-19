var style = document.documentElement.style;
function falseFn() { return false; }
function svgCreate(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}
var miBrowser = {
    daTest: userAgentContains('webkit'),
    ie : 'ActiveXObject' in window,
    
// @property ielt9: Boolean; `true` for Internet Explorer versions less than 9.
    ielt9 : this.ie && !document.addEventListener,

// @property edge: Boolean; `true` for the Edge web browser.
edge : 'msLaunchUri' in navigator && !('documentMode' in document),

// @property webkit: Boolean;
// `true` for webkit-based browsers like Chrome and Safari (including mobile versions).
webkit : userAgentContains('webkit'),

// @property android: Boolean
// `true` for any browser running on an Android platform.
android : userAgentContains('android'),

// @property android23: Boolean; `true` for browsers running on Android 2 or Android 3.
android23 : userAgentContains('android 2') || userAgentContains('android 3'),

/* See https://stackoverflow.com/a/17961266 for details on detecting stock Android */
webkitVer : parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), // also matches AppleWebKit
// @property androidStock: Boolean; `true` for the Android stock browser (i.e. not Chrome)
androidStock : this.android && userAgentContains('Google') && webkitVer < 537 && !('AudioNode' in window),

// @property opera: Boolean; `true` for the Opera browser
opera : !!window.opera,


// @property chrome: Boolean; `true` for the Chrome browser.
chrome : !this.edge && userAgentContains('chrome'),

// @property gecko: Boolean; `true` for gecko-based browsers like Firefox.
gecko : userAgentContains('gecko') && !this.webkit && !this.opera && !this.ie,

// @property safari: Boolean; `true` for the Safari browser.
safari : !this.chrome && userAgentContains('safari'),

phantom : userAgentContains('phantom'),

// @property opera12: Boolean
// `true` for the Opera browser supporting CSS transforms (version 12 or later).
opera12 : 'OTransition' in style,

// @property win: Boolean; `true` when the browser is running in a Windows platform
win : navigator.platform.indexOf('Win') === 0,

// @property ie3d: Boolean; `true` for all Internet Explorer versions supporting CSS transforms.
ie3d : this.ie && ('transition' in style),

// @property webkit3d: Boolean; `true` for webkit-based browsers supporting CSS transforms.
webkit3d : ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !this.android23,

// @property gecko3d: Boolean; `true` for gecko-based browsers supporting CSS transforms.
gecko3d : 'MozPerspective' in style,

// @property any3d: Boolean
// `true` for all browsers supporting CSS transforms.
any3d : !window.L_DISABLE_3D && (this.ie3d || this.webkit3d || this.gecko3d) && !this.opera12 && !this.phantom,

// @property mobile: Boolean; `true` for all browsers running in a mobile device.
mobile : typeof orientation !== 'undefined' || userAgentContains('mobile'),

// @property mobileWebkit: Boolean; `true` for all webkit-based browsers in a mobile device.
mobileWebkit : this.mobile && wthis.ebkit,

// @property mobileWebkit3d: Boolean
// `true` for all webkit-based browsers in a mobile device supporting CSS transforms.
mobileWebkit3d : this.mobile && this.webkit3d,

// @property msPointer: Boolean
// `true` for browsers implementing the Microsoft touch events model (notably IE10).
msPointer : !window.PointerEvent && window.MSPointerEvent,

// @property pointer: Boolean
// `true` for all browsers supporting [pointer events](https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx).
pointer : !!(window.PointerEvent || msPointer),

// @property touch: Boolean
// `true` for all browsers supporting [touch events](https://developer.mozilla.org/docs/Web/API/Touch_events).
// This does not necessarily mean that the browser is running in a computer with
// a touchscreen, it only means that the browser is capable of understanding
// touch events.
touch : !window.L_NO_TOUCH && (this.pointer || 'ontouchstart' in window ||
		(window.DocumentTouch && document instanceof window.DocumentTouch)),

// @property mobileOpera: Boolean; `true` for the Opera browser in a mobile device.
mobileOpera : this.mobile && this.opera,

// @property mobileGecko: Boolean
// `true` for gecko-based browsers running in a mobile device.
mobileGecko : this.mobile && this.gecko,

// @property retina: Boolean
// `true` for browsers on a high-resolution "retina" screen or on any screen when browser's display zoom is more than 100%.
retina : (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1,

// @property passiveEvents: Boolean
// `true` for browsers that support passive events.
passiveEvents : (function () {
	var supportsPassiveOption = false;
	try {
		var opts = Object.defineProperty({}, 'passive', {
			get: function () { // eslint-disable-line getter-return
				supportsPassiveOption = true;
			}
		});
		window.addEventListener('testPassiveEventSupport', falseFn, opts);
		window.removeEventListener('testPassiveEventSupport', falseFn, opts);
	} catch (e) {
		// Errors can safely be ignored since this is only a browser support test.
	}
	return supportsPassiveOption;
}()),

// @property canvas: Boolean
// `true` when the browser supports [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
canvas : (function () {
	return !!document.createElement('canvas').getContext;
}()),

// @property svg: Boolean
// `true` when the browser supports [SVG](https://developer.mozilla.org/docs/Web/SVG).
svg : !!(document.createElementNS && svgCreate('svg').createSVGRect),
}

function userAgentContains(str) {
	return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
}


// console.log(daTest)
