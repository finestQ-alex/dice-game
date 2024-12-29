let turn = 1; // turn 1은 왼쪽 플레이어

let leftDiceValue = 0;
let rightDiceValue = 0;

let leftPlayerHold = false;
let rightPlayerHold = false;

let currentDiceValue = 0;

const diceImgLeft = document.querySelector(".dice-box-left #dice-img"); // 왼쪽 플레이어 주사위 이미지
const diceImgRight = document.querySelector(".dice-box-right #dice-img"); // 오른쪽 플레이어 주사위 이미지
const holdBtn = document.querySelector("#hold-btn"); // 홀드 버튼

// 각 숫자에 해당하는 주사위 이미지
const diceImage = [
  "img/dice1.png",
  "img/dice2.png",
  "img/dice3.png",
  "img/dice4.png",
  "img/dice5.png",
  "img/dice6.png",
];

// 주사위 굴려서 랜덤으로 1에서 6까지 나오게 하는 함수
function getRamdomDiceValue() {
  return Math.floor(Math.random() * 6 + 1);
}

// 주사위 값에 맞는 이미지 변환
function getDiceImageSrc(value) {
  return diceImage[value - 1];
}

// 주사위 이미지 업데이트
function updateDiceImage() {
  if (turn % 2 === 1) {
    // 왼쪽 플레이어 턴
    diceImgLeft.style.opacity = "1";
    diceImgRight.style.opacity = "0";
    if (!leftPlayerHold) {
      // 홀드 상태가 아니면 주사위 값 갱신
      currentDiceValue = getRamdomDiceValue();
      diceImgLeft.src = getDiceImageSrc(currentDiceValue);
    }
  } else if (turn % 2 === 0) {
    // 오른쪽 플레이어 턴
    diceImgRight.style.opacity = "1";
    diceImgLeft.style.opacity = "0";
    if (!rightPlayerHold) {
      // 홀드 상태가 아니면 주사위 값 갱신
      currentDiceValue = getRamdomDiceValue();
      diceImgRight.src = getDiceImageSrc(currentDiceValue);
    }
  }
}

// 주사위 클릭
function handleDiceClick(event) {
  // 왼쪽 플레이어의 턴이고, 홀드하지 않았다면
  if (
    turn % 2 === 1 &&
    !leftPlayerHold &&
    event.currentTarget === diceImgLeft
  ) {
    if (currentDiceValue === 1 || currentDiceValue === 2) {
      leftDiceValue = 0; // 1 또는 2가 나오면 점수 초기화
      turn++; // 턴을 넘긴다
      leftPlayerHold = false; // 홀드 상태 초기화
    } else {
      leftDiceValue += currentDiceValue; // 점수에 주사위 값 추가
    }
    updateDiceImage();
    updateValues();
  }
  // 오른쪽 플레이어의 턴이고, 홀드하지 않았다면
  else if (
    turn % 2 === 0 &&
    !rightPlayerHold &&
    event.currentTarget === diceImgRight
  ) {
    if (currentDiceValue === 1 || currentDiceValue === 2) {
      rightDiceValue = 0; // 1 또는 2가 나오면 점수 초기화
      turn++; // 턴을 넘긴다
      rightPlayerHold = false; // 홀드 상태 초기화
    } else {
      rightDiceValue += currentDiceValue; // 점수에 주사위 값 추가
    }
    updateDiceImage();
    updateValues();
  }
}

// 홀드 버튼 클릭
function handleHoldBtnClick() {
  if (turn % 2 === 1 && !leftPlayerHold) {
    // 왼쪽 플레이어가 홀드
    leftPlayerHold = true;
    if (currentDiceValue !== 1 && currentDiceValue !== 2) {
      leftDiceValue += currentDiceValue; // 1, 2가 아니면 점수에 추가
    }
  } else if (turn % 2 === 0 && !rightPlayerHold) {
    // 오른쪽 플레이어가 홀드
    rightPlayerHold = true;
    if (currentDiceValue !== 1 && currentDiceValue !== 2) {
      rightDiceValue += currentDiceValue; // 1, 2가 아니면 점수에 추가
    }
  }

  // 턴을 넘긴다
  turn++;
  updateDiceImage();
  updateValues();
}

// 점수 업데이트
function updateValues() {
  const leftValues = document.querySelector(".current-value-left");
  const rightValues = document.querySelector(".current-value-right");

  if (leftValues && rightValues) {
    leftValues.textContent = leftDiceValue.toString().padStart(2, "0");
    rightValues.textContent = rightDiceValue.toString().padStart(2, "0");
  } else {
    console.error("주사위 값을 찾을 수 없습니다.");
  }

  checkWin();
}

// 승리 조건 확인 함수
function checkWin() {
  if (leftDiceValue >= 50) {
    alert("Player 1이 승리하였습니다!");
    resetGame();
  } else if (rightDiceValue >= 50) {
    alert("Player 2가 승리하였습니다!");
    resetGame();
  }
}

// 게임 리셋 함수
function resetGame() {
  leftDiceValue = 0;
  rightDiceValue = 0;
  leftPlayerHold = false;
  rightPlayerHold = false;
  turn = 1;
  updateDiceImage();
  updateValues();
}

// 초기 상태 설정
function init() {
  updateDiceImage();
  updateValues();
}

// 주사위 굴릴 때 클릭 이벤트
diceImgLeft.addEventListener("click", handleDiceClick);
diceImgRight.addEventListener("click", handleDiceClick);
holdBtn.addEventListener("click", handleHoldBtnClick);

// 게임 초기화
init();
