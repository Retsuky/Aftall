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

		const filename = editor.document.fileName; // Получение полного пути к файлу
		const lastIndName = filename.lastIndexOf('.'); 
		const cutName = filename.split("").splice(lastIndName+1,filename.length);
		const format = cutName.join("") // Получение формата файла;
		const declineFormat = ["py", "js", "rb", "swift", "kt", "kts", "go", "ts", "lua", "html", "md"] // Языки, не требующие ;
		/*
		if (filename) {
            vscode.window.showInformationMessage(
                `shortname = ${format}`
            );
        }
			*/
			
		if (!declineFormat.includes(format)){ // Если язык требует ;

		const position = editor.selection.active; // Активная строка
		const activeLineText = editor.document.lineAt(position.line).text; // Текст строки по выделению
		
		const lineSplitted = activeLineText.split(""); // Разделенная активная строка
		const lastWord = lineSplitted[lineSplitted.length - 1]; // Последний символ в активной строке
		const preLastWord = lineSplitted[lineSplitted.length - 2]; // Предпоследний символ в активной строке;
		const firstWord = activeLineText.trim().split("")[0];
		

		const symbols = ["{", "}", "[", "]", ":", ";", ",", " ", undefined, "*", "/", "<", ">"]; // Массив с символами, после которых не требуется ;

		if(!symbols.includes(lastWord) && preLastWord !== "," && firstWord !== "@"){ // Если последний символ строки не находится в массиве, не требующем ; и предпоследний символ не ,
			editor.edit((editBuilder) => { // Изменение строки
				editBuilder.insert(position,";"); // Вставка ; после последнего сиимвола
			})
		}
		
		/*
		// Показываем текст строки (Для проверки текста в активной строке)
		vscode.window.showInformationMessage(`Выбрана строка: ${lineSplitted} `);
		*/
		}
		
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
