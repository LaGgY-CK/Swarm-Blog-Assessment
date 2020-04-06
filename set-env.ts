// This file is used to convert the .env to Angular's environments.ts file.
// We thus keep data secret and only have to update the server .env file 
// Data is never seen on github/bitbucket commit histories.
// Also this file need to run before any of the Angular-cli cmds are run

import { writeFile } from 'fs';
require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const targetPath1 = './src/environments/environment.prod.ts';
const colors = require('colors');

// `environment.ts` file structure
const envConfigFile = `export const environment = {
  squidex_url: '${process.env.SQUIDEX_URL}',
  client_id:  '${process.env.CLIENT_ID}',
  client_secret: '${process.env.CLIENT_SECRET}',
};`;

console.log(colors.magenta('The file `environment.ts` & `environment.prod.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
  }
});
writeFile(targetPath1, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(colors.magenta(`Angular environment.prod.ts file generated correctly at ${targetPath1} \n`));
  }
});


// https://medium.com/@ferie/how-to-pass-environment-variables-at-building-time-in-an-angular-application-using-env-files-4ae1a80383c