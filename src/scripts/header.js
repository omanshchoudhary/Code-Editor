import { activeFileId } from "./data/file-items.js"
import { files } from "./data/file-items.js";
export function setupHeaderButtonsEvents(){

    document.addEventListener('click',(event)=>{
        if(event.target.matches('.js-save-btn')){
            saveContent(activeFileId);
        }
    })
}

function saveContent(activeFileId){
    const content=document.querySelector('.code-text').value;
    const file = files.find((file)=>{
        return file.id===activeFileId;
    })
    
    if(file){
        file.content=content;
        localStorage.setItem('files', JSON.stringify(files));
    } 
}