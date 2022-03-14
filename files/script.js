const librery = (()=>{
//------------------------------------------------------------------
let myLibrary=[]
let btnAddBook = document.getElementById('btnAddBook')
let btnHidenForm = document.getElementById('btnHidenForm')
let content = document.querySelector('.content')

class infoBook {
    constructor(title, author, pages, read){return {title, author, pages, read}}
}

const privModule = {}

privModule.showForm = ()=>{
    document.querySelector('.body').classList.add('fondo');
    document.getElementById('screen').classList.add('screen');
    document.querySelector('.simodal').classList.remove('nomodal');
    console.log(myLibrary)
}

privModule.hideForm = ()=>{
    document.querySelector('.body').classList.remove('fondo');
    document.getElementById('screen').classList.remove('screen');
    document.querySelector('.simodal').classList.add('nomodal');
}

privModule.resetForm = ()=>{
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('pages').value = ''
    document.getElementById('read').checked = ''
}

privModule.addInfoForm = ()=>{
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;

    if(title===''||author===''||pages===''){
        return alert('Porfavor rellena todos los espacios del formulario')
    }

    publicModule.addBook(title, author, pages, read);
    privModule.makeCard(title, author, pages, read);
    privModule.resetForm();

}

privModule.makeCard = (title, author, pages, read)=>{
    let id = myLibrary.length -1
    let card = document.createElement('div')
    card.id = `card${id}`
    card.classList.add('card')

    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    span1.innerHTML = `<b>Title: </b>${title}`;
    span2.innerHTML = `<b>Author: </b>${author}`;
    span3.innerHTML = `<b>Page's Number: </b>${pages}`;

    let buttonRead = document.createElement('button');
    buttonRead.id = `btnRead${id}`
    let readOrNoRead
    if(read){
        readOrNoRead = 'Read'
        buttonRead.classList.add('btnReadTrue')
    }else{
        readOrNoRead= 'No Read'
        buttonRead.classList.add('btnReadFalse')
    };
    buttonRead.innerHTML = `${readOrNoRead}`;
    buttonRead.onclick = ()=> privModule.changeRead(id)

    let buttonDelete = document.createElement('button');
    buttonDelete.classList.add('button');
    buttonDelete.classList.add('btnDelete')
    buttonDelete.innerHTML = `Remove`;
    buttonDelete.id = `${id}`
    buttonDelete.onclick = ()=> privModule.deleteCard(id)

    card.append(span1);
    card.append(span2);
    card.append(span3);
    card.append(buttonRead);
    card.append(buttonDelete);
    content.append(card);

}

privModule.deleteCard = (id)=>{
    myLibrary.splice(id ,1 ,'')
    content.removeChild(document.getElementById(`card${id}`))
}

privModule.changeRead = (id)=>{
    let buttonRead = document.getElementById(`btnRead${id}`)
    if(myLibrary[id].read){
        myLibrary[id].read = false
        buttonRead.classList.remove('btnReadTrue')
        buttonRead.classList.add('btnReadFalse')
        buttonRead.innerHTML = "No Read"
        console.log(true)
        console.log(buttonRead)
    }else{
        myLibrary[id].read = true
        buttonRead.classList.remove('btnReadFalse')
        buttonRead.classList.add('btnReadTrue')
        buttonRead.innerHTML = "Read"
        console.log(false)
        console.log(buttonRead)
    }
}

btnAddBook.onclick = ()=>privModule.showForm()
btnHidenForm.onclick = ()=>{
    privModule.hideForm()
    privModule.addInfoForm()
    console.log(myLibrary)
}



//------------------------------------------------------------------    
    let publicModule = {}

    publicModule.addBook = (title, author, pages, read)=>{
        myLibrary.push(new infoBook(title, author, pages, read))
    }

    return publicModule
})()


