# SlingAir Contract

## Frontend Development

- Implement HTML/CSS for the app.
- Use JS to render the seats based on the data, as provided by the BE.
  - If a seat is marked as `isAvailable: false`, it shouldn't be selectable.
  - I have the barebones of this setup already. Just need to pipe in the test-data and hope it doesn't break!

### Web Pages

Different FE pages that need to be created or have already been created. _I used the public folder to render these pages, but feel free to refactor all of my work into `EJS` if you like._

1. `/seat-select` - Where users select their seats from a ui and enter their info.
2. `/confirmed` - Upon successful submission, the user is sent to this page.
3. `/view-reservation` - Where users can view their reservation. _They didn't even provide me with a proper design. They want me to do it!_ **This is definitely a stretch goal!**
4. `/admin` - _There is now some talk of adding an admin page that would allow the chief to see all of the reservations for a selected flight._

**WTF?!** This is not what I signed up for.

## Backend (Middleware) Development

I have also been tasked with developing the Node server that will connect with the FE to the database.

This middleware should have all the requisite endpoints and accept requests from the FE.

I am sorry that I can't provide much more than that.

## I Quit

If you're my replacement, please consider getting the hell out of Dodge ASAP. I get that you probably can't. I wouldn't be surprised if they locked you in before showing you all of the project details... Before totally losing it, I had the time to create most of the FE pages, but there is no functionality yet. I didn't even have a chance to start on the Backend.

And this is where I would recommend you start.

Get the server working. It should communicate with database server, but I am told that their backend dev just up and quit as well. They have someone else, but the database is not ready yet! You can use the mock data that I provided to build out and test your BE/FE.

# Stretch Goal - Communicate with a database server

What follows is what information that I have been given related to the backend (database).

## Backend / Database

If you reach this point and still have time left, you can augment your server and connect it to the official Slingair API.

Speak with Scott for access to the documentation.

Going this route, means that your BE will connect with the SlingAir BE for all flight and reservation data. You will no longer need the static data file.
