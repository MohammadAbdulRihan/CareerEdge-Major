import React from 'react'
import Resume from './_components/Resume'
const page = () => {
    return (
        <div className='ml-4'>
            <h1 className="md:text-6xl text-4xl font-bold gradient-title">Resume Analyser</h1>
            <p className="md:text-2xl text-lg mt-4">Upload your resume and get insights</p>
            <Resume />
        </div>

    )
}

export default page