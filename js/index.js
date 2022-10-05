const form = document.querySelector('#form');
const titleInput = document.querySelector('#note-title');
const descInput = document.querySelector('#note-desc');
const submitBtn = document.querySelector('#submit-btn');
const offSortBtn = document.querySelector('#off-sort-btn');
const ascSortBtn = document.querySelector('#asc-sort-btn');
const dscSortBtn = document.querySelector('#dsc-sort-btn');
const notesContainer = document.querySelector('#notes-container');
let notes = [];
let notesSort = [];
let isSort = false;

const getNoteElement = (title, desc, date, id) => {
    return `
        <div class="col-12 col-sm-6 col-lg-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-date">${date}</p>
                    </div>
                    <p class="card-text">${desc}</p>
                    <div class="d-grid gap-2 d-flex justify-content-end">
                        <button onclick="editNote(${id})" type="button" class="btn btn-outline-success me-2 btn-vertical-center"><i class="bi bi-pencil-fill"></i><p class="m-0">Edytuj</p></button>
                        <button onclick="delNote(${id})" type="button" class="btn btn-outline-danger btn-vertical-center"><i class="bi bi-trash-fill"></i><p class="m-0">Usuń</p></button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const checkIsSubmitBtnDisabled = () => {
    if(titleInput.value != null && descInput.value != null) submitBtn.disabled = false;
};

titleInput.addEventListener('change', () => {
    checkIsSubmitBtnDisabled();
});

descInput.addEventListener('change', () => {
    checkIsSubmitBtnDisabled();
});

const getDateFormat = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")} ${String(date.getDate()).padStart(2, "0")}.${(String(date.getMonth()+1)).padStart(2, "0")}.${date.getFullYear()}`;
};

const renderNotes = () => {
    notesContainer.innerHTML = null;

    if(isSort === false){
        notes.forEach((item) => {
            notesContainer.innerHTML += getNoteElement(item.title, item.desc, getDateFormat(item.date), item.id);
        });
    } else {
        notesSort.forEach((item) => {
            notesContainer.innerHTML += getNoteElement(item.title, item.desc, getDateFormat(item.date), item.id);
        });
    };

};

const delNote = (id) => {
    notes = notes.filter((item) => item.id !== id);
    renderNotes();
};

const editNote = (id) => {
    const title = prompt('Nowy tytuł: ');
    const desc = prompt('Nowy opis: ');
    
    notes = notes.map((item) => {
        return item.id === id 
            ? {
                id: item.id,
                title: title === null ? item.title : title,
                desc: desc === null ? item.desc : desc,
                date: item.date,
            } : item;
    });
    renderNotes()
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const note = {
        id: new Date().getTime(),
        title: titleInput.value,
        desc: descInput.value,
        date: new Date(),
    };
    notes.push(note);
    form.reset();
    submitBtn.disabled = true;

    renderNotes();
});

offSortBtn.addEventListener('click', () => {
    isSort = false;
    notesSort = [];
    renderNotes();
    offSortBtn.classList.add('active');
    ascSortBtn.classList.remove('active');
    dscSortBtn.classList.remove('active');
});

ascSortBtn.addEventListener('click', () => {
    isSort = true;
    notesSort = [...notes];
    notesSort.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    renderNotes();
    ascSortBtn.classList.add('active');
    offSortBtn.classList.remove('active');
    dscSortBtn.classList.remove('active');
});

dscSortBtn.addEventListener('click', () => {
    isSort = true;
    notesSort = [...notes];
    notesSort.sort((a,b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0));
    renderNotes();
    dscSortBtn.classList.add('active');
    ascSortBtn.classList.remove('active');
    offSortBtn.classList.remove('active');
});