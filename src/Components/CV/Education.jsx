import React from 'react'
import UdemyLogo from '../../Assests/udemy.jpg'
import { useSelector } from 'react-redux'
import { selectEducation, selectResumeLoading } from '../../redux/Features/ResumeSlice'
import EducationLoader from '../Loaders/EducationLoader'
export default function Education() {
    const education = useSelector(selectEducation)
    const loading = useSelector(selectResumeLoading)
    return (
        <div className='section_2 my-2 col-100 align-center'>
            <div className="col-90">
                <h3 className="text-left">Education</h3>
                <span className="divider"></span>
                <div className="flex-row-between">
                    <div className="col-100 g-1">
                        {education.length>0?education.map((edu,i)=><EducationCard  skills={['HTML', 'CSS', 'JAVA']} {...edu} />):<EducationLoader/>}
                       
                    </div>

                </div>


            </div>

        </div>
    )
}
function EducationCard({ degree_name, upload_degree, course_start_date,course_end_date, university_name, skills, certificate }) {
    console.log(course_start_date)
    return (
        <div className="education-grid">
            <img src={upload_degree} alt="" />
            <div className="col-100 align-start justify-between">
                <div>
                    <h5 className='text-left'>{degree_name}</h5>
                    <div className="flex-row-start mt-0-5">
                        <p>{university_name}</p>
                        <span className='gradientDivider-v'></span>
                        <p>{TimeDiff(course_end_date,course_start_date)}</p>
                    </div>
                </div>


                <div className="flex-row-start g-0-5">
                    {skills.map((skill, i) => <div key={i} className="skill">
                        {skill}
                    </div>)}
                </div>

            </div>
        </div>
    )
}
function TimeDiff(date1, date2) {
    let year = parseInt((date1.split('-')[2])) -  parseInt((date2.split('-')[2]))
    let month = parseInt(date1.split('-')[1]) -parseInt(date2.split('-')[1])
    let days = parseInt(date1.split('-')[0]) -parseInt(date2.split('-')[0])

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