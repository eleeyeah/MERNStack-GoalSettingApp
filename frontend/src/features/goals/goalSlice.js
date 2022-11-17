import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';



const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Create goal

export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token; //Get token from state
        return await goalService.createGoal(goalData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Get goals from the database

export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token; //Get token from state
        return await goalService.getGoals(token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload);
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = (action.payload);
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = (action.payload);
            })
    }
})

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;