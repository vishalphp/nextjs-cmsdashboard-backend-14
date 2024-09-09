'use client'
import React, { Fragment, useEffect, useState } from 'react'
import dashboardStyle from '@/styles/dashboard.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type contProps ={
  pagename?: any; // Optional, in case it's not available
  [key: string]: string[] | string; // Index signature for dynamic keys
}

type listPageProps =  {
  fileName?: string;
  content?: contProps;
  
}

export default function LayoutPageList() {

  const [listPageJson, setListPageJson] = useState<listPageProps[]>([]);
   const pathname = usePathname();
   const [message, setMessage] = useState('');

  useEffect(()=>{
    getAllFilesListInDirJson();
  },[]);

  /*useEffect(()=>{
    console.log(listPageJson);
  },[listPageJson]);*/

  const getAllFilesListInDirJson = async() =>{
     const data = await fetch('/api/jsonPagelist');
     const jsonData = await data.json();
     setListPageJson(jsonData);
  }

  const deleteHandler = async(slug:string | undefined) =>{
    const data = await fetch(`/api/jsonDataDelete/${slug}`,{
      method: 'DELETE',
    });
    if (!data.ok) {
      throw new Error('Failed to delete the file');
    }else{
      await data.json();
      getAllFilesListInDirJson();
      setMessage('File has been deleted.');
    }
  }


  return (
    <>
    <div className={`${dashboardStyle.layout__com__wrapper}`}>
        <div className={`heading__main__wrapper ${dashboardStyle['p-20']}`}>
           <h1 className={`heading ${dashboardStyle.font__size__24}`}>Layout Pages List</h1>
        </div>
        {message && <p className={` ${dashboardStyle.green_success} `}>{message}</p>}
        <Fragment>
           <div className={`list__wrapper__com ${dashboardStyle.display__flex} ${dashboardStyle.display__justifycontent__between} ${dashboardStyle['p-20']}`}>
               <div className='page__name__number list__tab__one'>
                   S. NO
               </div>
               <div className='page__name__heading list__tab__two'>
                 Page Name
               </div>
               <div className='page__name__edit list__tab__three'>
                  Edit/Delete
               </div>
           </div>
           <div className={`list__wrapper__content__box ${dashboardStyle.display__flex} ${dashboardStyle.display__flex__direction__column} ${dashboardStyle.display__justifycontent__between} ${dashboardStyle['p-20']}`}>
          { listPageJson.map((listPage,index: number) =>{
              const slug = listPage.fileName?.split('.');
             return <div key={index} className={`list__page__wrp ${dashboardStyle.display__flex} ${dashboardStyle.display__justifycontent__between} ${dashboardStyle['p-20']}`}><div className='page__name__number list__tab__one'>{index + 1}</div><div className='filename page__name__heading list__tab__two'> <Link href={slug ? pathname+'/'+slug[0].toString()+'?edit=true' : ''}>{listPage?.content?.pagename} - Edit</Link> </div> <div className='page__name__edit list__tab__three'>
             <button onClick={()=>deleteHandler(slug?.[0])}>Delete</button>
          </div></div>
            })
          }
      
           </div>
        </Fragment>
    </div>
    </>
  )
}
