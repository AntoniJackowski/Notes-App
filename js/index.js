const form = document.querySelector('#form');
const titleInput = document.querySelector('#note-title');
const descInput = document.querySelector('#note-desc');
const submitBtn = document.querySelector('#submit-btn')
const notesContainer = document.querySelector('#notes-container')
let notes = [];

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

    notes.forEach((item) => {
        notesContainer.innerHTML += getNoteElement(item.title, item.desc, getDateFormat(item.date), item.id);
    });
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