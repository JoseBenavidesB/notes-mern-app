//Manage store
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
  activeNote: null,
  tags:[],
  activeTags: [],
  filter: ''
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    onSetActiveNote: (state, { payload }) => {
      state.activeNote = payload
    },
    onAddNewNote: ( state, { payload }) => {
      state.activeNote = null;
      state.notes.push( payload );
    },
    onUpdateNote: ( state, { payload }) => {
      state.notes = state.notes.map( note => {
        if ( note._id === payload._id ){
          return payload;
        }
        return note
      })
      state.activeNote = null
    },
    onDeleteNote: ( state, { payload }) => {
    
        state.notes = state.notes.filter( note => note._id !== payload)
        state.activeNote = null
      
    },
    disableNote: ( state ) => {
      state.activeNote = null
    },
    archiveNote: ( state, { payload }) => {
      state.notes = state.notes.map( note => {
        if ( note._id === payload ){
            note.active = false;
            return note
        }
        return note
      })
      state.activeNote = null
    },
    unArchiveNote: ( state, { payload }) => {
      state.notes = state.notes.map( note => {
        if ( note._id === payload ){
            note.active = true;
            return note
        }
        return note
      })
      state.activeNote = null
    },
    onLoadNotes: ( state, { payload }) => {
      //state.notes = payload
      payload.forEach( (note) => {
        const exists = state.notes.some( dbNote => dbNote._id === note._id );
        if ( !exists) {
          state.notes.push( note )
        }
      })
    },
    onLogoutNotes: ( state ) => {
      state.notes = [],
      state.activeNote = null
    },
    onSetTags: (state, { payload }) => {

      state.tags = payload
    },
    onSetActiveTags: ( state, { payload }) => {
      state.activeTags = state.activeTags.concat(payload)
    },
    onDisableActiveTags: (state) => {
      state.activeTags = []
    },
    onSetFilter: (state, {payload} ) => {
      state.filter = payload
    },
    onDisableFilter: ( state ) => {
      state.filter = ''
    },
    onDeleteTag: ( state, { payload }) => {
      state.activeTags = state.activeTags.filter( tag => { return tag !== payload})
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
              onSetActiveNote, 
              onAddNewNote, 
              onUpdateNote, 
              onDeleteNote, 
              disableNote, 
              archiveNote, 
              unArchiveNote, 
              onLoadNotes,
              onLogoutNotes,
              onSetTags,
              onSetActiveTags,
              onDisableActiveTags,
              onSetFilter,
              onDisableFilter,
              onDeleteTag
            } = notesSlice.actions