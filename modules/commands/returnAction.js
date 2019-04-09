function returnAction(
    snippets,
    vsCodeFactory
) {

    function isReturnSnippet(snippetKey) {
        return snippetKey.toLowerCase().includes('return');
    }

    function getSelectionRange(vscode, selection) {
        const startPosition = new vscode.Position(selection.start.line, selection.start.character);
        const endPosition = new vscode.Position(selection.end.line, selection.end.character);

        return new vscode.Range(startPosition, endPosition);
    }

    function getSnippetString(vscode) {
        const snippetKey = Object.keys(snippets).filter(isReturnSnippet)[0];
        const snippet = snippets[snippetKey];
        const snippetString = snippet.body.join('\n');

        return new vscode.SnippetString(snippetString);
    }

    function applySurroundAction(vscode) {
        const activeTextEditor = vscode.window.activeTextEditor;
        const selection = activeTextEditor._selections[0];

        const snippetString = getSnippetString(vscode);
        const selectionRange = getSelectionRange(vscode, selection);

        activeTextEditor.insertSnippet(snippetString, selectionRange)
    }

    function applyReturn() {
        const vscode = vsCodeFactory.getInstance();

        applySurroundAction(vscode);
    }

    return {
        applyReturn: applyReturn
    };
}

module.exports = returnAction;