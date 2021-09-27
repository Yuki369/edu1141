// ==UserScript==
// @name         YandexBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let sites = {
    "crushdrummers.ru": ["Барабанное шоу", "Заказать барабанное шоу в москве crushDrummers", "Барабанщики на корпоратив"],
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Как звучит гобой","Флейта","Скрипка","Гобой","Фагот","Тромбон","Кларнет"]
}
let text = document.getElementById("text");
if (text != undefined){
    let site = Object.keys(sites)[getIntRandom(0, Object.keys(sites).length)];
    let words = sites[site];
    let word = words[getIntRandom(0, words.length)];
    text.value = word;
    document.cookie = "site="+site;
    document.querySelector(".search2").submit()
}else if(location.hostname == 'yandex.ru'){
    let site = getCookie("site");
    let links = document.links;
    let theme = document.querySelectorAll(".link.link_theme_none")[4];
    let goToTheNextPage = true;
    let pageNumber = +document.querySelectorAll(".pager__item")[3].innerText;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf(site) != -1){
            goToTheNextPage = false;
            setTimeout(function(){link.click()}, 3000);
            link.target = "self";
            break;
        }
    }
    if(goToTheNextPage && pageNumber<10) setTimeout(function(){theme.click();}, 1500);
    else if(goToTheNextPage) location.href = "https://yandex.ru/";
}else{
    let links = document.links;
    setInterval(function(){
        if(getIntRandom(0,100)<30){
            location.href = "https://yandex.ru/";
        }else{
            let index = getIntRandom(0, links.length);
            let link = links[index];
            if(link.href.indexOf(location.hostname) != -1){
                link.target = "self";
                link.click();
            }
        }
    }, 3000);
}

function getIntRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
