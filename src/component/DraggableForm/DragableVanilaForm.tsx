'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './DraggableForm.module.css';
import TextInput from './LeftComponents/TextInput';
import dashboardStyle from '@/styles/dashboard.module.css'
import { jsonFormDataSubmit, draggablesContainerHtmlElement } from '@/utils/dashboardDragableFromFunctions';
import {pageVariable} from '@/utils/constants'
import InfoIcon from '@/component/Icons/InfoIcon';

type fieldProps = {
    name?:string;
    type?:string;
    label?:string;
    id?: string;
    value?: string;
    infoText?: string;
    group?: number; // Add group type here
}

type EditProps = {
  editMode?: boolean | null;
  editPageData?: any;
}
type fieldEditProps = {
  pagename: string[];
  [key: string]: string[];
}


export default function DraggableVanillaForm({editMode, editPageData}:EditProps) {

const [fieldsData, setFieldsData] = useState<fieldProps[]>([]);
const [fieldCount, setFieldCount] = useState(1);
const [message, setMessage] = useState('');
const [messageStatus, setMessageStatus] = useState('');
const inputRef = useRef<(HTMLInputElement | null)[]>([]);
const [editPageName, setEditPageName] = useState<string>('');
const formMethod = editMode === true ? 'PUT' :'POST';

const addFields = () =>{
    const keyData = {name:'input_type_field_key_'+fieldCount, type: 'text', label: 'Field Key '+fieldCount,id:'key_'+fieldCount, value:'', infoText:"key name for page layout", group: fieldCount};
    const labelData = {name:'input_type_field_label_'+fieldCount, type: 'text', label: 'Field Label '+fieldCount,id:'label_'+fieldCount, value:'', infoText:"field label for content side layout", group: fieldCount};
    const valueData = {name:'input_type_field_value_'+fieldCount, type: 'select', label: 'Field Value '+fieldCount,id:'value_'+fieldCount, value:'', infoText:"field type select for content side layout", group: fieldCount};
    setFieldsData(prev => [...prev, keyData, labelData, valueData]);
    setFieldCount(fieldCount+1);
}


useEffect(() => {
  if (editMode && editPageData) {
    updateFieldsEdit(editPageData);
  }
}, [editPageData, editMode]);


const updateFieldsEdit = (editPageData: any) => {
  const newFieldsData: fieldProps[] = [];
  const regexKey = /^input_type_field_key_\d+$/;
  const regexLabel = /^input_type_field_label_\d+$/;
  const regexField = /^input_type_field_value_\d+$/;
  const countEdit: number[] =[];

  Object.entries(editPageData).forEach(([key, value]) => {
    if (regexKey.test(key)) {
      const keySplit = key.split('input_type_field_key_');
      countEdit.push(Number(keySplit[1]));
      newFieldsData.push({
        name: key,
        type: 'text',
        label: `Field Key ${keySplit[1]}`,
        id: `key_${keySplit[1]}`,
        value: value as string,
        infoText: 'key name for page layout',
        group: Number(keySplit[1]),
      });
    } else if (regexLabel.test(key)) {
      const keySplit = key.split('input_type_field_label_');
      countEdit.push(Number(keySplit[1]));
      newFieldsData.push({
        name: key,
        type: 'text',
        label: `Field Label ${keySplit[1]}`,
        id: `label_${keySplit[1]}`,
        value: value as string,
        infoText: 'label name for page layout',
        group: Number(keySplit[1]),
      });
    } else if (regexField.test(key)) {
      const keySplit = key.split('input_type_field_value_');
      newFieldsData.push({
        name: key,
        type: 'select',
        label: `Field Value ${keySplit[1]}`,
        id: `value_${keySplit[1]}`,
        value: value as string,
        infoText: 'field type select for content side layout',
        group: Number(keySplit[1]),
      });
    }
  });
  setFieldCount(Math.max(...countEdit) + 1);
  setFieldsData(newFieldsData);
};

  useEffect(() => {
    const draggables = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('.container');
    draggablesContainerHtmlElement(draggables, containers);

}, [fieldsData]);

const jsonFormDataSubmitWithCallBack = async(e:React.FormEvent<HTMLFormElement>, method: string)=>{
  e.preventDefault();
  await jsonFormDataSubmit(e, method , (message, status)=>{
      setMessage(message);
      setMessageStatus(status);
      setFieldsData(prev=> prev.map(field => ({
        ...field,
        value: ''
        }))
  );
    //console.log(message+ " update message of submission" + status)
  });

}

const handleInputChange = (index?: string, value?: string) => {
  const updatedFields = fieldsData.map((field) => 
    field.id === index ? { ...field, value } : field
  );
  setFieldsData(updatedFields);
};

 // Grouping logic based on `group` key
 const groupedFields = fieldsData.reduce<{ [key: number]: fieldProps[] }>((acc, field) => {
      if (!acc[field.group!]) {
        acc[field.group!] = [];
      }
      acc[field.group!].push(field);
      return acc;
    }, {});


  return (
    <div className='dragable__layout__wrapper__main'>
    <div className={`development__heading__name__description ${dashboardStyle.display__block} ${dashboardStyle['p-20']} ${dashboardStyle.text__align__left}`}><h1>{editMode !== true ? pageVariable.create_page_development_h1: pageVariable.edit_page_development_h1}</h1><h4>{editMode !== true ? pageVariable.create_page_development_h4 : pageVariable.edit_page_development_h4}</h4></div>
    <div className={` ${dashboardStyle.add__wrapper__button__section} ${dashboardStyle.display__flex} ${dashboardStyle.display__justifycontent__flexend} ${dashboardStyle.width100} ${dashboardStyle['p-20']} ${dashboardStyle.text__align__right}`}><InfoIcon content={pageVariable.create_page_development_button_icon} /><button className={`${dashboardStyle.btn__primary}`} onClick={addFields}>Add Fields</button></div>
    <div className={styles.formContainer}>
      <div className={`${styles.section} ${styles.leftSection} container`}>
        
      {Object.entries(groupedFields).map(([groupKey, fields]) => (
            <div key={groupKey} className={`${styles.draggable} draggable group-container`} draggable="true">
              {fields.map((flData, index) => (
                <TextInput
                  infoText={flData.infoText}
                  key={flData.id}
                  name={flData.name}
                  label={flData.label}
                  type={flData.type}
                  draggable={false}
                  value={flData.value}
                  onChange={(e) => handleInputChange(flData.id, e.target.value)}
                />
              ))}
            </div>
          ))}

        {/* <div className={`${styles.draggable} draggable`} draggable="true">Field 3</div>*/}
      </div>
      <form onSubmit={(e)=>jsonFormDataSubmitWithCallBack(e, formMethod)} className={`${dashboardStyle.dragable_container_full_with}`}>
        {message && <p className={`submitmessage ${ messageStatus === '500'? dashboardStyle.hard_error : messageStatus === '400' ? dashboardStyle.soft_error : dashboardStyle.green_success }`}>{message}</p>}
      <TextInput infoText={pageVariable.create_page_development_info_icon_page_name} key="1002345" name="pagename" label="Page Name" type='text' className={`${styles.draggable} draggable-none`} value={editPageData?.pagename} draggable={false} pointerevents={editMode === true ? 'none' : ''} disabled={editMode === true ? false : false} />
      <div className={`${styles.section} ${styles.rightSection} container ${dashboardStyle.width100} ${dashboardStyle['p-20']} ${dashboardStyle.m_b_10}`}>
       {/* <div className={`${styles.draggable} draggable`} draggable="true">Field 4</div>*/}
       
      </div>
      <input type='submit' name='jsonsubmit' value={editMode === true ? 'Update' : 'Submit'} className={`${dashboardStyle.btn__primary}`} />
      </form>
    </div>
    </div>
  );
}
