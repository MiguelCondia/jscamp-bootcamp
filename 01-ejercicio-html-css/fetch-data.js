const container = document.querySelector(".job-results-footer")

fetch("./data.json")
    .then((response) => {
        return response.json()
    })
    .then((jobs) => {
        jobs.forEach(job => {
            const article = document.createElement('article')
            article.dataset.modalidad = job.data.modalidad
            article.dataset.technology = job.data.technology
            article.dataset.nivel = job.data.nivel

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
            `
            container.appendChild(article)
        })
    })