#!/usr/bin/env node

const util = require('util');
const { exec } = require("child_process");
const execPromise = util.promisify(exec);

const installer = async () => {
  const cmd = 'npm install';
  const pkg = 'DEEPLINK SERVER';
  const msg = {
    init: `${pkg}: Init`,
    install: `${pkg}: Installing...`,
    success: `${pkg}: Install Successful 🔥`,
    fail: `${pkg}: Install Failed 💥`,
  };

  console.log(msg.init, cmd);

  try {
    const { stdout } = await execPromise(cmd);
    console.log(msg.install, `${__dirname}/install`);
    console.log(msg.success, stdout);
  } catch (err) {
    console.log(msg.fail, err);
  }
};


installer();
