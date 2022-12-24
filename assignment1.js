const fs = require('fs');
const readLine = require('readline');

function writeToFile(filename) {
  // Check if the file already exists
  fs.access(filename, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist, write to it
      fs.writeFile(filename, 'You are awesome', (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`${filename} was saved successfully!`);
      });
    } else {
      // File already exists, ask the user for a new filename
      console.log(`${filename} already exists, please provide a new filename:`);
      const newFilename = readline.question();
      writeToFile(newFilename);
    }
  });
}

function main() {
  // Read the filename from the user
  console.log('Enter a filename:');
  const filename = readline.question();

  // Write to the file
  writeToFile(filename);

  // Save the filename in an array and a separate text file
  fs.readFile('filenames.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const filenames = data.split('\n');
    filenames.push(filename);
    fs.writeFile('filenames.txt', filenames.join('\n'), (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`${filename} was added to the list of filenames.`);
    });
  });
}

main();