const about = document.querySelector("#about");
const contact = document.querySelector("#contact");
const main = document.querySelector("#main");
const education = document.querySelector('#education');
const details0 = document.querySelector(".details0");
const details1 = document.querySelector(".details1");
const details2 = document.querySelector(".details2");
const details3 = document.querySelector(".details3");
const details4 = document.querySelector(".details4");
const details5 = document.querySelector(".details5");
const details6 = document.querySelector(".details6");
const web = document.querySelector(".web");
const soft = document.querySelector(".soft");
const db = document.querySelector(".db");
const os = document.querySelector(".os");
const crm = document.querySelector(".crm");
const leader = document.querySelector(".leader");
const hobbies = document.querySelector(".hobbies");

function showEducation() {
    if(education.style.display && education.style.display !== "none") {
        education.style.display = "none";
    } else {
        education.style.display = "block";
    }
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

function showSoft() {
    if(soft.style.display && soft.style.display !== "none") {
        soft.style.display = "none";
    } else {
        soft.style.display = "block";
    }
}

function showDb() {
    if(db.style.display && db.style.display !== "none") {
        db.style.display = "none";
    } else {
        db.style.display = "block";
    }
}

function showOs() {
    if(os.style.display && os.style.display !== "none") {
        os.style.display = "none";
    } else {
        os.style.display = "block";
    }
}

function showCrm() {
    if(crm.style.display && crm.style.display !== "none") {
        crm.style.display = "none";
    } else {
        crm.style.display = "block";
    }
}

function showLeader() {
    if(leader.style.display && leader.style.display !== "none") {
        leader.style.display = "none";
    } else {
        leader.style.display = "block";
    }
}

function showHobbies() {
    if(hobbies.style.display && hobbies.style.display !== "none") {
        hobbies.style.display = "none";
    } else {
        hobbies.style.display = "block";
    }
}

function hideJumbotron() {
    const btn = document.querySelector("#hide");

    btn.style.display = 'none';
}
