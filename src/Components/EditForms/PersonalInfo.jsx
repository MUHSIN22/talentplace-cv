import React, { useEffect, useState } from 'react'
import './PersonalInfo.css'
import PersonalInfoInput from '../PersonalInfoInput/PersonalInfoInput';
import moment from 'moment';
import PersonalInfoVerification from './PersonalInfoVerification';
import { useDispatch, useSelector } from 'react-redux';
import { reload, selectResumeDetails, selectResumeError, selectResumeMessage, setReloadDecider, updateProfileInfo } from '../../redux/Features/ResumeSlice';
import { selectAuthToken } from '../../redux/Features/AuthenticationSlice';
import Alert from '../Alert/Alert';
import profile from '../../Assets/avatar.png'
import { useNavigate } from 'react-router-dom';
import dateConverter from '../../functionUtils/dateConverter';
import { getCurrencyList, getGenderList, selectCurrencylist, selectGenderList } from '../../redux/Features/MasterSlice';

export default function PersonalInfo() {
  const dispatch = useDispatch();
  const data = useSelector(selectResumeDetails)
  const token = useSelector(selectAuthToken)
  const currentEmail = data.email, currentContact = data.contact;
  const [profilePic, setProfilePic] = useState(data.resume_info?.profile_pic || profile)
  const [profileFile, setProfileFile] = useState(null);
  const [isMobileEditable, setMobileEditable] = useState(false);
  const [isEmailEditable, setEmailEditable] = useState(false);
  const [address, setAddress] = useState(data.address);
  const [isVerification, setVerification] = useState(null)
  const error = useSelector(selectResumeError);
  const message = useSelector(selectResumeMessage);
  const navigate = useNavigate();
  const currencyList = useSelector(selectCurrencylist)
  const genderList = useSelector(selectGenderList)

  const [form, setForm] = useState({
    user_id: data.user_id,
    first_name: data.fname,
    last_name: data.lname,
    email: data.email,
    contact: data.contact,
    gender: data.gender,
    heading: data.heading,
    currency_id: data.currency_id,
    job_start_date: data?.resume_info?.job_start_date ? moment(data?.resume_info?.job_start_date,'dd-mm-yyyy').format('yyyy-mm'): null,
    dob: (() => {
      let splittedDate = data.dob.split('-');
      return splittedDate[2] + "-" + splittedDate[1] + "-" + splittedDate[0]
    })(),
    address: data.address
  })

  const handleProfileChange = (event) => {
    setProfilePic(URL.createObjectURL(event.target.files[0]))
    setProfileFile(event.target.files[0])
  }

  const handleFormChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const personalFormSubmit = async (event) => {
    event.preventDefault();
    let body = form;
    let formData = new FormData();
    body.address = address;
    if(profileFile) body.profile_pic = profileFile

    Object.keys(body).forEach((item) => {
      formData.append(item, body[item]);
    })
    dispatch(setReloadDecider(true))
    await dispatch(updateProfileInfo({auth: token, body: formData, dispatch}))
    
    if (currentEmail !== form.email) {
      localStorage.setItem("email",form.email);
      setVerification("email")
      if(currentContact !== form.contact){
        localStorage.setItem("mobile",form.contact);
      }
      return
    }else if (currentContact !== form.contact) {
      localStorage.setItem("mobile",form.contact);
      setVerification('mobile')
      return
    }else{
      navigate('/dashboard/edit')
    }
    
  }

  useEffect(() => {
    dispatch(getCurrencyList({auth:token}))
    dispatch(getGenderList({auth:token}))
  },[])

  return (
    <>
      {
        !isVerification ?
          <form className="personal-info-edit" onSubmit={personalFormSubmit}>
            <img src={profilePic} className='profile-image' alt="" />
            <label htmlFor="image-upload" className="btn-upload-image">
              <span>Edit Profile Image</span>
              <input type="file" id='image-upload' className='image-upload' name='image-upload' onChange={handleProfileChange} />
            </label>
            <div className="inputs-grid">
              <PersonalInfoInput type="text" name="first_name" label="First Name" value={form.first_name} onChange={handleFormChange} />
              <PersonalInfoInput type="text" name="last_name" label="Last Name" value={form.last_name} onChange={handleFormChange} />
              <PersonalInfoInput type="text" isSelect label="Gender" value={form.gender} name='gender' handleChange={(e) => setForm({...form,gender: e.target.value}) } options={genderList} name_field='gender_name'/>
              <PersonalInfoInput type="text" name="heading" label="Headline" value={form.heading} onChange={handleFormChange} />
              <PersonalInfoInput type="text" isSelect label="Currency" value={form.currency_id} name='currency_id' handleChange={(e) => setForm({...form,currency_id: e.target.value}) } options={currencyList} name_field='currency_name'/>
              <PersonalInfoInput type="month" name="job_start_date" label="Experience Start Date:" value={dateConverter(form.job_start_date)} onChange={handleFormChange} />
              <PersonalInfoInput type="email" isNonEditable={!isEmailEditable && true} name="email" label="Email" value={form.email} onChange={handleFormChange} setEditable={setEmailEditable} />
              <PersonalInfoInput type="date" name="dob" label="DOB" value={form.dob} onChange={handleFormChange} />
              <PersonalInfoInput type="text"  isNonEditable={!isMobileEditable && true} name="contact" label="Mobile No" value={form.contact} onChange={handleFormChange} setEditable={setMobileEditable} />
              <PersonalInfoInput type="location" name="address" label="Location" value={address} onChange={handleFormChange} setAddress={setAddress} />
            </div>
            <button type='submit'>Update</button>
          </form>
          :
          <PersonalInfoVerification type={isVerification} setType={setVerification}/>
      }
    </>
  )
}
