$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var range = document.getElementById('number-limit-range');
  var result = document.getElementById('number-limit');



  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };

  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  };
  var getQuestionOptions = function() {
    var options = [];
    for (var key in $scope.questionOptions) {
        if ($scope.questionOptions[key]) {
            options.push(key)
        }
    }
    return options
}
;

  range.addEventListener('change', function () {
    result.innerHTML = range.value;
    var size = range.value;
  }, false);


  var randomNumberGenerator = function (range) {
    return Math.ceil(Math.random() * range);
  };

  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(range.value);
    var num2 = randomNumberGenerator(range.value);

    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  };


  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  };

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };

  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  renderNewQuestion();


});
