const flightSelect 	= document.getElementById('flight')
const showSeatsBtn 	= document.getElementById('show-seats')
const seatsDiv 			= document.getElementById('seats-section')
const confirmButton = document.getElementById('confirm-button')

let flightNumber, seatNumber

const renderSeats = flight => {
	document.querySelector('.form-container').style.display = 'block'

	const letters = ['A', 'B', 'C', 'D', 'E', 'F']
	const rows = 10

	for (let r = 0; r < rows; r++) {
		const row = document.createElement('ol')
		row.classList.add('row')
		seatsDiv.appendChild(row)

		letters.forEach((letter, index) => {
			const seatNumber = `${r+1}${letter}`
			const seat = document.createElement('li')

			const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`
			const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`

			const seatIndex = r * 6 + index
			const currentSeat = flight[seatIndex]
			seat.innerHTML = currentSeat.isAvailable ? seatAvailable : seatOccupied
			row.appendChild(seat)
		})
	}

	let seatMap = document.forms['seats'].elements['seat']
	seatMap.forEach(seat => {
		seat.onclick = () => {
			seatNumber = seat.value
			seatMap.forEach(x => {
				if (x.value !== seat.value) {
					document.getElementById(x.value).classList.remove('selected')
				}
			})
			document.getElementById(seat.value).classList.add('selected')
			document.getElementById('seat-number').innerText = ` (${seatNumber})`
			confirmButton.disabled = false
		}
	})
}

const showFormContent = async event => {
	const option 	= flightSelect.options[flightSelect.selectedIndex]
	flightNumber 	= option.value

	try {
		const res 		= await fetch(`/flights/${flightNumber}`)
		const flight 	= await res.json()
		renderSeats(flight)
	} catch { console.log("Invalid flight.") }
}

const handleConfirmSeat = async event => {
	event.preventDefault()

	const givenName = document.getElementById('givenName').value
	const surname 	= document.getElementById('surname').value
	const email 		= document.getElementById('email').value
	const flight		= flightNumber
	const seat			= seatNumber

	let newReservation = { givenName, surname, email, flight, seat }

	let res = await fetch('/seat-select', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			"Content-Type": "application/json"
		},
		body: JSON.stringify(newReservation)
	})

	newReservation = await res.json()
	console.log(newReservation)
}

flightSelect.addEventListener('change', event => {
	showSeatsBtn.hidden = false
})
showSeatsBtn.addEventListener('click', showFormContent)
confirmButton.addEventListener('submit', handleConfirmSeat)