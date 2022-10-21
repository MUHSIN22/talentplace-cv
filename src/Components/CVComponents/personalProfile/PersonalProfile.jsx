import React from 'react'
import { useSelector } from 'react-redux';
import { ReactComponent as Calling } from '../../../Assests/icons/call-calling.svg';
import { ReactComponent as Location } from '../../../Assests/icons/location-o.svg';
import { ReactComponent as Man } from '../../../Assests/icons/man.svg';
import { ReactComponent as Note } from '../../../Assests/icons/note.svg';
import { ReactComponent as Sms } from '../../../Assests/icons/sms.svg';
import avatar from '../../../Assets/avatar.png'
import { selectCognitive_info, selectKeySkills, selectOverview } from '../../../redux/Features/GraphSlice';
import { selectBio, selectFirstCompany, selectProfilePic, selectResumeDetails } from '../../../redux/Features/ResumeSlice';
import MultiDonut from '../../Graphs/MultiDonut';
import Guage from '../../OverviewCard/Guage';
import ProgressBar from '../../OverviewCard/ProgressBar';
import './PersonalProfile.css'

export default function PersonalProfile() {
    const contactInfo = useSelector(selectResumeDetails);
    const { fname, lname, heading, name, email, contact, address, country_code, gender_name, resume_info } = useSelector(selectResumeDetails)
    const bio = useSelector(selectBio)
    const firstCompany = useSelector(selectFirstCompany);
    const profilePic = useSelector(selectProfilePic)
    let color = "_1"

    // Graph Data
    const overview = useSelector(selectOverview);
    const cognitive_info = useSelector(selectCognitive_info) || []
    const skills = useSelector(selectKeySkills)
    // MultiDot form data formating
    function formatData(arr = []) {
        let i = 0;
        let obj = {}
        while (i < arr.length) {
            obj[arr[i].name] = arr[i].value
            i++;
        }
        return obj
    }
    return (
        <div className="cv-personal-profile">
            <div className="cv-personal-left">
                <img src={profilePic ? profilePic :  avatar} alt="" className="profile-avatar" />
                <h6 className="cv-personal-left-header">Personal Information</h6>
                <div className="personal-contact-wrapper">
                    {
                        firstCompany && firstCompany.nature_of_job_name &&
                        <div className="personal-contact">
                            <Note />
                            <span>{firstCompany.nature_of_job_name}({resume_info ? resume_info.preferred_mode : ""})</span>
                        </div>
                    }
                    {
                        email &&
                        <div className="personal-contact">
                            <Sms />
                            <span>{email}</span>
                        </div>
                    }
                    {
                        contact &&
                        <div className="personal-contact">
                            <Calling />
                            <span>{country_code + contact}</span>
                        </div>
                    }
                    {
                        address &&
                        <div className="personal-contact">
                            <Location />
                            <span>{address}</span>
                        </div>
                    }
                    {
                        gender_name &&
                        <div className="personal-contact">
                            <Man />
                            <span>{gender_name}</span>
                        </div>
                    }
                </div>
            </div>
            <div className="cv-personal-right">
                <div className="cv-personal-name-wrapper">
                    <h1 className="cv-personal-name">{name}</h1>
                    {
                        firstCompany.job_role && firstCompany.job_role[0] &&
                        <p className="cv-personal-designation">{heading}</p>
                    }
                </div>
                {
                    bio &&
                    <p className="cv-personal-bio" dangerouslySetInnerHTML={{ __html: bio }}>
                    </p>
                }
                <div className="cv-overview-wrapper">
                    {
                        (overview && overview.length > 0) &&
                        <div className="cv-overview-card">
                            <h3 className="overview-title">Industry Overview</h3>
                            <MultiDonut width={'100%'} data={formatData(overview)} />
                        </div>
                    }
                    {
                        (cognitive_info && cognitive_info.length > 0) &&
                        <div className="cv-overview-card">
                            <h3 className="overview-title">Cognitive Skillset</h3>
                            <div className="cognetive-wrapper">
                                {cognitive_info && cognitive_info.map((cogInfo,index) => {
                                    color = Math.floor(Math.random() * (4 - 1 + 1) + 1)
                                    return <Guage label={cogInfo.name}  key={index} value={parseFloat(cogInfo.value)} color={"_" + color} />

                                })}
                            </div>
                        </div>
                    }
                    {
                        (skills && skills.length > 0) &&
                        <div className="cv-overview-card">
                            <h3 className="overview-title">Top Skills</h3>
                            {
                                skills && skills.map((skill, i) => <ProgressBar key={i} label={skill.name} value={skill.value} color={`_${i > 3 ? (i % 3) + 1 : i + 1}`} />)
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
