
function activate(context) {
	const container = require('./container');

	const vscode = container.build('vsCodeFactory').getInstance();

	context.subscriptions.push(
		vscode.commands.registerCommand(
			'cmstead.articulate-js.surroundWith',
			() => container.build('surroundWith').applySurround()
		));

	context.subscriptions.push(
		vscode.commands.registerCommand(
			'cmstead.articulate-js.return',
			() => container.build('returnAction').applyReturn()
		));
}

function deactivate() { }

exports.activate = activate;
exports.deactivate = deactivate;
