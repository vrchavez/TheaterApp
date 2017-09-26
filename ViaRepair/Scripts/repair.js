//----Sets up eventListener for menu button.----//
function menuEventListen() {
    var getter = document.getElementById("Scont");
    getter.addEventListener('click', menuShower, false);
}

function hoverListen() {
    issues = [];
    var theParent = document.querySelector("#father");
    var apel = document.getElementById("apple");
    var sung = document.getElementById("samsung");
    var gal = document.getElementById("galNote");
    var pix = document.getElementById("pixel");
    var pad = document.getElementById("ipad2");
    var prob = document.getElementById("butCont");
    var cont = document.getElementById("botPrice");
    theParent.addEventListener("mouseover", hoverChange, false);
    theParent.addEventListener("mouseout", outChange, false);
    theParent.addEventListener('click', clickCheck, false);
    apel.addEventListener('click', clickCheck2, false);
    sung.addEventListener('click', clickCheck2, false);
    gal.addEventListener('click', clickCheck2, false);
    pix.addEventListener('click', clickCheck2, false);
    pad.addEventListener('click', clickCheck2, false);
    prob.addEventListener('mouseover', hovStep2, false);
    prob.addEventListener('mouseout', outStep2, false);
    prob.addEventListener('click', clickStep2, false);
    cont.addEventListener('click', contClick, false);
}

function contClick(e) {
    var ID = e.target.id;
    if (document.getElementById(ID).classList.contains("PRESSED")) {
        var get = final();
        for (var x in get) {
            console.log(get[x]);
        }
        sendToSpree();
    } else {
        if (issues.length > 1) {
            document.getElementById("issue1").innerText = issues[0];
            document.getElementById("issue2").innerText = " + " + issues[1];
            document.getElementById("contin").innerText = "Schedule";
            document.getElementById("contin").classList.add("PRESSED");
        } else {
            document.getElementById("issue1").innerText = issues[0];
            document.getElementById("contin").innerText = "Schedule";
            document.getElementById("contin").classList.add("PRESSED");
        }
        doStep3();
    }
}

function sendToSpree() {
    var passer = final();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/person');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var userInfo = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify(passer));
}

function param(object) {
    var encodedString = '';
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (encodedString.length > 0) {
                encodedString += '&';
            }
            encodedString += encodeURI(prop + '=' + object[prop]);
        }
    }
    return encodedString;
}

function final() {
    var fullName = document.getElementById("fn").value;
    var address = document.getElementById("ad").value;
    var phone = document.getElementById("ph").value;


    var personData = {
        FullName: fullName,
        Adress: address,
        Phone: phone
    }


    return personData;
}

function hasPrice(ID, INFO, INFO2, sign) {
    var total = parseInt(document.getElementById("est2").innerText); //Grab the total that is at the bottom of page and convert string to int.
    var prices = {
        headphone: 75
        , volume: 75
        , charger: 75
        , camera: 75
        , home: 75
        , lock: 75
    }
    var screen = {
        "iPhone": {
            '5': 75,
            '5c': 75,
            '5s': 75,
            '6': 95,
            '6Plus': 110,
            '6s': 120,
            '6sPlus': 125,
            'SE': 150,
            '7': 189,
            '7Plus': 209
        },
        "Galaxy": {
            's3': 100,
            's4': 100,
            's5': 190,
            's6': 190,
            's7': 229
        },
        "GalaxyNote": {
            'Note 3': 155,
            'Note 4': 160,
            'Note 5': 200,
            'Note 6': 200,
            'Note 7': 225
        },
        "Pixel": {
            "Pixel": 129,
            "PixelXL": 149
        }
    }
    if (ID != "screen") {
        for (var key in prices) {
            if (ID == key) {
                if (sign == 0) {
                    total -= prices[key];
                } else {
                    total += prices[key];
                }
            }
        }
    } else {
        for (var key in screen) {
            if (INFO == key) {
                var obj = screen[key];
                for (var prop in obj) {
                    if (INFO2 == prop) {
                        if (sign == 0) {
                            total -= obj[prop];
                        } else {
                            total += obj[prop];
                        }
                    }
                }
            }
        }
    }
    document.getElementById("est2").innerText = total;
    document.getElementById("botPrice").style.bottom = "0";
}

function clickStep2(e) {
    var ID = e.target.id;
    var clas = e.target.classList;
    var text = document.getElementById("typePHO").innerText;
    var text2 = document.getElementById("modelPHO").innerText;
    var minus = 0;
    var plus = 1;

    if ((ID != "OTH") && (ID != "contin") && (e.target.classList.contains("butt"))) {
        if (document.getElementById(ID).classList.contains("PRESSED")) {
            document.getElementById(ID).style.backgroundColor = "#5b5b5b";
            document.getElementById(ID).style.textDecoration = "none";
            document.getElementById(ID).classList.remove("PRESSED");
            hasPrice(ID, text, text2, minus);
            for (var w = 0; w < issues.length; w++) {
                if (ID == issues[w]) {
                    for (var d = w; d < issues.length; d++) {
                        if (d != (issues.length - 1)) {
                            issues[d] = issues[d + 1];
                        } else {
                            issues.pop();
                        }
                    }
                }
            }
        } else {
            document.getElementById(ID).style.backgroundColor = "#804D56";
            document.getElementById(ID).style.textDecoration = "line-through";
            document.getElementById(ID).classList.add("PRESSED");
            issues.push(ID);
            hasPrice(ID, text, text2, plus);
        }
    } 
}

function hovStep2(e) {
    var ID = e.target.id;
    if (ID == 'headphone') {
        document.getElementById("circle").style.opacity = "1";
    } else if (ID == "volume") {
        document.getElementById("circleDos").style.opacity = "1";
    } else if (ID == "screen") {
        document.getElementById("iPhRep").src = "https://i.imgur.com/acPJTo5.png";
    } else if (ID == "charger") {
        document.getElementById("circleSiete").style.opacity = "1";
    } else if (ID == "camera") {
        document.getElementById("circleSeis").style.opacity = "1";
    } else if (ID == "home") {
        document.getElementById("circleQuatro").style.opacity = "1";
    } else if (ID == "lock") {
        document.getElementById("circleTres").style.opacity = "1";
    }
}

function outStep2(e) {
    var ID = e.target.id;
    if (ID == 'headphone') {
        document.getElementById("circle").style.opacity = "0";
    } else if (ID == "volume") {
        document.getElementById("circleDos").style.opacity = "0";
    } else if (ID == "screen") {
        document.getElementById("iPhRep").src = "https://i.imgur.com/URpk0b5.png";
    } else if (ID == "charger") {
        document.getElementById("circleSiete").style.opacity = "0";
    } else if (ID == "camera") {
        document.getElementById("circleSeis").style.opacity = "0";
    } else if (ID == "home") {
        document.getElementById("circleQuatro").style.opacity = "0";
    } else if (ID == "lock") {
        document.getElementById("circleTres").style.opacity = "0";
    }
}

function clickCheck2(e) {
    var phonePress = e.target;
    var classOf = phonePress.className;
    document.getElementById("modelPHO").innerText = phonePress.textContent;

    if (classOf == "iphTex2") {
        document.getElementById("apple").style.left = "-100%";
        document.getElementById("apple").style.right = "100%";
        doStep2();
    }
    else if (classOf == "samTex2") {
        document.getElementById("samsung").style.left = "-100%";
        document.getElementById("samsung").style.right = "100%";
        doStep2();
    }
    else if (classOf == "galTex2") {
        document.getElementById("galNote").style.left = "-100%";
        document.getElementById("galNote").style.right = "100%";
        doStep2();
    }
    else if (classOf == "pixTex2") {
        document.getElementById("pixel").style.left = "-100%";
        document.getElementById("pixel").style.right = "100%";
        doStep2();
    }
    else if (classOf == "ipadTex2") {
        document.getElementById("ipad2").style.left = "-100%";
        document.getElementById("ipad2").style.right = "100%";
        doStep2();
    }

}

function doStep2() {

    document.getElementById("model").style.left = "100%";
    document.getElementById("model").style.right = "-100%";
    /*==========CHANGE COLOR AND SIZE OF STEP1============*/
    document.getElementById("st1").style.fontSize = "29px";
    document.getElementById("st1").style.width = "23%";
    document.getElementById("st1").style.top = "20%";
    document.getElementById("st1").style.color = "#31312d";
    document.getElementById("hidONE").style.display = "inline";
    document.getElementById("ONE").innerText = "";
    document.getElementById("ONE").style.display = "none";
    document.getElementById("st1TX").style.top = "35%";

    setTimeout(function () { document.getElementById("car0").style.left = "46.5%" }, 55);

    /*==========CHANGE COLOR AND SIZE OF STEP2============*/
    setTimeout(function () {
        document.getElementById("st2").style.fontSize = "35px";
        document.getElementById("st2").style.width = "27%";
        document.getElementById("st2").style.top = "18%";
        document.getElementById("st2").style.color = "#723a44";
        document.getElementById("TWO").style.fontSize = "45px";
        document.getElementById("TWO").style.color = "#723a44";
    }, 550);

    document.getElementById("VP").style.zIndex = "200";
    document.getElementById("iPhRep").style.top = "44%";        //55% initial
    document.getElementById("locT").style.right = "9%";
    document.getElementById("jBCon").style.left = "9%";
    document.getElementById("volT").style.left = "9%";
    document.getElementById("scrT").style.left = "9%";
    document.getElementById("charT").style.left = "9%";
    document.getElementById("camT").style.right = "9%";
    document.getElementById("oth").style.right = "9%";
    //document.getElementById("tinue").style.right = "14%";
    document.getElementById("homT").style.right = "9%";
    document.getElementById("circle").style.bottom = "53%";     //JACK
    //document.getElementById("jackL").style.bottom = "44.2%";
    document.getElementById("circleDos").style.bottom = "41%";    //*VOL
    //document.getElementById("volL").style.bottom = "31.7%";
    //document.getElementById("scrL").style.bottom = "21%";
    //document.getElementById("circleCinco").style.bottom = "19%";  //*SCREEN
    //document.getElementById("charL").style.bottom = "6.3%";
    document.getElementById("circleSiete").style.bottom = "12%";   //*CHARGEPORT
    //document.getElementById("camL").style.bottom = "43%";
    document.getElementById("circleSeis").style.bottom = "52.2%"; //CAM/SPEAKER
    //document.getElementById("locL").style.bottom = "31%";
    document.getElementById("circleTres").style.bottom = "43%"; //*LOCK
    //document.getElementById("homL").style.bottom = "18%";
    document.getElementById("circleQuatro").style.bottom = "16.9%";    //*HOME
    //document.getElementById("pressCont").style.left = "0px";
    //document.getElementById("pressCont").style.right = "0px";
}

function beginCar() {
    setTimeout(function () {
        document.getElementById("car0").style.left = "13%";
    }, 100);
}

function doStep3() {
   
    /*==========CHANGE COLOR AND SIZE OF STEP2============*/
    document.getElementById("st2").style.fontSize = "29px";
    document.getElementById("st2").style.width = "23%";
    document.getElementById("st2").style.top = "20%";
    document.getElementById("st2").style.color = "#31312d";
    document.getElementById("hidTWO").style.display = "inline";
    document.getElementById("TWO").innerText = "";
    document.getElementById("TWO").style.display = "none";
    document.getElementById("st2TX").style.top = "35%";

    setTimeout(function () { document.getElementById("car0").style.left = "79.9%" }, 55);

    /*==========CHANGE COLOR AND SIZE OF STEP3============*/
    setTimeout(function () {
        document.getElementById("st3").style.fontSize = "35px";
        document.getElementById("st3").style.width = "27%";
        document.getElementById("st3").style.top = "18%";
        document.getElementById("st3").style.color = "#723a44";
        document.getElementById("THREE").style.fontSize = "45px";
        document.getElementById("THREE").style.color = "#723a44";
    }, 550);


    document.getElementById("VP").style.right = "100%";
    document.getElementById("VP").style.left = "-100%";
    document.getElementById("iPhRep").style.top = "-100%";        //55% initial
    document.getElementById("locT").style.right = "-100%";
    document.getElementById("jBCon").style.left = "-100%";
    document.getElementById("volT").style.left = "-100%";
    document.getElementById("scrT").style.left = "-100%";
    document.getElementById("charT").style.left = "-100%";
    document.getElementById("camT").style.right = "-100%";
    document.getElementById("oth").style.right = "-100%";
    //document.getElementById("tinue").style.right = "14%";
    document.getElementById("homT").style.right = "-100%";
    document.getElementById("circle").style.bottom = "-100%";     //JACK
    //document.getElementById("jackL").style.bottom = "44.2%";
    document.getElementById("circleDos").style.bottom = "-100%";    //*VOL
    //document.getElementById("volL").style.bottom = "31.7%";
    //document.getElementById("scrL").style.bottom = "21%";
    //document.getElementById("circleCinco").style.bottom = "19%";  //*SCREEN
    //document.getElementById("charL").style.bottom = "6.3%";
    document.getElementById("circleSiete").style.bottom = "-100%";   //*CHARGEPORT
    //document.getElementById("camL").style.bottom = "43%";
    document.getElementById("circleSeis").style.bottom = "-100%"; //CAM/SPEAKER
    //document.getElementById("locL").style.bottom = "31%";
    document.getElementById("circleTres").style.bottom = "-100%"; //*LOCK
    //document.getElementById("homL").style.bottom = "18%";
    document.getElementById("circleQuatro").style.bottom = "-100%";    //*HOME
    //document.getElementById("pressCont").style.left = "0px";
    //document.getElementById("pressCont").style.right = "0px";
    document.getElementById("forma").style.left = 0;
    document.getElementById("forma").style.right = 0;
}

function clickCheck(e) {
    if ((e.target !== e.currentTarget) && ((e.target.id == "iphone") || (e.target.id == "iph"))) {
        document.getElementById("typePHO").innerText = "iPhone";
        changeFirstStep();
        document.getElementById("father").style.top = "-300%";
        document.getElementById("apple").style.left = "0px";
        document.getElementById("apple").style.right = "0px";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "galaxy") || (e.target.id == "sam"))) {
        changeFirstStep();
        document.getElementById("chooseSam").style.left = "0px";
        document.getElementById("chooseSam").style.right = "0px";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "google") || (e.target.id == "goo"))) {
        document.getElementById("typePHO").innerText = "Pixel";
        changeFirstStep();
        document.getElementById("father").style.top = "-300%";
        document.getElementById("pixel").style.left = "0px";
        document.getElementById("pixel").style.right = "0px";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "ipad") || (e.target.id == "pad"))) {
        document.getElementById("typePHO").innerText = "iPad";
        changeFirstStep();
        document.getElementById("father").style.top = "-300%";
        document.getElementById("ipad2").style.left = "0px";
        document.getElementById("ipad2").style.right = "0px";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "galChoice") || (e.target.id == "chG"))) {
        document.getElementById("typePHO").innerText = "Galaxy";
        document.getElementById("chooseSam").style.left = "-100%";
        document.getElementById("chooseSam").style.right = "100%";
        document.getElementById("samsung").style.left = "0";
        document.getElementById("samsung").style.right = "0";
        document.getElementById("father").style.left = "-200%";
        document.getElementById("father").style.right = "200%";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "noteChoice") || (e.target.id == "chN"))) {
        document.getElementById("typePHO").innerText = "GalaxyNote";
        document.getElementById("chooseSam").style.left = "-100%";
        document.getElementById("chooseSam").style.right = "100%";
        document.getElementById("galNote").style.left = "0";
        document.getElementById("galNote").style.right = "0";
        document.getElementById("father").style.left = "-200%";
        document.getElementById("father").style.right = "200%";
    }
}

function changeFirstStep() {
    document.getElementById("iphone").style.transition = "1.65s ease-out";
    document.getElementById("iphone").style.top = "-300%";
    document.getElementById("iph1").style.transition = "1.21s ease-out";
    document.getElementById("iph1").style.top = "-300%";
    document.getElementById("sam1").style.transition = "1.31s ease-out";
    document.getElementById("sam1").style.top = "-300%";
    document.getElementById("galaxy").style.transition = "1.45s ease-out";
    document.getElementById("galaxy").style.top = "-300%";
    document.getElementById("goo1").style.transition = "1.35s ease-out";
    document.getElementById("goo1").style.top = "-300%";
    document.getElementById("google").style.transition = "1.65s ease-out";
    document.getElementById("google").style.top = "-300%";
    document.getElementById("pad1").style.transition = "1.35s ease-out";
    document.getElementById("pad1").style.top = "-300%";
    document.getElementById("ipad").style.transition = "1.35s ease-out";
    document.getElementById("ipad").style.top = "-300%";
    document.getElementById("model").style.left = "0px";
    document.getElementById("model").style.right = "0px";
}

function hoverChange(e) {
    var x = "", w = "";
    if ((e.target !== e.currentTarget) && ((e.target.id == "iphone") || (e.target.id == "iph"))) {
        x = "iph";
        document.getElementById("iphone").style.backgroundImage = "url(https://i.imgur.com/acPJTo5.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "galaxy") || (e.target.id == "sam"))) {
        x = "sam";
        document.getElementById("galaxy").style.backgroundImage = "url(https://i.imgur.com/C8kGuhs.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "google") || (e.target.id == "goo"))) {
        x = "goo";
        document.getElementById("google").style.backgroundImage = "url(https://i.imgur.com/QhWx0KT.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "ipad") || (e.target.id == "pad"))) {
        x = "pad";
        document.getElementById("ipad").style.backgroundImage = "url(https://i.imgur.com/DpoPP9g.png)";
    }

    if (x != '') {
        document.getElementById(x).style.color = "#723a44";

    }
    else {
        return;
    }
}

function outChange(e) {
    var y = "", z = "";
    if ((e.target !== e.currentTarget) && ((e.target.id == "iphone") || (e.target.id == "iph"))) {
        y = "iph";
        document.getElementById("iphone").style.backgroundImage = "url(https://i.imgur.com/HR7ooMX.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "galaxy") || (e.target.id == "sam"))) {
        y = "sam";
        document.getElementById("galaxy").style.backgroundImage = "url(https://i.imgur.com/oxLx2XJ.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "google") || (e.target.id == "goo"))) {
        y = "goo";
        document.getElementById("google").style.backgroundImage = "url(https://i.imgur.com/cXeIxAx.png)";
    }
    else if ((e.target !== e.currentTarget) && ((e.target.id == "ipad") || (e.target.id == "pad"))) {
        y = "pad";
        document.getElementById("ipad").style.backgroundImage = "url(https://i.imgur.com/rP2K9Fh.png)";
    }

    if (y != '') {
        document.getElementById(y).style.color = "#31312d";
    }
    else {
        return;
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
//Deffered promise
var thisPhone = [];
function getIphone() {
    var userInfo = [];
    return fetch('http://localhost:54725/api/cell', { method: 'GET' }, { headers: { 'Content-type': 'application/json' } });
}

function startUp(thisPhone) {
    menuEventListen();
    hoverListen();
    beginCar();
    getIphone().then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            // Examine the text in the response  
            response.json().then(function (data) {
                thisPhone = data;
                console.log(thisPhone);
            });
        });
    console.log(thisPhone);
}

startUp();