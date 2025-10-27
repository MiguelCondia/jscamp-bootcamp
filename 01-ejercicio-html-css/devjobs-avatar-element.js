class DevJobsAvatar extends HTMLElement {
    constructor() {
        super() // Llamar al constructor de HTMLElement

        this.attachShadow({ mode: 'open' })
    }

    createUrl(service, username) {
        return `https://unavatar.io/${service}/${username}`
    }

    render() {
        const service = this.getAttribute('service')
        const username = this.getAttribute('username')

        const url = this.createUrl(service, username)

        this.shadowRoot.innerHTML = `
        <style>
            img {
                width: 2.5rem;
                transform: translate(0, 10%);
                border-radius: 100%;
            }
        </style>
        <img src="${url}" />
        `
    }

    connectedCallback() {
        this.render()
    }
}

customElements.define('dev-jobs-avatar', DevJobsAvatar)