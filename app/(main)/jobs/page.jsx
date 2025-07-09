import { getJobs } from "@/actions/jobs";
import Link from "next/link";

export default async function JobsPage() {

    const jobs = await getJobs();

    return (
        <div>
            <h1 className="text-6xl font-bold gradient-title">Job Postings</h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <div key={job.id} className="border p-4 rounded-lg">
                        <h2 className="text-xl font-semibold">{job.title}</h2>
                        <p className="text-gray-600">{job.company.name}</p>
                        <p className="text-gray-500">{job.cities.name}</p>
                        <p className="text-gray-500">{job.published}</p>
                        <Link href={job.application_url} className="text-blue-500 hover:underline mt-4 inline-block">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}