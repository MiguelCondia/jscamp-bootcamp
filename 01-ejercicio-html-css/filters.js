import { renderJobs } from "./render-jobs.js";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".job-results-footer");
    const selectTecnologia = document.querySelector("#tecnologia");
    const selectUbicacion = document.querySelector("#ubicacion");
    const selectContrato = document.querySelector("#contrato");
    const selectNivel = document.querySelector("#nivel");

    let jobsData = []

    // Cargar los datos
    fetch("./data.json")
        .then((response) => response.json())
        .then((jobs) => {
            jobsData = jobs;
            renderJobs(container, jobsData);
    });

    // Función de filtrado
    function applyFilters() {
        const tecnologia = selectTecnologia.value;
        const ubicacion = selectUbicacion.value;
        const contrato = selectContrato.value;
        const nivel = selectNivel.value;

        const filteredJobs = jobsData.filter((job) => {
            const matchTecnologia =
                !tecnologia ||
                (Array.isArray(job.data.technology)
                ? job.data.technology.includes(tecnologia)
                : job.data.technology === tecnologia);

            const matchUbicacion =
                !ubicacion ||
                job.data.modalidad === ubicacion ||
                job.ubicacion.includes(ubicacion);

            const matchContrato = 
                !contrato ||
                job.data.contrato === contrato

            const matchNivel = 
                !nivel || 
                job.data.nivel === nivel;

            return matchTecnologia && matchUbicacion && matchContrato && matchNivel;
        });

    renderJobs(container, filteredJobs);
    }

    // Escuchar cambios en los select
    [selectTecnologia, selectUbicacion, selectContrato, selectNivel].forEach((select) => {
        select.addEventListener("change", applyFilters);
    });
    
});