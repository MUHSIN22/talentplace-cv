import React from 'react'
import './AssesmentSelect.css'

export default function AssesmentSelect({name,placeholder}) {
  return (
    <div className="assesment-search-select">
        <input type="text" list={name+"_list"} placeholder={placeholder} name={name} id={name} />
        <datalist id={name+"_list"}>
            <option value="Chocolate"/>
            <option value="Coconut"/>
            <option value="Mint"/>
            <option value="Strawberry"/>
            <option value="Vanilla"/>
        </datalist>
    </div>
  )
}
