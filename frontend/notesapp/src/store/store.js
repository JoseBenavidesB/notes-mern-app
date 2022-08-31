import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { notesSlice, uiSlice} from "./"
import { authSlice } from "./auth/authSlice"

export const store = configureStore({
    reducer: {
        auth:   authSlice.reducer,
        notes : notesSlice.reducer,
        ui:     uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})