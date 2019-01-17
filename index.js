
const marker = "__JSONInception__";

function placeHolderMessage(encoding) {
    return "value will be encoded as json string " + marker + encoding + "__";
}

const placeHolderRegex = new RegExp(placeHolderMessage('(.*)'));

module.exports.templateTags = [
  {
    name: 'inception_json',
    displayName: 'JSONInception',
    description: 'encode json as json string',
    args: [
      { 
        displayName: 'Encoding',
        type: 'enum',
        options: [
          { displayName: 'String', value: 'string' },
          { displayName: 'Base64', value: 'base64' },
        ],
      },
    ],
    run(context, encoding) {
        
      if (encoding != 'string' && encoding != 'base64') {
        throw new Error('Unsupported encoding "' + encoding + '". Must be string or base64.');
      }
      return placeHolderMessage(encoding);
    },
  },
];

function processNode(node) {
    if (node == null || typeof node != 'object') {
        return;
    }
    for (var prop in node) {
        processNode(node[prop]);
        if (prop.indexOf(marker) > 0) {
            var encoding = placeHolderRegex.exec(prop)[1];
            node[prop.replace(placeHolderRegex, '')] = JSON.stringify(node[prop]);
            delete node[prop];
        }
    }
}

module.exports.requestHooks = [
    context => {
        var body = context.request.getBodyText();
        if (body.indexOf(marker) < 0) {
            return; //fast return if tag is not used
        }
        var bodyJson = JSON.parse(body);
        processNode(bodyJson);
        context.request.setBodyText(JSON.stringify(bodyJson));
    }
];
