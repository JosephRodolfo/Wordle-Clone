# Wordle-Clone

Wordle-Clone is a clone of the popular online game Wordle (https://www.nytimes.com/games/wordle/index.html), with a few differences. Rather than the set 6 letters of the original, Wordle-Clone allows users to choose the length of the word they will try to guess, from 3 to 15 letters, as well as play as many times per day as they want, as Wordle-Clone chooses new words at random from a dictionary. 

Wordle-Clone uses HTML, CSS, vanilla Javascript, with a small amount of React. 


## Installation

Clone whole repository; it includes a few font files, word lists, and three necessary minified Babel and React files. Wordle-Clone must be run on a server because requests to word lists and other files cause CORS errors. 

## Requirements

* "Create and populate a JavaScript array with one or more values and display the contents of some or all of the array on your page."

The function "findIndex" takes the secret Wordle word and the player's guess word as parameters; calculates which letters are in the word and in the correct spot, in the word but in the incorrect spot, or not in the word at all; and returns a new array with this encoded information that another part of the program takes as a parameter and uses to render the correct colors on the keyboard and gameboard. 

* "Use Flexbox or CSS Grid to organize content areas based on mobile or desktop views."

Wordle-Clone uses CSS Grid to display content at 2 main (min-size) breakpoints for a total of three major layouts, going from 1 to 2 to 3 column, with a fixed nav at top. Within major layout components content is mostly arranged using CSS flexbox, though the game board itself uses CSS Grid and CSS variables that change with user input to change the number of columns/letters. 

* Show/hide one or more content areas or elements on your site through clicking a button or some other user interaction - must be done with some JavaScript code. 

On the one-column layout, for nav there is one single menu button, and on click it uses Javascript to change a CSS class that triggers a CSS transition from 0 to 100% width that displays all navigation information. 


* "Create a JavaScript function that performs some form of mathematical operation (calculates something) and displays the result on your page or otherwise uses that value to do something on the site."

The "getResponsiveFontSize" function calculates a new size for the font inside of the game board circle grid items and fires on window resize and when resetting the gameboard and sets a new font-size property for each item. Because the circles are responsive to a changing window size (the circles are also significantly smaller with 15 letters vs. 6), the font inside must change size on window resize or gameboard resizing and reset. 