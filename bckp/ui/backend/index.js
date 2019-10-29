const express = require('express')

// creating an express instance
const app = express()
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
//const passport = require('passport')

// getting the local authentication type
//const LocalStrategy = require('passport-local').Strategy

const querystring = require('querystring')
const http = require('http')

const SDKHOST = process.env.SDKHOST_IP
//const SDKHOST = "192.168.0.24"
//preproduction
//const SDKHOST = "172.16.106.177"
//const SDKURL = "http://192.168.0.26:3000"

const APP_ID = "00001";

app.use(bodyParser.json())

app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

//app.use(passport.initialize());

//app.use(passport.session());

/*
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
*/
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Max-Age', '86400');
  next();
});

app.options('*', function (req, res) {
  res.sendStatus(200);
});

app.post("/api/pay", (req, res, next) => {
//app.post("/api/pay", authMiddleware, (req, res, next) => {
  console.log(req);
  //console.log("login user:" + req.user);
  //console.log("login user:" + req.user.name);
  console.log("storeid:" + req.body.storeid);
  console.log("amount:" + req.body.amount);
  console.log("username:" + req.body.username);
  console.log("called pay api");

  const postData = JSON.stringify({
    //   const postData = querystring.stringify({
    'payer': req.body.username,
    'payee': req.body.storeid,
    'amount': req.body.amount,
    'appId': APP_ID,
    'comment': 'store.'
  });

  //console.log("-------------------");
  //console.log(SDKHOST);

  var options = {
    host: SDKHOST,
    port: 3000,
    path: '/api/v1/hpoint.pay',
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  };

  const httpreq = http.request(options, function (res0) {
    //console.log('STATUS: ' + res0.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res0.headers));
    res0.setEncoding('utf8');
    res0.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
    res0.on('end', function () {
      console.log("end");
    
      res.send("called");
    });
  });

  httpreq.write(postData);
  httpreq.end();

  /*
  res.send("called");
  */
});



/*
passport.use(
  new LocalStrategy(
    {
      usernameField: "name",
//      usernameField: "email",
      passwordField: "password"
    },

    (username, password, done) => {
      let user = users.find((user) => {
        return user.name === username && user.password === password
//        return user.email === username && user.password === password
      })

      if (user) {
        done(null, user)
      } else {
        done(null, false, { message: 'Incorrect username or password' })
      }
    }
  )
)


passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  let user = users.find((user) => {
    return user.id === id
  })

  done(null, user)
})
*/
app.listen(3000, () => {
  console.log("Example app listening on port 3000")
})


