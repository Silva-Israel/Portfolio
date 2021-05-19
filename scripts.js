const about = document.querySelector("#about");
const contact = document.querySelector("#contact");
const main = document.querySelector("#main");
const details0 = document.querySelector(".details0");
const details1 = document.querySelector(".details1");
const details2 = document.querySelector(".details2");
const details3 = document.querySelector(".details3");
const details4 = document.querySelector(".details4");
const details5 = document.querySelector(".details5");
const details6 = document.querySelector(".details6");
const web = document.querySelector(".web");

function showAbout() {
    contact.style.display = "none";
    about.style.display = "block";
    main.style.display = "none";
}

function showContact() {
    about.style.display = "none";
    contact.style.display = "block";
    main.style.display = "none";
}

function showDetails0() {
    if(details0.style.display && details0.style.display !== "none") {
        details0.style.display = "none";
    } else {
        details0.style.display = "block";
    }
}

function showDetails1() {
    if(details1.style.display && details1.style.display !== "none") {
        details1.style.display = "none";
    } else {
        details1.style.display = "block";
    }
}

function showDetails2() {
    if(details2.style.display && details2.style.display !== "none") {
        details2.style.display = "none";
    } else {
        details2.style.display = "block";
    }
}

function showDetails3() {
    if(details3.style.display && details3.style.display !== "none") {
        details3.style.display = "none";
    } else {
        details3.style.display = "block";
    }
}

function showDetails4() {
    if(details4.style.display && details4.style.display !== "none") {
        details4.style.display = "none";
    } else {
        details4.style.display = "block";
    }
}

function showDetails5() {
    if(details5.style.display && details5.style.display !== "none") {
        details5.style.display = "none";
    } else {
        details5.style.display = "block";
    }
}

function showDetails6() {
    if(details6.style.display && details6.style.display !== "none") {
        details6.style.display = "none";
    } else {
        details6.style.display = "block";
    }
}

function showWeb() {
    if(web.style.display && web.style.display !== "none") {
        web.style.display = "none";
    } else {
        web.style.display = "block";
    }
}