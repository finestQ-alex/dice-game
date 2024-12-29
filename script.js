let turn = 1; //turn 1 은 왼쪽 플레이어

let leftDiceValue = 0;
let rightDiveValue = 0;

let leftPlayerHold = false;
let rightPlayerHold = false;

let currentDiceValue = 0;

const diceImgLeft = document.querySelector(".dice-box-left"); //주사위 왼쪽 이미지
const diceImgRight = document.querySelector(".dice-box-right"); //주사위 오른쪽 이미지
const holdBtn = document.querySelector("#hold-btn"); //홀드 버튼

//각 숫자에 해당하는 주사위 이미지
const diceImage = [
  "img/dice1.png",
  "img/dice2.png",
  "img/dice3.png",
  "img/dice4.png",
  "img/dice5.png",
  "img/dice6.png",
];

//주사위 굴려서 랜덤으로 1에서 6까지 나오게 하는 함수
function getRamdomDiceValue() {
  return Math.floor(Math.random() * 6 + 1);
}

//주사위 값에 맞는 이미지 변환
function getDiceImageSrc(value) {
  return diceImage[value - 1];
}

//이미지 경로에서 주사위에 해당하는 값 매칭
function getDiceValueFromSrc(src) {
  const match = src.match(/dice(\d).png$/);
  return match ? parseInt(match[1], 10) : 0;
}

//주사위 이미지 업데이트
function updateDiceImage() {
  if (turn % 2 === 1) {
    diceImgLeft.style.opacity = "1";
    currentDiceValue = getRamdomDiceValue();
    diceImgLeft.src = getDiceImageSrc(currentDiceValue);
    diceImgRight.style.opacity = "0";
  } else {
    diceImgRight.style.opacity = "1";
    currentDiceValue = getRamdomDiceValue();
    diceImgRight.src = getDiceImageSrc(currentDiceValue);
    diceImgLeft.style.opacity = "0";
  }
}

//주사위 클릭
function handleDiceClick(event) {
  if (
    tunr % 2 === 1 &&
    !leftPlayerHold &&
    event.currentTarget === diceImgLeft
  ) {
    if (currentDiceValue === 1 || currentDiceValue === 2) {
      leftDiceValue = 0;
    } else {
      leftDiceValue += currentDiceValue;
    }
  } else if (
    turn % 2 === 0 &&
    !rightPlayerHold &&
    event.currentTarget === diceImgRight
  ) {
    if (currentDiceValue === 1 || currentDiceValue === 2) {
      rightDiveValue = 0;
    } else {
      rightDiveValue += currentDiceValue;
    }
  }
  turn++;
  updateDiceImage();
  holdAndSkip();
  updateValues();
}

//홀드 버튼 클릭
function handleHoldBtnClick() {
  if (turn % 2 === 1 && !leftPlayerHold) {
    leftPlayerHold = true;
    if (currentDiceValue === 1 || currentDiceValue === 2) {
      leftDiceValue = 0;
    } else {
      leftDiceValue += currentDiceValue;
    }
  } else if (turn % 2 === 0 && !rightPlayerHold) {
    rightPlayerHold = true;
    if (currentDiceValue === 1 || currentDiceValue === 2) {
      rightDiveValue = 0;
    } else {
      rightDiveValue += currentDiceValue;
    }
  }
  turn++;
  updateDiceImage();
  holdAndSkip();
  updateValues();
}

//홀드를 누른뒤 다음 플레이어에게 스킵
function holdAndSkip() {
  while (
    (turn % 2 === 1 && leftPlayerHold) ||
    (turn % 2 === 0 && rightPlayerHold)
  ) {
    turn++;
  }
}

//점수 업데이트
function updateValues() {
  const leftValues = document.querySelector(".current-value-left");
  const rightValues = document.querySelector(".current-value-right");

  //현재 점수 화면에 표시
  if (leftValues && rightValues) {
    leftValues.textContent = leftDiceValue.toString().padStart(2, "0");
    rightValues.textContent = rightDiveValue.toString().padStart(2, "0");
  } else {
    console.error("주사위 값을 찾을 수 없습니다.");
  }

  //승리 확인
  checkWin();
}

//승리 조건 확인 함수
function checkWin() {
  if (leftDiceValue >= 50) {
    alert("Player 1이 승리하였습니다!");
    resetGame();
  } else if (rightDiveValue >= 50) {
    alert("Player 2가 승리하였습니다!");
    resetGame();
  }
}

//게임 리셋 함수
function resetGame() {
  leftDiceValue = 0;
  rightDiveValue = 0;
  leftPlayerHold = false;
  rightPlayerHold = false;
  turn = 1;
  updateDiceImage();
  updateValues();
}

//초기 상태 설정
function init() {
  updateDiceImage();
  updateValues();
}

//주사위 굴릴때 클릭 이벤트
diceImgLeft.addEventListener("click", handleDiceClick);
diceImgRight.addEventListener("click", handleDiceClick);
holdBtn.addEventListener("click", handleHoldBtnClick);

//게임 초기화
init();
