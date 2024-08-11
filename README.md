"# WagonBank" 

![](pictures/banner.png)

<p align="center">
<img src="https://img.shields.io/badge/License-MIT-yellow.svg"></img>
</p>
<p align="center">
Where has the <b>fun</b> in banking <i>gone</i>? I have missed themed banks and I have decided to create one. 
</p>
<p align="center">
WagonBank is a Jojo themed bank that allows you to create an account, deposit money, withdraw money, create a credit card, transact with the card, check your balance.
</p>

<h3>All jokes aside</h3>

I wanted to make this to raise aware that people should do their own due dillegence when it comes to banking. WagonBank can advertise being FDIC insured, but it's our banking partners that are FDIC insured, <b>not us.</b> (<i>which we can write in the fineprint, but will you read it?</i>)
</p>

## Installation
0. Make sure you have a Marqeta account setup [here](https://app.marqeta.com/development)
1. clone the repo
2. run `npm install`
3. create a `.env` file and add the following:
```
API_URL=YOUR MARQETA API URL
API_KEY=YOUR MARQETA API KEY
API_SECRET=YOUR MARQETA API SECRET
BACKEND_URL=YOUR BACKEND URL
PROGRAM_TOKEN=YOUR PROGRAM TOKEN
CARD_PRODUCT_TOKEN=YOUR CARD PRODUCT TOKEN
```
4. in the config.tsx file located in frontend/components/data, change this code
```
export const BACKEND_URL = "your backend url";
```
5. you can either build the project or for debugging/developing you can use `npm run dev` to start the frontend and use `nodemon` to start the backend


## Screenshots

![Home Page](pictures/homepage.png)

[Sign Up Page](pictures/signup_page.png)

[Dashboard Page](pictures/dashboard.png)



## How does WagonBank actually Work?
Here is a simple flow of how WagonBank works:

Marqeta  <->  Backend (Express.js) <->  Frontend (Next.js + React) <-> User

Marqeta does the real financial heavylifting

The backend just acts as a middleman between Marqeta and the frontend, while also polishing up some of the data before sending it to the frontend or to Marqeta

The Frontend is what the user interacts with, it sends requests to the backend and displays the data to the user

## Contributing :sparkles:
If you would like to contribute to this project, feel free to fork the project and make a pull request. I will review it and merge it if it fits the project.

1. Fork it (https://github.com/KTK27YT/WagonBank/fork)
2. Create your feature branch ```git checkout -b feature/CoolNewFeature```
3. Commit your changes ```git commit -am 'Add some CoolNewFeature'```
4. Push to the branch ```git push origin feature/CoolNewFeature```
5. Create a new Pull Request


## Support :star2:
if you would like to support this project, just give it a star on [Github](https://github.com/KTK27YT/WagonBank). It would mean a lot to me.