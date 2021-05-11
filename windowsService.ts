import * as path from "path";
import type { ServiceConfig } from "node-windows";


const __dirname = ".";

export const serviceConfig: ServiceConfig = {
  name: "Two-Factor Authentication Manager",
  description: "A server for initializing two-factor authentication on user accounts.",
  script: path.join(__dirname, "bin", "www.js")
};
