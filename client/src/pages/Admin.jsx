import React, { useState } from 'react'
import FormSection from '../components/FormSection'
import Sidebar from '../components/AdminPanelSideBar';

const Admin = () => {
    const [activeSection, setActiveSection] = useState("dashboard");
  return (
    <div className='flex '>
      <div className='border bg-gray-200'>
      <Sidebar setActiveSection={setActiveSection} />
      </div>
      <div className="flex-1 bg-gray-50">
        <FormSection activeSection={activeSection} />
      </div>
    </div>
  )
}

export default Admin