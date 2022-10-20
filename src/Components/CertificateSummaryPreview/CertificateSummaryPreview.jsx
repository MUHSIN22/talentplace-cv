import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuthToken, selectUser_id } from '../../redux/Features/AuthenticationSlice';
import { addCertificateForEdit } from '../../redux/Features/EditSlice';
import { deleteCertificate, selectCertificate, selectEducation, setReloadDecider, toggleNewCertificate, updateTheSequence } from '../../redux/Features/ResumeSlice';
import EditFormAddButton from '../../Util Components/EditFormAddButton/EditFormAddButton';
import EditFormController from '../../Util Components/EditFormController/EditFormController';
import EditSwappableComponent from '../../Util Components/EditSwappableComponent/EditSwappableComponent';

export default function CertificateSummaryPreview() {
    const certifications = useSelector(selectCertificate);
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

    const editCertificateInfo = (item) => {
        dispatch(addCertificateForEdit(item.certificate_record_id))
        navigate('/dashboard/certificate-editor')
    }

    const deleteCertificateInfo = (item) => {
        let confirm = window.confirm("Are you sure to delete the education?")
        if(confirm){
            dispatch(setReloadDecider(true));
            dispatch(deleteCertificate({auth: token , body: {user_id,certificate_record_id: item.certificate_record_id}}))
        }
    }

    const addNewCertificate = () => {
        dispatch(toggleNewCertificate(true))
        navigate('/dashboard/certificate-editor')
    }

    const changeTheSequence = () => {
        let newList = []
        if(list && list[0]){
            for(let i=0;i<list.length;i++){
                newList.push({
                    record_id: list[i].certificate_record_id,
                    record_sequence: i+1
                })
            }
        }
        if(newList[0]){
            dispatch(setReloadDecider(true))
            dispatch(updateTheSequence({auth:token,body:{user_id,module_name: "certificate",sequence_info:JSON.stringify(newList)}}));
        }
    }

    useEffect(() => {
        dispatch(toggleNewCertificate(false))
        setList(certifications)
    },[certifications])
      
    return (
        <div className="edit-summary-preview-wrapper">
            <DragDropContext onDragEnd={onDragEnd}>
                <h2 className="form-title">Certification History</h2>
                <Droppable droppableId='droppable'>
                    {(provided, snapshot) => (
                        <div className='draggable-container' ref={provided.innerRef} {...provided.droppableProps} >
                            {
                                list && list.map((item,index) => (
                                    <EditSwappableComponent 
                                        id={index + 1} 
                                        key={index} 
                                        item={item} 
                                        data={{title: item.project_name,location: item.institute_name ,fromDate: item.certificate_start_date, toDate: item.certificate_end_date}}
                                        editItem={editCertificateInfo}
                                        deleteItem={deleteCertificateInfo}
                                    />
                                ))
                            }
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <EditFormAddButton title="Add another Certificate" addingHandler={addNewCertificate} />
            <EditFormController handlePreviousNavigation={() => navigate('/dashboard/edit')} handleSubmit={changeTheSequence} />
        </div>
    )
}
