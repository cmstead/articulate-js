function snippets (fs) {
    const currentDir = __dirname;
    let snippetFile = '{}';

    try{
        snippetFile = fs.readFileSync(currentDir + '/../../snippets/articulate-js.json', { encoding: 'utf8' });    
    } catch (e) {
        console.log(e);
    }

    return JSON.parse(snippetFile);
}

module.exports = snippets;