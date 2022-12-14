import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { selectAuthToken, selectUser_id } from '../../../redux/Features/AuthenticationSlice';
import { selectCognitive_info } from '../../../redux/Features/GraphSlice';
import { addCognitiveSkills, getResumeMessage, getResumeUpdateStatus, reload, selectResumeError, selectResumeLoading, setReloadDecider } from '../../../redux/Features/ResumeSlice';
import FormController from '../../../Util Components/FormController/FormController';
import MarkedSlider from '../../MarkedSlider/MarkedSlider';
import './CognitiveSkillsForm.css'

export default function CognitiveSkiilsForm() {
    const dispatch = useDispatch()
    const [isStatusChecked, setStatusChecked] = useState(false);
    const [form, setForm] = useState({
        communication: "",
        teamwork: "",
        leadership: "",
        flexibility_adaptability: "",
        probleam_solving: "",
        handling_pressure: "",
        analytical_skills: "",
        creativity: "",
        time_management: "",
        negotiating: "",
        strategic_planning: "",
        handling_feedback: "",
        decision_making: "",
        presentation_skills: ""
    })
    const [inputStatus, setInputStatus] = useState({
        communication: false,
        teamwork: false,
        leadership: false,
        flexibility_adaptability: false,
        probleam_solving: false,
        handling_pressure: false,
        analytical_skills: false,
        creativity: false,
        time_management: false,
        negotiating: false,
        strategic_planning: false,
        handling_feedback: false,
        decision_making: false,
        presentation_skills: false
    })
    const [selected_options, set_Selected_options] = useState([]);
    const error = useSelector(selectResumeError);
    const loading = useSelector(selectResumeLoading);
    const [showAlert, setShowAlert] = useState(false);
    const token = useSelector(selectAuthToken)
    const user_id = useSelector(selectUser_id)
    const fetchedCognitiveSkills = useSelector(selectCognitive_info)
    const status = useSelector(getResumeUpdateStatus);
    const message = useSelector(getResumeMessage);

    const handleCognitiveSkills = async (e) => {
        e.preventDefault();
        let body = form
        let itemCount = 0;
        body.user_id = user_id
        for(let i = 0; i < Object.values(inputStatus).length; i++){
            let item = Object.values(inputStatus)[i];
            if(item){
                itemCount++;
            }
        }
        if(itemCount < 6){
            toast.error("Please select 6 skills!")
            return false
        }
        try {
            dispatch(setReloadDecider(true))
            dispatch(addCognitiveSkills({ auth: token, body: { ...form,user_id }, dispatch })).then((res => {
                if(res.payload.data){
                    dispatch(reload())
                }
            }))
            
        } catch (error) {
            showAlert(true)
        } finally {
            setShowAlert(true)
        }
    }

    const handleComplexity = (evt) => {
        const value = evt.target.value;
        setForm({
            ...form,
            [evt.target.name]: value
        });
        if (!selected_options.includes(evt.target.name)) {
            set_Selected_options([...selected_options, evt.target.name])
        }
    }

    // useEffect(() => {
    //     const newObj = {};
    //     data?.cognitive_info && data.cognitive_info.map((ele) => {
    //         let skillString = ele.name.split(" ")
    //         skillString = skillString.join('_');
    //         skillString = ele.name.toLowerCase()
    //         newObj[skillString] = ele.value
    //     })
    //     setForm({ ...form, ...newObj })
    // }, [data])

    useLayoutEffect(() => {
        let formDup = form;
        let inputStatusDup = inputStatus
        if(fetchedCognitiveSkills){
            for (let i = 0; i < fetchedCognitiveSkills.length; i++) {
                let item = fetchedCognitiveSkills[i];
                formDup[item.field_name] = item.value;
                inputStatusDup[item.field_name] = true;
            }
        }
        setForm(formDup);
        setInputStatus(inputStatusDup)
        setStatusChecked(true)
    }, [fetchedCognitiveSkills])

    

    const checkEnabled = (key) => {
        let enabledCount = 0;
        Object.values(inputStatus).forEach((item) => {
            if (item) enabledCount++;
        })
        if (enabledCount < 6 || inputStatus[key] === true) {
            return false;
        }
        return true;
    }

    const handleEnabling = (event) => {
        let currentElem = event.target;
        setInputStatus({ ...inputStatus, [currentElem.name]: currentElem.checked });
        if (!currentElem.checked) {
            setForm({ ...form, [currentElem.name]: "" });
        }else{
            setForm({ ...form, [currentElem.name]: "6" });
        }

    }
    return (
        <div className="main-form-wrapper congnitive-add-form">
            <h2 className="form-title">Choose your top six Cognitive Skills</h2>
            <p className="form-mandatory" style={{textAlign:'left'}}>and rank yourself on the scale of 1 to 10</p>
            {
                isStatusChecked &&
                <div className="cognetive-edit-grid">
                    <MarkedSlider isCognetive={true} status={inputStatus} value={form} disabled={checkEnabled('communication')} handleChange={handleComplexity} handleEnabling={handleEnabling} name={'communication'} state={form}  min={1} max={10} width={"100%"} label={<><span>  &nbsp; &nbsp;Communication </span></>} />
                    <MarkedSlider isCognetive={true} status={inputStatus} value={form} disabled={checkEnabled('teamwork')} handleChange={handleComplexity} handleEnabling={handleEnabling} name={'teamwork'} state={form}  min={1} max={10} width={"100%"} label={<><span>  &nbsp; &nbsp;Teamwork </span></>} />
                    <MarkedSlider isCognetive={true} status={inputStatus} value={form} disabled={checkEnabled('leadership')} handleChange={handleComplexity} handleEnabling={handleEnabling} name={'leadership'} state={form}  min={1} max={10} width={"100%"} label={<><span>  &nbsp; &nbsp;Leadership </span></>} />
                    <MarkedSlider isCognetive={true} status={inputStatus} value={form} disabled={checkEnabled('flexibility_adaptability')} handleChange={handleComplexity} handleEnabling={handleEnabling} name={'flexibility_adaptability'} state={form}  min={1} max={10} width={"100%"} label={<><span>  &nbsp; &nbsp;Flexibility/adaptability </span></>} />
                    <MarkedSlider isCognetive={true} status={inputStatus} value={form} disabled={checkEnabled('probleam_solving')} handleChange={handleComplexity} handleEnabling={handleEnabling} name={'probleam_solving'} state={form}  min={1} max={10} width={"100%"} label={<><span>  &nbsp; &nbsp;Problem-solving </span></>} />
                    <MarkedSlider isCognetive={true} status={inputStatus} value={form} disabled={checkEnabled('handling_pressure')} handleChange={handleComplexity} handleEnabling={handleEnabling} name={'handling_pressure'} state={form}  min={1} max={10} width={"100%"} label={<><span>  &nbsp; &nbsp;Handling pressure </span></>} />
                    <MarkedSlider isCognetive={true} status={inputStatus} value={form} disabled={checkEnabled('analytical_skills')} handleChange={handleComplexity} handleEnabling={handleEnabling} name={'analytical_skills'} state={form}  min={1} max={10} width={"100%"} label={<><span>  &nbsp; &nbsp;Analytical skills </span></>} />
                    <MarkedSlider isCognetive={true} status={inputStatus} value={form} disabled={checkEnabled('creativity')} handleChange={handleComplexity} handleEnabling={handleEnabling} name={'creativity'} state={form}  min={1} max={10} width={"100%"} label={<><span>  &nbsp; &nbsp;Creativity </span></>} />
                    <MarkedSlider isCognetive={true} status={inputStatus} value={form} disabled={checkEnabled('time_management')} handleChange={handleComplexity} handleEnabling={handleEnabling} name={'time_management'} state={form}  min={1} max={10} width={"100%"} label={<><span>  &nbsp; &nbsp;Time Management </span></>} />
                    <MarkedSlider isCognetive={true} status={inputStatus} value={form} disabled={checkEnabled('negotiating')} handleChange={handleComplexity} handleEnabling={handleEnabling} name={'negotiating'} state={form}  min={1} max={10} width={"100%"} label={<><span>  &nbsp; &nbsp;Negotiating </span></>} />
                    <MarkedSlider isCognetive={true} status={inputStatus} value={form} disabled={checkEnabled('strategic_planning')} handleChange={handleComplexity} handleEnabling={handleEnabling} name={'strategic_planning'} state={form}  min={1} max={10} width={"100%"} label={<><span>  &nbsp; &nbsp;Strategic Planning </span></>} />
                    <MarkedSlider isCognetive={true} status={inputStatus} value={form} disabled={checkEnabled('handling_feedback')} handleChange={handleComplexity} handleEnabling={handleEnabling} name={'handling_feedback'} state={form}  min={1} max={10} width={"100%"} label={<><span>  &nbsp; &nbsp;Handling Feedback </span></>} />
                    <MarkedSlider isCognetive={true} status={inputStatus} value={form} disabled={checkEnabled('decision_making')} handleChange={handleComplexity} handleEnabling={handleEnabling} name={'decision_making'} state={form}  min={1} max={10} width={"100%"} label={<><span>  &nbsp; &nbsp;Decision-making </span></>} />
                    <MarkedSlider isCognetive={true} status={inputStatus} value={form} disabled={checkEnabled('presentation_skills')} handleChange={handleComplexity} handleEnabling={handleEnabling} name={'presentation_skills'} state={form}  min={1} max={10} width={"100%"} label={<><span>  &nbsp; &nbsp;Presentation skills </span></>} />
                </div>
            }
            <FormController handleSubmit={handleCognitiveSkills}  />
        </div>
    )
}
