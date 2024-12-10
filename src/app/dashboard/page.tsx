'use client'

/* Custom Components import */
import LeftDashboard from '@/components/custom/LeftDashboard'
import RightDashboard from '@/components/custom/RightDashboard'

/* UI Components import */
import { Separator } from '@/components/ui/separator'

/* System Components import */
import React from 'react'

const Dashboard = () => {
  return (
    <React.Fragment>
        <main className=' h-screen w-screen flex flex-row justify-normal items-center overflow-hidden'>
            {/* Left Section */}
            <LeftDashboard />
            <Separator orientation='vertical' className=' h-screen z-10 bg-gray-200' />
            {/* Right Section */}
            <RightDashboard />
        </main>
    </React.Fragment>
  )
}

export default Dashboard;
