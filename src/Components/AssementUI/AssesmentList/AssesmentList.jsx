import React, { useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAssessments, selectAssessments } from '../../../redux/Features/AssesmentSlice'
import AssesmentCard from '../../../Util Components/AssementCard/AssesmentCard'
import AssesmentSelect from '../../../Util Components/Assesment-Searchable-Select/AssesmentSelect'
import './AssesmentList.css'

export default function AssesmentList() {
    const dispatch = useDispatch()
    const assessments = useSelector(selectAssessments);

    useEffect(() => {
        dispatch(getAssessments);
    },[])

    useEffect(() => {
        console.log(assessments,'this is assessments');
    },[assessments])
    return (
        <div className="assesment-list-page-wrapper">
            <span className="bg-rectangle"></span>
            <span className="bg-rectangle"></span>
            <span className="bg-rectangle"></span>
            <div className="assesment-list-page">
                <h1 className="assesment-list-title">Assess your Skills, Personality Type, and Job-Fit</h1>
                <button className="btn-check-score">Check My Score</button>
                <div className="search-and-select-wrapper">
                    <div className="assesment-search">
                        <input type="text" placeholder='Search Here' className="assesment-search-input" />
                        <div className="search-icon-wrapper">
                            <AiOutlineSearch className='assesment-search-icon' />
                        </div>
                    </div>
                    <AssesmentSelect name="skills" placeholder="Skills" />
                    <AssesmentSelect name="job-role" placeholder="Job Role" />
                    <AssesmentSelect name="test-type" placeholder="Test Type" />
                </div>
                <div className="assesments-card-wrapper">
                    <AssesmentCard />
                    <AssesmentCard />
                    <AssesmentCard />
                    <AssesmentCard />
                    <AssesmentCard />
                    <AssesmentCard />
                    <AssesmentCard />
                    <AssesmentCard />
                    <AssesmentCard />
                    <AssesmentCard />
                </div>
            </div>
        </div>
    )
}
