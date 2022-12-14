import React from 'react'
import './IconInput.css'
export default function IconSelect({type, label,value, name,handleChange,icon, defaultValue, width,validation, options=[],name_field, name_value=false,...props}) {
    return (
        <div className="iconInput" style={{width: width+'%'}}>
            <label htmlFor={name}>{label}</label>

            <div className="input-container">
                {icon}
                <select type={type} value={value} onChange={handleChange} name={name} defaultValue={defaultValue} {...props} >
                    {
                       options&&options.map((option, index)=><option key={option.id} value={name_value?option[name_field]:option.id}>{option[name_field]}</option>)
                        
                    }
                </select>
                
            </div>
            {validation&&<span className='validation-message .shake-horizontal'>{validation}</span>}
        </div>
    )
}
