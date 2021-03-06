const Scrabble = {
  // time complexity O(n)
  score(word) {
    const ScoreChart = {
      one: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
      two: ["D", "G"],
      three: ["B", "C", "M", "P"],
      four: ["F", "H", "V", "W", "Y"],
      five: ["K"],
      eight: ["J", "X"],
      ten: ["Q", "Z"]
    };

    if (word.length > 7 || word.length < 1){
      throw new Error(`Word must have 1 to 7 letters`);
    }
    let score = 0

    if (word.length === 7) {
      score = 50;
    }
    // O(n)
    word.toUpperCase().split('').forEach((letter) => {
      if ((ScoreChart.one).includes(letter)) {
        score += 1;
      } else if ((ScoreChart.two).includes(letter)){
        score += 2;
      } else if ((ScoreChart.three).includes(letter)){
        score += 3;
      } else if ((ScoreChart.four).includes(letter)){
        score += 4;
      } else if ((ScoreChart.five).includes(letter)){
        score += 5;
      } else if ((ScoreChart.eight).includes(letter)){
        score += 8;
      } else if ((ScoreChart.ten).includes(letter)){
        score += 10;
      } else {
        throw new Error(`${letter} is not a letter. Word must be a valid word.`);
      }
    });
    return score

  },
  // time complexity O(n*m)
  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length < 1 || !(arrayOfWords instanceof Array) ){
      throw new Error('This is not an array of words.')
    }
    // go through the array and score each word if score of word is highest, keep word in varible
    let max = this.score(arrayOfWords[0]);
    let highestScoredInArray = arrayOfWords[0];

    arrayOfWords.forEach((word) => {
      const score = this.score(word);

      if (score > max) {
        max = score;
        highestScoredInArray = word;
      } else if (score === max) {
        if (word.length === 7) {
          max = score;
          highestScoredInArray = word;
        } else if (word.length < highestScoredInArray.length && highestScoredInArray.length !== 7) {
          max = score;
          highestScoredInArray = word;
        }
      }
    });
    return highestScoredInArray;
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (name.length === 0) {
      throw new Error('Name required')
    }
    this.name = name;
    this.plays = [];
    this.currentScore = 0
  }
  // O(n)
  play(word) {

    if(this.hasWon()){
      return false;
    } else {
      this.currentScore += Scrabble.score(word);
      this.plays.push(word);
    }

    return word;
  }
  // O(1)
  hasWon() {
    return this.currentScore >= 100;
  }
  // O(1)
  totalScore() {
    return this.currentScore;
  }
  // O(n)
  highestScoringWord() {
    if (this.plays == []){
      throw new Error('No words played')
    } else {
      return Scrabble.highestScoreFrom(this.plays);
    }
  }
  // O(n)
  highestWordScore() {
    return Scrabble.score(this.highestScoringWord());
  }
};


module.exports = Scrabble;
