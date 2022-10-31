import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import API from "../../API";

export const getAssessments = createAsyncThunk('assessments/getAssessments',async(data,{rejectWithValue}) => {
    try {
        const response = await API.get('/assessment/courses')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


const initialState = {
    assessments: null
}

export const assessmentSlice = createSlice({
    name: 'assessmentData',
    initialState,
    reducers: {

    },
    extraReducers : (builder) => {
        builder.addCase(getAssessments.fulfilled,(state,action) => {
            state.assessments = action.payload.recordDetails.data
        })
    }
})

export const selectAssessments = (state) => state.assessmentData.assessments



export default assessmentSlice.reducer;