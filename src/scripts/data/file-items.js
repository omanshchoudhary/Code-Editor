export const files=JSON.parse(localStorage.getItem('files')) ||  [];
    
export let activeFileId= localStorage.getItem('activeFileId') || '';

export function setActiveFileId(fileId) {
    activeFileId = fileId;
    localStorage.setItem('activeFileId', fileId);
}

