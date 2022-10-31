import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    designationForm: null,
    editCompany: null,
    editDesignationID: null,
    editProjectID: null,
    formProgress : 0,
    editEducationID: null,
    editCertificateID : null,
    editContributionID: null,
    editPortfolioID: null,
}


export const editSlice = createSlice({
    name: "editUtils",
    initialState,
    reducers: {
        addCompanyForEdit: (state,action) => {
            state.editCompany =  action.payload
        },
        addDesignationForEdit: (state,action) => {
            state.editDesignationID = action.payload
        },
        addProjectForEdit : (state, action) => {
            state.editProjectID = action.payload
        },
        addEducationForEdit : (state,action) => {
            state.editEducationID = action.payload
        },
        addCertificateForEdit : (state,action) => {
            state.editCertificateID = action.payload
        },
        addContributionForEdit : (state,action) => {
            state.editContributionID = action.payload
        },
        addPortfolioForEdit: (state,action) => {
            state.editPortfolioID = action.payload
        },
        changeExperienceForm : (state,action) => {
            state.formProgress = action.payload
        }
    }
})

export const {addCompanyForEdit, addDesignationForEdit, addEducationForEdit, changeExperienceForm, addProjectForEdit, addCertificateForEdit, addContributionForEdit, addPortfolioForEdit} = editSlice.actions;
export const selectCompanyForEdit = (state) => state.editDetails.editCompany;
export const selectDesignationForEdit = (state) => state.editDetails.editDesignationID;
export const selectFormProgress = (state) => state.editDetails.formProgress;
export const getEditProjectID = (state) => state.editDetails.editProjectID;
export const getEducationID = (state) => state.editDetails.editEducationID;
export const getCertificateID = (state) => state.editDetails.editCertificateID;
export const getContributionID = (state) => state.editDetails.editContributionID;
export const getPortfolioID = (state) => state.editDetails.editPortfolioID
export default editSlice.reducer;