import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../API";


const initialState = {
    loading: false,
    authToken: null,
    user_id:null,
    reg_id:null,
    otp_verified:false,
    status:'idle',
    error:false,
    message:{},
}
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-Control':'no-cache'
}

export const  registerUser = createAsyncThunk('authentication/registerUser',async(body,{ rejectWithValue })=>{
    let encoded = new URLSearchParams(Object.entries(body)).toString()
        let response = null
        try{
             response =await API.post(`/signup`,encoded,{
                headers: headers
              })
           
            return response.data
        }catch(error){
            console.log(error,{response})
           return rejectWithValue(error.response.data)
        }
       
  
})
export const  signupOtp = createAsyncThunk('authentication/verify-sigup-otp',async(body,{ rejectWithValue })=>{
    let encoded = new URLSearchParams(Object.entries(body)).toString()
    try {
        const response =await API.post(`/verify-sigup-otp`,encoded,{
            headers: headers
          })
       
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const  createPassword = createAsyncThunk('authentication/createPassword',async(body,{ rejectWithValue })=>{
    let encoded = new URLSearchParams(Object.entries(body)).toString()
    try {
        const response =await API.post(`/create-user`,encoded,{
            headers: headers
          })
       
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const  emailLogin = createAsyncThunk('authentication/emailLogin',async(body,{ rejectWithValue })=>{
    console.log('body',body)
    try {
        const response =await API.post(`/email-login`,body,{
            headers: headers
          })
       
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const  mobileLogin = createAsyncThunk('authentication/mobileLogin',async(body,{ rejectWithValue })=>{
    console.log('body',body)
    try {
        const response =await API.post(`/mobile-login`,body,{
            headers: headers
          })
       
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const  validateOtp = createAsyncThunk('authentication/validateOtp',async(body,{ rejectWithValue })=>{
    let encoded = new URLSearchParams(Object.entries(body)).toString()
    console.log('body',encoded)
    try {
        const response =await API.post(`/validate-otp`,encoded,{
            headers: headers
          })
       
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login : (state) =>{
            state.authToken +=1;
        },
        logout : (state)=>{
            state.authToken= null;
        },
        setError : (state,action)=>{
            console.log('setError:',    action.payload)
            state.error = true;
            state.message= action.payload
        },
        resetError: (state)=>{
            state.error = false;
            state.message = {}
        }

    },
    extraReducers(builder){
        builder.addCase(emailLogin.pending, (state,action)=>{
            state.loading=true;
            state.status = 'loading'
            state.error = false
        }).addCase(emailLogin.fulfilled,(state,action)=>{
            console.log('fullfilled')
            state.loading=false
            state.status = 'succeeded' 
            state.authToken = action.payload.data.token;
            state.user_id = action.payload.data.user_id

            
           
        }).addCase(emailLogin.rejected,(state,action)=>{
            state.loading= false
            state.status = 'Rejected' 
            state.error = action.payload.error
            state.message = action.payload.data


        }).addCase(mobileLogin.pending, (state,action)=>{
            state.status = 'loading'
        }).addCase(mobileLogin.fulfilled,(state,action)=>{
            state.status = 'succeeded' 
            state.user_id = action.payload.data.user_id
            
        }).addCase(mobileLogin.rejected,(state,action)=>{
            state.status = 'Rejected' 
            state.loading= false
            state.error = action.payload.error
            state.message = action.payload.data


        }).addCase(validateOtp.pending, (state,action)=>{
            state.status = 'loading'
        }).addCase(validateOtp.fulfilled,(state,action)=>{
            state.status = 'succeeded' 
            state.authToken = action.payload.data.token

        }).addCase(validateOtp.rejected,(state,action)=>{
            state.loading= false
            state.status = 'Rejected' 
            state.error = action.payload.error
            state.message = action.payload.data

            
        }).addCase(registerUser.pending, (state,action)=>{
            state.status = 'loading'
            state.loading= true
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.loading= false
            state.status = 'succeeded' 
            state.reg_id = action.payload.data.id
            
        }).addCase(registerUser.rejected,(state,action)=>{
            state.loading= false
            state.status = 'Rejected' 
            state.error = action.payload.error
            state.message = action.payload.data


        }).addCase(signupOtp.pending, (state,action)=>{
            state.status = 'loading'
            state.loading= false
        }).addCase(signupOtp.fulfilled,(state,action)=>{
            state.loading= false
            state.status = 'succeeded' 
            state.user_id = action.payload.data.user_id
            state.otp_verified = true
            
        }).addCase(signupOtp.rejected,(state,action)=>{
            state.loading= false
            state.status = 'Rejected' 
            state.error = action.payload.error
            state.message = action.payload.data
            


        }).addCase(createPassword.pending, (state,action)=>{
            state.status = 'loading'
        }).addCase(createPassword.fulfilled,(state,action)=>{
            state.status = 'succeeded' 
            state.authToken = action.payload.data.token;
            state.user_id = action.payload.data.id
        }).addCase(createPassword.rejected,(state,action)=>{
            state.status = 'Rejected' 
            state.error = action.payload.error
            state.message = action.payload.data


        })
    }
})
export const selectAuthentication = (state)=> state.authentication;
export const selectAuthenticationStatus = (state)=> state.authentication.status;
export const selectAutheError = (state)=> state.authentication.error;
export const selectAuthLoading = (state)=> state.authentication.loading;
export const selectAuthToken = (state)=> state.authentication.authToken;
export const selectAuthMessage = (state)=> state.authentication.message;
export const selectUser_id = (state)=> state.authentication.user_id;
export const selectReg_id = (state)=> state.authentication.reg_id;
export const selectOtp_verified = (state)=> state.authentication.otp_verified;
export const {setError,resetError,login,logout} = authenticationSlice.actions;

export default authenticationSlice.reducer;