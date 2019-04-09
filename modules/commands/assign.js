function assign(
    snippets,
    vsCodeFactory
) {

    function isAssignmentSnippet(snippetKey) {
        return snippetKey.toLowerCase().includes('assignment');
    }

    function getSelectionRange(vscode, selection) {
        const startPosition = new vscode.Position(selection.start.line, selection.start.character);
        const endPosition = new vscode.Position(selection.end.line, selection.end.character);

        return new vscode.Range(startPosition, endPosition);
    }

    function getSnippetString(vscode) {
        const snippetKey = Object.keys(snippets).filter(isAssignmentSnippet)[0];
        const snippet = snippets[snippetKey];
        const snippetString = snippet.body.join('\n');

        return new vscode.SnippetString(snippetString);
    }

    function applyAssignmentAction(vscode) {
        const activeTextEditor = vscode.window.activeTextEditor;
        const selection = activeTextEditor._selections[0];

        const snippetString = getSnippetString(vscode);
        const selectionRange = getSelectionRange(vscode, selection);

        activeTextEditor.insertSnippet(snippetString, selectionRange)
    }

    function applyReturn() {
        const vscode = vsCodeFactory.getInstance();

        applyAssignmentAction(vscode);
    }

    return {
        applyReturn: applyReturn
    };
}

module.exports = assign;