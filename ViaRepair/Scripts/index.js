//--------------------------------FROM HERE TO END OF SECTION, USED FOR SMOOTHSCROLL-----------------------------

//**Returns total pixels scrolled by user (Current position of page).*//
function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) {
        return self.pageYOffset;
    }
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop) {
        return document.documentElement.scrollTop;
    }
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) {
        return document.body.scrollTop;
    }
    return 0;
}

//**Returns distance between current div and next div.**//
function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    while (elm.offsetParent && elm.offsetParent != document.body) {
        y += elm.offsetParent.offsetTop;
    }
    if (eID == "TP") {
        return ((y * .12) + y);
    }
    return y;
}

function whereWeAt() {
    window.addEventListener("scroll", function (event) {
        var h = document.documentElement,
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
        var percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
        if (percent > 39) {
            document.getElementById("iPhRep").style.top = "25%";
            document.getElementById("jackT").style.left = "10%";
            document.getElementById("volT").style.left = "5%";
            document.getElementById("scrT").style.left = "7%";
            document.getElementById("charT").style.left = "9%";
            document.getElementById("camT").style.right = "10%";
            document.getElementById("locT").style.right = "5%";
            document.getElementById("homT").style.right = "7%";
            document.getElementById("circle").style.bottom = "71%";
            document.getElementById("jackL").style.bottom = "74%";
            document.getElementById("circleDos").style.bottom = "54%";
            document.getElementById("volL").style.bottom = "55.7%";
            document.getElementById("scrL").style.bottom = "38.7%";
            document.getElementById("circleCinco").style.bottom = "39%";
            document.getElementById("charL").style.bottom = "12.5%";
            document.getElementById("circleSiete").style.bottom = "6.5%";
            document.getElementById("camL").style.bottom = "72%";
            document.getElementById("circleSeis").style.bottom = "67%";
            document.getElementById("locL").style.bottom = "57%";
            document.getElementById("circleTres").style.bottom = "56.5%";
            document.getElementById("homL").style.bottom = "25%";
            document.getElementById("circleQuatro").style.bottom = "12.5%";
        } else {
            document.getElementById("iPhRep").style.top = "-100%";
            document.getElementById("jackT").style.left = "-100%";
            document.getElementById("volT").style.left = "-100%";
            document.getElementById("scrT").style.left = "-100%";
            document.getElementById("charT").style.left = "-100%";
            document.getElementById("camT").style.right = "-100%";
            document.getElementById("locT").style.right = "-100%";
            document.getElementById("homT").style.right = "-100%";
            document.getElementById("circle").style.bottom = "-100%";
            document.getElementById("jackL").style.bottom = "-100%";
            document.getElementById("circleDos").style.bottom = "-100%";
            document.getElementById("volL").style.bottom = "-100%";
            document.getElementById("scrL").style.bottom = "-100%";
            document.getElementById("circleCinco").style.bottom = "-100%";
            document.getElementById("charL").style.bottom = "-100%";
            document.getElementById("circleSiete").style.bottom = "-100%";
            document.getElementById("camL").style.bottom = "-100%";
            document.getElementById("circleSeis").style.bottom = "-100%";
            document.getElementById("locL").style.bottom = "-100%";
            document.getElementById("circleTres").style.bottom = "-100%";
            document.getElementById("homL").style.bottom = "-100%";
            document.getElementById("circleQuatro").style.bottom = "-100%";
        }
    }, false);
}

//**Depending on position of closest parent element, either scrolls up or down**//
function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 65);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 40);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            console.log("speed: " + speed + "; step:  " + step + "; leapY:  " + leapY + "; Time: " + timer + "; startY: " + startY + "; stopY: " + stopY + "; distance: " + distance);
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for (var i = startY; i > stopY; i -= step) {
        console.log("speed: " + speed + "; step:  " + step + "; leapY:  " + leapY + "; Time: " + timer + "; startY: " + startY + "; stopY: " + stopY + "; distance: " + distance);
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}


//--------------------------------FROM HERE TO TOP OF SECTION, USED FOR SMOOTHSCROLL-----------------------------//


//----Calls smoothScroll(eID) based on element clicked----//
function scroller() {
    if (this.id == "arrow1") {
        smoothScroll("SP");
    }
    else if (this.id == "arrow2") {
        smoothScroll("VP");
    }
    else if (this.id == "arrow3") {
        smoothScroll("TP");
    }
    else if (this.id == "arrow4") {
        smoothScroll("top");
    }
}

function wheelDistance(evt) {
    console.log(evt.deltaY);       // IE/Safari/Chrome TODO: /3 for Chrome OS X
}

//----Sets up event listener for Mouse Scroll--------//
/*function mouseEventListen() {
    var mouse1 = document.getElementById("top");
    var mouse2 = document.getElementById("SP");
    var mouse3 = document.getElementById("FP");
    var mouse3 = document.getElementById("TP");
    mouse1.addEventListener('wheel', console.log(this.id), { passive: true });
}

function finder() {
    var what = event.deltaY;
    console.log(what);
}*/

//-----Triggers text animation on opening of page------//
function textAtStart() {
    var quick = document.getElementById("tText").querySelectorAll("span");
    setTimeout(function () { typist(0); }, 952);
    function typist(index) {
        if (quick.length > index) {
            setTimeout(function () {
                quick[index].style.opacity = 1;
                typist(++index);
            }, 19);
        }
    }
}

//----Sets up eventListener for menu button.----//
function menuEventListen() {
    var getter = document.getElementById("Scont");
    getter.addEventListener('click', menuShower, false);
}

//-------Sets up an eventListener for arrow buttons.------//
function arrowEventListen() {
    var arrClass = document.getElementsByClassName("arrow");
    for (var i = 0; i < arrClass.length; i++) {
        arrClass[i].addEventListener('click', scroller, false);
    }
}



//-------Works with menuShower() function to hide and show menu content.------//
function menuHider() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            document.getElementById("myDropdown").classList.toggle("show");
        }
        else if (!openDropdown.classList.contains('show')) {
            document.getElementById("myDropdown").classList.toggle("show");
        }
    }
}

//------Triggers menu icon animation when icon is clicked.-------//
function menuShower() {
    this.classList.toggle("change");
    menuHider();
}

function scrollReader() {
    var lastScrollTop = 0;
    var delay = false;
    // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
    // or window.addEventListener("scroll"....
    window.addEventListener("wheel", function (event) {

        console.log(delay);
        if (delay) {
            event.preventDefault();
            return;
        } else {
            var delta = null,
                direction = false;
            if (event.wheelDelta) { // will work in most cases
                delta = event.wheelDelta / 60;
            } else if (event.detail) { // fallback for Firefox
                delta = -event.detail / 2;
            }
            if (delta !== null) {
                direction = delta > 0 ? 'up' : 'down';
            }
            delay = true;
            setTimeout(function () { delay = false }, 650);
            var sDiv = elmYPosition("SP");
            var vDiv = elmYPosition("VP");
            var tDiv = elmYPosition("TP");
            var st = window.pageYOffset || document.documentElement.scrollTop;
            if (direction == 'down') {
                if ((parseInt(st) < (sDiv - 5)) || (st == 0)) {
                    event.preventDefault();
                    smoothScroll("SP");
                } else if ((parseInt(st) >= (sDiv - 5)) && (parseInt(st) < (vDiv - 5))) {
                    event.preventDefault();
                    smoothScroll("VP");
                } else if ((parseInt(st) >= (vDiv - 5)) && (parseInt(st) < (tDiv - 5))) {
                    event.preventDefault();
                    smoothScroll("TP");
                }
            } else if (direction == 'up') {
                if (parseInt(st) <= (vDiv - 5)) {
                    event.preventDefault();
                    smoothScroll("top");
                } else if ((parseInt(st) <= (tDiv - (tDiv * .12))) && (parseInt(st) >= (vDiv - 5))) {
                    event.preventDefault();
                    smoothScroll("SP");
                } else if (parseInt(st) >= (tDiv-(tDiv * .12))) {
                    event.preventDefault();
                    smoothScroll("VP");
                }
            }
            lastScrollTop = parseInt(st);
        }
    }, false);
}


//-----Start up function----//
function startUp() {
    textAtStart();
    menuEventListen();
    arrowEventListen();
    scrollReader();
    whereWeAt();
}

//-----Starts up all code with startUp() function ---->
startUp();