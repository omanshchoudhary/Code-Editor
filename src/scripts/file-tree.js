import { files, activeFileId, setActiveFileId} from "./data/file-items.js"
import { renderTabs } from "./tabs-bar.js";

export function renderFileTree(files) {
  let html = ``;
  const fileTree = document.querySelector(".js-file-tree");

  files.forEach((file) => {
    html += `<div class="file-item" data-id="${file.id}">${file.name}.${file.extension}</div>`;
  });
  fileTree.innerHTML = html;
}

export function setupFileTreeEvents(files) {
  document.addEventListener("click", (event) => {
    if (event.target.matches(".js-new-file-btn")) {
      handleNewFileCreation(files);
    }
  });

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const fileObject=event.target.closest('.file-item');
    if(!fileObject) return;
    const confirmDelete = confirm('You want to delete this file?');
    if (confirmDelete) {
      handleFileDeletion(files, fileObject);
    }
  });

  document.addEventListener("click",(event)=>{
    const fileObject= event.target.closest('.file-item');
    if(!fileObject) return;
    setActiveFileId(fileObject.dataset.id);
    renderCode(fileObject.dataset.id);
  })
}

function handleNewFileCreation(files) {
  const fileName = prompt("Enter file name:");
  const fileExt = prompt("Enter file extension:");

  const newFile = {
    id: crypto.randomUUID(),
    name: fileName,
    extension: fileExt,
    content:'',
  };

  setActiveFileId(newFile.id);
  files.push(newFile);
  localStorage.setItem("files", JSON.stringify(files));
  renderFileTree(files);
  renderTabs(files);
}

function handleFileDeletion(files,fileObject) {
  const index=files.findIndex((file)=>{
    return file.id==fileObject.dataset.id
  })
  if (index !== -1) {
    files.splice(index, 1); 
  }
  localStorage.setItem('files',JSON.stringify(files));

  renderFileTree(files);
  renderTabs(files);

}

function renderCode(fileId){
  const code=document.querySelector('.code-text');
  const file = files.find(f => f.id === fileId);
  if(file){
    code.value = file.content || '';
  }
}