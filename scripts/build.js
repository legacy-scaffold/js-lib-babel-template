const path = require("path");
const spawn = require("cross-spawn");


spawn.sync("babel", [
  path.resolve(__dirname, "../src/"),
  "--out-dir",
  path.resolve(__dirname, "../dist/")
]);