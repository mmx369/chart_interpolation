function array_fill(i, n, v) {
  let a = []
  for (; i < n; i++) {
    a.push(v)
  }
  return a
}

/**
 * Gaussian elimination
 * @param  array A matrix
 * @param  array x vector
 * @return array x solution vector
 */

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

let matrixA = [
  [1, 2, 5, 8],
  [0, 2, 5, 8],
  [0, 0, 5, 8],
  [4, 0, 7, 8],
]

let matrixB = [6, 7, 2, 6]

console.log(gauss(matrixA, matrixB)) //[ -1.0000000000000009, 2.5, 4.000000000000001, -2.2500000000000004 ]
