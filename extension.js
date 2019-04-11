
function activate(context) {
	const container = require('./container');

	const vscode = container.build('vsCodeFactory').getInstance();

	context.subscriptions.push(
		vscode.commands.registerCommand(
			'cmstead.articulate-js.assign',
			() => container.build('assign').applyReturn()
		));

	context.subscriptions.push(
		vscode.commands.registerCommand(
			'cmstead.articulate-js.convertVariableType',
			() => container.build('convertVariableType').applyConversion()
		));

	context.subscriptions.push(
		vscode.commands.registerCommand(
			'cmstead.articulate-js.return',
			() => container.build('returnAction').applyReturn()
		));

	context.subscriptions.push(
		vscode.commands.registerCommand(
			'cmstead.articulate-js.surroundWith',
			() => container.build('surroundWith').applySurround()
		));

}

function deactivate() { }

exports.activate = activate;
exports.deactivate = deactivate;
