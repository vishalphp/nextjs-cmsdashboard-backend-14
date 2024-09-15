import React, { useEffect, useRef, useState } from 'react';
import dashboardStyle from '@/styles/dashboard.module.css';
import { pageVariable } from '@/utils/constants';
import { NextResponse } from 'next/server';

type collectFormDataProps = {
    collectFormData: any
}

export default function ContentForm({collectFormData}:collectFormDataProps) {

  //const textData = Object.entries(collectFormData).filter(([key, value]) => key === 'pagename').map(([key,value]) => value);
   const preFormData = {'pagename': collectFormData['pagename']?.[0] };

  const [fieldsRef, setFieldsRef] = useState<{[key: string]: string}>({});
  const [message, setMessage] = useState<string>('');
  const [dataFileMatch, setDataFileMatch] = useState<{[key: string]:string}>({});

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target;
    console.log(e.target.value);
    setFieldsRef(prev => ({...prev, [name]: value }) );
  }

  useEffect(()=>{
    setFieldsRef(preFormData);
  },[collectFormData['pagename']]);

  const OnLoadFormDataHandler = async() =>{
    const tempPageName = collectFormData['pagename']?.[0].split(' ').join('_');
    const onLoData = await fetch(`/api/jsonContentDataBySlug/${tempPageName}`);
    if(!onLoData.ok){
      throw new Response('api not working');
    }
    const onLoadDataContent = await onLoData.json();
    onLoadDataContent.message ? setDataFileMatch(onLoadDataContent.message): '';
  }

  useEffect(()=>{
    collectFormData['pagename'] === undefined ? '' : OnLoadFormDataHandler();
  },[collectFormData['pagename']]);

  useEffect(()=>{
    setFieldsRef((prev) => ({
      ...prev,
      ...dataFileMatch, // Merge the dataFileMatch into fieldsRef
    }));
  },[dataFileMatch]);

  let label = '';
  let inputName='';
  let keyOfInput='';
    const formDevelopData = Object.entries(collectFormData).map(([key, value], index: number)=>{
    if(/input_type_field_key_\d+/.test(key)){
       label = collectFormData[`input_type_field_label_${key.slice(-1)}`]; // Get corresponding label
      inputName = collectFormData[`input_type_field_value_${key.slice(-1)}`];
      keyOfInput = collectFormData[`input_type_field_key_${key.slice(-1)}`];

      return (
            <div className={`field__wrapper ${dashboardStyle.display__flex} ${dashboardStyle.display__justifycontent__between} ${dashboardStyle.align__item__center}`} key={key}>
                  <label>{label}</label>
                  <input type={inputName} name={keyOfInput} value={fieldsRef[keyOfInput]} onChange={valueChangeHandler} className={`${dashboardStyle.formFieldLook} `} />
                </div>
                );

    }

    return null;
  });

    const submitHandler = async(e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();

      try{
        const resp = await fetch('/api/jsonContentSubmitBySlug/',{method:'POST', body:JSON.stringify(fieldsRef)});
        if(!resp.ok){ throw new Response('Form not submitted.'); }
        const respData = await resp.json();
        setMessage('form submitted successfully');
        return NextResponse.json({ message: 'Form data saved successfully' }, { status: 200 });
      }catch(error){
        return NextResponse.json({ message: 'Something went wrong..' }, { status: 500 });
      }
    }

  return (
    <>
     <div>

     <div className={`development__heading__name__description ${dashboardStyle.display__block} ${dashboardStyle['p-20']} ${dashboardStyle.text__align__left}`}><h1>{pageVariable.content_page_heading}</h1></div>
  {message && <p className={`submitmessage ${ dashboardStyle.green_success }`}>{message}</p>}

     <div className={` ${dashboardStyle.add__wrapper__button__section} ${dashboardStyle.display__flex} ${dashboardStyle.display__justifycontent__flexend} ${dashboardStyle.width100} ${dashboardStyle['p-20']} ${dashboardStyle.text__align__right}`}>
    
     <div className={`contentinput__wrapper ${dashboardStyle.display__flex} ${dashboardStyle.display__justifycontent__between} ${dashboardStyle['p-10']} ${dashboardStyle.width100}`}>
       <form onSubmit={submitHandler} className={`${dashboardStyle.dragable_container_full_with} ${dashboardStyle.border__solid__ccc} ${dashboardStyle['p-10']}`}>
        {/* <div dangerouslySetInnerHTML={{ __html: formDevelopData }} />*/}
        {formDevelopData}
        <div className='contentsubmit__wrapper'>
          <input type='submit' name='submit' value="Submit" className={dashboardStyle.btn__primary} />
        </div>

        </form>
      </div>
      </div>
     
     </div>
    </>
  )
}
