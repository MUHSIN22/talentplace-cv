import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../DebouncedSearch';
import { resetError, selectAuthToken, selectUser_id } from '../../redux/Features/AuthenticationSlice';
import { addCompanyForEdit, changeExperienceForm, selectCompanyForEdit, selectFormProgress } from '../../redux/Features/EditSlice';
import { getBuisnessScaleList, getCompanyBasedList, getIndustryList, getJobNatureList, searchCompany, selectBuisnessScaleList, selectCompanyBasedList, selectCompanyList, selectIndustryList, selectJobNatureList } from '../../redux/Features/MasterSlice';
import { addCompany, addIndustryInfo, reload, SelectCompanyDetails, selectLastCompany, selectNewEducation, selectNewJob, selectResumeError, selectResumeLoading, selectResumeMessage, selectUserFirstName, setReloadDecider } from '../../redux/Features/ResumeSlice';
import EditFormController from '../../Util Components/EditFormController/EditFormController';
import SelectInput from '../../Util Components/Inputs/SelectInput/SelectInput';
import SuggestionInput from '../../Util Components/Inputs/SuggestionInput/SuggestionInput';
import CardRadioGroup from '../CardRadioGroup/CardRadioGroup';

const DEBOUNCE_DELAY = 600;

export default function CompanyBasicFormEditor() {
    const company = useSelector(SelectCompanyDetails)
    const companyID = useSelector(selectCompanyForEdit)
    const [companyDetails, setCompanyDetails] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        user_id: "",
        nature_of_job_id:  "",
        company_id: "",
        other_company_name: "",
        user_company_record_id: "",
        company_name: "",
        industry_id: "",
        scale_id: "",
        type_of_company: 1,
    });
    const [search, setSearch] = useState("");
    const debouncedSearchState = useDebounce(search, DEBOUNCE_DELAY);
    const companyList = useSelector(selectCompanyList);
    const token = useSelector(selectAuthToken);
    const user_id = useSelector(selectUser_id);
    const message = useSelector(selectResumeMessage);
    const error = useSelector(selectResumeError);
    const [showAlert, setShowAlert] = useState(false);
    const jobNatureList = useSelector(selectJobNatureList);
    const lastCompany = useSelector(selectLastCompany);
    const firstName = useSelector(selectUserFirstName);
    const industryList = useSelector(selectIndustryList)
    const buisnessScaleList = useSelector(selectBuisnessScaleList)
    const companyBasedList = useSelector(selectCompanyBasedList);
    const loading = useSelector(selectResumeLoading);
    const newEducation = useSelector(selectNewEducation)
    const newJob = useSelector(selectNewJob)
    const searchCompanyList = useCallback(
        (keywords) => {
            try {
                dispatch(
                    searchCompany({ auth: token, body: { search_company: keywords } })
                ).unwrap();
            } catch (error) {
            }
        },
        [dispatch, token]
    );

    function handleChange(evt) {
        const value = evt.target.value;
        setForm({
            ...form,
            [evt.target.name]: value,
        });
    }

    function searchHandler(e) {
        setSearch(e.target.value);
    }
    const selectHandler = (i) => {
        setForm({ ...form, company_id: companyList[i].id });
    };
    async function handleSubmit() {
        const {
            nature_of_job_id,
            company_id,
            other_company_name,
            user_company_record_id,
            company_name,
        } = form;

        let body = {
            user_id,
            nature_of_job_id,
            company_id,
            other_company_name,
            user_company_record_id,
            company_name
        };

        const body2 = {
            industry_id: form.industry_id,
            scale_id: form.scale_id,
            type_of_company: form.type_of_company,
            type_of_company_id: form.type_of_company_id,
            user_id,
            company_record_id: form.user_company_record_id,
        };

        if (form.company_id.length < 1) {
            body.other_company_name = debouncedSearchState;
        }
        body.user_id = user_id;
        try {

            let updatedCompany = await dispatch(addCompany({ auth: token, body, dispatch })).unwrap();
            if(newJob){
                body2.company_record_id = updatedCompany.data.company_record_id
                dispatch(addCompanyForEdit(updatedCompany.data.company_record_id))
            }
            dispatch(setReloadDecider(true))
            await dispatch(addIndustryInfo({ auth: token, body: body2, dispatch })).unwrap()
            if(!newJob){
                navigate('/dashboard/designation-history')
            }else{
                dispatch(changeExperienceForm(1))
            }
        } catch (error) {
        } finally {
            setShowAlert(true);
        }
    }

    useEffect(() => {
        if (debouncedSearchState.length > 1)
            searchCompanyList(debouncedSearchState);

        return () => { };
    }, [debouncedSearchState, searchCompanyList]);
    useEffect(() => {
        if (jobNatureList.length === 0) dispatch(getJobNatureList(token)).unwrap();
        if (industryList.length === 0) dispatch(getIndustryList(token)).unwrap();
        if (buisnessScaleList.length === 0) dispatch(getBuisnessScaleList(token)).unwrap();
        if (companyBasedList.length === 0) dispatch(getCompanyBasedList(token)).unwrap();
        return () => { };
    }, [jobNatureList.length, dispatch, token,industryList,buisnessScaleList,companyBasedList]);

    useEffect(() => {
        if(!newJob){
            setForm({
                user_id: "",
                nature_of_job_id: companyDetails.nature_of_job_id || "",
                company_id: companyDetails.company_id || "",
                other_company_name: companyDetails.company_name || "",
                user_company_record_id: companyDetails.company_record_id || "",
                company_name: companyDetails.company_name || "",
                industry_id: companyDetails.industry_id || "",
                scale_id: companyDetails.scale_id || "",
                type_of_company: companyDetails.type_of_company_id || 1,
            });
            setSearch(companyDetails.company_name)
        }
    }, [companyDetails])


    useEffect(() => {
        if(company){
            let data = company.filter((company) => company.company_record_id === companyID)[0] ? company.filter((company) => company.company_record_id === companyID)[0] : {}
            setCompanyDetails(data)
        }
    },[company])

    useEffect(() => {
        if (message === "Company Added") {
        }
        return () => {
            dispatch(resetError());
        };
    }, [message, dispatch, form]);
    return (
        <div className="main-form-wrapper">
            {newJob && <h2 className="form-title">Let's start with your latest Job.</h2>}
            <SuggestionInput
                name={"company_name"}
                placeholder={"Company / Organization Name"}
                label="Company Name"
                width={98}
                suggestions={companyList}
                name_field="name"
                searchHandler={searchHandler}
                selected={selectHandler}
                value={search}
            // defaultValue={form.company_name}
            />
            <CardRadioGroup
                autofill
                label={"Select the nature of your job?"}
                name={"nature_of_job_id"}
                state={form}
                setState={setForm}
                option={jobNatureList}
                name_field={"job_name"}
            />
            <SelectInput
                name={"industry_id"}
                label={"Select the industry most appropriate to your experience"}
                field={"industry_size"}
                state={form}
                handleChange={handleChange}
                options={industryList}
                name_field={"industry_name"}
                defaultValue={form.industry_id}
                value={form.industry_id}
            />
            <CardRadioGroup
                autofill
                label="Select the nature of the organization"
                name={"scale_id"}
                state={form}
                setState={setForm}
                option={buisnessScaleList}
                name_field={"scale_of_business_name"}
            />
            <SelectInput
                name={"type_of_company"}
                label={"Is it a Product or Service based organization?"}
                field={"industry_size"}
                handleChange={handleChange}
                options={companyBasedList}
                name_field={"company_based_name"}
                defaultValue={form.type_of_company}
                value={form.type_of_company}
            />
            <EditFormController handleSubmit={handleSubmit} isNext handlePreviousNavigation={() => navigate('/dashboard/experience-history')} />
        </div>
    )
}
