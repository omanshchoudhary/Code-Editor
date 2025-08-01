const filesDetails={
    files:[
        {
            id:1,
            name:'index.html',
            type: 'html',
            content:'',
            isOpen: true,
        },
        {
            id:2,
            name:'style.css',
            type: 'css',
            content:'',
            isOpen: true,
        },
        {
            id:3,
            name:'script.js',
            type: 'javascript',
            content:'',
            isOpen: true,
        }
    ],
    selectedFile: 1,
    openTabs: [1,2,3],
    nextId:4
};

document.addEventListener('DOMContentLoaded',()=>{

    document.addEventListener('click', (e)=>{
        if(e.target.closest('.file-item')){
            handleFileClick(e.target.closest('.file-item'));
        }
    });
    document.addEventListener('dblclick', (e)=>{
        if(e.target.closest('.file-item')){
            handleFileDoubleClick(e.target.closest('.file-item'));
        }
    });

    document.querySelector('.new-file-btn').addEventListener('click', ()=>{
        handleNewFile();
    });

    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.file-item')) {
            e.preventDefault(); // Stop browser's default context menu
            handleRightClick(e, e.target.closest('.file-item'));
        }
    });

    document.addEventListener('keydown', (e)=>{
        if(e.key==='Delete' && filesDetails.selectedFile){
            handleDeleteFile();
        }
    })

});

const handleFileClick=(fileElement)=>{
    const fileName= fileElement.querySelector('.file-name').textContent;

    const file= filesDetails.files.find(f=> f.name===fileName);

    if(file){
        filesDetails.selectedFile=file.id;
        updateFileSelection();
        updateStatusBar(file);
    }

};

const updateFileSelection=()=>{
    document.querySelectorAll('.file-item').forEach((item)=>{
        item.classList.remove('selected');
    });

    const selectedFile= filesDetails.files.find(f=>f.id===filesDetails.selectedFile);

    if(selectedFile){
        const fileElements = document.querySelectorAll('.file-item');
        fileElements.forEach((element)=>{
            const fileName= element.querySelector('.file-name').textContent;
            if(fileName===selectedFile.name){
                element.classList.add('selected');
            }
        });
    }
};

const updateStatusBar=(file)=>{
    const statusRight=document.querySelector('.status-right');
    const spans= statusRight.querySelectorAll('span');

    if(spans[0]){
        spans[0].textContent=file.type.toUpperCase();
    }
};

const getFileIcon=(fileName)=>{
    const extension= fileName.split('.').pop().toLowerCase();
    const iconMap={
        'html': '📄',
        'css': '🎨',
        'js': '⚡',
        'json': '📋',
        'md': '📝',
        'txt': '📄',
        'jsx': '⚛️',
        'ts': '📘'
    }
    return iconMap[extension] || '📄';
};


const getFileType=(fileName)=>{
    const extension= fileName.split('.').pop().toLowerCase();
    const typeMap={
        'html': 'html',
        'css': 'css',
        'js': 'js',
        'json': 'json',
        'md': 'md',
        'txt': 'txt',
        'jsx': 'jsx',
        'ts': 'ts'
    }
    return  typeMap[extension] || 'text';
};


const handleNewFile=()=>{
    const fileName=prompt('Enter file name (with extension):');
    if(!fileName) return;

    const existingFile= filesDetails.files.find(f=> f.name===fileName);
    
    if(existingFile){
        alert('File already exits!');
        return;
    }

    const newFile={
        id:filesDetails.nextId,
        name: fileName,
        type: getFileType(fileName),
        content:'',
        isOpen: false,
    };

    filesDetails.files.push(newFile);
    filesDetails.nextId++;

    renderFileTree();

    filesDetails.selectedFile = newFile.id;
    updateFileSelection();
    updateStatusBar(newFile);

};


const renderFileTree=()=>{
    const fileTree=document.querySelector('.file-tree');
    fileTree.innerHTML = '';

    filesDetails.files.forEach((file)=>{
        const fileElement=document.createElement('div');
        fileElement.className='file-item';
        fileElement.innerHTML=`
        <span class="file-icon">${getFileIcon(file.name)}</span>
        <span class="file-name">${file.name}</span>
        `;

        fileTree.appendChild(fileElement);
    });
};