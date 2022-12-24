const fs = require('fs');
const yargs = require('yargs');

// Define the command-line options and arguments
const argv = yargs
  .option('n', {
    alias: 'name',
    describe: 'The new name for the file',
    type: 'string',
  })

  .demandOption(['n'])
  .argv;

// Save the new name in a separate file
fs.writeFile('fileNames.txt', argv.name + '\n', { flag: 'a' }, (err) => {
 
 
  fs.access(argv.name, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist, write to it
      fs.writeFile(argv.name, 'You are awesome', (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`${argv.name} was saved successfully!`);
      });
    } else {
      // File already exists, ask the user for a new filename
      console.log(`${argv.name} already exists, please provide a new filename:`);
      // const newFilename = readline.question();
      // writeToFile(newFilename);
    }
  });

  console.log(`${argv.name} was added to the list of new names.`);
});

