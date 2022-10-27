import React, { useEffect, useState } from 'react'
import './Login.css'
import loginVector from '../../Assests/Login_vector.svg'

import { ReactComponent as Mail } from '../../Assests/icons/sms.svg';
import { ReactComponent as Password } from '../../Assests/icons/lock.svg';
import { ReactComponent as ChevronRight } from '../../Assests/icons/chvron-right.svg';
import { ReactComponent as USFlag } from '../../Assests/icons/united-states.svg';
import { ReactComponent as Phone } from '../../Assests/icons/phone.svg';
import IconInput from '../IconInput/IconInput';
import IconSelect from '../IconInput/IconSelect';
import { Link, useNavigate } from 'react-router-dom';
import IconPasswordInput from '../IconInput/IconPasswordInput';

import { useDispatch, useSelector } from 'react-redux';
import { emailLogin, mobileLogin, selectAutheError, selectAuthentication, selectAuthLoading, selectAuthMessage, setError } from '../../redux/Features/AuthenticationSlice';
import { getCountryCodeList, selectCountryCodes } from '../../redux/Features/MasterSlice';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword'
import Alert from '../Alert/Alert';
import CountryInput from '../IconInput/CountryInput';
export default function Login() {
    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const codes = useSelector(selectCountryCodes)
    const auth = useSelector(selectAuthentication);
    const message = useSelector(selectAuthMessage);
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAutheError)
    const navigate = useNavigate()
    const [countryCode,setCountryCode] = useState("+91")
    function handleChange(evt) {
        const value = evt.target.value;
        setForm({
            ...form,
            [evt.target.name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
      

        let encoded = new URLSearchParams(Object.entries(form)).toString()
        try {
            dispatch(emailLogin(encoded)).unwrap()
        } catch (error) {
        }
    

    }
    const handleMobileLogin = async (e) => {
        e.preventDefault();
        let body = form;
        body.country_code = countryCode
        let encoded = new URLSearchParams(Object.entries(body)).toString()
        e.preventDefault();
        if (body.mobile_no && body.country_code) {
            try {
                dispatch(mobileLogin(encoded)).unwrap()

            } catch (error) {
            }
        }else{
            dispatch(setError({
                "mobile_no":!body.mobile_no&& [
                    "Enter valid mobile no"
                ],
                "country_code":!body.country_code&&[
                    "Select country code"
                ],
            }))
        }
    }
    useEffect(() => {
        dispatch(getCountryCodeList()).unwrap()
        return () => {

        }
    }, [dispatch])
    useEffect(() => {
        if (auth.status === 'succeeded' && auth.user_id && form.country_code && form.mobile_no) {
            navigate('/otp-login',{state:{mobile_no:form.country_code+' '+form.mobile_no,code: form.country_code,num: form.mobile_no}})
        }

        return () => {

        }
    }, [auth,navigate])


    //default value

    useEffect(() => {
        if(!form.country_code&&codes.length>0) setForm({...form, country_code: codes[0].country_code})
    
      return () => {
        
      }
    }, [codes])

    useEffect(() => {
        if(error && message){
        }
    },[message])
    

    return (

        <div className="login">
           
            <div className="form-container col-30">
                <form autocomplete="off">
                    {message&&!loading&&<Alert error={error} message={error ? Object.values(message)[0]: message} />}
                    <h1>Login</h1>
                    <div className="form-row">
                        <IconInput icon={<Mail />} handleChange={handleChange} name="email" type='email' label="E-Mail Address" placeholder="Enter your primary email address" width={95} validation={message&&message.email} />
                    </div>
                    <div className="form-row">
                        <IconPasswordInput icon={<Password />} handleChange={handleChange} name="password" label="Password" placeholder="Enter your password" width={95} validation={message&&message.password}/>
                    </div>
                    <div className="form-row">
                        <label className="control control-checkbox">
                            Remember me
                            <input type="checkbox" />
                            <div className="control_indicator"></div>
                        </label>
                        <button className='btn-link'>Forgot password?</button>
                    </div>
                    <div className="form-row">
                        <button onClick={handleSubmit} className='btn primary'>{loading?'Logging in':'Continue'}  <ChevronRight /></button>
                    </div>
                    {/* <div className="form-row noGap align-center">
                        <span className='line'></span>
                        <p>Or</p>
                        <span className='line'></span>
                    </div>
                    <div className="flex-row-start align-end g-3">
                        <CountryInput  setCountryCode={setCountryCode}/>
                        <IconInput name='mobile_no' icon={<Phone />} label='Phone Number' placeholder={'8955-656-989'} handleChange={handleChange} width={65} validation={message&&message.mobile_no} />
                    </div>
                    <div className="form-row my-2">
                        <button onClick={handleMobileLogin} className='btn secondary'>Login with Phone Number</button>
                    </div> */}
                    <div className="form-row noGap align-center">
                        <span className='line'></span>
                        <p className='w-100'>Don't have a Talentplace account?</p>
                        <span className='line'></span>
                    </div>
                    <div className="form-row">
                        <Link to='/signup' className='btn tertiary'>Register Now</Link>
                    </div>

                </form>
            </div>
            <div className="image col-70">

                <img src={loginVector} alt="" />
            </div>
        </div>
    )
}

function Validation(email,password){
    const dispatch = useDispatch()
    setError()
    if(isEmail(email)){
        if(isStrongPassword(password)){
            dispatch(setError({}))
            return {email:true,password:true}
        }else{
            dispatch(setError({
                "email": [
                    "The email must be a valid email address."
                ],
                "password": [
                    "The password field is required."
                ]
            }))
            return {email:true,password:false}
        }
    }else{
        if(isStrongPassword(password)){
              dispatch(setError({
                "email": [
                    "The email must be a valid email address."
                ],
                "password": [
                    "The password field is required."
                ]
            }))
            return {email:false,password:true}
        }else{
            dispatch(setError({
                "email": [
                    "The email must be a valid email address."
                ],
                "password": [
                    "The password field is required."
                ]
            }))
            return {email:false,password:false}
        }
    }
}
