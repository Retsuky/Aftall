const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context;
 */

// Функция запуска
function activate(context) {
	const disposable = vscode.commands.registerCommand('Aftall', async function () {
		
		const editor = vscode.window.activeTextEditor; // Активное текстовое окно

		if (!editor) {
		  vscode.window.showInformationMessage('Нет активного текстового редактора!'); // Если текстовое окно не открыто
		  return;
		}

		const position = editor.selection.active; // Активная строка
		const activeLineText = editor.document.lineAt(position.line).text; // Текст строки по выделению
		
		const lineSplitted = activeLineText.split(""); // Разделенная активная строка
		const lastWord = lineSplitted[lineSplitted.length - 1]; // Последний символ в активной строке
		const preLastWord = lineSplitted[lineSplitted.length - 2]; // Предпоследний символ в активной строке
		
		const symbols = ["{", "}", "[", "]", ":", ";", ",", " ", undefined, "*", "/", "<", ">"]; // Массив с символами, после которых не требуется ;

		if(!symbols.includes(lastWord) && preLastWord !== ","){ // Если последний символ строки не находится в массиве, не требующем ; и предпоследний символ не ,
			editor.edit((editBuilder) => { // Изменение строки
				editBuilder.insert(position,";"); // Вставка ; после последнего сиимвола
			})
		}

		/*
		// Показываем текст строки (Для проверки текста в активной строке)
		vscode.window.showInformationMessage(`Выбрана строка: ${activeLineText} `);
		*/
		
		await vscode.commands.executeCommand('type', { text: '\n' }); // Сохранение стандартной функции Enter
	}); 

	context.subscriptions.push(disposable);
}



// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
