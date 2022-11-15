let matrixA = [
  [1, 2, 3],
  [2, -1, 4],
  [0, 4, -1],
]

let matrixB = [5, 0, 4]

function gauss(A, B) {
  let temp //домноженная верхняя строка
  for (let i = 1; i < A.length; i++) {
    for (let j = 0; j < i; j++) {
      if (A[i][j] === 0) continue
      const k = A[i][j] / A[i - 1][j]
      temp = A[i - 1].map((el) => el * k)
      A[i] = A[i].map((el, index) => el - temp[index])
      B[i] = B[i] - B[i - 1] * k
    }
  }

  let result = new Array(A.length)

  for (let i = A.length - 1; i >= 0; i--) {
    let temp = 0
    for (let j = i + 1; j < A.length; j++) {
      temp += A[i][j] * result[j]
    }
    result[i] = (B[i] - temp) / A[i][i]
  }
  return result
}

console.log(gauss(matrixA, matrixB))
