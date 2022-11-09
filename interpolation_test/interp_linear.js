const xValues = [2, 6, 8, 10, 15]
const yValues = [30, 20, 10, 90, 100]

export function linInterp(xValues, yValues) {
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

    const lerp = (startRangeIdx, endRangeIdx, x) => {
      const y1 = yValues[startRangeIdx]
      const y2 = yValues[endRangeIdx]
      const x1 = xValues[startRangeIdx]
      const x2 = xValues[endRangeIdx]

      const A = (y2 - y1) / (x2 - x1)
      const B = y1 - x1 * A
      return A * x + B
    }

    return lerp(startRangeIdx, endRangeIdx, x)
  }
}

// for (let i = 0; i <= xValues[xValues.length - 1]; i++) {
//   console.log(i, ':', linInterp(xValues, yValues)(i))
// }
