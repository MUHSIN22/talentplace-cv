import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectAuthToken, selectUser_id } from '../../redux/Features/AuthenticationSlice';
import { getRoleSuggestionList, getSummaryList, selectRoleSuggestionList, selectSummarySuggestionList } from '../../redux/Features/MasterSlice';
import { addBio, reload, selectBio, selectResumeError, selectResumeInfo, selectResumeLoading, selectResumeMessage, setReloadDecider } from '../../redux/Features/ResumeSlice';
import EditFormController from '../../Util Components/EditFormController/EditFormController';
import SuggestionBox from '../../Util Components/SuggestionBox/SuggestionBox';

export default function CareerObjectiveEditor() {
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()
    const bio = useSelector(selectBio)
    const [form, setForm] = useState({
        your_bio: bio || "",
        profile_pic: '',
    })
    const error = useSelector(selectResumeError);
    const message = useSelector(selectResumeMessage);
    const loading = useSelector(selectResumeLoading);
    const [showAlert, setShowAlert] = useState(false);
    const token = useSelector(selectAuthToken)
    const user_id = useSelector(selectUser_id)
    const resumeInfo = useSelector(selectResumeInfo)
    const job_title_id = resumeInfo.company && resumeInfo.company[0].job_role && resumeInfo.company[0].job_role[0].designation_id
    const roleSuggestions = useSelector(selectSummarySuggestionList)
    const handleSuggestion = (value) => {
        setForm({ ...form, your_bio: form.your_bio + value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let body = form
        body.user_id = user_id
        body.profile_pic = file
        if (body.profile_pic == '' || !body.profile_pic) {
            delete body.profile_pic
        }
        let form_Data = JsonToFormData(body)
        try {
            dispatch(setReloadDecider(true));
            await dispatch(addBio({ auth: token, body: form_Data, dispatch })).then((res) => {
            navigate('/dashboard/edit')
                // if(res){
                //     dispatch(reload());
                // }
            })
        } catch (error) {
            showAlert(true)
        } finally {
            setShowAlert(true)
        }
    }
    useEffect(() => {
        if(job_title_id){
            try {
                const body = {
                    job_title_id: job_title_id,
                    search_role: '',
                    page_no: ''
                }
                dispatch(getSummaryList({ auth: token, body })).unwrap()
            } catch (e) {
            }
        }

        return () => {

        }
    }, [dispatch, job_title_id, token])
    return (
        <div className="main-form-wrapper">
            <div className="main-form-wrapper">
                <div className="grid-1-1">
                    <div className="common-input-wrapper">
                    <label className='text-left' htmlFor="">Personal Bio</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={form.your_bio}
                        config={{ placeholder: 'Keep it brief and to the point' }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setForm({ ...form, your_bio: data })
                        }}
                    />
                    </div>
                    <SuggestionBox handleSelect={handleSuggestion} suggestions={roleSuggestions} name_field={'summery'} />
                </div>
                <EditFormController handleSubmit={handleSubmit} handlePreviousNavigation={() => navigate('/dashboard/edit')} />
            </div>
        </div>
    )
}
const JsonToFormData=  (json={}) => {
    var form_data = new FormData();
    for (var key in json) {
      form_data.append(key, json[key]);
    }
  
    return form_data
  }
  