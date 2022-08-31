import moment from 'moment'
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { filterNoteByTag } from '../helpers/filterNoteByTag';
import { formatDate } from "../helpers/formatDate";
import { getAllTags } from "../helpers/getAllTags";
import { archiveNote, 
        disableNote, 
        onAddNewNote, 
        onDeleteNote,  
        onDeleteTag,  
        onDisableActiveTags,  
        onDisableFilter, 
        onLoadNotes, 
        onSetActiveNote, 
        onSetActiveTags, 
        onSetFilter, 
        onSetTags, 
        onUpdateNote, 
        unArchiveNote } from "../store";


export const useNotesStore = () => {

    const dispatch = useDispatch();

    const { notes, activeNote, tags, activeTags, filter } = useSelector( state => state.notes ) //get the notes


    //Set active note on store
    const setActiveNote = ( note ) => {
        dispatch( onSetActiveNote( note ) )
    };

    //create note or update
    const startSavingNote = async( note ) => {

                //is update?
                try {
                    if( note._id ){
                
                        //update note in database
                        const {data} = await calendarApi.put(`/notes/${note._id}`, note)
                        //set the store
                        dispatch( onUpdateNote({...note})); 

                        dispatch( onSetTags( getAllTags( notes ) )) // get the all unique tags
                         
                    } else {
                        // get the notes from DB
                        const { data } = await calendarApi.post('/notes', note);
                        const { note: newNote } = data

                        //set the store with the notes
                        dispatch( onAddNewNote({ ...newNote , lastEdited: moment(note.lastEdited).format('DD/MM/YYYY')}))

                        dispatch( onSetTags( getAllTags( notes ) )) // get the all unique tags
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire('Erro Save', error.response.data.errors[0].msg, 'error');
                }
    };

    //start loading note
    const startLoadingNotes = async() => {
        try {
            const { data } = await calendarApi.get('/notes');
            const notes = formatDate( data.notes );
            dispatch( onLoadNotes( notes ) )
            dispatch( onSetTags( getAllTags( notes ) )) // get the all unique tags
        } catch (error) {
            console.log(error);
            console.log('Error loading notes');
        }
    }

    //delete note
    const startDeleteNote = async(_id) => {

        try {
            await calendarApi.delete(`/notes/${_id}`);
            dispatch( onDeleteNote(_id) );
        } catch (error) {
            console.log(error);
        }
    };

    //disable active note
    const setDisableNote = () => {
        dispatch( disableNote() )
    };

    //archived note
    const setArchived = async(_id, title) => {
        try {
            await calendarApi.put(`/notes/${_id}`, {title, active:false});
            dispatch( archiveNote(_id) )
        } catch (error) {
            console.log(error);
        }

    };

    //Unarchive note
    const setUnArchived = async(_id, title) => {

        try {
            await calendarApi.put(`/notes/${_id}`, {title, active:true});
            dispatch( unArchiveNote(_id) )
        } catch (error) {
            console.log(error);
        }

    };

    //set Tags
    const setNoteTags = ( notes ) => {
        dispatch( onSetTags( getAllTags( notes ) ))
        filterNoteByTag('cocina', notes)
    };

    //set Active Tags
    const setActiveTags = ( tag ) => {
        dispatch( onSetActiveTags( tag ))
    };

    //disable active tags
    const setEmptyActiveTags = () => {
        dispatch( onDisableActiveTags() )
    };

    //set filter tag
    const setFilterTag = (tag) => {
        dispatch( onSetFilter(tag) )
    };

    //disable filter
    const setEmptyFilter = () => {
        dispatch( onDisableFilter() )
    };

    //delete tag from store
    const setDeleteTag = (tag) => {
        dispatch( onDeleteTag(tag) )
    }



    return  {
        //properties
        notes,
        activeNote,
        tags,
        activeTags,
        filter,

        //methods
        setActiveNote,
        startSavingNote,
        startDeleteNote,
        setDisableNote,
        setArchived,
        setUnArchived,
        startLoadingNotes,
        setNoteTags,
        setActiveTags,
        setFilterTag,
        setEmptyFilter,
        setEmptyActiveTags,
        setDeleteTag
    }
}
