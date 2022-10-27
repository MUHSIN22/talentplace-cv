import React, { useState } from 'react'
import './AssesmentDetails.css'
import audience from '../../../Assets/Assesment/audience.svg'
import level from '../../../Assets/Assesment/level.svg'
import timer from '../../../Assets/Assesment/timer.svg'
import typeImg from '../../../Assets/Assesment/type.svg'
import l1 from '../../../Assets/Assesment/l1.svg'
import l2 from '../../../Assets/Assesment/l2.svg'
import l3 from '../../../Assets/Assesment/l3.svg'
import l4 from '../../../Assets/Assesment/l4.svg'
import l5 from '../../../Assets/Assesment/l5.svg'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function AssesmentDetails() {
    const { pathname } = useLocation();
    const [isResult, setResultBool] = useState(false);

    useEffect(() => {
        setResultBool(pathname === "/assesment-result" ? true : false)
    }, [pathname])
    return (
        <div className="assesment-details-page-wrapper">
            <span className="assesment-bg-circle"></span>
            <span className="assesment-bg-circle"></span>
            <span className="assesment-bg-circle"></span>
            <div className="assesment-details-page">
                <button className="btn-back">Back To Assesment</button>
                <div className="assesment-details-grid">
                    <div className="assesment-details">
                        <h1 className="assesment-list-title">Use our Culture add test to hire the best</h1>
                        <div className="assesment-description-wrapper">
                            <h5 className="assesment-desc-title">Summary of the Culture add test</h5>
                            <p className="assesment-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores atque deserunt ab magnam culpa dolor, optio explicabo id esse eveniet voluptatibus ducimus aliquam quis, perferendis eaque corrupti officiis at tempore!</p>
                        </div>
                        <div className="assesment-description-wrapper">
                            <h5 className="assesment-desc-title">Summary of the Culture add test</h5>
                            <p className="assesment-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores atque deserunt ab magnam culpa dolor, optio explicabo id esse eveniet voluptatibus ducimus aliquam quis, perferendis eaque corrupti officiis at tempore!</p>
                        </div>
                    </div>
                    <span className="assesment-details-divider"></span>
                    <div className="assesment-details-right">
                        <div className="assesment-properties-grid">
                            <div className="assesment-property">
                                <img src={typeImg} alt="" className="property-icon" />
                                <strong>Type</strong>
                                <p className="value">Personality & Culture</p>
                            </div>
                            <div className="assesment-property">
                                <img src={timer} alt="" className="property-icon" />
                                <strong>Time</strong>
                                <p className="value">10 mins</p>
                            </div>
                            <div className="assesment-property">
                                <img src={audience} alt="" className="property-icon" />
                                <strong>Attempted by</strong>
                                <p className="value">1250 People</p>
                            </div>
                            <div className="assesment-property">
                                <img src={level} alt="" className="property-icon" />
                                <strong>Level</strong>
                                <p className="value">Advanced</p>
                            </div>
                        </div>

                        {
                            isResult &&
                            <div className="score-card-wrapper">
                                <div className="score-card-title-wrapper">
                                    <strong>My Score</strong>
                                    <p>
                                        <strong>Rank</strong>
                                        <span>Out of all the people who have taken this test</span>
                                    </p>                            </div>
                                <div className="score-card">
                                    <p className="score-value-wrapper">
                                        <span>79</span>/100
                                    </p>
                                    <div className="score-percentile-grid">
                                        <div className="percentile-graph">
                                            <img src={l1} alt="" />
                                        </div>
                                        <div className="percentile-graph">
                                            <img src={l2} alt="" />
                                        </div>
                                        <div className="percentile-graph">
                                            <img src={l3} alt="" />
                                        </div>
                                        <div className="percentile-graph percentile-graph--active">
                                            <img src={l4} alt="" />
                                        </div>
                                        <div className="percentile-graph">
                                            <img src={l5} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <button className="btn-back btn-get-started">{isResult ? "RETAKE" : "GET STARTED"}</button>
            </div>

        </div>
    )
}
