import React from 'react'
import { useState } from 'react'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { toast } from 'react-toastify'
import API from '../../API'
import './ContactUs.css'

export default function ContactUs() {
    const [form,setForm] = useState({name:'',email:"",message:""})
    
    const handleChanging = (event) => {
        setForm({...form,[event.target.name]: event.target.value})
    }
    const handleFormSubmission = async (event) => {
        event.preventDefault();
        console.log(form);
        let response = await API.post(`https://cv-builder.talentplace.ai/api/v1/contact-us`,form)
        console.log(response);
        if(response.status == 200){
            toast.success(response.data.data.message)
            setForm({name:'',email:"",message:""})
        }else{
            toast.error("Something went wrong in submission!")
        }
    }
  return (
    <div className="contact-us-page">
        <div className="contact-us-container">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-description">Contact us for a query, help, or to join the team</p>
            <div className="contact-links">
                <div className="contact-link">
                    <MdEmail className="contact-icon" />
                    <h6 className="contact-link-title">Email</h6>
                    <a href="mailto:contact@talentplace.ai">contact@talentplace.ai</a>
                </div>
                <div className="contact-link">
                    <BsFillTelephoneFill className='contact-icon' />
                    <h6 className="contact-link-title">Phone</h6>
                    <a href="tel:+918380090444">+91 838 00 90 444</a>
                </div>
            </div>
            <form className="contact-form" onSubmit={handleFormSubmission}>
                <input type="text" value={form.name} name="name" placeholder='Name' className="contact-input" required onChange={handleChanging} />
                <input type="email" value={form.email} name="email" placeholder='Email' className="contact-input" required onChange={handleChanging} />
                <textarea  value={form.message} name="message" placeholder='Message...' required className='contact-input' id="" cols="30" rows="10" onChange={handleChanging}></textarea>
                <button className="btn-submit">Submit</button>
            </form>
        </div>
    </div>
  )
}
