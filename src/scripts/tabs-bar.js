import { files } from "./data/file-items.js";

export function renderTabs(files){
    let html=``;
    const tabsBarElement = document.querySelector('.js-tabs-bar');

    files.forEach((file)=>{
        html+=`<button>${file.name}.${file.extension}</button>`
    })
    tabsBarElement.innerHTML=html;
}