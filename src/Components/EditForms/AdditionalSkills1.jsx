import React, { useState } from 'react'
import IconInput from '../IconInput/IconInput'
import IconSelect from '../IconInput/IconSelect'
import IconTextArea from '../IconInput/IconTextArea'
import { ReactComponent as AddCircle } from '../../Assests/icons/add-circle.svg';
import { useDispatch, useSelector } from 'react-redux'
import { addAdditionalSkills, reload, selectResumeError, selectResumeLoading } from '../../redux/Features/ResumeSlice'
import Control from './Control';
import { selectAuthToken, selectUser_id } from '../../redux/Features/AuthenticationSlice';
import Alert from '../Alert/Alert';
import moment  from 'moment'
export default function AdditionalSkills1({data}) {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        role: data.role || '',
        organization_name:data.organization_name || '',
        from_duration: moment(data.from_duration,'DD-MM-YYYY').format('YYYY-MM-DD') || '',
        to_duration: moment(data.to_duration,'DD-MM-YYYY').format('YYYY-MM-DD') || '',
        currently_working:data.currently_working ? 'yes' : 'no',
        description:data.description || '',
        additional_skill_record_id: data.additional_skill_record_id,
    })
    const error = useSelector(selectResumeError);
    const loading = useSelector(selectResumeLoading);
    const [showAlert, setShowAlert] = useState(false);
    const token = useSelector(selectAuthToken)
    const user_id = useSelector(selectUser_id)

    function handleChange(evt) {
        const value = evt.target.value;
        setForm({
            ...form,
            [evt.target.name]: value
        });
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        let body = form
        body.user_id = user_id
        try {
          dispatch(addAdditionalSkills({auth:token,body:{...form,user_id},dispatch})).unwrap()
        } catch (error) {
            showAlert(true)
        }finally{
            setShowAlert(true)
        }
    }
    return (
        <>
            <h1>Have you ever volunteered for/contributed to any social cause. If yes, please let us know about it.</h1>
            {showAlert&&!loading&&<Alert error={error} message={error?'Failed to add Information': 'Information added'}/>}
            <div className="form-row">
                <IconInput name='role' handleChange={handleChange} label='Your role' placeholder='i.e. Volunteer' width={100} defaultValue={form.role}/>
            </div>
            <div className="form-row">
                <IconInput value={form.organization_name} name='organization_name' handleChange={handleChange} label='Organisation name' placeholder='i.e. Goonj' width={100} />
            </div>
            <div className="form-row">
                <IconInput name='from_duration' handleChange={handleChange} type={'date'} label='Duration (From)' placeholder='i.e. Duration date' width={50} defaultValue={form.from_duration}/>
                <IconInput name='to_duration' handleChange={handleChange} type={'date'} label='Duration (to)' placeholder='i.e. Duration date' width={50} defaultValue={form.to_duration}/>
            </div>
            <label className="control control-checkbox">
                I am currently working here
                {form.currently_working && form.currently_working=='yes' ? <input name='currently_working' onChange={handleChange} value={'yes'} type="checkbox" checked/>: <input name='currently_working' onChange={handleChange} value={'yes'} type="checkbox"/>}
                <div className="control_indicator"></div>
            </label>
            <div className="form-row">
                <IconTextArea  name='description' handleChange={handleChange} label='Please describe your cause in brief' placeholder="e.g. Set up a 'Goonj' kiosk for clothing collection for needy " width={100} rows={8} defaultValue={form.description}/>
            </div>
            {/* <div className="flex-row-end">
                <button onClick={handleSubmit} className="btn-fit transparent g-0-5"><AddCircle width={30} />Add more</button>
            </div> */}
            <Control handleSubmit={handleSubmit}/>
        </>
    )
}
