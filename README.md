## Instalation Instructions

1. Clone the repo locally
2. Navigate to the root folder and execute **npm install**
3. Go to ./public and execute: **npm install**. This will install all the frontend dependancies.
4. Navigate to the root folder and execute: **node app**
5. Open your browser and navigate to: http://localhost:8081

## How to play?

Bulls and Cows is a turn-based logic game. The player's goal is to guess a four-digit number within predifined number of attempts. On each attempt the player is reported how many bulls and cows he has. A bull means that the user guessed a digit (from the secret number) on a correct position. A cow means the user guessed a digit on incorrect possition. The goal is to be reported with four bulls.

**Example**

secret number: 1234
guess number: 5243 (2 is a bull, 4 and 3 are cows)

There are four playing modes:

**Human Vs Computer**

The server generates a number. The player should guess the number within 10 attempts.

**Computer Vs Computer**

The server generates a number. A *bot* player should guess the number within 10 attempts. This mode is automatic and does not require human interaction.

**Multiplayer**

The server generates a number. A group of human players and optionally bot players should guess it within 10 attepmts.

**Peer 2 Peer**

A human player A thinks of a number. A human player B thinks of a number. Player A tries to guess the number of player B and player B tries to guess the number of player A. The winner is whoever guess his opponent's number first.