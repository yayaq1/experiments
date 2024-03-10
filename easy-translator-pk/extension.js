// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "easy-translator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('easy-translator.easyTranslator', function () {
		// The code you place here will be executed every time your command is executed
		
		const editor = vscode.window.activeTextEditor;
		const selectedText = editor.selection
		const text = editor.document.getText(selectedText)


		const data = JSON.stringify([
			{
				"Text": text,
			}
		]);
		var XMLHttpRequest = require('xhr2');
		const xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		
		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === this.DONE) {
				console.log(this.responseText);
				vscode.window.showInformationMessage(this.responseText);
				editor.edit(builder => builder.replace(selectedText, this.responseText))
			}
		});
		
		xhr.open("POST", "https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=de&api-version=3.0&profanityAction=NoAction&textType=plain");
		xhr.setRequestHeader("content-type", "application/json");
		xhr.setRequestHeader("X-RapidAPI-Key", "YOUR-RAPIDAPI-KEY");
		xhr.setRequestHeader("X-RapidAPI-Host", "microsoft-translator-text.p.rapidapi.com");
		
		xhr.send(data);






		
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hi guys, subscribe!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}