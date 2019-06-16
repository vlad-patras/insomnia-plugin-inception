
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
        if (prop.indexOf(placeHolderMessage) >= 0) {
            node[prop.replace(placeHolderMessage, '')] = JSON.stringify(node[prop]);
            delete node[prop];
        }
    }
}

function processJson(jsonStr) {
	var json = JSON.parse(jsonStr);
	processNode(json);
	return JSON.stringify(json);
}

function processBody(body) {
	var placeHolderIndex = body.indexOf(placeHolderMessage);
	
	if (placeHolderIndex == 0) {
		return JSON.stringify(processJson(body.replace(placeHolderMessage, '')));
	} else if (placeHolderIndex > 0) {
		return processJson(body);
	} else {
		return body;
	}
}

module.exports.requestHooks = [
    context => {
		context.request.setBodyText(processBody(context.request.getBodyText()));     
    }
];
