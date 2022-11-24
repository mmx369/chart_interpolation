const xValues = [1, 2, 4, 7]
const yValues = [2, 3, 1, 4]

function createMatrix(x, y) {
  //получаем систему уравнений в виде матрицы для каждого сплайна (по 2 ур-ния для сплайна, остается 3 т.к. коэфф. a находится сразу)
  //в полученных массивах первые 3 значения коэфф.переменных Bn, Cn, Dn последняя цифра значение послк равно.
  let splines = new Array(x.length - 1)
  for (let i = 0; i < x.length - 1; i++) {
    const a = y[i]
    const b = x[i + 1] - x[i]
    const c = b ** 2
    const d = b ** 3
    const result = y[i + 1] - a
    splines[i] = [b, c, d, result]
  }
  //получаем уравнения первой производной в виде матрицы коэфф для каждого соединения из формулы равенства первых производных
  let derivFirst = new Array(x.length - 2)
  for (let i = 0; i < x.length - 2; i++) {
    const b = 1
    const c = 2 * (x[i + 1] - x[i])
    const d = 3 * (x[i + 1] - x[i]) ** 2
    const bn = -1
    const result = 0
    derivFirst[i] = [b, c, d, bn, result]
  }
  //получаем уравнения второй производной в виде матрицы коэфф для каждого соединения из формулы равенства вторых производных
  let derivSecond = new Array(x.length - 2)
  for (let i = 0; i < x.length - 2; i++) {
    const c = 2
    const d = 6 * (x[i + 1] - x[i])
    const cn = -2
    const result = 0
    derivSecond[i] = [0, c, d, 0, cn, result]
  }

  //Получаем уравнения для крайних точек
  let edgePoints = new Array(2)
  let c_first = 2
  let c_last = 2
  let d = 6 * (x[x.length - 1] - x[x.length - 2])
  let res = 0
  edgePoints[0] = [0, c_first, res]
  edgePoints[1] = [0, c_last, d, res]

  let matrixA = [] //матрица коэффициентов неизвестных
  let matrixB = [] //матрица значений

  //добавляем урованения сплайнов
  for (let i = 0; i < splines.length; i++) {
    const tempArr = Array(splines.length * 3).fill(0)
    const positionStart = (i + 1) * 3 - 3
    tempArr[positionStart] = [splines[i][0], splines[i][1], splines[i][2]]
    matrixA.push(tempArr.flat().slice(0, splines.length * 3))
    matrixB.push(splines[i][3])
  }

  //добавляем уравнения первой производной
  for (let i = 0; i < derivFirst.length; i++) {
    const tempArr = Array(splines.length * 3).fill(0)
    const positionStart = (i + 1) * 3 - 3
    tempArr[positionStart] = [
      derivFirst[i][0],
      derivFirst[i][1],
      derivFirst[i][2],
      derivFirst[i][3],
    ]
    matrixA.push(tempArr.flat().slice(0, splines.length * 3))
    matrixB.push(derivFirst[i][4])
  }

  for (let i = 0; i < derivSecond.length; i++) {
    const tempArr = Array(splines.length * 3).fill(0)
    const positionStart = (i + 1) * 3 - 3
    tempArr[positionStart] = [
      derivSecond[i][0],
      derivSecond[i][1],
      derivSecond[i][2],
      derivSecond[i][3],
      derivSecond[i][4],
    ]
    matrixA.push(tempArr.flat().slice(0, splines.length * 3))
    matrixB.push(derivSecond[i][5])
  }

  for (let i = 0; i < edgePoints.length; i++) {
    const tempArr = Array(splines.length * 3).fill(0)
    const positionStart = i === 0 ? 0 : splines.length * 3 - 3
    tempArr[positionStart] = [
      edgePoints[i][0],
      edgePoints[i][1],
      edgePoints[i][2],
    ]
    matrixA.push(tempArr.flat().slice(0, splines.length * 3))
    matrixB.push(0)
  }

  return [matrixA, matrixB]
}

// let [matrixA, matrixB] = createMatrix(xValues, yValues)

// console.log('matrixA:', matrixA)
// console.log('matrixB: ', matrixB)

function array_fill(i, n, v) {
  let a = []
  for (; i < n; i++) {
    a.push(v)
  }
  return a
}

function gauss(A, x) {
  let i, k, j

  // Just make a single matrix
  for (i = 0; i < A.length; i++) {
    A[i].push(x[i])
  }
  console.log('Matrix: ', A)
  let n = A.length
  console.log('n: ', n)

  for (i = 0; i < n; i++) {
    // Search for maximum in this column
    let maxEl = Math.abs(A[i][i])
    console.log('MaxEl: ', maxEl)
    let maxRow = i
    for (k = i + 1; k < n; k++) {
      if (Math.abs(A[k][i]) > maxEl) {
        maxEl = Math.abs(A[k][i])
        maxRow = k
      }
    }

    // Swap maximum row with current row (column by column)
    for (k = i; k < n + 1; k++) {
      let tmp = A[maxRow][k]
      A[maxRow][k] = A[i][k]
      A[i][k] = tmp
    }

    // Make all rows below this one 0 in current column
    for (k = i + 1; k < n; k++) {
      let c = -A[k][i] / A[i][i]
      for (j = i; j < n + 1; j++) {
        if (i === j) {
          A[k][j] = 0
        } else {
          A[k][j] += c * A[i][j]
        }
      }
    }
    console.log('Zeroed rows below: ', A)
    console.log('------------')
  }

  // Solve equation Ax=b for an upper triangular matrix A
  x = array_fill(0, n, 0)
  for (i = n - 1; i > -1; i--) {
    x[i] = A[i][n] / A[i][i]
    for (k = i - 1; k > -1; k--) {
      A[k][n] -= A[k][i] * x[i]
    }
  }

  return x
}

function cubicSplineInterpol(x, y) {
  let [matrixA, matrixB] = createMatrix(xValues, yValues)
  return gauss(matrixA, matrixB)
}

console.log(cubicSplineInterpol(xValues, yValues))
