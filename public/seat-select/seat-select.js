const flightSelect 	= document.getElementById('flight')
const showSeatsBtn 	= document.getElementById('show-seats')
const seatsDiv 			= document.getElementById('seats-section')
const confirmButton = document.getElementById('confirm-button')

let selection = ''

const renderSeats = flight => {
	document.querySelector('.form-container').style.display = 'block'

	const letters = ['A', 'B', 'C', 'D', 'E', 'F']
	const rows = 10

	for (let r = 1; r <= rows; r++) {
		const row = document.createElement('ol')
		row.classList.add('row')
		seatsDiv.appendChild(row)
		
		letters.forEach(letter => {
			const seatNumber = `${ r + letter }`
			let seat = document.createElement('li')
			
			// Two types of seats to render
			const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`
			const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`
			
			const seatObj = flight.filter(flightSeat => seatNumber === flightSeat.id)[0]
			seat.innerHTML = seatObj.isAvailable ? seatAvailable : seatOccupied
			row.appendChild(seat)
		})
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
			document.getElementById('seat-number').innerText = ` (${selection})`
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
	const pattern = /SA\d{3}/i

	if(flightNumber.match(pattern)) {
		fetch(`/flights/${flightNumber}`)
		.then(res => res.json())
		.then(flights => renderSeats(flights[flightNumber]))
	} else console.log("Invalid flight.")
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