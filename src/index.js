import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

/*
https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=boolean
sports- 21
celebrities- 26
animals- 27

html (N)
click listener for get question
  get the user input category
  api call (interpolate user input) (m)
  display function
click listener for true/false answer
  score - increment
  displayScore()
*/

$(document).ready(function () {
  let score = 0;
  let response;

  $("#category-form").submit(function (e) {
    e.preventDefault();
    const categoryNumber = $("input:radio[name=category]:checked").val();
    console.log(categoryNumber);
    let request = new XMLHttpRequest();
    const url = `https://opentdb.com/api.php?amount=1&category=${categoryNumber}&difficulty=easy&type=boolean`

    request.onreadystatechange = function () {
      console.log(this.readyState);
      if (this.readyState === 4 && this.status === 200) {
        response = JSON.parse(this.responseText);
        console.log(response);
        displayQuestion();
        displayScore();
      }

    };

    request.open("GET", url, true);
    request.send();
  })

  $("#true-false").submit(function (event) {
    event.preventDefault();
    //get user input
    const answer = $("input:radio[name=answer]:checked").val();
    console.log(answer);
    console.log(typeof (answer));
    if (answer === response.results[0].correct_answer) {
      score += 1;
      $("#display-question").text("That's right! Click the button above to get a new question.");
    } else {
      $("#display-question").text("Sorry, that's not correct. Click the button above to get a new question.");
    }
    console.log(score);
    // if not correct, send a message?
    displayScore();
  });

  function displayQuestion() {
    $("#display-question").text(response.results[0].question);
    // $("#choose").hide();
    // $("#display-question").show();
  }

  function displayScore() {
    $("#display-score").text(score);
    // if ()
  }
})
