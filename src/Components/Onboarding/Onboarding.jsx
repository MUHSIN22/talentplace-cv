import React, { useEffect, useState } from 'react'
import './Onboarding.css'

import { ReactComponent as ChevronRight } from '../../Assests/icons/chvron-right.svg';
import IconInput from '../IconInput/IconInput';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addExperience, changeFormId, selectFormId, selectReload, selectResumeDetails, selectResumeError, selectResumeInfo, selectResumeMessage, selectResumeStatus } from '../../redux/Features/ResumeSlice';
import { selectAuthToken, selectUser_id } from '../../redux/Features/AuthenticationSlice';
import Alert from '../Alert/Alert';
import DateInput from '../../Util Components/Inputs/DateInput/DateInput';
import { getCurrencyList, selectCurrencylist } from '../../redux/Features/MasterSlice';
import SelectInput from '../../Util Components/Inputs/SelectInput/SelectInput';
import PlainInput from '../../Util Components/Inputs/PlainInput/PlainInput';
export default function Onboarding() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const message = useSelector(selectResumeMessage)
    const error = useSelector(selectResumeError)
    const buttonText = [
        'Create',
        'Next',
    ]
    function clickHandler(){
        if(step<6) setStep(step + 1)
        if(step===6)navigate('/cv-builder')
    }
   const resumeDetails =  useSelector(selectResumeDetails)
   const form_id = useSelector(selectFormId)
   useEffect(() => {
     if(form_id === 17){
        navigate('/dashboard/cv')
        return
     }
     if(form_id!==""&&form_id!==null) navigate('/cv-builder')
   
     return () => {
       
     }
   }, [form_id])
   
    return (
        <div className="onboarding" >
            <div className={step%2===0?"content slide-in-top1 ":"content slide-in-top2 "}>
                {error&&message&&<Alert error={error} message={error&&message ? Object.values(message) : message}/>}
                {step === 1 && <Step1 name={resumeDetails.fname} />}
                {step === 2 && <Step6 />}
                {step<2&&<button onClick={clickHandler} className='btn primary'>{buttonText[step - 1]} <ChevronRight /> </button>}
            </div>

        </div>
    )
}
function Step1({ name }) {
    return (
        <div className="step">

            <p style={{fontSize:'3rem'}} className="name-preview">Hey {name}</p>
            <h1>Let’s create your Intelligent Resume</h1>
        </div>
    )
}
function Step2() {
    return (
        <div className="step">
            
            <p>Our AI engine will extract and show mind boggling insights from your career path and as we keep uploading & learning more about you and the industry at large, we will be able to predict your future.</p>
            <h2>Sounds amazing, right?</h2>
        </div>
    )
}
function Step3() {
    return (
        <div className="step">
            <h5>Wait, we forgot to tell you something!</h5>
            <p>Not only will it predict but also give you multiple options to help you build a great career.</p>
            <h2>Wouldn’t you like to do that?</h2>
        </div>
    )
}
function Step4() {
    return (
        <div className="step">
            <h5>25-30 years of your career is the most important period of your life… isn’t it? So make the best out of it… </h5>
            <p>Let us spend the next 30 minutes to dive deep into your career landscape.</p>
            <h2>And we promise to <span>AWE</span> you at the end of it!</h2>
        </div>
    )
}
function Step5({name}) {
    return (
        <div className="step">
            <h5>Hey {name}, did you know that 67% of recruiters today emphasise on skills and experience more than the background and educational qualifications? </h5>
          
            <p>The skills you possess and how you have used them defines who you are and what you are capable of.</p>
        </div>
    )
}
function Step6() {
    const [form, setForm] = useState({
        job_start_date: '',
        is_fresher:'no',
        currency_id: '',
        heading: ""

    });
    const [isFresher,setFresher] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector(selectAuthToken)
    const user_id = useSelector(selectUser_id)
    const currencyList = useSelector(selectCurrencylist)

    function handleSUbmit(){
        try {
            dispatch(addExperience({
                auth:token,body:{
                    user_id,
                    job_start_date: form.job_start_date,
                    is_fresher: form.is_fresher,
                    currency_id: form.currency_id,
                    heading: form.heading
                }
            })).unwrap()
            let body = {
                form_id: 8,
                user_id: user_id
              }
            if(form.is_fresher === "yes"){
                dispatch(changeFormId({auth:token,body})).unwrap()
            }
        } catch (error) {
        }
    }
    function handleChange(evt) {
        const value = evt.target.value;
        
        setForm({
            ...form,
            [evt.target.name]: value
        });
    }
    

    useEffect(() => {
        dispatch(getCurrencyList())
    },[])

    return (
        <>
        <div className="step">
            <h5>Tell us about your EXPERIENCE </h5>
            <div className="form-row date-row">
                <DateInput handleChange={handleChange} isDisabled={isFresher} type='date' name='job_start_date' placeholder='Years' label='When did you start your first job' />
            </div>
            <div className="form-row date-row">
                <SelectInput value={form.currency_id} name='currency_id' disabled={isFresher} handleChange={(e) => setForm({...form,currency_id: e.target.value}) } label="Preffered Currency for the entire career profile" options={currencyList} name_field='currency_name' />
            </div>
            <div className="form-row date-row">
                <PlainInput value={form.heading} name='heading' disabled={isFresher} handleChange={(e) => setForm({...form,heading: e.target.value}) } label="Headline"/>
            </div>
            <div className="control-group">
                <label className="control control-checkbox">
                    I am a fresher 
                    <input name='is_fresher' onChange={(e) => {handleChange(e); setFresher(!isFresher)}} value={!isFresher ? 'yes' : 'no'} type="checkbox" />
                    <div className="control_indicator"></div>
                </label>
            </div>
        </div>
        <button onClick={handleSUbmit} className='btn primary'>Continue <ChevronRight /> </button>
        </>
    )
}