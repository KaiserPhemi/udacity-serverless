# Serverless TODO

A basic ToDo app built using AWS Lambda & Serverless framework.


## Quick Start
* Clone project: `git clone git@github.com:KaiserPhemi/udacity-serverless.git`
* Run `npm install` to install dependencies in both the `backend` & `client` folders.
* Deploy backend using Serverless framework: `sls deploy --verbose`
* Run `npm start` in client folder.


## Functionality of the application

This application will allow creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.

### TODO items

The application should store TODO items, and each TODO item contains the following fields:

* `todoId` (string) - a unique id for an item
* `createdAt` (string) - date and time when an item was created
* `name` (string) - name of a TODO item (e.g. "Change a light bulb")
* `dueDate` (string) - date and time by which an item should be completed
* `done` (boolean) - true if an item was completed, false otherwise
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to a TODO item

You might also store an id of a user who created a TODO item.

## Technology Stack
* [NodeJs](https://nodejs.org/en/)
* [ReactJs](https://reactjs.org/)
* [Serverless](https://www.serverless.com/)
* [DynamoDB](https://aws.amazon.com/dynamodb/)
* [Cloud Formation](https://aws.amazon.com/cloudformation/)
## Contributor
* [Oluwafemi Akinwa](https://www.linkedin.com/in/kaiserphemi/)