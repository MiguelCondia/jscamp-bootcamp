export function renderJobs(container, jobs) {
    container.innerHTML = "";
    if (jobs.length === 0) {
    container.innerHTML = "<p>No se encontraron empleos con los filtros seleccionados.</p>";
    return;
    }      

    jobs.forEach((job) => {
        const article = document.createElement("article");
        article.dataset.modalidad = job.data.modalidad;
        article.dataset.technology = job.data.technology;
        article.dataset.contrato = job.data.contrato;
        article.dataset.nivel = job.data.nivel;
        article.dataset.titulo = job.data.titulo;

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