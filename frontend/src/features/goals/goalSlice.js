import {createSlice, creatAsyncThunk} from '@reduxjs/toolkit';


const initialState = {
    goals: [],
    isError: false,
    isSuccsess: false,
    isLoading: false,
    message: ''
}

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    }
})

export const {reset} = goalSlice.actions;
export default goalSlice.reducer;