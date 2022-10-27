import React from 'react'
import { GrGroup } from 'react-icons/gr'
import { MdTimer } from 'react-icons/md'
import './AssesmentCard.css'

export default function AssesmentCard() {
    return (
        <div className="assesment-card">
            <div className="card-label">
                <GrGroup className='label-icon' />
                <p>Popular</p>
            </div>
            <div className="assesment-card-body">
                <h5 className="card-title">JavaScript (coding)</h5>
                <p className="card-level">Beginner</p>
                <p className="assesment-card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sunt repellendus nam temporibus consequuntur autem atque et reiciendis tempore assumenda.</p>
                <div className="card-timer">
                    <MdTimer className='timer-icon' />
                    <p className="timer">10 mins</p>
                </div>
                <button className="btn-card-details">Details</button>
            </div>
        </div>
    )
}
