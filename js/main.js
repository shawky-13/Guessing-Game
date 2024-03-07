// the letters
const theLetter = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
// convert the letter into an array
let theLetterArray = Array.from(theLetter);
// select the div which i put the letter inside it
let div = document.querySelector(".the-letters");
theLetterArray.forEach((e) => {
  // create a span which i enter the array element inside it
  let span = document.createElement("span");
  let spanText = document.createTextNode(e);
  span.appendChild(spanText);
  span.className = "span-letter";
  div.appendChild(span);
});

// creating the object that contain the guess word

const words = {
  Friuts: [
    "apple",
    "banana",
    "watermelon",
    "orange",
    "mango",
    "kiwi",
    "avocado",
    "grape",
    "blueberry",
    "cherry",
  ],
  Vegetables: [
    "carrot",
    "potato",
    "tomato",
    "olive",
    "cucumber",
    "broccoli",
    "celery",
    "onion",
    "garlic",
    "Cabbage",
    "mushroom",
    "beans",
    "corn",
    "spinach",
    "pumpkin",
    "radish",
    "zucchini",
    "turnip	",
    "Cauliflower",
    "lettuce",
    "mint",
    "arugula",
    "peppers",
  ],
  Animals: [
    "cat",
    "monkey",
    "donkey",
    "lion",
    "snake",
    "tiger",
    "rabbit",
    "elephant",
    "mouse",
    "cow",
    "goat",
    "ant",
    "sheep",
    "dog",
    "frog",
    "zebra",
    "bear",
    "panda",
    "wolf",
    "crocodile",
    "camel",
    "puma",
    "jaguar",
    "fox",
    "deer",
    "giraffe",
    "horse",
    "lizard",
    "bull",
    "Turtle",
    "otter",
    "cheetah",
  ],
  Birds: [
    "hen",
    "duck",
    "batterfly",
    "fly",
    "insect",
    "bee",
    "crow",
    "vulture",
    "peacock",
    "ostrich",
    "owl",
    "peacock",
    "pigeon",
    "penguin",
    "canary",
  ],
};
// get object keys
let wordsKey = Object.keys(words);
// set the random number for select the word from by random value
let wordskeyRandom = Math.floor(Math.random() * wordsKey.length);
// select the span that i put the random value inside it and put the values
document.querySelector(".category span").innerHTML = wordsKey[wordskeyRandom];
// set the random number of the keyvalue
let keyValueRandomNumber = Math.floor(
  Math.random() * words[wordsKey[wordskeyRandom]].length
);
// set the random word of the keyvalue
let keyValueRandomWord = words[wordsKey[wordskeyRandom]][keyValueRandomNumber];
// set the array of the selected random word
let randomWordArray = Array.from(keyValueRandomWord);
// set the span of the random guess word
let theLetterShowZone = document.querySelector(".theletters-show");
// loop on the array of the random words to create the zone of it
randomWordArray.forEach(() => {
  let span = document.createElement("span");
  span.className = "random-word";
  theLetterShowZone.appendChild(span);
});
// set the first letter in the first span to make the game easy
let wordSpan = document.querySelector(".random-word");
let spanText = document.createTextNode(randomWordArray[0]);
wordSpan.appendChild(spanText);

// handling clicked letter

// define number of wrong letter
let tempCount = 0;
let spanInnerArr = [];

// set the click event on the letters
document.querySelectorAll(".the-letters span").forEach((e) => {
  e.addEventListener("click", function (p) {
    // Set the Status
    let theStatus = false;

    // note : you will use target => to select the clicked letter
    p.target.classList.add("selected");
    // check if the clicked letter is in the guessing word
    let clickedLetter = p.target.innerHTML;
    randomWordArray.forEach((word, wordIndex) => {
      // take the letter corrected from the true guessing word and put it into a span shows letter
      if (clickedLetter.toLowerCase() == word) {
        // set the status = true
        theStatus = true;
        // chose the clicked letter and put it into the correction site in the word span
        let spans = document.querySelectorAll(".theletters-show span");

        // to make the letter sucess if the clicked is true
        p.target.classList.add("selected1");

        spans.forEach((spa, spanIndex) => {
          if (wordIndex == spanIndex) {
            spa.innerHTML = word.toLowerCase();
          }
        });

        // For if the word is right
        let spanInner = clickedLetter;
        let minus = randomWordArray.length - 1;
        spanInnerArr.push(spanInner);
        // check if the lenght of the spans equal to the length of the words array then game
        if (spanInnerArr.length == minus) {
          // playing win sound
          document.getElementById("win").play();

          document.querySelector(".win").classList.add("sucess");
          // bluring container
          document.querySelector(".container").classList.add("blur");
          document.querySelector(".bluring").classList.add("blur");
          document.querySelector(".play-note").classList.add("blur");

          // put the answer word in the sucess box
          let answerWord = document.createElement("div");
          answerWord.setAttribute("class", "answer-word");
          let answerWordContent = document.createTextNode(
            `The Word Answer Is ${randomWordArray.join("")}`
          );
          answerWord.appendChild(answerWordContent);
          document.querySelector(".win").appendChild(answerWord);

          // remove event on the letters
          document.querySelectorAll(".the-letters span").forEach((e) => {
            e.setAttribute("style", "pointer-events:none;");
          });
        }
      }
    });

    // outside the loop of randomWordArray make the status false
    // if the letter is wrong
    if (theStatus !== true) {
      // playing wrong word sound
      document.getElementById("wrong").play();
      // increment the tempcount
      tempCount++;
      // set the remaining attemptes
      let remainingAttemptes = document.querySelector(".count");
      remainingAttemptes.innerHTML = `Number of remaining attempts: ${
        8 - tempCount
      }`;
      // set class to the draw to control on it
      document
        .querySelector(".hangman-draw")
        .classList.add(`wrong-${tempCount}`);

      // set the max of tempCount to 8

      if (tempCount == 8) {
        // playing losing sound
        document.getElementById("lost").play();

        document.querySelector(".game").classList.add("over");
        document.querySelectorAll(".the-letters span").forEach((e) => {
          e.classList.add("selected");
        });
        // put the answer word inside the box
        let answerWord = document.createElement("div");
        answerWord.setAttribute("class", "answer-word");
        let answerWordContent = document.createTextNode(
          `The Word Answer Is ${randomWordArray.join("")}`
        );
        answerWord.appendChild(answerWordContent);
        document.querySelector(".game").appendChild(answerWord);
        // bluring countainer
        document.querySelector(".container").classList.add("blur");
        document.querySelector(".bluring").classList.add("blur");
        document.querySelector(".play-note").classList.add("blur");
      }
    } else {
      // playing correct sound
      document.getElementById("correct").play();
    }
  });
});

// set the button on popup that reload the page when you lost
document.querySelectorAll("button").forEach((e) => {
  e.onclick = function () {
    window.location.reload();
  };
});
