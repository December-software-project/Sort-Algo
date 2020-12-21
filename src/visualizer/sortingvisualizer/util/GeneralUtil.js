import SortingAlgorithms from '../../algorithm/sortingalgorithms/allSorts';
import SortingAlgorithmsStepByStep from '../../algorithm/stepbysteptemplate/allSortsStepByStep';
import { generateRandomValue } from './RadixSortUtil';

// General array util
export const resetArray = (algo, arr) => {
  return arrayCopy(arr).map((x) => {
    let tempArrElement = x;
    if (isCountingSort(algo)) {
      tempArrElement.isShown = true;
    } else if (isRadixSort(algo)) {
    } else if (isMergeSort(algo)) {
      tempArrElement.isShift = false;
    } else {
      tempArrElement.isSwap = false;
    }
    return tempArrElement;
  });
};

export const arrayCopy = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

export const getAnimationArr = (algo, arrayData) => {
  const sortAlgo = SortingAlgorithms[algo];
  return sortAlgo(arrayCopy(arrayData));
};

export const getStepByStepText = (algo, animationArr, idx, referenceArray) => {
  const sortAlgoStepByStep = SortingAlgorithmsStepByStep[algo];
  return sortAlgoStepByStep(animationArr, idx, referenceArray);
};

// Math util
export const generateValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// code from Mark G https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
export const roundToTwoDp = (num) => {
  return +(Math.round(num + 'e+2') + 'e-2');
};

/**
 * Generates a random array based on the size chosen and the algorithm selected.
 * @param size Size of array data.
 * @param visualizerAlgorithm Algorithm selected.
 * @returns {[]} Random array generated.
 */
export const generateArray = (size, visualizerAlgorithm) => {
  let array = [];
  if (isCountingSort(visualizerAlgorithm)) {
    for (let i = 0; i < size; i++) {
      array.push({
        id: i,
        height: generateValue(1, 9),
        isShown: true,
      });
    }
  } else if (isRadixSort(visualizerAlgorithm)) {
    for (let i = 0; i < size; i++) {
      array.push({
        id: i,
        height: generateRandomValue(),
        isShown: true,
      });
    }
  } else if (isMergeSort(visualizerAlgorithm)) {
    for (let i = 0; i < size; i++) {
      array.push({
        xDirection: i * 10,
        pos: i,
        prevPos: i,
        height: generateValue(1, 9),
        isShift: false,
        id: i,
      });
    }
  } else {
    for (let i = 0; i < size; i++) {
      array.push({
        id: i,
        height: generateValue(5, 20),
        isSwap: false,
      });
    }
  }
  return array;
};

// Conditionals
export const isCountingSort = (visualizerAlgorithm) => visualizerAlgorithm === 'Counting Sort';
export const isRadixSort = (visualizerAlgorithm) => visualizerAlgorithm === 'Radix Sort';
export const isMergeSort = (visualizerAlgorithm) => visualizerAlgorithm === 'Merge Sort';

export const isSwapInvolvedSort = (visualizerAlgorithm) =>
  visualizerAlgorithm === 'Bubble Sort' ||
  visualizerAlgorithm === 'Insertion Sort' ||
  visualizerAlgorithm === 'Selection Sort' ||
  visualizerAlgorithm === 'Quick Sort' ||
  visualizerAlgorithm === 'Heap Sort' ||
  visualizerAlgorithm === 'Merge Sort' ||
  visualizerAlgorithm === 'Shell Sort';

// Auto shifting to ensure everything stays at the center
export const translateXOfVisualizer = (dataSize) => {
  if (dataSize > 12) {
    let singleBlockWidth = 200 / dataSize;
    return (dataSize - 12) * singleBlockWidth;
  }
  return 0;
};