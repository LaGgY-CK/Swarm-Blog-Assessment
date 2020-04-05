// This file is used to convert the .env to Angular's environments.ts file.
// We thus keep data secret and only have to update the server .env file 
// Data is never seen on github/bitbucket commit histories.
// Also this file need to run before any of the Angular-cli cmds are run

import { writeFile } from 'fs';
require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const colors = require('colors');

// `environment.ts` file structure
const envConfigFile = `export const environment = {
  apiBaseUrl: '${process.env.API_BASE_URL}',
  apiUrl:     '${process.env.API_URL}',
  nodeEnv:    '${process.env.NODE_ENV}',
  production: '${process.env.PRODUCTION}',
  squidex_url: '${process.env.SQUIDEX_URL}',
  client_id:  '${process.env.CLIENT_ID}',
  client_secret: '${process.env.CLIENT_SECRET}',
};`;

console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));
writeFile(targetPath, envConfigFile, function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
   }
});


// https://medium.com/@ferie/how-to-pass-environment-variables-at-building-time-in-an-angular-application-using-env-files-4ae1a80383c