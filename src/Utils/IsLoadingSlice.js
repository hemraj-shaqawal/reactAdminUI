import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "Loading",
    initialState: {
        isLoading: false
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = !state.isLoading
        }
    }
})

export const {setIsLoading} = slice.actions

export default slice.reducer