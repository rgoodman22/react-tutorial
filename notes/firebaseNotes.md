# Overview

Google's Firebase is a data storage and static web page hosting service. [The level of service for free](https://www.firebase.com/pricing.html) is relatively generous and more than adequate for most prototype projects.

* This is not a relational database. Your data is one big JSON object. This is simple to say, but [tricky to implement properly](https://courses.cs.northwestern.edu/394/firebase-notes.php#data)
* By default, you don't query for data. You [subscribe to changes in data](https://www.firebase.com/docs/web/guide/retrieving-data.html)
* If you create the database in **test mode**, anyone can read or modify your data.

  * You must define security rules to prevent this. [Security rule behavior](https://courses.cs.northwestern.edu/394/firebase-notes.php#security) can be unintuitive.
* If you create the database in the default **locked mode**, no program can read or modify your data.
* By default, one simple buggy call can complete erase all your data.

  * [Validation rules](https://courses.cs.northwestern.edu/394/firebase-notes.php#validation) can prevent bad data from being entered, but you tend to think of those after the damage is done.
* Binary objects, e.g., images, [are supported but non-trivial](http://stackoverflow.com/questions/13955813/how-can-i-view-and-store-images-in-firebase)

# The Firebase CLI

## Setup

### Create firebase project

You do this with your browser on [the Firebase web console](https://console.firebase.google.com/). Follow [these instructions](https://firebase.google.com/docs/web/setup).

* These instructions go over much more than just creating the firebase project, definitely a good resource.

### Add the Realtime Database to the project

Go to the Firebase project screen and click on the **Database** link on the left. Firebase will offer two options: FireStore and Realtime Database. Pick the Realtime Database.

Firebase will ask if you want to start in **locked** or **test**. Pick **test**. It's not secure but it will let you start writing code to read and write data without writing security rules.

### Data Imports

If you have any data you want to initialize your database to for testing, make a legal JSON file with the data, and [import it into the database](https://support.google.com/firebase/answer/6386780?hl=en).

### Connect to your app

Switch into the directory for your app, and do

<pre>firebase init</pre>

This will ask you several questions. You can just hit enter to accept the default in most cases, except the following:

* What Firebase features do you want? Pick **Database**, and **Hosting** if you'd like to deploy your web app on Firebase
* What Firebase project to connect to? Pick the one you created. If you don't see it, follow [these instructions](https://stackoverflow.com/questions/53366474/new-project-not-showing-on-firebase-cli/53889311#53889311).
* What is your public directory? Enter **build**. *Do not accept the default value "public".*

If you forget to say **build**, Firebase will not send your React code to the web server. You will need to change the value of the key **public** in the file **firebase.json** from "public" to "build" and re-deploy.

### Install the Firebase node module

For React apps, do

<pre>npm install --save firebase</pre>

### Import Firebase into your app

At the top of any file making Firebase calls, add:

<pre>import firebase from 'firebase/app';
import 'firebase/database';</pre>

### Initialize Firebase in your app before using

In **App.js**, add this code to initialize Firebase.

<pre>const firebaseConfig = {
  apiKey: "<em>api-key</em>",
  authDomain: "<em>project-id</em>.firebaseapp.com",
  databaseURL: "https:<em>//project-id</em>.firebaseio.com",
  projectId: "<em>project-id</em>",
  storageBucket: "<em>project-id</em>.appspot.com",
  messagingSenderId: "<em>sender-id</em>",
  appID: "<em>app-id</em>",
};

firebase.initializeApp(firebaseConfig);</pre>

The config data can be retrieved at any time from the Firebase console. See [these instructions](https://support.google.com/firebase/answer/7015592).

None of this data needs to be kept secret. It's OK for this to be in a file on Github.

## Other useful Firebase CLI commands

If you are using Firebase to host your app, then to deploy a new version, do

<pre>npm run build
firebase deploy</pre>

If you want to see what data a Firebase path will retrieve, do

<pre>firebase database:get <em>path</em></pre>

For example, to retrieve the entire JSON data object, do

<pre>firebase database:get "/"</pre>

# Debugging Firebase

## Deployment Problems

There are a few common problems that arise when trying to deploy to Firebase hosting. Often there are no error messages, just a failure for changed code to appear on the Firebase site.

### Public vs. build

By default, the deploy command uploads the directory **public**to Firebase. But React's **npm run build** script assembles your webapp in the directory **build**. If you failed to specify this when running **firebase init**, deploy will upload the wrong code.

Open the file **firebase.json** in your editor. If it says

<pre class="bad-code">"hosting": {
  "public": "public",
  ...</pre>

change it to `"public": "build"`.

### Re-build before re-deploy

The local server managed by **npm run start** is updated every time a file is changed, but the **build** directory is updated only when you run **npm run build**. So you must remember to do that before calling **firebase deploy**.

### Some others

... see firebase notes on 394 page.

# Tracking Firebase calls!!!

Errors in code are always annoying, but errors involving database calls can be lead to major slowdowns, lost data, or unexpected monetary costs. Imagine an endless loop that writes data. Imagine fetching the same data every time a web page is re-rendered.

For that reason, I recommend that you

* Refactor all code that reads or writes data into one file with a few core functions.
* Add logging code (to the console or a file) and basic error checking code to those functions.

Only remove or turn off the logging code when your app database interactions haven't needed any changes for weeks.

# Reading Firebase Data

Suppose our data is a JSON object for a baseball app, that has a list of teams, a list of players, and a list of games that includes what teams were playing and what the scores were. Then an app that wants to show current scores should do something like this:

<pre>firebase.ref("/games").on('value', snap => {
  if (snap.val()) {
    <em>...do something with the games in snap.val()...</em>
  }
}, error => {
  <em>...do something with the error message...</em>
});</pre>

This call to **on()** will download the games data and call the function. **snap.val()** will be the data, or **null** if there is no data.

More importantly, the function will be called again, any time any data under the **/games** path changes. And if there's a problem getting the data, such as a permissions issue the second function will be called, with an error message.

# Writing Data

## Setting data

The simplest is **set()**. Follow a path to where you want to store the data, then call **set()** with the data you want to store. E.g., to store data about a user with the ID **userId**:

<pre>firebase.ref('users').child(userId).set({
  name: 'Mary Smith',
  email: 'msmith@example.com'
});</pre>

Firebase will add the key **userId** if it's not already in the JSON, and then store the object under it.

## Updating Fields

If you want to just update one or more fields in some data without affecting any other fields, use **update()**. E.g., to change a user's email address, but leave any other data about the user alone:

<pre>firebase.ref('users').child(userId).update({
  email: 'mary.smith'@example.com'
})</pre>

## Adding to a list

If you want to add a new object to a list, the first thing to be aware of is that [lists are not first-class citizens in Firebase](https://courses.cs.northwestern.edu/394/firebase-notes.php#arrays-fb). Anything you store that you want to retrieve should have an unchanging path from the root of the database. Being number 4 in a list is not a stable location.

For adding users, there is aunique user ID. But items in many lists don't have an ID. You can tell Firebase to add an object to a list and create an ID for us with **push()**. For example, to add a game to our list of games:

<pre>const gameId = firebase.ref('games').push({
  date: '5/9/2019'
  teams: ['Cincinnati Reds', 'Oakland Athletics'],
  score: [3, 0]
});</pre>

**push()** returns the ID generated, in case you want to store it somewhere for cross-reference. Notice that it is OK to use arrays, as this code does, as long as the data will be retrieved as a whole unit.

## Handling concurrent updates

To handle this, use [transaction()](https://firebase.google.com/docs/reference/js/firebase.database.Reference#transaction) instead of **set()**

You pass **transaction()** a function. That function will be called with the most current data at the location you are trying to update. It will normally be the data you have locally. But it might be something that was added that your code has not received yet. It might even be **null**, so be prepared to handle that by using the local data you have.

Your function should return the new value to store. Firebase will check to see if the data in the cloud is different from what it passed to your function. If so, it will call your function again. If not, it will store your value. In this way, your update function always has the most current value, no matter what order concurrent updates happen in.

So, to properly update our "likes" counter for a team, we should write:

<pre>firebase.ref('teams').child(team.id).transaction(likes => 
  (likes || 0) + 1
);</pre>

The OR expression (likes || 0) is used to return 0 if the **likes** value happens to be **null**.

To cancel a transaction, return **undefined**, i.e., call **return**with no arguments.

> This example of counting likes lets users like things as many times as they want. [This Firebase example](https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions)shows how to avoid that, if you have the ID of the authenticated user.

## Updating state and data

Most of the time, when you save date to a database, you will also need to update some local state with the same information. For example, a user action might update a score that you want to save in a database but also display in the user interface.

Since a global side effect is involved, [useEffect() ](https://courses.cs.northwestern.edu/394/intro-react-notes.php#use-effect)is needed. There are two ways to coordinate updating the score.

* Change the score state, and let a function in **useEffect()**store the score in the database.
* Store the score in the database and let a Firebase subscription, created in **useEffect()**, update the state.

The subscription method is better. It handles updates to shared data involving multiple users, including when a user is logged in twice on two different browsers.

Whatever you do, don't do both methods! You'll get an endless loop of updates.

# Debugging Firebase Locally

You can run a local Firebase database to test your code without touching the real database your deployed application is using.

> This is new technology, likely to change in parts. See [the documentation](https://firebase.google.com/docs/emulator-suite) for current details.

## Install the Firebase Emulators

In a command shell, in your project directory, execute

<pre>firebase init emulators</pre>

This presents a series of menu choices, similar to `firebase init`. The only emulator you need for now is the realtime database. Accept the default answers for the other questions asked.

To run the emulator:

<pre>firebase emulators:start</pre>

This will start all installed emulators.

To see the database, open the URL printed when the emulators started. This is typically [http://localhost:4000/database](http://localhost:4000/database).

You should see an empty database.

## Set up testing data

The local database will be created fresh every time you run the emulator. To have it start with sample data for testing, first create the data in your emulator. You could do this manually with the browser interface, but a better option is to create a JSON file, and then import it with the browser interface.

When the database has what you want, *with the emulators still running*, open a new command shell in your project, and execute

<pre>firebase emulators:export ./src/data</pre>

This will store the data, and any [security](https://courses.cs.northwestern.edu/394/firebase-notes.php#security) and [validation](https://courses.cs.northwestern.edu/394/firebase-notes.php#validation) rules you have created, in the directory **src/data**. You can use any directory you want. You could create multiple data directories, with different test sets.

Now stop the emulator. Start it with

<pre>firebase emulators:start --import=./src/data</pre>

Use the browser to inspect the database. It should have the data you exported.

To make future emulation easy, add this script to your **package.json**

<pre>"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "emulate": "firebase emulators:start --import=./src/data"
},</pre>

Then you can start the emulators with

<pre>npm run emulate</pre>

## Configure your app for local data

The final step is to make your application use the local database when you are in development mode. How to test this depends on whether your developing in React or React Native.

In React, you test using the local Webpack server. You can detect this in your JavaScript code by seeing if the hostname in the current URL is **localhost**. Use that to select the appropriate database URL, like this:

<pre>const dbURL = window.location.hostname === 'localhost' 
  ? 'http://localhost:9000?ns=<em>YOUR_PROJECT_ID</em>'
  : 'https://<em>YOUR_PROJECT_ID</em>.firebaseio.com';

const firebaseConfig = {
  ...
  databaseURL: dbURL,
  projectId: "<em>YOUR_PROJECT_ID</em>",
  ...
};

firebase.initializeApp(firebaseConfig);</pre>

## Test

If you've done the above, then when you are developing code, you can run your application with the emulated database with these commands:

<pre>    npm run emulate
    npm start
  </pre>

> Note: your application will hang until you start the emulators.

# Firebase Data Design

## Json vs. JS object

The rules for JSON are stricter. The following is a legal JavaScript object, but not legal JSON:

<pre>{ id: "jsmith", email: "john.smith@gmail.com" }</pre>

In JSON, keys must strings, so you need to write

<pre>{ "id": "jsmith", "email": "john.smith@gmail.com" }</pre>

When writing JSON by hand, use [a JSON validator](http://jsonlint.com/) to avoid annoying Firebase errors.

When [#saving data to Firebase](https://courses.cs.northwestern.edu/394/firebase-notes.php#writing-fb), Firebase will convert your JavaScript object to legal JSON. But if you are importing a JSON file to initialize a database, it needs to follow the rules above.

## Arrays are not first class citizens

This may seem unintuitive. Arrays are first-class in JSON. And isn't a database at heart an array of objects? In Firebase, the answer is [no](https://firebase.google.com/docs/database/web/structure-data).

A Firebase database is key-value pairs, where values are strings, numbers, and nested key-value pair objects. Keys play a prominent role. For example, if you had a list of users, with ids and emails, a common JSON representation would be

<pre class="bad-code">{
  "users": [{
    "id": "jsmith",
    "email": "john.smith@gmail.com"
  }, {
    "id": "mjones",
    "email": "mary.jones@.gmail.com"
  }]
}</pre>

This is not good Firebase data design. Instead of an array of objects, use an object with appropriate keys for each value, like this:

<pre>{
  "users": {
    "jsmith": { "email": "john.smith@gmail.com" },
    "mjones": { "email": "mary.jones@.gmail.com" }
  }
}</pre>

Another example might be if you have a list of messages. Don't make an array of them. Make an object whose keys are the message ID or message timestamp.

You can have an array of primitives, e.g., a list of numbers or a list of email addresses, but think about whether these really should have more contentful keys than just "0", "1", and so on.

When working with JSON structured like the above, the JavaScript methods [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), [Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values), and [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) are incredibly helpful. For example, if the variable **json** contains the flattened user data example above, then this JSX expression would calculate an array of "mailto" links, suitable for inserting into a web page:

<pre>Object.entries(json.users).map(([id, user]) => (
  <a href={`mailto:${user.email}`}>{id}</a>
));</pre>

## Readings on Firebase data design

* [basic data design](https://www.firebase.com/docs/web/guide/understanding-data.html)
  * They use the relational term "denormalize" informally to mean "redundantly repeat information to improve performance."
* [Example code and applications using Firebase from web pages](https://firebase.google.com/docs/samples/#web)

# Security Rules

Security rules are needed to prevent unauthorized changes of data. It's trivial to reverse engineer how the JavaScript in a web page calls Firebase. The only way to keep a user from changing data that is not theirs is to write security rules.

When you first create a database, it's common to use these rules:

<pre>{
"rules": {
  ".read": true,
  ".write": true
}</pre>

*These rules let any user change in a data.* This is fine when the only users are the developer team, but an invitation to disaster in production.

## Adding Security

The first thing to do is look at your actual data, and identify what parts different users should be able to read or write. As a simple example, suppose you have a database of teams.

<pre>{
  "teams": {
    "blue": { "name": "Blue Devils" },
    "green": { "name": "Green Ghosts" },
    "red" { "name": "Red Wings" }
  },
  "users": {
    "jsmith": { "email": "john.smith@gmail.com", "team": "green" },
    "mjones": { "email": "mary.jones@.gmail.com", "team": "blue" },
    "bbrown": { "email": "bill.brown@.gmail.com", "team": "blue" },
  },
  "admins": {
    "mjones": true
  }
}</pre>

Firebase data is accessed by *paths*, e.g., `users` gets all the users, and `teams/blue/name` gets the full name of the Blue team. You define security rules by the paths that a user can and can't use to read and write data.

Here's a table of security rules, in English, and in path terms.


| Rule in English | Path equivalent |
| - | - |
| Anyone can see the list of teams | path`teams` is readable, even if not authenticated |
| Only authenticated users can see the user data | path`users` should only be readable for authenticated users |
| A user can change their personal data | path`users/<<em>user_id</em>>` should only be writable for the user with that user id |
| Admins can read and write anything | the empty root path is writable by an authenticated user who is an admin |

Notice that the second last rule has a variable element in it.

You implement these rules in Firebase in the file **database-rules.json** in your Firebase project. The rules are given as a JSON tree. Here are rules for the above policies:

<pre>{
  "rules": {
    ".read": "auth != null && root.child('admins').hasChild(auth.uid)"
    ".write": "auth != null && root.child('admins').hasChild(auth.uid)"
    "teams": {
      ".read": true
    },
    "users": {
      ".read": "auth != null",
      "$user_id": {
        ".write": "auth !== null && author.uid === $user_id"
      }
    }
  }
}</pre>

When your code sends a query to Firebase, Firebase follows the keys in the query path down this rule tree, as follows:

* If the key is in the rules JSON, get the object. If there is a *$ wildcard variable* like **$user_id**, set the variable to the path key, and get the object. If the key is not in the JSON, stop and deny access.
* If the operation is a read and the rules object found has a `".read"` key, or the operation is a write and the rules object has a `".write"` key, evaluate the expression for the key.
  * If it is true, stop and allow access.
  * Otherwise use the next key in the query path.
* If there are no more keys in the path, deny access

The expressions for `".read"` and `".write"` keys are either true, false, or a string containing a JavaScript expression that evaluates to true or false. The expressions can refer to wildcard variables and [predefined variables](https://firebase.google.com/docs/database/security/securing-data#predefined_variables). The rules above use the predefined variable `auth`. That holds the authenticated user, if any. `auth.uid` is the user's ID. The rules also use the predefined variable `root`. That holds a database reference. `root.child(<em>path</em>)` can be used to look up data about the user, among other things.

Here's how the above rules work for different paths for different authenticated users:


| Path | User | Read? | Write? |
| - | - | - | - |
| teams | none | true | false |
| teams | jsmith | true | false |
| teams | mjones | true | true |
| users | none | false | false |
| users | jsmith | true | false |
| users/jsmith | none | false | false |
| users/jsmith | jsmith | true | true |
| users/jsmith | bbrown | true | false |
| users/jsmith | mjones | true | true |

For more on the kinds of rules you can write, see [the documentation](https://firebase.google.com/docs/database/security/securing-data).

## Debugging Security Rules

There are two ways to test and debug your security rules. For automated testing, you write unit tests Node with [the @firebase/testing module](https://www.npmjs.com/package/@firebase/testing). That defines an object that lets you load database rules into a local emulated database. For details, see [this documentation](https://firebase.google.com/docs/database/security/test-rules-emulator).

You can do manual testing with [the Rules Playground](https://firebase.google.com/docs/database/security/resolve-insecurities#simulator) under the **Rules** section of the Firebase database dashbboard. This lets you define rules and test paths before saving the rules. You can test with and without an authenticated user.

## Readings on Security Rules

* [basic security concepts](https://firebase.google.com/docs/database/security)
* [Christopher Esplin&#39;s post on working with security rules](https://medium.com/@ChrisEsplin/firebase-security-rules-88d94606ce4a)

# Validation Rules

Rules can also be used to validate data before it is stored. This is needed to prevent data corruption. Buggy code can easily corrupt or completely erase data. Once the JSON tree is corrupted, recovery is often impossible. Lost data is lost. There is no undo.

The rules below add some basic validation to avoid storing empty data in our team database, using the predefined variable `newData`. `newData` holds the data that is going to be stored at a location.

<pre>    "rules": {
      ".read": "auth != null && root.child('admins').hasChild(auth.uid)"
      ".write": "auth != null && root.child('admins').hasChild(auth.uid)"
      "teams": {
        ".read": true,
        <strong>"$team_id": { 
          "name": "newData.isString() && newData.val().length > 0"
        }</strong>
      },
      "users": {
        ".read": "auth != null",
        "$user_id": {
          ".write": "auth !== null && author.uid === $user_id",
          <strong>"email": "newData.isString() && newData.val().length > 0",
          "team": "newData.isString() && root.child('teams').hasChild(newData.val())"</strong>
        }
      }
    }
  }</pre>

These additions make sure that

* a team name must be a non-empty string
* a user's email must be a non-empy string
* the team given for a user must be one of the teams in the database

A Firebase write operation will fail if it any of these tests returns false.

## Readings on validation rules

* [examples of validation rules](https://firebase.google.com/docs/rules/data-validation#database)
