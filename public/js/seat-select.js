const flightSelect 	= document.getElementById('flight')
const showSeatsBtn 	= document.getElementById('show-seats')

let flightNumber, seatNumber

const renderSeats = flight => {
	document.querySelector('.form-container').style.display = 'block'
	const letters = ['A', 'B', 'C', 'D', 'E', 'F']
	const rows = 10

	for (let r = 0; r < rows; r++) {
		const row = document.createElement('ol')
		row.classList.add('row')

		letters.forEach((letter, index) => {
			const seatNumber = `${r+1}${letter}`
			const seat = document.createElement('li')

			const seatOccupied 	= `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`
			const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`

			const seatIndex = r * 6 + index
			const currentSeat = flight[seatIndex]
			seat.innerHTML = currentSeat.isAvailable ? seatAvailable : seatOccupied
			row.appendChild(seat)
		})

		document.getElementById('seats-section').appendChild(row)
	}

	let seatMap = document.forms['seats'].elements['seat']
	seatMap.forEach(seat => {
		seat.onclick = () => {
			seatNumber = seat.value
			seatMap.forEach(x => {
				if (x.value !== seat.value)
					document.getElementById(x.value).classList.remove('selected')
			})
			document.getElementById(seat.value).classList.add('selected')
			document.getElementById('seat-number').innerText = ` (${seatNumber})`
			document.getElementById('confirm-button').disabled = false
		}
	})
}

const showFormContent = async event => {
	const selectedOption 	= flightSelect.options[flightSelect.selectedIndex]
	flightNumber 					= selectedOption.value

	try {
		const res 		= await fetch(`/flights/${flightNumber}`)
		const flight 	= await res.json()
		renderSeats(flight)
	} catch { console.log("Invalid flight.") }
}

const handleConfirmSeat = async event => {
	event.preventDefault()

	let newReservation = {
		givenName: 	document.getElementById('givenName').value,
		surname: 		document.getElementById('surname').value,
		email: 			document.getElementById('email').value,
		flight:			flightNumber,
		seat:				seatNumber
	}

	newReservation = await fetch('/flights/seat-select', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			"Content-Type": "application/json"
		},
		body: JSON.stringify(newReservation)
	})

	window.location.replace('/flights/confirmed')
}

// const showConfirmationPage = async reservation => {
// 	const { flight, seat, givenName, surname, email } = reservation
// 	const query = `/confirmed?flight=${flight}&seat=${seat}&givenName=${givenName}&surname=${surname}&email=${email}`
// 	try {
// 		const res		= await fetch(query)
// 		const data	= await res.json()
// 		console.log(data)
// 	} catch { console.log("Invalid confirmation.") }
// }

flightSelect.addEventListener('change', event => showSeatsBtn.hidden = false)
showSeatsBtn.addEventListener('click', showFormContent)