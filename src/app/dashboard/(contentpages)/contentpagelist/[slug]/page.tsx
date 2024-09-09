import ContentDetials from '@/component/ContentPageList/ContentDetials';
import React from 'react'

type paramsProps = {
    params: {
        slug: string
        }
}

export default function pageContent({params}: paramsProps) {
const {slug} = params;

  return (
    <ContentDetials slug={slug}/>
  )
}
