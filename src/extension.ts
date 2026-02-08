import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const addCommand = vscode.commands.registerCommand(
        'third-labwork.insertMatrixAddition',
        handleMatrixAddition
    );
    
    const subtractCommand = vscode.commands.registerCommand(
        'third-labwork.insertMatrixSubtraction',
        handleMatrixSubtraction
    );
    
    const multiplyCommand = vscode.commands.registerCommand(
        'third-labwork.insertMatrixMultiplication',
        handleMatrixMultiplication
    );

    
    const inverseCommand = vscode.commands.registerCommand(
        'third-labwork.insertMatrixInverse',
        handleMatrixInverse
    );
    
    context.subscriptions.push(
        addCommand,
        subtractCommand,
        multiplyCommand,
        inverseCommand
    );
}

function handleMatrixAddition() {
    insertMatrixFunction('addition');
}

function handleMatrixSubtraction() {
    insertMatrixFunction('subtraction');
}

function handleMatrixMultiplication() {
    insertMatrixFunction('multiplication');
}

function handleMatrixInverse() {
    insertMatrixFunction('inverse');
}

function insertMatrixFunction(operation: string): void {

    const editor = vscode.window.activeTextEditor;

    let code: string;
    
    switch (operation) {
        case 'addition':
            code = getMatrixAdditionCode();
            break;
        
        case 'subtraction':
            code = getMatrixSubtractionCode();
            break;
        
        case 'multiplication':
            code = getMatrixMultiplicationCode();
            break;
        
        case 'inverse':
            code = getMatrixInverseCode();
            break;
    }
    editor.edit(function(editBuilder) {

        editBuilder.insert(editor.selection.active, code);
    });
}

function getMatrixAdditionCode(): string {
    return `
/**
 * Сложение двух матриц
 * @param matrixA - первая матрица размером m×n
 * @param matrixB - вторая матрица размером m×n
 * @return новая матрица-результат сложения
 */
vector<vector<double>> addMatrices(const vector<vector<double>>& matrixA, 
                                   const vector<vector<double>>& matrixB) {
    int m = matrixA.size();
    int n = matrixA[0].size();
    
    if (m != matrixB.size() || n != matrixB[0].size()) {
        throw invalid_argument("Матрицы должны иметь одинаковые размеры!");
    }
    
    vector<vector<double>> result(m, vector<double>(n));
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            result[i][j] = matrixA[i][j] + matrixB[i][j];
        }
    }
    
    return result;
}

// Пример использования:
// vector<vector<double>> A = {{1, 2}, {3, 4}};
// vector<vector<double>> B = {{5, 6}, {7, 8}};
// vector<vector<double>> sum = addMatrices(A, B);
`;
}

function getMatrixSubtractionCode(): string {
    return `
/**
 * Вычитание двух матриц
 * @param matrixA - первая матрица размером m×n
 * @param matrixB - вторая матрица размером m×n
 * @return новая матрица-результат вычитания (A - B)
 */
vector<vector<double>> subtractMatrices(const vector<vector<double>>& matrixA, 
                                        const vector<vector<double>>& matrixB) {
    int m = matrixA.size();
    int n = matrixA[0].size();
    
    if (m != matrixB.size() || n != matrixB[0].size()) {
        throw invalid_argument("Матрицы должны иметь одинаковые размеры!");
    }
    
    vector<vector<double>> result(m, vector<double>(n));
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            result[i][j] = matrixA[i][j] - matrixB[i][j];
        }
    }
    
    return result;
}

// Пример использования:
// vector<vector<double>> A = {{5, 6}, {7, 8}};
// vector<vector<double>> B = {{1, 2}, {3, 4}};
// vector<vector<double>> diff = subtractMatrices(A, B);
`;
}

function getMatrixMultiplicationCode(): string {
    return `
/**
 * Умножение двух матриц
 * @param matrixA - первая матрица размером m×k
 * @param matrixB - вторая матрица размером k×n
 * @return новая матрица-результат размером m×n
 */
vector<vector<double>> multiplyMatrices(const vector<vector<double>>& matrixA, 
                                        const vector<vector<double>>& matrixB) {
    int m = matrixA.size();
    int k = matrixA[0].size();
    int n = matrixB[0].size();
    
    if (k != matrixB.size()) {
        throw invalid_argument("Число столбцов A должно равняться числу строк B!");
    }
    
    vector<vector<double>> result(m, vector<double>(n, 0.0));
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            for (int p = 0; p < k; p++) {
                result[i][j] += matrixA[i][p] * matrixB[p][j];
            }
        }
    }
    
    return result;
}

// Пример использования:
// vector<vector<double>> A = {{1, 2, 3}, {4, 5, 6}};
// vector<vector<double>> B = {{7, 8}, {9, 10}, {11, 12}};
// vector<vector<double>> product = multiplyMatrices(A, B);
`;
}

function getMatrixInverseCode(): string {
    return `
/**
 * Вычисление определителя матрицы (рекурсивно)
 * @param matrix - квадратная матрица
 * @return значение определителя
 */
double getDeterminant(const vector<vector<double>>& matrix) {
    int n = matrix.size();
    
    if (n == 1) {
        return matrix[0][0];
    }
    
    if (n == 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    
    double det = 0.0;
    
    for (int j = 0; j < n; j++) {
        vector<vector<double>> minor(n - 1, vector<double>(n - 1));
        
        for (int row = 1; row < n; row++) {
            int minorCol = 0;
            for (int col = 0; col < n; col++) {
                if (col != j) {
                    minor[row - 1][minorCol] = matrix[row][col];
                    minorCol++;
                }
            }
        }
        
        double sign = (j % 2 == 0) ? 1.0 : -1.0;
        det += sign * matrix[0][j] * getDeterminant(minor);
    }
    
    return det;
}

/**
 * Вычисление матрицы алгебраических дополнений (кофакторов)
 * @param matrix - исходная квадратная матрица
 * @return матрица алгебраических дополнений
 */
vector<vector<double>> getCofactorMatrix(const vector<vector<double>>& matrix) {
    int n = matrix.size();
    vector<vector<double>> cofactors(n, vector<double>(n));
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            vector<vector<double>> minor(n - 1, vector<double>(n - 1));
            
            int minorRow = 0;
            for (int row = 0; row < n; row++) {
                if (row == i) continue;
                
                int minorCol = 0;
                for (int col = 0; col < n; col++) {
                    if (col == j) continue;
                    
                    minor[minorRow][minorCol] = matrix[row][col];
                    minorCol++;
                }
                minorRow++;
            }
            
            double sign = ((i + j) % 2 == 0) ? 1.0 : -1.0;
            cofactors[i][j] = sign * getDeterminant(minor);
        }
    }
    
    return cofactors;
}

/**
 * Транспонирование матрицы
 * @param matrix - исходная матрица m×n
 * @return транспонированная матрица n×m
 */
vector<vector<double>> transposeMatrix(const vector<vector<double>>& matrix) {
    int m = matrix.size();
    int n = matrix[0].size();
    
    vector<vector<double>> transposed(n, vector<double>(m));
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            transposed[j][i] = matrix[i][j];
        }
    }
    
    return transposed;
}

/**
 * Нахождение обратной матрицы через алгебраические дополнения
 * @param matrix - исходная квадратная невырожденная матрица
 * @return обратная матрица
 */
vector<vector<double>> getInverseMatrix(const vector<vector<double>>& matrix) {
    int n = matrix.size();
    
    if (n != matrix[0].size()) {
        throw invalid_argument("Матрица должна быть квадратной!");
    }
    
    double det = getDeterminant(matrix);
    
    if (fabs(det) < 1e-10) {
        throw invalid_argument("Матрица вырожденная (det = 0), обратной не существует!");
    }
    
    vector<vector<double>> cofactors = getCofactorMatrix(matrix);
    vector<vector<double>> adjugate = transposeMatrix(cofactors);
    
    vector<vector<double>> inverse(n, vector<double>(n));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            inverse[i][j] = adjugate[i][j] / det;
        }
    }
    
    return inverse;
}

// Пример использования:
// vector<vector<double>> A = {{4, 7}, {2, 6}};
// vector<vector<double>> A_inv = getInverseMatrix(A);
`;
}

export function deactivate() {}