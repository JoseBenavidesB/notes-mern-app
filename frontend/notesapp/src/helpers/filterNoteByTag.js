
export const filterNoteByTag = (tag, notes =[]) => {
    
    const filteredNotes = notes.filter( note => {
        if( note.tags.includes(tag)) {
            return note
        };
    })
    
    return filteredNotes
}
