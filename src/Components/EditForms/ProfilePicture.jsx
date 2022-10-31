import React from 'react'
import DragDropInput from '../DragDropInput/DragDropInput'

export default function ProfilePicture() {
    return (
        <>
        <h1 className='text-left'>Lastly, add your favourite profile picture and treat yourself to celebrate.</h1>
            <div className="form-row">
                <DragDropInput/>
            </div>
            <div className="flex-row-end g-1">
            <div className="col-30 mt-2">
                <button className='btn'>Review</button>
            </div>
            </div>
        </>
    )
}
