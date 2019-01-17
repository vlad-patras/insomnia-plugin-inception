
const placeHolderMessage = "value will be encoded as json string __JSONInception__";

module.exports.templateTags = [
  {
    name: 'inception_json',
    displayName: 'JSONString',
    description: 'encode json as json string',
    args: [],
    run(context) {
      return placeHolderMessage;
    },
  },
];

function processNode(node) {
    if (node == null || typeof node != 'object') {
        return;
    }
    for (var prop in node) {
        processNode(node[prop]);
        if (prop.indexOf(placeHolderMessage) > 0) {
            node[prop.replace(placeHolderMessage, '')] = JSON.stringify(node[prop]);
            delete node[prop];
        }
    }
}

module.exports.requestHooks = [
    context => {
        var body = context.request.getBodyText();
        if (body.indexOf(placeHolderMessage) < 0) {
            return; //fast return if tag is not used
        }
        var bodyJson = JSON.parse(body);
        processNode(bodyJson);
        context.request.setBodyText(JSON.stringify(bodyJson));
    }
];
