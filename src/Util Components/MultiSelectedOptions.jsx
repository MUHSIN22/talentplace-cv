import React from 'react'
import { ReactComponent as Cross } from '../Assests/icons/cross.svg';
export default function MultiSelectedOptions({options=[],deleteHandler=()=>{}, value_field='', subValue_field=''}) {
  return (
    <div className="flex-wrap align-start justify-start g-1">
        {options && options.map((x,i)=><Card key={i} value={typeof x === "object" ? x[value_field] : x} subValue={x[subValue_field]} id={i} deleteHandler={deleteHandler} />)}
    </div>
  )
}
function Card({value, subValue, id, deleteHandler}){
    return (
        <div className="option-card">
            <p>{value}</p>
            <span>{subValue}</span>
            <button className='btn-fit transparent' onClick={()=>deleteHandler(id)}><Cross color='#14B47D'/></button>
        </div>
    )
}



