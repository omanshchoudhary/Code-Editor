import { files, activeFileId, setActiveFileId} from "./data/file-items.js"
import { renderTabs } from "./tabs-bar.js";

export function renderFileTree(files) {
  let html = ``;
  const fileTree = document.querySelector(".js-file-tree");

  files.forEach((file) => {
    const isActive = file.id === activeFileId ? 'active' : '';
    html += `<div class="file-item ${isActive}" data-id="${file.id}">${file.name}.${file.extension}</div>`;
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
    updateActiveStates();
  })
}

function updateActiveStates() {
  // Update file tree active state
  document.querySelectorAll('.file-item').forEach(item => {
    item.classList.remove('active');
    if(item.dataset.id === activeFileId) {
      item.classList.add('active');
    }
  });
  
  // Update tabs active state
  document.querySelectorAll('.file-tab').forEach(tab => {
    tab.classList.remove('active');
    if(tab.dataset.id === activeFileId) {
      tab.classList.add('active');
    }
  });
}

export { updateActiveStates };

function handleNewFileCreation(files) {
  const fileName = prompt("Enter file name:").split(".");
  

  const newFile = {
    id: crypto.randomUUID(),
    name: fileName[0],
    extension: fileName[1],
    content:'',
  };

  setActiveFileId(newFile.id);
  files.push(newFile);
  localStorage.setItem("files", JSON.stringify(files));
  renderFileTree(files);
  renderTabs(files);
  updateActiveStates();
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

export function renderCode(fileId){
  const code=document.querySelector('.code-text');
  const file = files.find(f => f.id === fileId);
  if(file){
    code.value = file.content || '';
  }
}