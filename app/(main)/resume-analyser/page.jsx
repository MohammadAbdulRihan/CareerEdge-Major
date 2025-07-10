import React from 'react'
import ResumeUploadDialog from './_components/ResumeUploadDialog';

const page = () => {
    return (
        <div >
            <h1 className="text-6xl font-bold gradient-title">Resume Analyser</h1>
            <p className="text-2xl mt-4">Upload your resume and get insights</p>
            <ResumeUploadDialog />
        </div>

    )
}

export default page