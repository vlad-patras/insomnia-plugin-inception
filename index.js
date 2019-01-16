const msg_json = "inception: json object following the tag will be encoded as json string";

module.exports.templateTags = [
  {
    name: 'inception',
    displayName: 'Inception',
    description: 'encode json in json',
    args: [
      {
        displayName: 'Format',
        type: 'enum',
        options: [
          { displayName: 'Json', value: 'json' },
        ],
      },
    ],
    run(context, format) {

      if (format === 'json') {
        return msg_json;
      } else {
        throw new Error('Unsupported fromat "' + format + '". Must be json.');
      }
    },
  },
];

module.exports.requestHooks = [
    context => {
		var body = context.request.getBodyText();
		var cursor = body.indexOf(msg_json);
		while (cursor > 0) {
			var start = cursor;
			cursor = body.indexOf("{", cursor + msg_json.length);
			var balance = 1;
			while (balance > 0 && cursor > 0 && cursor < body.length) {
				++cursor;
				if (body.charAt(cursor) == "{") {
					++balance;
				} else if (body.charAt(cursor) == "}") {
					--balance;
				}
			}
			var json = JSON.stringify(body.substring(start + msg_json.length, cursor + 1));
			body = body.substring(0, start) + json + body.substring(cursor + 1, body.length);
			cursor = body.indexOf(msg_json, start + json.length + 1);
		};
		context.request.setBodyText(body);
	}
];