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

    
    const determinantCommand = vscode.commands.registerCommand(
        'third-labwork.insertMatrixDeterminant',
        handleMatrixDeterminant
    );
    
    context.subscriptions.push(
        addCommand,
        subtractCommand,
        multiplyCommand,
        determinantCommand
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

function handleMatrixDeterminant() {
    insertMatrixFunction('determinant');
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
        
        case 'determinant':
            code = getMatrixInverseCode();
            break;
    }
    editor.edit(function(editBuilder) {

        editBuilder.insert(editor.selection.active, code);
    });
}

function getMatrixAdditionCode(): string {
    return `
    vector<vector<double>> addMatrices(const vector<vector<double>>& matrixA, 
                                    const vector<vector<double>>& matrixB) {
        int m = matrixA.size();
        int n = matrixA[0].size();
        
        if (m != matrixB.size() || n != matrixB[0].size()) {
            return {};
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
    vector<vector<double>> subtractMatrices(const vector<vector<double>>& matrixA, 
                                            const vector<vector<double>>& matrixB) {
        int m = matrixA.size();
        int n = matrixA[0].size();
        
        if (m != matrixB.size() || n != matrixB[0].size()) {
            return {};
        }
        
        vector<vector<double>> result(m, vector<double>(n));
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                result[i][j] = matrixA[i][j] - matrixB[i][j];
            }
        }
        
        return result;
    }

    `;
}

function getMatrixMultiplicationCode(): string {
    return `
    vector<vector<double>> multiplyMatrices(const vector<vector<double>>& matrixA, 
                                            const vector<vector<double>>& matrixB) {
        int m = matrixA.size();
        int k = matrixA[0].size();
        int n = matrixB[0].size();
        
        if (k != matrixB.size()) {
            return {};
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
`;
}

export function deactivate() {}