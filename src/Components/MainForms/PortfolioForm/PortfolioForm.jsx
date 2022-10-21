import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { selectAuthToken, selectUser_id } from '../../../redux/Features/AuthenticationSlice'
import { SelectDocuments, selectNewPhotoMedia, setReloadDecider, uploadPhotomedia } from '../../../redux/Features/ResumeSlice'
import FormController from '../../../Util Components/FormController/FormController'
import PlainInput from '../../../Util Components/Inputs/PlainInput/PlainInput'
import TextArea from '../../../Util Components/Inputs/TextArea/TextArea'
import MultiSelectedOptions from '../../../Util Components/MultiSelectedOptions'
import DragDropInput from '../../DragDropInput/DragDropInput'
import './PortfolioForm.css'
import { ReactComponent as AddCircle } from '../../../Assests/icons/add-circle.svg';

export default function PortfolioForm() {
    const [files, setFiles] = useState([])
    const [links,setLinks] = useState([])
    const [enteredLink,setEnteredLink] = useState()
    const [form,setForm] = useState({portfolio_title:"",portfolio_desc:""});
    const dispatch = useDispatch();
    const auth = useSelector(selectAuthToken)
    const user_id = useSelector(selectUser_id)
    const portfolio = useSelector(SelectDocuments);
    const [portfoliID,setPortfolioID] = useState("")
    const newPhotoMedia = useSelector(selectNewPhotoMedia);


    const handleLinkChange = event => {
        setEnteredLink(event.target.value);
    }

    const handleAddLink = () => {
        if(isValidHttpUrl(enteredLink)){
            setLinks([...links,enteredLink])
            setEnteredLink('')
        }else{
            toast.error("Please enter a valid URL including http!")
        }
    }


    const handleSubmit = async (e,isAdd) => {
        let body = form;
        body.file_path = files
        body.links = links
        let formData = new FormData();
        if(isAdd){
            formData.append("reload_request","yes");
        }
        formData.append('user_resume_photo_media_id',portfoliID)
        formData.append("user_id",user_id)
        formData.append('title',form.portfolio_desc)
        formData.append('description',form.portfolio_desc)
        for(let i=0;i<files.length;i++){
            formData.append(`file_path_${i+1}`,files[i])
        }
        formData.append('links',links)
        formData.append(`file_count`,files.length);
        try{
            dispatch(setReloadDecider(true))
            await dispatch(uploadPhotomedia({auth,body: formData}))
            setForm({portfolio_title:"",portfolio_desc:""})
            setFiles([])
            setLinks([])
        }catch(err){
        }

    }

    function isValidHttpUrl(string) {
        let url;
        
        try {
          url = new URL(string);
        } catch (_) {
          return false;  
        }
      
        return url.protocol === "http:" || url.protocol === "https:";
      }

      useEffect(() => {
        if(portfolio && portfolio[0] && !newPhotoMedia){
            let currentPortfolio = portfolio[portfolio.length - 1];
            setPortfolioID(currentPortfolio.user_resume_photo_media_id)
            setForm({portfolio_title: currentPortfolio.title ,portfolio_desc:currentPortfolio.description})
            setFiles(currentPortfolio.file_info)
            setLinks(currentPortfolio.links.split(','))
        }
      },[portfolio])

      const deleteFiles = (i) => {
        let newFiles = files.filter((file,index) => index !== i)
        setFiles(newFiles);
    }

    const deleteLinks = (i) => {
        let newLinks = links.filter((link,index) => index !== i)
        setLinks(newLinks);
    }

    return (
        <div className="main-form-wrapper portfolio-form">
            <h2 className="form-title">Showcase your Portfolio</h2>
            <p className='form-subtitle'>You can add upto 5 projects</p>
            <PlainInput name='portfolio_title' value={form.portfolio_title} label="Title" placeholder="Project name" handleChange={(e) => setForm({...form,[e.target.name]: e.target.value})}/>
            <TextArea name='portfolio_desc' value={form.portfolio_desc} label='Description' placeholder="Project description" handleChange={(e) => setForm({...form,[e.target.name]: e.target.value})} />
            <MultiSelectedOptions options={files} deleteHandler={deleteFiles} value_field={(files[0] && files[0].fileType) ? "fileType" :"name"} />
            <div className="common-input-wrapper">
                <label htmlFor="">Share Documents (You can share multiple documents)</label>
                <DragDropInput multiple file={files} setFile={setFiles} />
            </div>
            <MultiSelectedOptions options={links} deleteHandler={deleteLinks} />
            <div className="portfolio-link-input">
                <PlainInput name='portfolio_link' value={enteredLink} label="Portfolio Link (Personal website,Github,Behance,etc...)" placeholder='https://www.johndoe.me' handleChange={handleLinkChange} />
                <button className="btn btn-add" onClick={handleAddLink}>Add Link</button>
            </div>
            <button onClick={(e) => handleSubmit(e,true)} className="btn-fit transparent g-0-5" style={{marginLeft: "auto"}}><AddCircle width={30} /> Add Another Portfolio</button>
            <FormController handleSubmit={handleSubmit} isSkip/>
        </div>
    )
}
