import React from 'react'
import './AssesmentQuestion.css'

export default function AssesmentQuestion() {

    const handleMarking = (event) => {
        console.log(event,'this is event');
        event.preventDefault();
        let selected = document.querySelector(".answer-label--active");
        if(selected){
            selected.classList.remove("answer-label--active")
        }
        event.target.classList.add("answer-label--active")
    }
  return (
    <div className="assesment-question-page-wrapper">
        <span className="assesment-bg-circle"></span>
        <span className="assesment-bg-circle"></span>
        <span className="assesment-bg-circle"></span>
        <div className="assesment-question-page">
            <p className="assesment-question">
                <strong className="question-num">01</strong>
                - I put people under pressure
            </p>
            <div className="answers-wrapper">
                <label htmlFor="op-1" className="answer-label" onClick={handleMarking}>
                    <span className="answer-custom-radio"></span>
                    <p className="option">Very Accurate</p>
                </label>
                <label htmlFor='op-2' className="answer-label" onClick={handleMarking}>
                    <span className="answer-custom-radio"></span>
                    <p className="option">Moderately Accurate</p>
                </label>
                <label htmlFor='op-3' className="answer-label" onClick={handleMarking}>
                    <span className="answer-custom-radio"></span>
                    <p className="option">Neither inaccurate nor accurate.</p>
                </label>
                <label htmlFor='op-4' className="answer-label" onClick={handleMarking}>
                    <span className="answer-custom-radio"></span>
                    <p className="option">Moderately inaccurate.</p>
                </label>
                <label htmlFor='op-5'className="answer-label" onClick={handleMarking}>
                    <span className="answer-custom-radio"></span>
                    <p className="option">Very inaccurate.</p>
                </label>
            </div>
            <div className="answer-btns-wrapper">
                <button className="btn-back">Back</button>
                <button className="btn-back">Submit</button>
            </div>
        </div>
    </div>
  )
}
