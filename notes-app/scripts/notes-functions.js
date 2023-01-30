'use strict'

// Read existing notes from localStorage
const getSaveNotes = () => {
  const notesJSON = localStorage.getItem('notes')

  try{
    if(notesJSON !== null){
      return JSON.parse(notesJSON)
    }
    else{
      return []
    }
  }
  catch(e){
    return []
  }
  
}

// save the notes to localStorage
const saveNotes = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes))
}
//Remove a note from list of notes
const removeNote = (id) => {
  // const noteIndex = notes.findIndex(function(note){
  //   return note.id === id;
  // })
  const noteIndex = notes.findIndex((note) => note.id === id);
  if(noteIndex !== -1){
    notes.splice(noteIndex, 1);
  }
}

// Generate the DOM structure for note
const generateNoteDOM = (note) => {
  const noteEl = document.createElement('a');
  const textEl = document.createElement('p');
  const statusEl = document.createElement('p')
//   let btn = document.createElement('button');
  
//  // setup the note remove button
//   btn.textContent = "x";
//   newDiv.appendChild(btn);
//   btn.addEventListener('click', () => {
//     removeNote(note.id);
//     saveNotes(notes);
//     renderNotes(notes, filters);
//   })
  // set up the note title text
  if(note.title.length >0){
    textEl.textContent = note.title;
    
  }else{
    textEl.textContent ='Unnamed note';
  }
  textEl.classList.add('list-item__title')
  noteEl.appendChild(textEl);

  // Setup the link
  noteEl.setAttribute('href', `edit.html#${note.id}`);
  noteEl.classList.add('list-item')

  // Set up the status message
  statusEl.textContent = generateLastEdited(note.updatedAt)
  statusEl.classList.add('list-item__subtitle')
  noteEl.appendChild(statusEl);
  return noteEl
}

// sort your notes by one of three ways 
const sortNotes = (notes, sortBy) => {
  if(sortBy === 'byEdited'){
    return notes.sort((a, b) => {
      if(a.updatedAt > b.updatedAt){
        return -1;
      }
      else if(a.updatedAt < b.updatedAt){
        return 1;
      }
      else{
        return 0;
      }
    })
  }
  else if(sortBy === 'byCreated'){
    return notes.sort((a, b) => {
      if(a.createdAt > b.createdAt){
        return -1;
      }
      else if(a.createdAt < b.createdAt){
        return 1;
      }
      else{
        return 0;
      }
    })
  }
  else if(sortBy === 'alphabetical'){
    return notes.sort((a, b) => {
      if(a.title.toLowerCase() < b.title.toLowerCase()){
        return -1;
      }
      else if(a.title.toLowerCase() > b.title.toLowerCase()){
        return 1;
      }
      return 0;
    })
  }
  else{
    return notes;
  }
}

// Render application notes
const renderNotes = (notes, filters) => {
  const notesEl = document.querySelector('#notes');
  notes = sortNotes(notes, filters.sortBy)
  console.log(notes);
  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  })
  notesEl.innerHTML = '';

  if(filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteEl = generateNoteDOM(note)
      notesEl.appendChild(noteEl)
    })
  } else {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No notes to show'
    emptyMessage.classList.add('empty-message')
    notesEl.appendChild(emptyMessage)
  }

}

// Generate the last edited message
const generateLastEdited = (timestamp) => {
  return `Last edited ${moment(timestamp).fromNow()}`
}