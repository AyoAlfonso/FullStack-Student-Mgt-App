# Node Student-Course Project Documentation

The project how-to's, style guidelines and best practices for the engineering team.

# Javascript Styles

---

- **2 spaces** – for indentation
- **No unused variables**
- **Use** **semicolons where necessary**
- **Space after keywords** `if (condition) { ... }`
- Always use `===` instead of `==` expect when we do not want the specification to be too strict.

> **NB:** The Async/Await syntax was used to control the flow of concurrent process in a sequential manner all Javascript promises in the program.

# Usage

---

Start this app with the code below. 

    npm install 
    
    npm start || node src/server/app.js

After you've done that you should be able to use the `standard` program. Please check the .env  file in the root folder for setting your environment variables; this file contains sensitive details we use in running this app. 

[Routes](https://www.notion.so/c6b0da5a407147e2b1ce58bb0f43de67)

# Security

---

Recommendations and implementations regarding security, given that React will be used for the Front End ? 

> A User Admin logins through the input login form and send **POST** request to our POST methods on the REST API backend **JWT middleware** is used to authenticate the backend request, validates credentials and returns the JWT token -representing encrypted user details- I store this as **auth_token** in our **res.session**  for a full express app or **localStorage** for a react app.

 Currently for security admin users are only allowed to be logged in for 24 hrs.

    app.use(session({
      secret: 'nodejs-re-master-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false, // key
        maxAge: 24 * 60 * 60 * 1000, //Admin is only allowed to be able to log in at most for a day
      },
    }))

> Our Front-end code will be able to decode the JWT (using `jwt-decode` module), as we know we have saved the token to the **localStorage** of the browser. We can now use it any time we need to render protected pages all we have to do is check the expiration date before we allow the user access to protected pages; like the admin dashboard, admin settings, etc.

**Digication Admin login Page** 

 

![](https://www.notion.so/file/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F39a92d2b-5402-482d-bd5d-012b58108d6f%2FScreenShot2018-06-06at11.31.48AM.png)

The code will be as so: 

    import jwt-decode as jwt
    export function verifySavedAuthSession () {
     const token = localStorage.getItem('auth_token')
     if (token) {
        const decoded = jwt(token)
        const stillValid = decoded.exp > Date.now() ? true : false
        return stillValid;
       }
      return false
    }

We import it on any react component we will be rendering.

    //import verifySavedAuthSession() function
    const authSession = verifySavedAuthSession();
    
    	if (authSession) { store.dispatch(loginUserSuccess(authSession))
    }
    else { 
    	store.dispatch(lognUserFail())
    }

- To control the above we have protected the API Backend admin routes with JSON Web Tokens(JWT) and our protect is as so:

    router.post('/admin/:uid/:facultyid/create',  authController.isLoggedIn, async function (req, res) {
    })

The logic for how this JWTokens work are in the **auth.js** file in the controller folder.

- To make sure if our app breaks on production for whatever reason, code doesn't get shown to users rather we show them a predefined .
- We use env. variables to protect our sensitive data from being pushed to the public
- We use the code below to force the requests into https on production. It is however okay for development.

    app.use('*', function(req,res,next) {
      let status = 302;
      if(req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production') {
        res.redirect(status, 'https://' + req.hostname + req.originalUrl);
        return
      }
      else
        next()
    });

- We also alllow requests to the API from different sources, for example another Angular app in another part of the world making requests to our Student-Course API will be rejected according to the **CORS** standards.

    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    })

- The final security measure is are the keys requirements set in the request headers. Every API request most contain this:

Token ===  **j2udbxkatifno1cs76p2ttcwm30zso** and

Key === **u62414re9owf9q2si0saaon2ebyr7519al**

- Check the **index.js** file in the middleware folder for how this was refactored and implemented

    app.use('/', middleware);
    app.use('/api', apiRoutes);
    app.use('/admin', adminRoutes);
    app.use('/', routes);

# Other Best Practices Implemented

---

**Resources:**

Setting up the public folder to keep CSS & JS resources

    app.use(express.static('public'))

**Database:**

For the database ORM and SQL query builder I continued with Sequelize. It has a shorter learning curve, every developer on the team can easily pick the technology up.  

**For Error Handling:**

I am suggesting that we do not need this module 

⇒ **express-error-handler**

I have refactored the code to have two separate handlers in the for handling errors in production and development environments. Reason is so that development errors can helpfully print stack trace and detailed error information on the app crashing. However, this is **dangerous** on production as sensitive information can be leaked. 

Check the errorHandlers.js file in the controller folder.

    if (app.get('env') === 'development') {
      app.use(errorHandlers.developmentErrors);
    }

For interfaces that wont use the API. There is simple and nice **Digication customized 404 pag**e to handle URL errors 

![](https://www.notion.so/file/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5c3f905e-89f3-4057-bb47-c0bc447e2398%2FScreenShot2018-06-06at11.22.39AM.png)

**Starting the server:**

 We don't need to this line to start our servers like this anymore.

 We don't need to use the createserver directly. Except we want to use https.createserver

    /*We DO NOT need to do this */
    const http = require('http');

We let express determine the best way to start our servers for us this line is very unnecessary. We can however use this *https = require('https')* protocol to communicate with client securely instead of the *http* module. ****

*Setting the server port*

Why do we need a normalise function ? It is not necessary.

It's an extra function (an implicit declaration) where we can explicitly define our function

Explicitly set this in the express app instead of writing extra functions to normalise the value

    app.set('port', (process.env.PORT || 4500));

Also cleaned up the standalone event function to check if the server is on and running. We can initiate a **neater and faster** callback function directly on the Listen method immediately the port is up and running. As so: 

    app.listen(app.get('port'), () => {
      console.log(`Our app is running -→ PORT ${app.get('port')}`)
    });

If you need anymore help. You can create issues in the repo this Readme belongs to.

**Enjoy!**
