import { app } from "../app.js";

import http from "http";

import * as configFunctions from "../helpers/configFns.js";

import debug from "debug";
const debugWWW = debug("2fa-server:www");


const onError = (error: Error) => {

  if (error.syscall !== "listen") {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      debugWWW("Requires elevated privileges");
      process.exit(1);
    // break;

    case "EADDRINUSE":
      debugWWW("Port is already in use.");
      process.exit(1);
    // break;

    default:
      throw error;
  }
};

const onListening = (server: http.Server) => {

  const addr = server.address();

  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port.toString();

  debugWWW("Listening on " + bind);
};


/**
 * Initialize HTTP
 */


const httpPort = configFunctions.getProperty("application.httpPort");

if (httpPort) {

  const httpServer = http.createServer(app);

  httpServer.listen(httpPort);

  httpServer.on("error", onError);
  httpServer.on("listening", function() {
    onListening(httpServer);
  });

  debugWWW("HTTP listening on " + httpPort.toString());
}
