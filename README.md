# Rhyme Finder (Node.js CLI) — Async/Await + Bubble Sort

A simple command-line program written in Node.js that:
1. Downloads a word list from the web,
2. Prompts the user to enter a word,
3. Finds “rhyming” words by matching the last 2 letters,
4. Sorts the results using Bubble Sort,
5. Prints the rhymes in ascending (alphabetical) order.

## How it works

- The program fetches a dictionary from:
  https://introcs.cs.princeton.edu/java/data/wordlist.txt
- It takes user input, normalizes it (lowercase, removes a trailing `?`)
- Extracts the last two characters
- Filters the dictionary for words ending in the same two characters (excluding the original word)
- Sorts the rhymes using Bubble Sort
- Outputs the results, then exits

## Requirements

- Node.js v14+ (recommended: v18+)
- Internet connection (the dictionary is fetched online)

## Run the project

### Option A: Async/Await version (recommended)
node Data_usingAsync_nd_Await.js

### Option B: Original version
node Data_original.js

Then type a word when prompted:
Please enter a word: time

## Files in this repository

- Data_usingAsync_nd_Await.js
  Uses Promises + async/await to handle:
  - user input (readline.question)
  - network data streaming (https.get)

- Data_original.js
  A similar implementation with the same overall behaviour.

## Key concepts demonstrated

- Node.js standard modules: https, readline
- Asynchronous programming with Promises and async/await
- Streaming data using data and end events
- Array filtering (filter)
- Manual sorting algorithm: Bubble Sort

## Notes / Limitations

- This is not true phonetic rhyming. It matches only the last two letters, so it’s a simplified rhyme approximation.
- If the user enters a 1-letter word, “last 2 letters” will just be whatever exists (JavaScript slicing still works, but the matching is less meaningful).
- The output depends on the online word list availability and your connection.

## Possible improvements (optional)

- Let the user choose how many ending letters to match (2, 3, 4…)
- Use a faster sort (e.g., JavaScript .sort() or Merge Sort) and compare performance
- Cache the downloaded dictionary locally to avoid re-downloading every run
- Add basic input validation and better error handling (e.g., network failure)
