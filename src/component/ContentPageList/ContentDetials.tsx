'use client'
import React, { useEffect, useState } from 'react'
import ContentForm from './ContentForm';

type slugProps = {
    slug: string;
}


export default function ContentDetials({slug}: slugProps) {

    const [collectFormData, setCollectFormData] = useState<any>([]);

    useEffect(()=>{
        collectDatabySlug();
    },[slug]);


    const collectDatabySlug = async() =>{
        const collectDataBySlugProps = await fetch(`/api/collectJsonDataBySlug/${slug}`);
        
       if(!collectDataBySlugProps.ok){
        throw new Error('content data not fetching...');
       }

       const dataFetched = await collectDataBySlugProps.json();
       setCollectFormData(dataFetched.message);

    }


  return (
    <>
    <ContentForm collectFormData={collectFormData} />
    </>
  )
}
