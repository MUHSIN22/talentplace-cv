import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useDebounce from '../../../DebouncedSearch'
import dateConverter from '../../../functionUtils/dateConverter'
import errorMessageHandler from '../../../functionUtils/errorMessageHandler'
import { selectAuthToken, selectUser_id } from '../../../redux/Features/AuthenticationSlice'
import { getFunctionalAreaList, getLevelList, searchDesignation, selectDesignationList, selectFunctionalAreaList, selectManagementLevelList } from '../../../redux/Features/MasterSlice'
import { addJobDesignation, selectLastCompany, selectLastJob, selectNewDesignation, selectResumeError, selectResumeLoading, selectResumeMessage, setReloadDecider } from '../../../redux/Features/ResumeSlice'
import FormController from '../../../Util Components/FormController/FormController'
import Checkbox from '../../../Util Components/Inputs/Checkbox/Checkbox'
import DateInput from '../../../Util Components/Inputs/DateInput/DateInput'
import LocationInput from '../../../Util Components/Inputs/LocationInput/LocationInput'
import PlainInput from '../../../Util Components/Inputs/PlainInput/PlainInput'
import SelectInput from '../../../Util Components/Inputs/SelectInput/SelectInput'
import SuggestionInput from '../../../Util Components/Inputs/SuggestionInput/SuggestionInput'
import Alert from '../../Alert/Alert'

import './DesignationForm.css'
const DEBOUNCE_DELAY = 600;
let commaSeparatorRegex = new RegExp(/\B(?=(\d{3})+(?!\d))/g)

export default function DesignationForm() {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        designation_id: '',
        other_designation_name: '',
        level_id: 1,
        location: '',
        remote_work: 'no',
        functional_area_id: 1,
        user_company_record_id: '',
        user_company_job_record_id: '',
        start_date: '',
        start_salary: '',
        end_date: '',
        end_salary: '',
        current_working: 'no',
    })
    const [isCurrentWorking, setCurrentWorking] = useState(false)
    const [isRemoteWorking, setRemoteWorking] = useState(false);
    const [isHideSalary, setHideSalary] = useState(false);
    const [otherDesignation, setOtherDesignation] = useState(false);
    const [location, setLocation] = useState('')
    const [showAlert, setShowAlert] = useState(false);
    const token = useSelector(selectAuthToken)
    const user_id = useSelector(selectUser_id)
    const error = useSelector(selectResumeError);
    const message = useSelector(selectResumeMessage);
    const loading = useSelector(selectResumeLoading);
    const designationlist = useSelector(selectDesignationList);
    const managementLevelList = useSelector(selectManagementLevelList);
    const functionalAreaList = useSelector(selectFunctionalAreaList);
    const lastCompany = useSelector(selectLastCompany)
    const [search, setSearch] = useState('')
    const debouncedSearchState = useDebounce(search, DEBOUNCE_DELAY);
    const lastJob = useSelector(selectLastJob)
    const newDesignation = useSelector(selectNewDesignation)
    const [endSalaryError, setEndSalaryError] = useState(null)
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
        setNewDesignation(true)
    }
    function handleDesignationForm(evt) {
        let value;
        if (evt.target.name === "current_working") {
            setCurrentWorking(!isCurrentWorking)
        }
        if(evt.target.name === "start_salary" || evt.target.name === "end_salary"){
            value = evt.target.value.replace(/,/g, '')
        }else{
            value = evt.target.value;
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
    function handleAddDesignation() {
        if (form.end_salary === '') {
            setEndSalaryError("End Salary is required!")
            setTimeout(() => {
                setEndSalaryError(false)
            }, 3000)
            return
        } else {
            setEndSalaryError(false);
        }
        const body = { ...form, user_id, location }
        if (isNewDesignation) {
            body.other_designation_name = debouncedSearchState;
            body.designation_id = ""
        }
        if (form.remote_work !== 'yes') body.remote_work = 'no'
        if (form.current_working !== 'yes') body.current_working = 'no'
        if (form.current_working === "yes") body.end_date = ""

        try {
            dispatch(setReloadDecider(true));
            dispatch(addJobDesignation({ auth: token, body, dispatch })).unwrap()
        } catch (error) {
        } finally {
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

    useEffect(() => {

        if (!newDesignation && lastJob) {
            setForm({
                ...form,
                designation_id: lastJob.designation_id,
                level_id: lastJob.job_level,
                location: lastJob.job_location,
                remote_work: lastJob.job_remote_work ? 'yes' : 'no',
                functional_area_id: lastJob.function_area_id,
                start_date: lastJob.job_start_date && lastJob.job_start_date.split("-").reverse().join("-"),
                start_salary: lastJob.job_start_salary,
                end_date: lastJob.job_end_date && lastJob.job_end_date.split("-").reverse().join("-"),
                end_salary: lastJob.job_end_salary,
                current_working: lastJob.current_working ? 'yes' : 'no',
                user_company_job_record_id: lastJob.company_job_record_id,
                user_company_record_id: lastCompany.company_record_id
            })
            setLocation(lastJob.job_location)
            setSearch(lastJob.designation_name || '')
        } else {
            setForm({
                ...form,
                user_company_record_id: lastCompany.company_record_id
            })
        }

        return () => {

        }
    }, [lastJob])

    return (
        <div className="designation-form-wrapper">
            <h2 className="form-title">Now tell us about all the job roles at which you have worked in this organization {!newDesignation ? "starting with the latest one." : ""}</h2>
            <div className="grid-1-1">
                <SuggestionInput value={search} name={'designation_id'} placeholder={'Your job title'} label='Designation' suggestions={[...designationlist]} searchHandler={searchHandler} selected={selectHandler} name_field="job_title_name" />
                <SelectInput value={form.level_id} name='level_id' handleChange={handleDesignationForm} label='Management level' placeholder='Your seniority level' options={[...managementLevelList]} name_field={'level_name'} />
            </div>
            <div className="grid-1-1">
                <LocationInput value={location} form={location} setForm={setLocation} name="address" type='text' label="Location" placeholder="Bangalore" width={45} validation={message && message.address} />
                <SelectInput value={form.functional_area_id} name='functional_area_id' handleChange={handleDesignationForm} label='Functional Area' placeholder='i.e. CXO Level' width={45} options={[...functionalAreaList]} name_field='functional_area_name' />
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
                {/* {dateConverter(form.start_date)} */}
                <DateInput value={dateConverter(form.start_date)} defaultValue={form.start_date} name='start_date' handleChange={handleDesignationForm} type='date' label='Start of this Job role' placeholder='MM YYYY' />
                <PlainInput isSalary={true} value={form.start_salary && form.start_salary} name='start_salary' type="number"  handleChange={handleDesignationForm} label='Starting Salary in this Job role (Numbers only)' placeholder='120000' />
                {/* <SelectInput value={form.start_salary_currency} name='start_salary_currency' handleChange={handleDesignationForm} label='Currency(same for the entire career profile)' options={currencyList} name_field='currency_name' /> */}
            </div>
            <div className="grid-1-1">
                <DateInput value={dateConverter(form.end_date)} name='end_date' isDisabled={(isCurrentWorking || form.current_working === "yes") ? true : false} handleChange={handleDesignationForm} type='date' label='End of this Job role' placeholder='MM YYYY' />
                <PlainInput isSalary={true}  value={form.end_salary && form.end_salary} name='end_salary' type="number"  handleChange={handleDesignationForm} label='End Salary in this Job role (Numbers only)' placeholder='180000' />
                {/* <SelectInput value={form.end_salary_currency} name='end_salary_currency' handleChange={handleDesignationForm} label='Currency(same for the entire career profile)' options={currencyList} name_field='currency_name' width={100} /> */}
            </div>
            <label className="control control-checkbox">
                I am currently working in this job role
                <input name='current_working' value={!isCurrentWorking ? 'yes' : "no"} onChange={handleDesignationForm} type="checkbox" checked={form.current_working === 'yes'} />
                <div className="control_indicator"></div>
            </label>
            {/* <label className="control control-checkbox">
                Hide my salary (Check this box to hide salary in your resume. It will be used for analytical purpose only)
                <input name='hide_salary' value={!isHideSalary ? 'yes' : "no"} onChange={(event) => {
                    handleDesignationForm(event);
                    setHideSalary(!isHideSalary);
                }} type="checkbox" checked={form.hide_salary === 'yes'} />
                <div className="control_indicator"></div>
            </label> */}
            <FormController handleSubmit={handleAddDesignation}/>
        </div>
    )
}
