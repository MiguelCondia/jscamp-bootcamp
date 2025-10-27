document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".job-results-footer");
    const selectTecnologia = document.querySelector("#tecnologia");
    const selectUbicacion = document.querySelector("#ubicacion");
    const selectContrato = document.querySelector("#contrato");
    const selectNivel = document.querySelector("#nivel");

    let jobsData = []

    // Cargar los datos
    fetch("./data.json")
        .then((res) => res.json())
        .then((jobs) => {
        jobsData = jobs;
        renderJobs(jobsData);
    });

    // Función que muestra los empleos
    function renderJobs(jobs) {
        container.innerHTML = "";
        if (jobs.length === 0) {
        container.innerHTML = "<p>No se encontraron empleos con los filtros seleccionados.</p>";
        return;
    }

    jobs.forEach((job) => {
        const article = document.createElement("article");
        article.dataset.modalidad = job.data.modalidad;
        article.dataset.technology = job.data.technology;
        article.dataset.contrato = job.data.contrato
        article.dataset.nivel = job.data.nivel;

    article.innerHTML = `
        <header>
            <div>
                <h3>${job.titulo}</h3>
                <p>${job.empresa} | ${job.ubicacion}</p>
            </div>
            <div>
                <a href="oferta.html">Aplicar</a>
            </div>
            </header>
            <footer>
            <p>${job.descripcion}</p>
            </footer>
        `;
        container.appendChild(article);
        });
    }

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

    renderJobs(filteredJobs);
    }

    // Escuchar cambios en los select
    [selectTecnologia, selectUbicacion, selectContrato, selectNivel].forEach((select) => {
        select.addEventListener("change", applyFilters);
    });
});