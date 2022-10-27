import React, { useEffect, useState } from 'react'
import loginVector from '../../Assests/Login_vector.svg'
import { ReactComponent as User } from '../../Assests/icons/user.svg';
import { ReactComponent as Mail } from '../../Assests/icons/sms.svg';
import { ReactComponent as Phone } from '../../Assests/icons/phone.svg';
import { ReactComponent as Calendar } from '../../Assests/icons/calendar.svg';
import { ReactComponent as Location } from '../../Assests/icons/location.svg';
import { ReactComponent as ChevronRight } from '../../Assests/icons/chvron-right.svg';
import { ReactComponent as USFlag } from '../../Assests/icons/united-states.svg';
import IconInput from '../IconInput/IconInput';
import IconSelect from '../IconInput/IconSelect';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectAutheError, selectAuthenticationStatus, selectAuthLoading, selectAuthMessage, selectReg_id, setError } from '../../redux/Features/AuthenticationSlice';
import { getCountryCodeList, getGenderList, selectCountryCodes, selectGenderList } from '../../redux/Features/MasterSlice';

import isEmail from 'validator/lib/isEmail';
import Alert from '../Alert/Alert';
import IconAutoComplete from '../IconInput/IconAutocomplete';
import Select from 'react-select';
import CountryInput from '../IconInput/CountryInput';
import moment from 'moment';
export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genderList = useSelector(selectGenderList)
    const countryCodeList = useSelector(selectCountryCodes)
    const authStatus = useSelector(selectAuthenticationStatus)
    const loading = useSelector(selectAuthLoading);
    const message = useSelector(selectAuthMessage);
    const reg_id = useSelector(selectReg_id);
    const error = useSelector(selectAutheError)
    
    const [countryCode,setCountryCode] = useState("+91");
    const [form, setForm] = useState({
        fname: '',
        lname: '',
        email: '',
        country_code: '',
        mobile_no: '',
        gender: '',
        dob: '',
        address: ''

    });
    const [location,setLocation] = useState('')
    function handleChange(evt) {
        const value = evt.target.value;
        setForm({
            ...form,
            [evt.target.name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let body = form
        let user_ref = localStorage.getItem("user_ref");
        body.referrer_code = user_ref
        body.address = location
        body.country_code = countryCode
        if (Validation(body, dispatch)) {
            try {
                dispatch(registerUser(form)).unwrap()
            } catch (error) {
            }
        }
    }

    //fetch country code and gender list
    useEffect(() => {
        if (countryCodeList.length === 0) {
            dispatch(getCountryCodeList()).unwrap()

        }

        if (genderList.length === 0) {
            dispatch(getGenderList()).unwrap()


        }

        return () => {

        }
    }, [genderList.length, countryCodeList.length, dispatch])
    useEffect(() => {
        if (countryCodeList.length>0&&form.country_code === '') setForm({ ...form, country_code: countryCodeList[0].country_code })
        if (genderList.length>0&&form.gender === '') setForm({ ...form, gender: genderList[0].id })

        return () => {

        }
    }, [countryCodeList, genderList, form.country_code, form.gender])
    //navigate to otp-singup
    useEffect(() => {
        if (authStatus === 'succeeded' && reg_id && form.country_code && form.mobile_no) navigate('/OTP-signup', { state: { mobile_no: form.country_code + ' ' + form.mobile_no, code: form.country_code, num: form.mobile_no } })

        return () => {

        }
    }, [authStatus, reg_id, navigate])


    return (
        <div className="login">
            <div className="form-container col-30">
                <form>
                {message&&!loading&&<Alert error={error} message={error ? [Object.values(message)]: Object.values(message)[0]} />}
                    <h1>Create Account</h1>
                    <div className="form-row signup-form-row">
                        <IconInput icon={<User />} handleChange={handleChange} name="fname" type='text' label="First Name" placeholder="John" width={50} validation={message&&message.fname} />
                        <IconInput icon={<User />} handleChange={handleChange} name="lname" type='text' label="Last Name" placeholder="Doe" width={50} validation={message&&message.lname} />
                    </div>
                    <div className="form-row signup-form-row">
                        <IconInput icon={<Mail />} handleChange={handleChange} name="email" type='email' label="E-Mail Address" placeholder="John123@abc.com" width={100} validation={message&&message.email} />
                    </div>
                    <div className="flex-row-start align-end g-3 signup-form-row">
                        <CountryInput setCountryCode={setCountryCode} countryCode={countryCodeList} />
                        <IconInput name='mobile_no' icon={<Phone />} handleChange={handleChange} label='Phone Number' placeholder={'8955-656-989'} width={70} validation={message&&message.mobile_no} />
                    </div>
                    <div className="form-row signup-form-row">
                        <IconInput icon={<Calendar />} handleChange={handleChange} name="dob" type='date' label="Date of Birth" placeholder="" width={100} validation={message&&message.dob} />
                    </div>
                    <div className="form-row signup-form-row">
                        <IconSelect icon={<User />} handleChange={handleChange} name="gender" label="Gender" width={100} options={genderList} name_field='gender_name' />
                    </div>
                    <div className="form-row signup-form-row">
                        <IconAutoComplete icon={<Location />} form={location} setForm={setLocation} name="address" type='text' label="Location" placeholder="Bangalore" width={100} validation={message&&message.address} />
                    </div>
                    <div className="form-row signup-form-row">
                        <button onClick={handleSubmit} className='btn primary'>Continue <ChevronRight /></button>
                    </div>
                    <div className="form-row signup-form-row noGap align-center">
                        <span className='line'></span>
                        <p className='w-100'>Already have a Talentplace account?</p>
                        <span className='line'></span>
                    </div>
                    <div className="form-row">
                        <Link to='/login' className='btn secondary'>Login</Link>
                    </div>

                </form>
            </div>
            <div className="image col-70">

                <img src={loginVector} alt="" />
            </div>
        </div>
    )
}

function Validation(form, dispatch) {
    let errorList = {
        "fname": [],
        "lname": [],
        "email": [],
        "mobile_no": [],
        "dob": [],
        "address": [],
        country_code: [],
        flag: true
    }
    let flag = true;
    if (form.fname.length < 1) {
        errorList.fname[0] = 'Enter Your First Name'
        flag = false;
    } else {
        errorList.fname[0] = null
    }
    if (form.lname.length < 1) {
        errorList.lname[0] = 'Enter Your Last Name';
        flag = false;
    } else {
        errorList.lname[0] = null
    }
    if (!isEmail(form.email)) {
        errorList.email[0] = 'Enter Valid Email';
        flag = false;
    } else {
        errorList.email[0] = null
    }
    if (form.country_code.length === '') {
        errorList.country_code[0] = 'Select Country Code';
        flag = false;
        if (!form.mobile_no.length === 10) {
            errorList.mobile_no[0] = <>&nbsp;</>;
        }
    } else {

        errorList.country_code[0] = null
    }
    if (form.mobile_no.length !== 10) {
        errorList.mobile_no[0] = 'Enter valid mobile no';
        flag = false;
        if (form.country_code !== '') {
            errorList.country_code[0] = <>&nbsp;</>;
        }
    } else {
        errorList.mobile_no[0] = null
    }
    if (form.dob.length < 1) {
        errorList.dob[0] = 'Enter Your DOB';
        flag = false;
    }else if(moment(form.dob).isAfter()){
        errorList.dob[0] = "Please enter a valid DOB"
    } else {
        errorList.dob[0] = null
    }
    if (form.address.length < 1) {
        errorList.address[0] = 'Enter Your Location';
        flag = false;
    } else {
        errorList.address[0] = null
    }

    dispatch(setError(errorList))
    return flag


}