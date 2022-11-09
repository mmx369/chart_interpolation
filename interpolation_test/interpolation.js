const xValues = [2, 6]
const yValues = [30, 20]

function linearInterpolation(xValues, yValues) {
  //возвращает значение в указанной точке между двумя другими значениями, напр. (10, 100, 0.5)//55
  const lerp = (x, y, a) => x * (1 - a) + y * a
  //возвращ значение если оно лежит между мин и макс приеделами если нет то возвращ предел
  const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a))
  //работает обратно lerp, задается значение и возвращается процент
  const invlerp = (x, y, a) => clamp((a - x) / (y - x))
  //интерполирует одно значение на другое
  const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a))
  console.log(xValues, yValues)
  return function (num) {
    const closest = xValues.reduce(function (prev, curr) {
      return Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev
    })
    console.log('Closest number: ', closest)
    let startRangeIdx, endRangeIdx
    const closestIdx = xValues.indexOf(closest)
    console.log('Closest index: ', closestIdx)
    console.log('ClosestIdxValue: ', xValues[closestIdx])

    if (closestIdx === 0) {
      startRangeIdx = 0
      endRangeIdx = 1
    }
    if (closestIdx === xValues.length - 1) {
      startRangeIdx = xValues.length - 2
      endRangeIdx = xValues.length - 1
    }
    if (num < xValues[closestIdx]) {
      startRangeIdx = closestIdx - 1
      endRangeIdx = closestIdx
    }
    if (num > xValues[closestIdx]) {
      startRangeIdx = closestIdx
      endRangeIdx = closestIdx + 1
    }

    console.log(
      'Start range index: ',
      startRangeIdx,
      'End range index: ',
      endRangeIdx
    )

    return range(
      xValues[startRangeIdx],
      xValues[endRangeIdx],
      yValues[startRangeIdx],
      yValues[endRangeIdx],
      num
    )
  }
}

const getValue = linearInterpolation(xValues, yValues)
console.log(getValue(4))
