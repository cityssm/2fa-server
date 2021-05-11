import * as path from "path";
const __dirname = ".";
export const serviceConfig = {
    name: "Two-Factor Authentication Manager",
    description: "A server for initializing two-factor authentication on user accounts.",
    script: path.join(__dirname, "bin", "www.js")
};
