
export const filterNote = ( notes=[], active = true, filter='') => {
    
    /* return notes.filter( note => {
        return note.active === active
        }
    ) */
    const filteredNotes = notes.filter( note => {
        if (filter.length > 0) {
            return note.active === active && note.tags.includes(filter)
        }
        return note.active === active
    });

    return filteredNotes;
}