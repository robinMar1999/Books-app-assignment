# Rest API for BooksApp

## Technologies Used

1. Node.js
2. Mongoose.js
3. Express.js
4. JsonWebToken
5. Bcryptjs

## Software Requirements

1. Node.js & npm should be installed on system.
2. Nodemon is required to run the _dev_ script.

## Installation

1. Clone this repository.
2. Open the terminal in the repository folder and run the following command:

```
npm install
```

3. To run in developement mode run command:

```
npm run dev
```

4. To run in production mode run command:

```
npm start
```

## Routes available are

### Authentication Routes

1. /auth/register - This is a post route to register users. Request body should contain following: **_name, email, password_**
2. /auth/login - This is post route to login users. Request body should contain following: **_email, password_**
3. /pay - This is a post route to make payment. Request requires **x-auth-token** as header.

## Testing

To test these routes automatically, follow [this](https://www.getpostman.com/collections/098f2dfa12ccfe57dd46) link to get my postman api, run this app and click on run collection in postman.
