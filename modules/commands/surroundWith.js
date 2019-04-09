function surroundWith(
    snippets,
    vsCodeFactory
) {

    const surroundMap = buildSurroundMap(snippets);

    function containsSelectedBody(line) {
        return line.includes('TM_SELECTED_TEXT');
    }

    function includesSelectionInBody(snippets, snippetKey) {
        const foundLine = snippets[snippetKey].body.find(containsSelectedBody);

        return typeof foundLine === 'string';
    }

    function doesSnippetIncludeSelection(snippetKey) {
        return !snippetKey.toLowerCase().includes('return')
            && includesSelectionInBody(snippets, snippetKey);
    }

    function addSnippetToMap(surroundingSnippets, snippetKey) {
        surroundingSnippets[snippetKey] = snippets[snippetKey];

        return surroundingSnippets
    }

    function buildSurroundMap(snippets) {
        return Object.keys(snippets)
            .filter(doesSnippetIncludeSelection)
            .reduce(addSnippetToMap, {});
    }

    function getSelectionRange(vscode, selection) {
        const startPosition = new vscode.Position(selection.start.line, selection.start.character);
        const endPosition = new vscode.Position(selection.end.line, selection.end.character);

        return new vscode.Range(startPosition, endPosition);
    }

    function getSnippetString(vscode, selectedOption) {
        const snippet = surroundMap[selectedOption];
        const snippetString = snippet.body.join('\n');

        return new vscode.SnippetString(snippetString);
    }

    function createOptionNamesList(surroundMap) {
        const surroundOptionNames = Object.keys(surroundMap);

        surroundOptionNames.sort();

        return surroundOptionNames;
    }

    function applySurroundAction(vscode) {
        const activeTextEditor = vscode.window.activeTextEditor;
        const selection = activeTextEditor._selections[0];

        return function (selectedOption) {
            const snippetString = getSnippetString(vscode, selectedOption);
            const selectionRange = getSelectionRange(vscode, selection);

            activeTextEditor.insertSnippet(snippetString, selectionRange)
        }
    }

    function applySurround() {
        const vscode = vsCodeFactory.getInstance();
        const surroundOptions = createOptionNamesList(surroundMap);

        const quickPickOptions = {
            message: 'Surround Selection With:'
        };

        vscode.window
            .showQuickPick(surroundOptions, quickPickOptions)
            .then(applySurroundAction(vscode));
    }

    return {
        applySurround: applySurround
    };
}

module.exports = surroundWith;