// ==UserScript==
// @name         YandexBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match       https://yandex.ru/*
// @match       https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let button = document.querySelectorAll("button")[0];
if (button != undefined){ 
    document.getElementsByName("text")[0].value = "Как звучит гобой";
    button.click();
}else if(location.hostname == 'yandex.ru'){
    let links = document.links;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            setTimeout(function(){link.click()}, 3000);
            break;
        }
    }
}else{ 
    let links = document.links;
    setInterval(function(){
        if(getIntRandom(0,100)<30){
            location.href = "https://yandex.ru/";
        }else{
            let index = getIntRandom(0, links.length);
            let link = links[index];
            if(link.href.indexOf(location.hostname) != -1){
                link.click();
            }
        }
    }, 3000);
}

function getIntRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}
