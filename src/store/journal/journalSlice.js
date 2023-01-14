import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({

    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 12345,
        //     imageUrls: [], // https://fotos.com/foto1.jpg, https://fotos.com/foto1.jpg, https://fotos.com/foto1.jpg 
        // },
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = ''
        },
        setNotes: (state, {payload}) => {
            state.notes = payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = ''
        },
        updateNote: (state, {payload}) => {
            state.isSaving = false;

            const noteIndex = state.notes.findIndex( note => note.id === payload.id )

            state.notes[noteIndex] = payload;

            state.messageSaved = `${payload.title}, actualizada correctamente`
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
            state.notes = state.notes.filter( note => note.id !== action.payload );
            state.active = null;
        },
    }

})

export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    savingNewNote,
    setPhotosToActiveNote,
    clearNotesLogout,
} = journalSlice.actions;