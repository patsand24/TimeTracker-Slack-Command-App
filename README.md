# Time Tracker Slack Slash Command App

The Time Tracker App is built utilizing the Slack API to use custom slash commands to Clock In and Clock Out for your shift/work day. The project utilizes mongodb to persist data and is built using Node and Express on the server side. React was also used to create a client facing side that updates as slash commands are inputed.

# To Get Started!

  - Clone the repo into your local environment.
  - cd into the folder you cloned into and run npm install
  ```sh
$ cd TimeTracker-Slack-Command-App
$ npm install 
```
To run the project:
  - run npm start from the top level folder
```sh
$ npm start
```
  - cd into client folder and run npm start
  ```sh
$ cd TimeTracker-Slack-Command-App/client
$ npm install 
$ npm start
```

Slack:
- Open slack and download the TimeTracker-Slack-Command-App from slack to add the integration to your specified channel
- To clock in type: 
```/clockin```
- To clock out type: 
```/clockout```
- Slack will display the time clocked in and out and will also throw an error if you are attempting to clocked in while you are already in and vice versa.

Client Side:
- Running npm start in the client folder launched a React App on a localhost specified in the command line. Open this in your browser to see the client app.
- It will update in real time as the commands are executed in slack.
- You can also clock in and out from the client facing app.