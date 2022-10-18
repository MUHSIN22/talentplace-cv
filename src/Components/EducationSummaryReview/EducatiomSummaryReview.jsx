import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuthToken, selectUser_id } from '../../redux/Features/AuthenticationSlice';
import { addEducationForEdit, changeExperienceForm } from '../../redux/Features/EditSlice';
import { deleteEducation, SelectCompanyDetails, selectEducation, setReloadDecider, toggleNewEducation, updateTheSequence } from '../../redux/Features/ResumeSlice';
import EditFormAddButton from '../../Util Components/EditFormAddButton/EditFormAddButton';
import EditFormController from '../../Util Components/EditFormController/EditFormController';
import EditSwappableComponent from '../../Util Components/EditSwappableComponent/EditSwappableComponent';

export default function EducatiomSummaryReview() {
    const education = useSelector(selectEducation)
    const [list,setList] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const token = useSelector(selectAuthToken)
    const user_id = useSelector(selectUser_id)

    const onDragEnd = (result) => {
        let res = reorder(list,result.source.index,result.destination.index)
        setList(res);
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex - 1, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const editEducationInfo = (item) => {
        dispatch(addEducationForEdit(item.education_record_id))
        navigate('/dashboard/education-editor')
    }

    const deleteEducationInfo = (item) => {
        let confirm = window.confirm("Are you sure to delete the education?")
        if(confirm){
            dispatch(setReloadDecider(true));
            dispatch(deleteEducation({auth: token , body: {user_id,education_record_id: item.education_record_id}}))
        }
    }

    const addNewEducation = () => {
        dispatch(toggleNewEducation(true))
        navigate('/dashboard/education-editor')
    }

    const submitSwapping = () => {
        let newList = [];
        if(list && list[0]){
            for(let i=0;i<list.length;i++){
                newList.push({
                    record_id: list[i].education_record_id,
                    record_sequence: i+1
                })
            }
        }
        if(newList[0]){
            dispatch(setReloadDecider(true))
            dispatch(updateTheSequence({auth:token,body:{user_id,module_name: "education",sequence_info:JSON.stringify(newList)}}));
        }
    }

    useEffect(() => {
        dispatch(toggleNewEducation(false))
        dispatch(changeExperienceForm(0))
        setList(education)
    },[education])
      
    console.log(list,'this is list');
    return (
        <div className="edit-summary-preview-wrapper">
            <DragDropContext onDragEnd={onDragEnd}>
                <h2 className="form-title">Education History</h2>
                <Droppable droppableId='droppable'>
                    {(provided, snapshot) => (
                        <div className='draggable-container' ref={provided.innerRef} {...provided.droppableProps} >
                            {
                                list && list.map((item,index) => (
                                    <EditSwappableComponent 
                                        id={index + 1} 
                                        key={index} 
                                        item={item} 
                                        data={{title: item.degree_name,location: item.location ,fromDate: item.course_start_date, toDate: item.course_end_date}}
                                        editItem={editEducationInfo}
                                        deleteItem={deleteEducationInfo}
                                    />
                                ))
                            }
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <EditFormAddButton title="Add another education" addingHandler={addNewEducation} />
            <EditFormController handlePreviousNavigation={() => navigate('/dashboard/edit')} handleSubmit={submitSwapping}/>
        </div>
    )
}
