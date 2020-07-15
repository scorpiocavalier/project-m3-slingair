const flightSelect 	= document.getElementById('flight')
const showSeatsBtn 	= document.getElementById('show-seats')
const seatsDiv 			= document.getElementById('seats-section')
const confirmButton = document.getElementById('confirm-button')
// const { flights } 	= require("./test-data/flightSeating")

let selection = ''

const renderSeats = () => {
	document.querySelector('.form-container').style.display = 'block'

	const alpha = ['A', 'B', 'C', 'D', 'E', 'F']
	// const flight = flights.SA231	// hardcoded
	// console.log(flights)

	for (let r = 1; r <= 10; r++) {
		const row = document.createElement('ol')
		row.classList.add('row')
		seatsDiv.appendChild(row)
		for (let s = 0; s <= 5; s++) {
			const seatNumber = `${r}${alpha[s]}`
			const seat = document.createElement('li')

			// Two types of seats to render
			const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`
			const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`

			// const seatObj = flight.filter(seat => seatNumber === seat.id)
			// seat.innerHTML = seatObj.isAvailable ? seatAvailable : seatOccupied
			seat.innerHTML = seatAvailable
			row.appendChild(seat)
		}
	}

	let seatMap = document.forms['seats'].elements['seat']
	seatMap.forEach(seat => {
		seat.onclick = () => {
			selection = seat.value
			seatMap.forEach(x => {
				if (x.value !== seat.value) {
					document.getElementById(x.value).classList.remove('selected')
				}
			})
			document.getElementById(seat.value).classList.add('selected')
			document.getElementById('seat-number').innerText = `(${selection})`
			confirmButton.disabled = false
		}
	})
}

const selectOption = event => {
	showSeatsBtn.hidden = false
}

const showFormContent = event => {
	const option = flightSelect.options[flightSelect.selectedIndex]
	const flightNumber = option.value
	fetch(`/flights/${flightNumber}`)
		.then(res => res.json())
		.then(data => console.log(data))
	// TODO: contact the server to get the seating availability
	//      - only contact the server if the flight number is this format 'SA###'.
	//      - Do I need to create an error message if the number is not valid?

	// TODO: Pass the response data to renderSeats to create the appropriate seat-type.
	renderSeats()
}

const handleConfirmSeat = event => {
	event.preventDefault()
	// TODO: everything in here!
	fetch('/users', {
		method: 'POST',
		body: JSON.stringify({
			'givenName': document.getElementById('givenName').value
		}),
		headers: {
			'Accept': 'application/json',
			"Content-Type": "application/json"
		}
	})
}

flightSelect.addEventListener('change', selectOption)
showSeatsBtn.addEventListener('click', showFormContent)