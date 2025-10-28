import { renderJobs } from "./render-jobs.js";

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector(".job-results-footer");
    const searchBar = document.querySelector(".form-jobs input");

    let jobsData = []

    fetch("./data.json")
        .then((response) => response.json())
        .then((jobs) => {
            jobsData = jobs;
            renderJobs(container, jobsData);
    });

    function searchBarFilters() {
        const search = searchBar.value.trim().toLowerCase();
        const filteredJobs = jobsData.filter((job) => {
            return job.titulo && job.titulo.toLowerCase().includes(search);
        });
        
    renderJobs(container, filteredJobs)
    };

    searchBar.addEventListener('input', searchBarFilters)
});