'use strict'

// Challenge
// 1. Add a DOM element between the title and body inputs(empty span)
// 2. Set text value: Last edited 4 hours ago
// 3. Update value on title/body/storage change

const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1);
let notes = getSaveNotes()
let note = notes.find( (note) => {
  return note.id === noteId;
})

if(!note) {
  location.assign('index.html');
}
// if(note === undefined) {
//   location.assign('index.html');
// }

// Set initial value on page load
titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt)

titleElement.addEventListener('input', (e) => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt)
  saveNotes(notes);
})

bodyElement.addEventListener('input', (e) => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt)
  saveNotes(notes);
})

removeElement.addEventListener('click', (e) => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign('index.html')
})

// 1. Setup the input event for title
// 2. Update note object and save notes list
// 3. Repeat steps 1-2 for body
// 4. Setup a remove button that remotes notes and sends uses back to home page

// Syncing data across pages
window.addEventListener('storage', (e) => {
  if(e.key === 'notes'){
    notes = JSON.parse(e.newValue);
    note = notes.find(function (note) {
      return note.id === noteId;
    })
    
    if(note === undefined) {
      location.assign('index.html');
    }
    titleElement.value = note.title;
    bodyElement.value = note.body;
    dateElement.textContent = generateLastEdited(note.updatedAt)
  }
})