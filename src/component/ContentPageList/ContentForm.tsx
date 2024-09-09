import React from 'react';
import dashboardStyle from '@/styles/dashboard.module.css';
import { pageVariable } from '@/utils/constants';

type collectFormDataProps = {
    collectFormData: any
}

export default function ContentForm({collectFormData}:collectFormDataProps) {

    console.log(collectFormData);

    const submitHandler = () =>{
        console.log("submit");
    }

  return (
    <>
     <div>

     <div className={`development__heading__name__description ${dashboardStyle.display__block} ${dashboardStyle['p-20']} ${dashboardStyle.text__align__left}`}><h1>{pageVariable.content_page_heading}</h1></div>
 
      <div className='contentinput__wrapper'>
        <form onSubmit={submitHandler}>

        <div className='field__wrapper'>
           <label>Lable Name</label>
           
        </div>

        <div className='contentsubmit__wrapper'>
          <input type='submit' name='submit' value="Submit" />
        </div>

        </form>
      </div>
     
     </div>
    </>
  )
}
