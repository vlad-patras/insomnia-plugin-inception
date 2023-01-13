# Inception plugin for Insomnia
Plugin for Insomnia to encode json within json.
The name **inception** is a pop culture reference to the movie with the same title where people dream within a dream. 
[Insomnia](https://github.com/getinsomnia/insomnia) is a REST/HTTP client.

## Use case
Many APIs are "envelope" APIs, that is they have a JSON model/schema and can carry a user-defined payload as a string value. Often this payload is also a JSON and needs to be encoded/escaped as a plain JSON string, becoming difficult to read and edit.

This plugin allows writing un-encoded JSON in the body editor to benefit from features like syntax highlighting and beautify.

## Installation
Inception plugin can be installed like any other plugin: [Managing Insomnia Plugins](https://support.insomnia.rest/article/26-plugins#managing-plugins).
The node package name is **insomnia-plugin-inception**.

## Usage
Place the **JSONString** [template tag](https://support.insomnia.rest/article/40-template-tags) anywhere in the name of the property which needs encoding.

This is an example to publish a message with JSON payload in [RabbitMQ Management API](https://cdn.rawgit.com/rabbitmq/rabbitmq-management/v3.7.14/priv/www/api/index.html):

![body editor](docs_body_editor.PNG)

When the request is sent the property is encoded:

![body request](docs_body_request.PNG)
