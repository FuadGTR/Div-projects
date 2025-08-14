const choices = ["rock", "paper", "scissors"];
const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper"
};

const playerDiv = document.getElementById("player-choice");
const botDiv = document.getElementById("bot-choice");
const resultDiv = document.getElementById("result");
const levelSelect = document.getElementById("level");

document.querySelectorAll(".choices img").forEach((img) => {
  img.addEventListener("click", () => {
    const playerChoice = img.id;
    const difficulty = levelSelect.value;
    const botChoice = getBotChoice(playerChoice, difficulty);

    showChoice(playerDiv, playerChoice);
    showChoice(botDiv, botChoice);

    const result = checkWinner(playerChoice, botChoice);
    resultDiv.textContent = result;
  });
});

function showChoice(container, choice) {
  container.innerHTML = `<img src="${choice}.png" alt="${choice}" width="100">`;
}

function getBotChoice(player, level) {
  if (level === "easy") {
    return choices[Math.floor(Math.random() * 3)];
  }

  if (level === "medium") {
    return Math.random() < 0.5
      ? choices[Math.floor(Math.random() * 3)]
      : getWinningMove(player);
  }

  if (level === "hard") {
    return Math.random() < 0.8
      ? getWinningMove(player)
      : choices[Math.floor(Math.random() * 3)];
  }
}

function getWinningMove(player) {
  // Bot səni məğlub etmək üçün düzgün cavabı seçir
  for (let choice of choices) {
    if (beats[choice] === player) return choice;
  }
}

function checkWinner(player, bot) {
  if (player === bot) return "It's a Draw!";
  if (beats[player] === bot) return "YOU WIN Player!";
  return "Game Over Player!";
}
