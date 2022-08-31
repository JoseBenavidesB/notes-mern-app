import moment from "moment"



export const formatDate = (notes = []) => {
    return notes.map( note => {
        note.lastEdited = moment(note.lastEdited).format('DD/MM/YYYY')

        return note
    })
}
