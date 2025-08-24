import { files, setActiveFileId, activeFileId } from "./data/file-items.js";
import { renderCode, updateActiveStates } from "./file-tree.js";

export function renderTabs(files){
    let html=``;
    const tabsBarElement = document.querySelector('.js-tabs-bar');

    files.forEach((file)=>{
        const isActive = file.id === activeFileId ? 'active' : '';
        html+=`<button class="file-tab ${isActive}" data-id="${file.id}">${file.name}.${file.extension}</button>`
    })
    tabsBarElement.innerHTML=html;
}

export function setupTabBarEvents(files){
    document.addEventListener("click",(event)=>{
        const fileObject= event.target.closest('.file-tab');
        if(!fileObject) return;
        setActiveFileId(fileObject.dataset.id);
        renderCode(fileObject.dataset.id);
        updateActiveStates();
      })
}