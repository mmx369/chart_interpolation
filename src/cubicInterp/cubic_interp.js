// const createMatrix = require('./createMatrix')
// const gaussEl = require('./gauss')

import { createMatrix } from './createMatrix'
import { gauss as gaussEl } from './gauss'

export function cubicInterpol(xValues, yValues) {
  return function (x) {
    let startRangeIdx, endRangeIdx
    const closest = xValues.reduce((prev, curr) => {
      return Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev
    })
    const closestIdx = xValues.indexOf(closest)
    if (closestIdx === 0) {
      startRangeIdx = 0
      endRangeIdx = 1
    } else if (closestIdx === xValues.length - 1) {
      startRangeIdx = xValues.length - 2
      endRangeIdx = xValues.length - 1
    } else if (x <= xValues[closestIdx]) {
      startRangeIdx = closestIdx - 1
      endRangeIdx = closestIdx
    } else if (x > xValues[closestIdx]) {
      startRangeIdx = closestIdx
      endRangeIdx = closestIdx + 1
    }
    // console.log('StartIdx: ', startRangeIdx, 'EndIdx: ', endRangeIdx)
    const [matrixA, matrixB, aMult] = createMatrix(xValues, yValues)
    // console.log('Matrix A: ', matrixA, 'Matrix B: ', matrixB)
    // console.log(111, aMult)
    const resultMatrix = gaussEl(matrixA, matrixB)
    // console.log('Result: ', resultMatrix)
    // console.log('interval: ', startRangeIdx)
    const resultIntervalStart = startRangeIdx * 3
    const resultIntervalEnd = startRangeIdx * 3 + 3
    // console.log(222, resultIntervalStart, resultIntervalEnd)
    const result = resultMatrix.slice(resultIntervalStart, resultIntervalEnd)
    // console.log('Res: ', result)
    // console.log('X1: ', xValues[startRangeIdx])
    const x0 = xValues[startRangeIdx]
    const y =
      aMult[startRangeIdx] +
      result[0] * (x - x0) +
      result[1] * (x - x0) ** 2 +
      result[2] * (x - x0) ** 3
    // console.log('Y', y)
    return y
  }
}

// const y = cubicInterpol(xValues, yValues)

// console.log(y(4.1))
