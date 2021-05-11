import createError from "http-errors";
import express from "express";

import { abuseCheck } from "@cityssm/express-abuse-points";
import compression from "compression";
import path from "path";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import rateLimit from "express-rate-limit";

import session from "express-session";
import sqlite from "connect-sqlite3";

import * as configFns from "./helpers/configFns.js";

import routerLogin from "./routes/login.js";
import routerManage from "./routes/manage.js";

import debug from "debug";
const debugApp = debug("2fa-server:app");


const __dirname = ".";


/*
 * INITIALIZE APP
 */


export const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(abuseCheck({
  byIP: true
}));

app.use(compression());

app.use((req, _res, next) => {
  debugApp(req.method + " " + req.url);
  next();
});

app.use(express.json());

app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(csurf({ cookie: true }));


/*
 * Rate Limiter
 */

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1000
});

app.use(limiter);


/*
 * STATIC ROUTES
 */


app.use(express.static(path.join(__dirname, "public")));

app.use("/lib/bulma-webapp-js",
  express.static(path.join(__dirname, "node_modules", "@cityssm", "bulma-webapp-js", "dist")));

app.use("/lib/fa5",
  express.static(path.join(__dirname, "node_modules", "@fortawesome", "fontawesome-free")));


/*
 * SESSION MANAGEMENT
 */


const SQLiteStore = sqlite(session);


const sessionCookieName = configFns.getProperty("session.cookieName");


// Initialize session
app.use(session({
  store: new SQLiteStore({
    dir: "data",
    db: "sessions.db"
  }),
  name: sessionCookieName,
  secret: configFns.getProperty("session.secret"),
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: configFns.getProperty("session.maxAgeMillis"),
    sameSite: "strict"
  }
}));

// Clear cookie if no corresponding session
app.use((req, res, next) => {

  if (req.cookies[sessionCookieName] && !req.session.user) {
    res.clearCookie(sessionCookieName);
  }

  next();
});

// Redirect logged in users
const sessionChecker = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  if (req.session.user && req.cookies[sessionCookieName]) {
    return next();
  }

  return res.redirect("/login");
};


/*
 * ROUTES
 */


// Make config objects available to the templates
app.use(function(req, res, next) {
  res.locals.configFns = configFns;
  res.locals.user = req.session.user;
  res.locals.csrfToken = req.csrfToken();
  next();
});


app.get("/", sessionChecker, (_req, res) => {
  res.redirect("/manage");
});

app.use("/login", routerLogin);

app.get("/logout", (req, res) => {

  if (req.session.user && req.cookies[sessionCookieName]) {

    req.session.destroy(null);
    req.session = null;
    res.clearCookie(sessionCookieName);

  }

  res.redirect("/login");
});

app.use("/manage", sessionChecker, routerManage);


// Catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  next(createError(404));
});


// Error handler
app.use(function(err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) {

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");

});


export default app;
