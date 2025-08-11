import { files } from "./data/file-items.js";

function render(files){
    let html=``;
    const fileTree= document.querySelector('.js-file-tree');

    files.forEach((file)=>{
        html+=`<div class="file-item">${file.name}.${file.extension}</div>`
    })
    fileTree.innerHTML=html;
}

render(files);