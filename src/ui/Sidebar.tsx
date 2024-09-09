import React from 'react'
import Link from 'next/link';
import dashboardStyle from '@/styles/dashboard.module.css';

type sidebarProps = {
    children?: React.ReactNode,
    classNameAttr?: string
}

export default function Sidebar({classNameAttr}:sidebarProps) {
  return (
    <>
      <div className='sidebar'>

        <div className={`heading__navigation__main ${dashboardStyle.lable__white__color} ${dashboardStyle['p-20']} }`}>
          <h2>CMS Backend</h2>
        </div>

        <aside>
            <h2 className={`h2__subheading__nav__size ${dashboardStyle.nav__link__normal__color} ${dashboardStyle.font__size__18} ${dashboardStyle['p-20']}`}>Layout Menu</h2>
            <Link href='/dashboard/pageslist' className={`${dashboardStyle.display__flex} ${dashboardStyle.m_b_10} ${dashboardStyle.p_l_20} ${dashboardStyle.lable__white__color}`}>Pages List</Link>
            <Link href="/dashboard/addnewpagelayout" className={`${dashboardStyle.display__flex} ${dashboardStyle.m_b_10} ${dashboardStyle.p_l_20} ${dashboardStyle.lable__white__color}`}>Add New Page Layout</Link>
        </aside>

        <aside>
        <h2 className={`h2__subheading__nav__size ${dashboardStyle.nav__link__normal__color} ${dashboardStyle.font__size__18} ${dashboardStyle['p-20']}`}>Content menu</h2>
        <Link href="/dashboard/contentpagelist" className={`${dashboardStyle.display__flex} ${dashboardStyle.m_b_10} ${dashboardStyle.p_l_20} ${dashboardStyle.lable__white__color}`}>Content Pages</Link>
        
        </aside>

      </div>
    </>
  )
}
