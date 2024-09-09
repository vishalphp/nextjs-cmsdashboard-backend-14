'use client'
import React, { Fragment, useEffect, useState } from 'react';
import dashboardStyle from '@/styles/dashboard.module.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type listChild = {
  pagename?: any;
  [key: string]: string[] | string;
}

type listPageProps = {
  fileName?: string;
  content: listChild[]
}

export default function ContentListPage() {

  const [contentData, setContentData] = useState<listPageProps[]>([]);
  const pathname = usePathname();

    const loadContentPage = async() =>{
      const responce = await fetch('/api/jsonContentPageList');
      if(!responce.ok){ throw new Error('Custom error message: Condition failed!'); }

      const dataRes = await responce.json();
      setContentData(dataRes.data);

    }

    useEffect(()=>{
        loadContentPage();
    },[]);


    const editHandler = (slug: string) =>{
    // console.log(slug);
    }

  return (
    <>
    <div className={`${dashboardStyle.layout__com__wrapper}`}>
        <div className={`heading__main__wrapper ${dashboardStyle['p-20']}`}>
           <h1 className={`heading ${dashboardStyle.font__size__24}`}>Content Page List</h1>
        </div>
        <Fragment>
           <div className={`list__wrapper__com ${dashboardStyle.display__flex} ${dashboardStyle.display__justifycontent__between} ${dashboardStyle['p-20']}`}>
               <div className='page__name__number list__tab__one'>
                   S. NO
               </div>
               <div className='page__name__heading list__tab__two'>
                 Page Name
               </div>
               <div className='page__name__edit list__tab__three'>
                  Edit
               </div>
           </div>
           <div className={`list__wrapper__content__box ${dashboardStyle.display__flex} ${dashboardStyle.display__flex__direction__column} ${dashboardStyle.display__justifycontent__between} ${dashboardStyle['p-20']}`}>
          { contentData.map((listPage,index: number) =>{
              const slug = listPage.fileName?.split('.');
             return <div key={index} className={`list__page__wrp ${dashboardStyle.display__flex} ${dashboardStyle.display__justifycontent__between} ${dashboardStyle['p-20']}`}><div className='page__name__number list__tab__one'>{index + 1}</div><div className='filename page__name__heading list__tab__two'> <Link href={slug ? pathname+'/'+slug[0].toString()+'?edit=true' : ''}>{listPage?.content?.pagename}</Link> </div> <div className='page__name__edit list__tab__three'>
             <Link href={slug ? pathname+'/'+slug[0].toString()+'?edit=true' : ''}>Edit</Link>
          </div></div>
            })
          }
      
           </div>
        </Fragment>
    </div>
    </>
  )
}
