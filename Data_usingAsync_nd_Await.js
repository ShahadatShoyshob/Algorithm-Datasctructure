const readline = require('readline');
const https = require('https');

const read_line = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let dictionary = [];

function bubbleSort(vector) {
  var n = vector.length;     //length of an array
  for (var i = 0; i < n-1; i++) {
    for (var j = 0; j < n-i-1; j++) {
      // Here's the comparison that determines whether a swap is needed:
      if (vector[j] > vector[j+1]) {
        // And here's where the swap function would be called:
        var temp = vector[j];
        // Store the value at index j in temp
        vector[j] = vector[j+1];
        // Store the value at index j in temp
        vector[j+1] = temp;
        // Set the value at index j+1 to the original value at index j, which we stored in temp
        // These lines are doing exactly what a swap function would do.
        // they’re swapping the elements at positions j and j+1 in the array.
      }
    }
  }
  return vector;
}


// Wrap the readline.question method in a Promise so it can be used with async/await
function question(prompt) {                   // This function takes a prompt as an argument and returns a Promise.
    return new Promise(resolve => {           // The Promise is resolved when the user provides input in response to the prompt.
      read_line.question(prompt, resolve);
    });
  }
  
  // Wrap the 'data' and 'end' events in a Promise so they can be used with async/await
  function getRhymeNotes() {
    return new Promise((resolve, reject) => {
      let note = '';
      https.get('https://introcs.cs.princeton.edu/java/data/wordlist.txt', (rhyme_notes) => {
        rhyme_notes.on('data', (fill) => {      // The 'data' event is emitted whenever a chunk of data is received.
          note += fill;                         // Append http.get data to 'Let note'.
        });
        rhyme_notes.on('end', () => {           // The 'end' event is emitted when all data has been received.
          resolve(note.split('\n'));            // Split 'note' into an array of words and resolve the Promise with this array. 
        });
        rhyme_notes.on('error', reject);        // The 'error' event is emitted if an error occurs while fetching data.
                                                // If this happens, we reject the Promise with the error.
      });
    });
  }
  
  // Use an async function so we can use await
  async function findRhymes() {
    dictionary = await getRhymeNotes();         // We use 'await' to pause execution of the function until the Promise resolves, then assign the result to 'dictionary'.
    const input = await question('Please enter a word: ');        // We're asking the user to enter a word. The 'question' function also returns a Promise, so we use 'await' again.
    const word_input = input.toLowerCase().replace(/\?$/, '');    // We convert the user's input to lowercase and remove any trailing question mark.
    const last_two_lettersInput = word_input.slice(-2);           // We get the last two letters of the user's input.
    const rhymes = dictionary.filter(words => words.slice(-2) === last_two_lettersInput && words !== word_input);
  // We filter the 'dictionary' array to find words that end with the same two letters as the user's input.
  // The 'filter' method returns a new array with all elements that pass the test implemented by the provided function.

    if (rhymes.length > 0) {              // If we found any rhymes, we sort them using the 'bubbleSort' function and print them.
      console.log(`Rhyme with last 2 words from '${word_input}': ${bubbleSort(rhymes).join(', ')}`);
    } else {
      console.log(`No rhyme words found for ${word_input}`);
    }
  
    read_line.close();            // Finally, we close the readline interface.
  }
  
  findRhymes();                   // We call the 'findRhymes' function.