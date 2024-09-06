const arrayHere = document.getElementById('arrayHere')

const form = document.getElementById('form')
const leerBtn = document.getElementById('leerBtn')
const respHere = document.getElementById('respHere')

async function createMovie(evt) {
    evt.preventDefault()
    const peliculaTemp = {
        // pelicula_id: evt.target.pelicula_id.value,
        nombre: 'carlos1',
    }
    try {
        const r = await fetch('/movies/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(peliculaTemp)
        })
        const j = await r.json()
        let aux = {...j}

        return aux

    } catch(e) {
        console.log("err on fetch", e)
    }
}

form.addEventListener('click', async (e) => {
    const resp = await createMovie(e)

    if(typeof resp.pelicula_id === 'string') {
        respHere.innerText(`Has creado una película con el Id ${resp.pelicula_id}`)
    }

})


// estimar precio del total de articulos
async function showMovies() {
    try{
        const r = await fetch('/movies/all', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const j = await r.json()
        const temp = {...j}

        let stringTemp = "id: " + temp.pelicula_id + ", nombre: " + temp.nombre + "."

        return stringTemp

    } catch(e) {
        console.log("err on fetch", e)
    }

}

leerBtn.addEventListener('click', async () => {
    const movieTemplate = await showMovies()

    let spanEl = document.createElement("span")
    spanEl.style.display = "grid"
    spanEl.style.paddingBottom = "1rem 5rem 3rem 1rem"
    spanEl.style.margin = "1rem"
    spanEl.style.border = "1px solid #3a3a3a"
    spanEl.style.borderBottom = "2px solid #000"


    spanEl.innerText = movieTemplate

    arrayHere.appendChild(spanEl)

})