import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../DebouncedSearch';
import dateConverter from '../../functionUtils/dateConverter';
import { selectAuthToken, selectUser_id } from '../../redux/Features/AuthenticationSlice';
import { addDesignationForEdit, changeExperienceForm, selectCompanyForEdit, selectDesignationForEdit } from '../../redux/Features/EditSlice';
import { getFunctionalAreaList, getLevelList, searchDesignation, selectDesignationList, selectFunctionalAreaList, selectManagementLevelList } from '../../redux/Features/MasterSlice';
import { addJobDesignation, SelectCompanyDetails, SelectCompanyJobRecordId, selectNewDesignation, selectResumeError, selectResumeInfo, selectResumeLoading, selectResumeMessage, toggleNewDesignation } from '../../redux/Features/ResumeSlice';
import EditFormController from '../../Util Components/EditFormController/EditFormController';
import DateInput from '../../Util Components/Inputs/DateInput/DateInput';
import LocationInput from '../../Util Components/Inputs/LocationInput/LocationInput';
import PlainInput from '../../Util Components/Inputs/PlainInput/PlainInput';
import SelectInput from '../../Util Components/Inputs/SelectInput/SelectInput';
import SuggestionInput from '../../Util Components/Inputs/SuggestionInput/SuggestionInput';

const DEBOUNCE_DELAY = 600
let commaSeparatorRegex = new RegExp(/\B(?=(\d{3})+(?!\d))/g)

export default function DesignationEditForm() {
    const designationID = useSelector(selectDesignationForEdit);
    const companyID = useSelector(selectCompanyForEdit);
    const companyDetails = useSelector(SelectCompanyDetails);
    const [data, setData] = useState({});
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        designation_id:"",
        other_designation_name:'',
        designation_name : "",
        level_id: "",
        location: '',
        remote_work: "",
        functional_area_id: "",
        user_company_record_id: "",
        user_company_job_record_id: "",
        start_date: "",
        start_salary: "",
        end_date: "",
        end_salary: "",
        current_working: "",
    })
    const [showAlert,setShowAlert] = useState(false);
    const [otherDesignation,setOtherDesignation] = useState(false);
    const [isCurrentWorking,setCurrentWorking] = useState(false)
    const [isRemoteWorking, setRemoteWorking] = useState(false);
    const [isHideSalary, setHideSalary] = useState(false);
    const [location,setLocation] = useState('')
    const token = useSelector(selectAuthToken)
    const user_id = useSelector(selectUser_id)
    const error = useSelector(selectResumeError);
    const message = useSelector(selectResumeMessage);
    const loading = useSelector(selectResumeLoading);
    const designationlist = useSelector(selectDesignationList);
    const managementLevelList = useSelector(selectManagementLevelList);
    const functionalAreaList = useSelector(selectFunctionalAreaList);
    const resumeInfo = useSelector(selectResumeInfo)
    const job_Record_id = useSelector(SelectCompanyJobRecordId);
    const [search, setSearch] = useState( '')
    const debouncedSearchState = useDebounce(search, DEBOUNCE_DELAY);
    const newDesignation = useSelector(selectNewDesignation)
    const [isNewDesignation, setNewDesignation] = useState(true)

    const searchCompanyList = useCallback(
        (keywords) => {
            try {
                dispatch(searchDesignation({ auth: token, body: { search_job_title: keywords } })).unwrap()
            } catch (error) {

            }
        },
        [dispatch, token],
    )
    function searchHandler(e) {
        setSearch(e.target.value)
    }
    function handleDesignationForm(evt){
        let value = evt.target.value;
        if(evt.target.type == 'checkbox'){
            value = form[evt.target.name] == 'yes' ? 'no' : 'yes';
        }
        setForm({
            ...form,
            [evt.target.name]: value
        });
    }
    const selectHandler = (i, selected, value) => {
        setForm({ ...form, designation_id: designationlist[i].id })
        setSearch(designationlist[i].job_title_name)
        setNewDesignation(false)
    }

    async function handleAddDesignation() {
        const body = {...form, user_id}
        if(form.remote_work!=='yes')  body.remote_work = 'no'
        if(form.current_working!=='yes')  body.current_working = 'no'
        if(body.start_salary) body.start_salary = body.start_salary.toString().replace(/,/gi,"");
        if(body.end_salary) body.end_salary = body.end_salary.toString().replace(/,/gi,'');
        body.location = location
        body.user_company_record_id = companyID;
        if (isNewDesignation) {
            body.other_designation_name = debouncedSearchState;
            body.designation_id = ""
        }
        try {
            let updatedDesignation = await dispatch(addJobDesignation({auth:token,body,dispatch})).unwrap()
            if(newDesignation){
                dispatch(addDesignationForEdit(updatedDesignation.data.company_job_record_id))
            }
            dispatch(changeExperienceForm(2));
            dispatch(toggleNewDesignation(false));
            navigate('/dashboard/experience-editor')
        } catch (error) {
        }finally{
            setShowAlert(true);
        }
    }

    useEffect(() => {
        if (debouncedSearchState.length > 1) searchCompanyList(debouncedSearchState)

        return () => {

        }
    }, [debouncedSearchState, dispatch])

    useEffect(() => {
        if (managementLevelList.length === 0) dispatch(getLevelList(token)).unwrap()
        if (functionalAreaList.length === 0) dispatch(getFunctionalAreaList(token)).unwrap()

        return () => {

        }
    }, [managementLevelList.length, functionalAreaList.length, dispatch, token])

    useEffect(()=>{
        if(resumeInfo && (!form.user_company_record_id)){
            
            let last_Company = lastElement(resumeInfo.company)
            let user_company_record_id = last_Company.company_record_id
            
            setForm({ ...form,
                user_company_record_id,
            })
        }
       
    },[])

    useEffect(() => {
        if(!newDesignation){
            let company = companyDetails.filter(company => company.company_record_id === companyID)
            let jobRole = company[0].job_role.filter(role => role.company_job_record_id === designationID);
            setData(jobRole[0])
        }
    },[])

    useEffect(() =>{
        if(!newDesignation){
            setForm({
                ...form,
                designation_id:data.designation_id,
                level_id:data.job_level,
                location:data.job_location,
                remote_work:data.job_remote_work?'yes':'no',
                functional_area_id:data.function_area_id,
                start_date: data.job_start_date&& data.job_start_date.split("-").reverse().join("-"),
                start_salary:data.job_start_salary,
                end_date:data.job_end_date&&data.job_end_date.split("-").reverse().join("-"),
                end_salary:data.job_end_salary,
                current_working:data.current_working?'yes':'no',   
                location: data.job_location,
                user_company_job_record_id: data.company_job_record_id,
            })
            setLocation(data.job_location)
            setSearch(data.designation_name)
        }
    },[data])


    return (
        <div className="main-form-wrapper">
            {newDesignation && <h2 className="form-title">Now tell us about all the job roles at which you have worked in this organization </h2>}
            <div className="grid-1-1">
                <SuggestionInput value={search} name={'designation_id'} placeholder={'Your job title'} label='Designation' suggestions={[...designationlist]} searchHandler={searchHandler} selected={selectHandler} name_field="job_title_name" />
                <SelectInput value={form.level_id} defaultValue={form.level_id} name='level_id' handleChange={handleDesignationForm} label='Management level' placeholder='Your seniority level' options={[...managementLevelList]} name_field={'level_name'} />
            </div>
            <div className="grid-1-1">
                <LocationInput value={form.location} form={location} setForm={setLocation} name="address" type='text' label="Location" placeholder="Bangalore" width={45} validation={message && message.address} />
                <SelectInput value={form.functional_area_id} defaultValue={form.functional_area_id} name='functional_area_id' handleChange={handleDesignationForm} label='Functional Area' placeholder='i.e. CXO Level' width={45} options={[...functionalAreaList]} name_field='functional_area_name' />
            </div>
            <label className="control control-checkbox">
                I work remotely
                <input name='remote_work' value={isRemoteWorking ? 'yes' : 'no'} onChange={event => {
                    handleDesignationForm(event)
                    setRemoteWorking(!isRemoteWorking)
                }} type="checkbox" checked={form.remote_work === 'yes'} />
                <div className="control_indicator"></div>
            </label>
            <div className="grid-1-1">
                <DateInput value={dateConverter(form.start_date)} defaultValue={form.start_date} name='start_date' handleChange={handleDesignationForm} type='date' label='Start of this Job role' placeholder='MM YYYY' />
                <PlainInput isSalary={true} type="number" value={form.start_salary && form.start_salary} label='Starting Salary in this Job role (Numbers only)' placeholder='120000' />
            </div>
            <div className="grid-1-1">
                <DateInput value={dateConverter(form.end_date)} name='end_date' isDisabled={(isCurrentWorking || (form.current_working && form.current_working === "yes") ) ? true : false} handleChange={handleDesignationForm} type='date' label='End of this Job role' placeholder='MM YYYY' />
                <PlainInput isSalary={true} type="number" value={form.end_salary && form.end_salary} name='end_salary' handleChange={handleDesignationForm} label='End Salary in this Job role (Numbers only)' placeholder='180000' />
            </div>
            <label className="control control-checkbox">
                I am currently working in this job role
                <input name='current_working' value={!isCurrentWorking ? 'yes' : "no"} onChange={handleDesignationForm} type="checkbox" checked={form.current_working === "yes" || ( form.current_working && form.current_working !== 'no') } />
                <div className="control_indicator"></div>
            </label>
            <EditFormController isNext handleSubmit={handleAddDesignation} handlePreviousNavigation={() => dispatch(changeExperienceForm(0))} />
        </div>
    )
}

function lastElement(arr){
    return arr[arr.length - 1]
}