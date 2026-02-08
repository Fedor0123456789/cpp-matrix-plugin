// Импортируем API VS Code (аналог #include <vscode.h>)
import * as vscode from 'vscode';

/**
 * Функция активации плагина
 * Вызывается при первом запуске расширения
 * Аналог main() в C++, но для плагина
 */
export function activate(context: vscode.ExtensionContext) {
    // Выводим сообщение в консоль (аналог cout)
    console.log('C++ Matrix Code Generator активирован!');

    // Регистрируем команду для сложения матриц
    // registerCommand — это как привязать функцию к кнопке
    const addCommand = vscode.commands.registerCommand(
        'third-labwork.insertMatrixAddition',  // ID команды (должен совпадать с package.json)
        () => {  // Стрелочная функция (аналог lambda в C++11)
            insertCode(getMatrixAdditionCode());  // Вызываем функцию вставки
        }
    );

    // Регистрируем команду для вычитания матриц
    const subtractCommand = vscode.commands.registerCommand(
        'third-labwork.insertMatrixSubtraction',
        () => {
            insertCode(getMatrixSubtractionCode());
        }
    );

    // Регистрируем команду для умножения матриц
    const multiplyCommand = vscode.commands.registerCommand(
        'third-labwork.insertMatrixMultiplication',
        () => {
            insertCode(getMatrixMultiplicationCode());
        }
    );

    // Регистрируем команду для обратной матрицы
    const inverseCommand = vscode.commands.registerCommand(
        'third-labwork.insertMatrixInverse',
        () => {
            insertCode(getMatrixInverseCode());
        }
    );

    // Добавляем команды в массив подписок
    // Это нужно для автоматической очистки при деактивации плагина
    context.subscriptions.push(addCommand, subtractCommand, multiplyCommand, inverseCommand);
}

/**
 * Функция вставки кода в редактор
 * @param code - строка с C++ кодом для вставки
 */
function insertCode(code: string): void {  // void — ничего не возвращает
    // Получаем активный редактор (текущий открытый файл)
    const editor = vscode.window.activeTextEditor;
    
    // Проверяем, открыт ли файл (аналог if (editor == nullptr))
    if (!editor) {
        vscode.window.showErrorMessage('Откройте файл для вставки кода!');
        return;  // выходим из функции
    }

    // Вставляем код в позицию курсора
    editor.edit(editBuilder => {  // editBuilder — объект для редактирования
        // editor.selection.active — текущая позиция курсора
        editBuilder.insert(editor.selection.active, code);
    });

    // Показываем уведомление об успехе
    vscode.window.showInformationMessage('C++ код вставлен!');
}

/**
 * Генерирует C++ код для сложения матриц
 * @returns строка с готовым кодом функции
 */
function getMatrixAdditionCode(): string {
    // Используем обратные кавычки `` для многострочного текста
    // Это как R"(...)" в C++11
    return `
/**
 * Сложение двух матриц
 * @param matrixA - первая матрица размером m×n
 * @param matrixB - вторая матрица размером m×n
 * @param m - количество строк
 * @param n - количество столбцов
 * @return новая матрица-результат сложения
 */
vector<vector<double>> addMatrices(const vector<vector<double>>& matrixA, 
                                   const vector<vector<double>>& matrixB) {
    int m = matrixA.size();        // количество строк
    int n = matrixA[0].size();     // количество столбцов
    
    // Проверка размерностей
    if (m != matrixB.size() || n != matrixB[0].size()) {
        throw invalid_argument("Матрицы должны иметь одинаковые размеры!");
    }
    
    // Создаём результирующую матрицу
    vector<vector<double>> result(m, vector<double>(n));
    
    // Складываем элементы
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

/**
 * Генерирует C++ код для вычитания матриц
 * @returns строка с готовым кодом функции
 */
function getMatrixSubtractionCode(): string {
    return `
/**
 * Вычитание двух матриц
 * @param matrixA - первая матрица размером m×n
 * @param matrixB - вторая матрица размером m×n
 * @param m - количество строк
 * @param n - количество столбцов
 * @return новая матрица-результат вычитания (A - B)
 */
vector<vector<double>> subtractMatrices(const vector<vector<double>>& matrixA, 
                                        const vector<vector<double>>& matrixB) {
    int m = matrixA.size();        // количество строк
    int n = matrixA[0].size();     // количество столбцов
    
    // Проверка размерностей
    if (m != matrixB.size() || n != matrixB[0].size()) {
        throw invalid_argument("Матрицы должны иметь одинаковые размеры!");
    }
    
    // Создаём результирующую матрицу
    vector<vector<double>> result(m, vector<double>(n));
    
    // Вычитаем элементы
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

/**
 * Генерирует C++ код для умножения матриц
 * @returns строка с готовым кодом функции
 */
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
    int m = matrixA.size();         // строки первой матрицы
    int k = matrixA[0].size();      // столбцы первой = строки второй
    int n = matrixB[0].size();      // столбцы второй матрицы
    
    // Проверка возможности умножения
    if (k != matrixB.size()) {
        throw invalid_argument("Число столбцов A должно равняться числу строк B!");
    }
    vector<vector<double>> result(m, vector<double>(n, 0.0));
    
    // Умножаем матрицы
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            for (int p = 0; p < k; p++) {
                result[i][j] += matrixA[i][p] * matrixB[p][j];
            }
        }
    }
    
    return result;
}
`;
}

function getMatrixInverseCode(): string {
    return `

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
        // Создаём минор (подматрицу без строки 0 и столбца j)
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

vector<vector<double>> getCofactorMatrix(const vector<vector<double>>& matrix) {
    int n = matrix.size();
    vector<vector<double>> cofactors(n, vector<double>(n));
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            // Создаём минор (без строки i и столбца j)
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
`;
}

export function deactivate() {
    console.log('C++ Matrix Code Generator деактивирован');
}

