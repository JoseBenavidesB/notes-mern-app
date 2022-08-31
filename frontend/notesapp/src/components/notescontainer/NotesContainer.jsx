import { Notes } from "../notes/Notes"
import moment from 'moment';
import { useNotesStore } from "../../hooks";
import { filterNote } from "../../helpers/filterNotes";
import { useEffect } from "react";

export const NotesContainer = ({active, filter}) => {

    const { notes } = useNotesStore(); //Data from the store
    const activeNotes = filterNote( notes, active, filter); 


  return (
    <div className="row justify-content-center">
            {activeNotes.map( (not) => {
                return (<Notes key={not._id} note={not} />)
            })}
    </div>
  )
}
