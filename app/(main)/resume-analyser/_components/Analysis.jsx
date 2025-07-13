const Analysis = ({ data }) => {
    console.log(data);

    const getTextCol = (score) => {
        score = parseInt(score, 10);
        if (score >= 80) return "text-green-500";
        else if (score >= 61) return "text-yellow-500";
        else return "text-red-500";
    }

    const borderCol = (score) => {
        score = parseInt(score, 10);
        if (score >= 80) return "border-green-200";
        else if (score >= 61) return "border-yellow-200";
        else return "border-red-200";
    }

    const bgCol = (score) => {
        score = parseInt(score, 10);
        if (score >= 80) return "bg-green-500";
        else if (score >= 61) return "bg-yellow-500";
        else return "bg-red-500";
    }

    return (
        <div>
            <h1 className='gradient-title text-3xl md:text-5xl text-center mt-8'>Report</h1>
            <div className="no-scrollbar flex-shrink-0 border-r border-gray-200 overflow-y-auto pt-6 px-6 bg-background">
                <div className="bg-background rounded-lg shadow-md p-6 mb-6 border border-blue-200 transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">
                    <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
                        <i className="fas fa-star text-yellow-500 mr-2"></i> Overall Score
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-6xl font-extrabold text-blue-600">
                            {data.overall_score}<span className="text-2xl">/100</span>
                        </span>
                        <div className="flex items-center">
                            <i className="fas fa-arrow-up text-green-500 text-lg mr-2"></i>
                            <span className={` ${getTextCol(data.overall_score)} text-lg font-bold`}>
                                {data.overall_feedback}
                            </span>
                        </div>
                    </div>

                    <span className="text-gray-200 text-sm">{data.summary_comment}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className={`bg-background rounded-lg shadow-md p-5 border ${borderCol(data.sections.contact_info.score)} relative overflow-hidden group`}>
                        <h4 className="text-lg font-semibold text-gray-700 mb-3">
                            <i className="fas fa-user-circle text-gray-500 mr-2"></i> Contact Info
                        </h4>
                        <span className="text-4xl font-bold highlight-text">{data.sections.contact_info.score}</span>
                        <span className="text-sm text-gray-600 mt-2 block">{data.sections.contact_info.comment}</span>
                        <div className={`absolute inset-x-0 bottom-0 h-1 ${bgCol(data.sections.contact_info.score)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    </div>

                    <div className={`bg-background rounded-lg shadow-md p-5 border ${borderCol(data.sections.experience.score)} relative overflow-hidden group`}>
                        <h4 className="text-lg font-semibold text-gray-700 mb-3">
                            <i className="fas fa-briefcase text-gray-500 mr-2"></i> Experience
                        </h4>
                        <span className="text-4xl font-bold highlight-text">{data.sections.experience.score}</span>
                        <span className="text-sm text-gray-600 mt-2 block">{data.sections.experience.comment}</span>
                        <div className={`absolute inset-x-0 bottom-0 h-1 ${bgCol(data.sections.experience.score)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    </div>

                    <div className={`bg-background rounded-lg shadow-md p-5 border ${borderCol(data.sections.education.score)} relative overflow-hidden group`}>
                        <h4 className="text-lg font-semibold text-gray-700 mb-3">
                            <i className="fas fa-graduation-cap text-gray-500 mr-2"></i> Education
                        </h4>
                        <span className="text-4xl font-bold warning-text">{data.sections.education.score}</span>
                        <span className="text-sm text-gray-600 mt-2 block">{data.sections.education.comment}</span>
                        <div className={`absolute inset-x-0 bottom-0 h-1 ${bgCol(data.sections.education.score)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    </div>

                    <div className={`bg-background rounded-lg shadow-md p-5 border ${borderCol(data.sections.skills.score)} relative overflow-hidden group`}>
                        <h4 className="text-lg font-semibold text-gray-700 mb-3">
                            <i className="fas fa-lightbulb text-gray-500 mr-2"></i> Skills
                        </h4>
                        <span className="text-4xl font-bold danger-text">{data.sections.skills.score}</span>
                        <span className="text-sm text-gray-600 mt-2 block">{data.sections.skills.comment}</span>
                        <div className={`absolute inset-x-0 bottom-0 h-1 ${bgCol(data.sections.skills.score)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    </div>
                </div>

                <div className="bg-background rounded-lg shadow-md p-6 mb-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
                        <i className="fas fa-lightbulb text-orange-400 mr-2"></i> Tips for Improvement
                    </h3>
                    <ol className="list-none space-y-4">
                        {data.tips_for_improvement.map((tip, index) => (
                            <li className="flex items-start" key={index}>
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                                    <i className="fas fa-check"></i>
                                </span>
                                <div>
                                    <span className="font-semibold text-gray-200 block">{tip}</span>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-background rounded-lg shadow-md p-5 border border-green-200">
                        <h3 className="text-lg font-bold text-gray-200 mb-3 flex items-center">
                            <i className="fas fa-hand-thumbs-up text-green-500 mr-2"></i> What's Good
                        </h3>
                        <ul className="list-disc list-inside text-gray-200 text-sm space-y-2">
                            {data.whats_good.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-background rounded-lg shadow-md p-5 border border-red-200">
                        <h3 className="text-lg font-bold text-gray-200 mb-3 flex items-center">
                            <i className="fas fa-hand-thumbs-down text-red-500 mr-2"></i> Needs Improvement
                        </h3>
                        <ul className="list-disc list-inside text-gray-200 text-sm space-y-2">
                            {data.needs_improvement.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analysis;
