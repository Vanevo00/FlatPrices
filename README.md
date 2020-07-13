# FLAT_PRICES
This application scrapes some of the largest real estate websites in the Czech Republic and analyses the prices of flats. Its primary focus to find flats in selected cities or neighbourhoods that are suitable for renting.

The application does not have its own domain but its live version is available at http://161.35.23.18:3999/. Please note that it is running on a $5 cloud setup and since the scraper (which is running automatically at certain times) requires a lot of memory, it often crashes and stops sraping. I try to check the app at least once a day and reset if necessary, but the flat data may be outdated because of this.

### Notes
- This is an internal application that is not optimised for mobile devices.
- Although Styled Components is used throughout the application, I am not a coder and my primary focus is not the visual design of the page but rather the functionality. Thus, I am sure you can find a lot of design flaws and css glitches.
- One of the main goals of this application was for me to learn new technologies and programming concepts. Because of this, you can find a lot of inconsistencies and mistakes in the code (e.g. component reusability, db design). I did some refactoring here and there but I am aware that it is far from perfect.

### Tech Stack
This is a TypeScript [__MERN stack application__](https://wikitia.com/index.php?title=MERN_(solution_stack)&mobileaction=toggle_view_desktop). Other important technologies used include __Docker__ for containerizing the application, __Mongoose__ as ODM, __Nextjs__ for server side rendered React, __Cheerio__ and __Puppeteer__ for web scraping.

## Local

```bash
git clone https://github.com/Vanevo00/FlatPrices.git
cd FlatPrices
npm i
cd client && npm i
```
To connect to a cloud MongoDB, you can either create your own, or just use my testing db  (contains very limited amount of data and is not regularly updated). Feel free to do whatever you want with the db. If you want to use admin features, feel free to use the admin account (login: admin, password: password).

To use the testing db, run:
```bash
cd ..
mv config/testing.json config/default.json
```
after setting up the db, run the application:
```bash
npm run start:watch
```
the application is now available at http://localhost:3999


## Production

```bash
docker-compose up
```
db setup is necessary beforehand (see Local)
