import React from 'react'
import UdemyLogo from '../../Assets/Dashboard icons/certificate.png'
import dummyCertificate from '../../Assests/dummyCertificate.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { selectCertificate, selectResumeLoading, selectToEdit, changeToEdit, changeEditPageDetails, deleteCertificate, changeFormId, toggleNewCertificate } from '../../redux/Features/ResumeSlice'
import CertificateCardLoader from '../Loaders/CerificateCardLoader'
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import { AiFillDelete } from 'react-icons/ai'
import { selectAuthToken, selectUser_id } from '../../redux/Features/AuthenticationSlice'
import { useNavigate } from 'react-router-dom'
import getFileExtensionFromURI from '../../functionUtils/getFileExtensionFromURI'
export default function CerificationReview() {
    const loading = useSelector(selectResumeLoading)
    const Cerification = useSelector(selectCertificate) || []
    return (
        <>
            {
                Cerification[0] &&
                <div className='section_2 col-100 align-center mt-2'>
                    <div className="col-90">
                        <h1 className="text-left">Certification courses</h1>
                        <span className="divider"></span>
                        {!loading && Array.isArray(Cerification) ? <div className="col-100 g-1">
                            {

                                Cerification.map((c, i) => <CerificationCard logo={UdemyLogo} {...c} certificate={dummyCertificate} />)
                            }
                        </div> : <CertificateCardLoader />}

                    </div>

                </div>
            }
        </>
    )
}
function CerificationCard({ project_name, logo, certificate_start_date, certificate_end_date, certificate_project_info, certificate, skills_ids, certificate_record_id, certificate_file, is_online, institute_name, skills_names = '' }) {
    let skills = skills_names.split(',')
    let skill_ids = skills_ids ? skills_ids.split(",") : [];
    const dispatch = useDispatch();
    const toEdit = useSelector(selectToEdit);
    const user_id = useSelector(selectUser_id);
    const navigate = useNavigate();
    const token = useSelector(selectAuthToken)
    const handleEditForms = (data) => {
        dispatch(changeEditPageDetails(data)).unwrap();
    };

    const handleDeleteEducation = (data) => {
        let confirm = window.confirm('Are you sure to delete?');
        if (confirm) dispatch(deleteCertificate({ auth: token, body: data, dispatch }))
    }
    return (
        <div className="certificate-grid flex-row-start g-2">
            <img src={logo} alt="" />
            <div className="col-100 align-start justify-between  certificate-content">
                <div>
                    <h5>{project_name} {toEdit && (
                        <>
                            <span onClick={() => handleEditForms({
                                progress: 10,
                                project_name,
                                institute_name,
                                skills_ids: skill_ids,
                                certificate_start_date,
                                certificate_end_date,
                                certificate_project_info,
                                certificate_file,
                                is_online,
                                certification_record_id: certificate_record_id,
                                skills
                            })} style={{ "marginLeft": "1rem" }}><FaPencilAlt /></span>
                            <span onClick={() => handleDeleteEducation({
                                certificate_record_id: certificate_record_id,
                                user_id
                            })} style={{ "marginLeft": "1rem" }}><AiFillDelete /></span>
                            <span className="px-1" onClick={() => {
                                dispatch(toggleNewCertificate(true))
                                dispatch(changeFormId({ auth: token, body: { user_id, form_id: 9 }, navigate }))
                            }}>
                                <FaPlus />
                            </span>
                        </>
                    )}</h5>
                </div>
                <div className='<div className="flex-row-start mt-0-5">'>
                    <p>{institute_name}</p>
                </div>
                <div className='<div className="flex-row-start mt-0-5">'>
                    <p>{TimeDiff(certificate_end_date, certificate_start_date,)}</p>
                </div>
                <div className="flex-row-start g-0-5 skill-list">
                    {skills.map((skill, i) => <div key={i} className="skill">
                        {skill}
                    </div>)}
                </div>

            </div>
            {certificate_file && (
                <>
                    {getFileExtensionFromURI(certificate_file) === "image" ?
                         <a href={certificate_file} target="_blank">
                            <img src={certificate_file}  alt="" />
                         </a>
                         : 
                         <a href={certificate_file} target="_blank" style={{color: "blue", display: "flex",justifyContent: "center", alignItems: "center"}}>View File</a>
                    }
                </>
            )}
        </div>
    )
}
/*function TimeDiff(d1, d2) {
    d1 = new Date(d1)
    d2 = new Date(d2)
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}*/
function TimeDiff(date1, date2) {
    let year = parseInt((date1.split('-')[2])) - parseInt((date2.split('-')[2]))
    let month = parseInt(date1.split('-')[1]) - parseInt(date2.split('-')[1])
    let days = parseInt(date1.split('-')[0]) - parseInt(date2.split('-')[0])

    if (year < 1) {
        if (month < 1) {
            return days + ' days'
        } else {
            return month + ' month'
        }
    } else {

        return year + ' years'
    }
}

