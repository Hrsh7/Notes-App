'use strict'

let notes = getSaveNotes();

const filters = {
  searchText : '',
  sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
  const id = uuidv4();
  const timestamp = moment().valueOf();

  notes.push({
    id: id,
    title: '',
    body: '',
    createdAt: timestamp,
    updatedAt: timestamp
  })
  saveNotes(notes);
  location.assign(`edit.html#${id}`)
  // renderNotes(notes, filters); 
})

document.querySelector('#search-text').addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters)
})

// 1. setup the link href to include hash with id
// 2. Setup the assign call to include hash with id

// Syncing data
window.addEventListener('storage', (e) => {
  if(e.key === 'notes'){
    // 1. parse the new data and update notes
    // 2. Rerender the notes
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters)
  }
})


