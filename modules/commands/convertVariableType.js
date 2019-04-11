function convertVariableType(
    astHelper,
    coordsHelper,
    parser,
    vsCodeHelperFactory
) {

    function isVariableDeclaration(node) {
        return node.type === 'VariableDeclaration';
    }

    function getNearestVariableDeclaration(sourceAst, selectionAstCoords) {
        let foundNode = null;

        astHelper.traverse(sourceAst, {
            enter: function (node) {
                if (
                    isVariableDeclaration(node)
                    && astHelper.coordsInNode(selectionAstCoords, node)
                ) {
                    foundNode = node;
                }
            }
        });

        return foundNode;
    }

    function applyConversion() {
        const vsCodeHelper = vsCodeHelperFactory.getHelperInstance();
        const sourceLines = vsCodeHelper.getSourceLines();
        const selectionCoords = vsCodeHelper.getSelectionCoords();

        const sourceAst = parser.parseSourceLines(sourceLines);
        const selectionAstCoords = coordsHelper.coordsFromEditorToAst(selectionCoords);

        const nearestVariableDeclaration = getNearestVariableDeclaration(sourceAst, selectionAstCoords);
    }

    return {
        applyConversion: applyConversion
    };
}

module.exports = convertVariableType;