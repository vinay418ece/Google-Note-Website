
let notesListElement = document.querySelector('.notes');

let notes = [];

function renderElementsToScreen() {
  if (localStorage.getItem('notes')) {
    notes = JSON.parse(localStorage.getItem('notes'));
    notes.forEach(note => {
      renderNoteToList(note);
    });
  }
}

document.querySelector('.task').addEventListener('click', () => {
  document.querySelectorAll('.note').forEach(note => {
    note.remove();
  });
  localStorage.clear();
});

document.querySelector('#createButton').addEventListener('click', () => {
  if ((document.querySelector('#createtitle').value === "") || (document.querySelector('.textarea').value === "")) {
    alert('Please enter the data in the task bar');
    return;
  }

  let uniqueID = 'note' + Math.floor(Math.random() * 1000);
  let note = {
    title: document.querySelector('#createtitle').value,
    content: document.querySelector('.textarea').value
  };
  
  addNoteToLocalStorage(note, uniqueID);
  renderNoteToList(note, uniqueID);
});

function renderNoteToList(note, uniqueID) {
  let noteDiv = document.createElement('div');
  noteDiv.classList.add('note', uniqueID);
  let noteTitle = document.createElement('h4');
  let noteContent = document.createElement('p');
  let noteButton = document.createElement('button');

  noteTitle.innerText = note.title;
  noteContent.innerText = note.content;
  noteButton.innerText = 'Delete Note';

  noteButton.addEventListener('click', () => {
    removeElementFromNotesList(uniqueID);
  });

  noteDiv.appendChild(noteTitle);
  noteDiv.appendChild(noteContent);
  noteDiv.appendChild(noteButton);

  notesListElement.appendChild(noteDiv);

  document.querySelector('#createtitle').value = '';
  document.querySelector('.textarea').value = '';
}

function addNoteToLocalStorage(note, uniqueID) {
  note = { ...note, uniqueID };
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function removeElementFromNotesList(id) {
  document.querySelector('.' + id).remove();

  notes = JSON.parse(localStorage.getItem('notes'));

  let index = notes.findIndex(note => note.uniqueID == id);
  notes.splice(index, 1);

  localStorage.setItem('notes', JSON.stringify(notes));
}

renderElementsToScreen();