const partyList = document.querySelector("#partyList")
const partyForm = document.querySelector('#partyForm')

let parties = []

const render = () => {
    const events = parties.map((event, idx) => {
        console.log(event)
        return `
            <li>
                <h3>${event.name}<h3>
                <p>Description: ${event.description} </p>
                <p>Location: ${event.location}</p>
                <p>Date: ${event.date}</p>
                <button class="deleteButton" name=${idx} id=${event.id}>Delete</button>
            </li>
        `
    })
    partyList.innerHTML = events.join("")
}

const fetchParties = async () => {
    try {
        const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-pm/events")
  
        const data = await response.json()
        
        parties = data.data
        //console.log(parties)
        render()
    } catch (error) {
        console.error(error)
    }
}
fetchParties()

partyForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const name = event.target.name.value
    const description = event.target.description.value
    const location = event.target.location.value
    const date = new Date(event.target.date.value)

    const newParty = {
        name,
        description,
        location,
        date
    }

    try {
        const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-pm/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newParty)
        })
        
        const data = await response.json()
        //console.log(data.data)
        parties.push(data.data)
        render()
    } catch (error) {
        console.error(error)
    }
})

partyList.addEventListener("click", async (event) => {
    
    if(event.target.classList.contains("deleteButton")){
        const partyId = event.target.id
        console.log(event.target)
        try {
            const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-pm/events/${partyId}`, {
                method: "DELETE"
            })
            console.log(response)
            parties.splice(event.target.name, 1)
            render()
        } catch (error) {
            console.error(error)
        }
    }
})