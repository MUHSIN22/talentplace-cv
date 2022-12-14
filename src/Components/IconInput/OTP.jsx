import { useEffect } from "react";




export default function OTP({setOtp, toggleOTP}) {
  useEffect(() => {
    
    var inputs = document.querySelectorAll(".otp input") 
    const handleChange = (e)=>{
      const input = e.target;
       let value=  input.value;
  
       input.value = '';
       input.value = value ? value[0]:'';

       let fieldIndex = input.dataset.index;
       if(value.length >0 && fieldIndex < inputs.length- 1){
         input.nextElementSibling.focus();
       }
       if(e.key=== 'Backspace' && fieldIndex > 0){
         input.previousElementSibling.focus();
       }
       if(fieldIndex==inputs.length-1){
         let otp = '';
         inputs.forEach((input)=>{

           otp+= input.value;
          //  input.disabled = true
         })
         setOtp(otp);
       }

   }
   inputs.forEach((input,index)=>{
    input.dataset.index = index;
    input.addEventListener("keyup",handleChange);
  })
    return () => {
      
    }
  }, [setOtp])
  
  useEffect(() => {
    var inputs = document.querySelectorAll(".otp input") 
    inputs.forEach((input) => {
      input.value = ""
    })
  },[toggleOTP])
  


  return (
    <div className="otp">
        <input name='d1' type="text" placeholder='_' maxLength={1} pattern= "[0-9]"/>
        <input name='d2' type="text" placeholder='_' maxLength={1} pattern= "[0-9]"/>
        <input name='d3' type="text" placeholder='_' maxLength={1} pattern= "[0-9]"/>
        <input name='d4' type="text" placeholder='_' maxLength={1} pattern= "[0-9]"/>
        <input name='d5' type="text" placeholder='_' maxLength={1} pattern= "[0-9]"/>
        <input name='d6' type="text" placeholder='_' maxLength={1} pattern= "[0-9]"/>
    </div>
  )
}
