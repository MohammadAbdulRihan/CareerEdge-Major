"use server";

import axios from "axios";

export async function getJobs() {

    const options = {
        method: 'GET',
        url: 'https://jobdataapi.com/api/jobs/?country_code=IN&max_age=30'
    };

    try {
        const { data } = await axios.request(options);
        return data.results;

    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw new Error("Failed to fetch jobs");
    }
}