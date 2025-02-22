import React from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Creates a `size*size` 2d array.
 */
function createMatrix(size) {
  let matrix = [];
  for (let i = 0; i < size; i++) {
    matrix.push(new Array(size).fill(null));
  }

  return matrix;
}

/**
 * Generate a random float number between min and max.
 */
function random(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Generates random indices i and j in the range [0, size - 1]
 */
function generateIndices(size) {
  let randomI = ~~random(0, size);
  let randomJ = ~~random(0, size);

  return [randomI, randomJ];
}

/**
 * Places the numbers in a random spot in a matrix.
 */
function placeNumbers(matrix, currentLevel) {
  let n = matrix.length;
  if (n * n < currentLevel) {
    throw new Error(
      "currentLevel must be greater than the matrix size to place numbers"
    );
  }

  for (let num = 1; num <= currentLevel; num++) {
    let [randomI, randomJ] = generateIndices(n);

    while (matrix[randomI][randomJ] !== null) {
      [randomI, randomJ] = generateIndices(n);
    }
    matrix[randomI][randomJ] = num;
  }
}

function cloneMatrix(matrix) {
  return matrix.map((row) => [...row]);
}

export default function App() {
  let [matrix, setMatrix] = React.useState(createMatrix(6));
  let [currentLevel, setCurrentLevel] = React.useState(4);
  let [currentNumber, setCurrentNumber] = React.useState(1);
  let [invisible, setInvisible] = React.useState(false);
  let highscore = React.useRef(currentLevel);

  React.useEffect(() => {
    let clone = cloneMatrix(matrix);
    placeNumbers(clone, currentLevel);
    setMatrix(clone);
  }, []);

  function changeLevel(newLevel) {
    setCurrentLevel(newLevel);
    let newMatrix = createMatrix(6);
    placeNumbers(newMatrix, newLevel);
    setMatrix(newMatrix);
    setInvisible(false);
    setCurrentNumber(1);
    highscore.current = Math.max(highscore.current, newLevel);
  }

  function handleButtonClick(i, j) {
    let num = matrix[i][j];
    console.log(`clicked ${num}`);

    setInvisible(true);

    console.log(currentNumber);
    if (num == currentNumber) {
      if (num == currentLevel) {
        changeLevel(currentLevel + 1);
      } else {
        let clone = cloneMatrix(matrix);
        clone[i][j] = null;
        setCurrentNumber(currentNumber + 1);
        setMatrix(clone);
      }
    } else {
      changeLevel(4);
    }
  }

  return (
    <div class="game-wrapper">
      <h2>Score: {currentLevel} &nbsp; Highscore: {highscore.current}</h2>
      <div className="game-table">
        {matrix.map((currentRow, i) => {
          return (
            <div>
              <div key={i} className="game-row">
                {currentRow.map((num, j) => {
                  return (
                    <AnimatePresence key={`${i},${j}`} mode="popLayout">
                      {num === null ? (
                        <motion.div
                          key={`${i},${j},empty`}
                          className="game-cell empty"
                        ></motion.div>
                      ) : (
                        <motion.button
                          key={`${i},${j},${num}`}
                          onClick={() => handleButtonClick(i, j)}
                          className="game-cell"
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            type: "spring",
                            bounce: 0.5,
                            duration: 0.3,
                          }}
                        >
                          <span hidden={invisible}>{num}</span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
