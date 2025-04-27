# README / Project Reflection
## Architecture
In this project, I used two types of frontend development. I built the customer-facing site with Express, HTML, and JavaScript. This part was more traditional and used server-rendered pages. Later, I built the admin side using Angular as a single-page application. The SPA made the admin site faster because it could update the screen without reloading the whole page. It made things feel smoother compared to the Express side, which had to reload full pages.

The backend used a NoSQL MongoDB database because it fits well with JavaScript and the way modern web apps handle data. MongoDB stores data in flexible documents instead of rows and tables. This made it easier to adjust the data structure as I built the application without having to redesign the whole database.

## Functionality
JSON is different from JavaScript because it is just a data format. It is structured like JavaScript objects but it does not have functions or methods. JSON is used to pass data between the frontend and backend. When the server sends data to the client, it uses JSON. This makes it easy for Angular and Express to read and work with the data.

I refactored code in a few places to make things work better. One example was moving from hardcoded trip data to using services to pull trip data. This made the code cleaner and easier to update later. Another example was creating reusable components in Angular like the TripCardComponent. Using components helped keep the code organized and made it easier to reuse the same pieces across different parts of the app without rewriting everything.

## Testing
Testing API requests involved making sure GET, POST, PUT, and DELETE endpoints were working correctly. I used Postman to send different types of requests and checked if the responses were what I expected. Once security was added with JWTs, testing got harder because I needed to send a valid token with my requests. If I forgot the token or used an expired one, the server would block access. I learned that security layers mean you have to plan tests carefully and include authorization headers when needed. Each endpoint had to be tested both for success and for failure, like checking what happens if someone tries to update a trip without logging in.

## Reflection
This course helped me a lot toward my professional goals. I learned how to build a full stack application from start to finish. I got real experience with the MEAN stack, which is important for many developer jobs. I learned how to set up servers, build RESTful APIs, connect to databases, and create frontends using Angular. I also learned more about security and why it is important to protect APIs. I feel more confident now in applying for developer roles because I have a real project to show in my portfolio that uses modern tools and frameworks.

