# React Notes

This page is a primary resource for the [Quick, React!](https://courses.cs.northwestern.edu/394/intro-react.php) tutorial. Unlike many examples of React code online, this page takes advantage of modern JavaScript coding style, functional components, and React Hooks.

## Starting Points

### Build Components Not Pages

Traditional web sites have multiple pages and links.In React, you build a Single Page App (SPA) by defining one page as a set of nested HTML components. As users interact with the page, JavaScript adds (mounts) and removes (unmounts) components.

A single-page application is implemented in React by having **index.html** use one line of JavaScript to insert a React component into the page. The name **App**is conventionally used for this component.

The root component is normally named **App**.

```
const App = () => (
  <div>
    Hello, World! It's { new Date().toLocaleTimeString() }!
  </div>
);
```

### Components are just functions

A component is just a function that returns HTML, using JSX. That means you can keep components simple by defining subcomponents. For example, you could refactor the HTML for "Hello, World!" into its own component.

Components must be capitalized to be properly recognized by React.

Do not use the old-style **React.Component** class.

```
const Hello = () => (
<div>
  Hello, World! It's { new Date().toLocaleTimeString() }!
<div>

const App = () => (
  <div>
    <Hello />
  </div>
);
```

### Change State, not HTML

In React you do not change a web page by changing its HTML. Instead, when something needs to change, you update the value of [a state variable](https://courses.cs.northwestern.edu/394/intro-react-notes.php#react-state) you have created. This causes React to re-run your components. This is called **rendering**.

```
const App = () => {
  const [on, setOn] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setOn(!on)}>
        {on ? 'On': 'Off'}
      </button>
    </div>
  );
};
```

### Modularization

In React files, you do not load your scripts with **<script src="...." />**. You use **import**.

```
import React from 'react';
import Hello from 'Hello';
```

### Importing Assets

**create-react-app** apps can also use**import** to manage static assets such as CSS and image files.

More on [static assets](https://webpack.js.org/guides/asset-management/).

## JSX Syntax

React is unusual in that it lets you embed HTML inside JavaScript. This is call JSX syntax. When you run **npm run start** or **npm run build**, they replace all JSX with regular JavaScript code that builds the desired HTML.

There are a few rules to keep in mind when writing JSX.

More on [JSX](https://reactjs.org/docs/introducing-jsx.html).

### Expressions in JSX are limited

Curly braces in JSX can contain a single expression. [a statement](http://2ality.com/2012/09/expressions-vs-statements.html), such as **for** or **if**statement, are not allowed.

The expression must return a [primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive), a JSX component, or a list of components. Anything else will cause a build-time error.

### JSX expressions should be simple

Avoid putting very complex expressions inside JSX. Do complex logic outside the JSX, store results in **const** variables, and use the variables in the JSX. That's easier to read and debug.

Put parentheses around multi-line JSX forms.

### A few HTML attributes must change

Avoid putting very complex expressions inside JSX. Do complex logic outside the JSX, store results in **const** variables, and use the variables in the JSX. That's easier to read and debug.

Put parentheses around multi-line JSX forms.

### Lists of components need keys

In order to efficiently update just the changed items in dynamic lists of components, React requires each component have a unique and stable **key** attribute.

More on [list keys](https://reactjs.org/docs/lists-and-keys.html).

## React State

React was designed and refined to avoid common errors in managing the state of a user interface. Most of the challenges in learning React come from not understanding what state is and how it works. Here are some key concepts often misunderstood.

### State: what you use to cause re-rendering

To make something on screen dynamic, create a state variable for it.

### Common things that need state

**Visual feedback for user interface actions:** a clicked checkbox, a selected menu item, text typed into a field, an open modal dialog box

**Retrieved data:** data read from a file, data retrieved from a database, data fetched from a third-party service

**Temporal events:** a timer update, a network event

### React State is Temporary

React state is just data stored in JavaScript data structures. If a page is reloaded, all JavaScript, and hence all React state, is reset.

If you have data you want to persist over page reloads, you need to (1) store that data somewhere else, and (2) use [useEffect()](https://courses.cs.northwestern.edu/394/intro-react-notes.php#use-effect) to re-initialize your React state to the stored data.

### Create state with useState()

You create a state container for a component with **useState()**. Import **useState**from React, like this:

<pre>import React, { useState } from 'react';</pre>

Call **useState()** at the top level of the component that needs the state, like this

<pre>const App = () =>{
  const [counter, setCounter] = useState(0);
  ...</pre>

This code [assigns ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)**counter** to the state's current value, and **setCounter** to that state's update function.

### useState() updates

The most important property of

<pre>const [counter, setCounter] = useState(0);</pre>

is that it creates a new state object *only if it does not already exist*.

The first time **useState(0)** is called, it will create a state object in an internal table, and initialize it to zero.

Every time **useState(0)** is called, it returns a list of two values: whatever is stored in the state object, and the function to update that state object.

### Create separate states for separate purposes

Don't put unrelated state in one object, like this:

<pre class="bad-code">const App = () => {
  const [data, setData] = useState({ name: '', score: 0 });
  ...
}</pre>

This complicates updating just the score, especiallly since **date.score = 10;** [won&#39;t work](https://courses.cs.northwestern.edu/394/intro-react-notes.php#never-mutate-state).

Createa separate states instead:

<pre>const App = () => {
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  ...
}</pre>

### State updates do not affect the current rendering

If you have written

<pre>const [clicks, setClicks] = useState(0);</pre>

calling **setClicks(5)** *does not*reset **clicks** to 5! **clicks**remains whatever value **useState(0)** returned for it.

Only after React has finished rendering all components does it check to see if any states in the table have changed. If so, it re-renders. Now **useState(0)** will return the value 5 that was stored on the previous cycle.

## Side-effects in React

Side effects are a common source of hard-to-debug problems. They are even worse in web applications with multiple components and asynchronous user and network events. React Hooks were designed to manage side effects better.

### Examples of side effects

Changing the value of [a state variable](https://courses.cs.northwestern.edu/394/intro-react-notes.php#react-state) is a side effect, such as updating a counter created with **useState()**.

Interacting with the user is a side effect, such as showing a modal dialog.

Changing something outside a component is a side effect, such as setting **document.title**, or saving something in **localStorage**.

Calling a network service is a side effect, such as getting data from Google Maps or Yelp, or subscribing to data from Firebase.

### Avoid side effects during rendering

React renders your user interface by running your app component functions to generate HTML. If any of those functions have side effects, then the HTML generated before a side effect may be inconsistent with HTML generated afterwards. This is a prime source of bugs.

To avoid this, any code with side effects should be inside [a function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)that is executed outside the rendering phase. Fortunately, this is easy to arrange.

### Side effects inside user event handlers are fine

A side effect inside code to handle user actions such as **onClick** is fine. The side effect will not occur during rendering.

### Put side effects not triggered by user actions inside useEffect()

Import **useEffect** from React:

<pre>import React, { useEffect, useState } from 'react';</pre>

Call **useEffect()** at the top level of your component with a function to do the side effect after rendering has finished. For example, to put the user name in the browser titlebar:

```
const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (user) document.title = `Page for ${user.name}`;
  }, [user]);
  return (
    <h1>Hello, { user ? user.name : 'guest' }!</h1>
  );
};
```

### Specify dependencies to avoid repeated useEffect calls

If you do not provide a second argument to **useEffect()**, React will call the function passed on every render. This is rarely what you want. If that function calls a cloud database, it can trigger so many calls that your app gets banned!

The second argument to **useEffect()**should list every variable declared by the component that is used in the function. This tells React to call the function only when at least one of those variables has changed value.

If the second argument is an empty array, React will call the function just once, when the component is first used.

The [ESLint plugin for React Hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) will warn you if you don't include the correct variables.

### Don't put useEffect inside a conditional

React keeps track of states and effects based on the order in which **useState()**and **useEffect()** are called. Therefore those functions need to be called consistently on every rendering cycle.

### Nest async function calls in useEffect()

**await** can only be used in **async**functions, but **async** functions can not be passed directly to **useEffect()**. Instead define a normal function that calls your **async/await** code.

Example: here's a basic version of code to asynchronously load JSON from a URL and store it in a state variable.

<pre id="basic-fetch" class="soso-code">const [data, setData] = useState();
useEffect(() => {
  const loadData = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
  }

  loadData();
}, [url]);</pre>

This code works but doesn't handle errors, delays, or cancelations.

### Catch errors in state

[The basic code to fetch data](https://courses.cs.northwestern.edu/394/intro-react-notes.php#basic-fetch) doesn't handle delays or errors in fetching data. If you want the app to display information about such issues, create state variables for them:

<pre>const [loading, setLoading] = useState(false);
const [errorText, setErrorText] = useState(null);
const [data, setData] = useState(null);

useEffect(() => {
  const loadData = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setErrorText(response.statusText);
        return;
      }
      const json = await response.json();
      setLoading(false);
      setData(json);
    }
    catch (e) {
      setErrorText(error.message);
    }
  };

  loadData()</pre>

### Use cleanup function to cancel actions or cancel subscriptions

[The basic code to fetch data](https://courses.cs.northwestern.edu/394/intro-react-notes.php#basic-fetch) doesn't handle the fairly common case where a request for data should be canceled because the user has chosen to do something else.

You can cancel asynchronous state updates by having a local variable that says whether the component is still active. You set this variable by returning *a cleanup function* from **useEffect()**. React runs functions returned by **useEffect()**when the component is removed from the current page. Anything can go in these cleanup functions.

The cleanup function sets a flag that can be checked to see if the component is still active. The cleanup function is only called when the component is removed.

<pre id="basic-fetch">const [data, setData] = useState({});
useEffect(() => {
  const active = true;
  const loadData = async () => {
    const response = await fetch(url);
    const json = await response.json();
    if (active) setData(json);
  }

  loadData();
  return () => { active = false; };
}, [url]);</pre>

[The Firebase RealTime Database](https://courses.cs.northwestern.edu/394/firebase-notes.php) lets you subscribe to changes in a cloud-based JSON object. A subscription is a bit of JavaScript code that listens for changes to the database. It's something you want to stop doing if the relevant component is no longer active. You can do this by canceling the listener in a cleanup function:

<pre>const [data, setData] = useState(null);
const [errorText, setErrorText] = useState(null)
useEffect(() => {
  const handleData = (snap) => {
    if (snap.val()) 
      setData(snap.val());
  }
  db.on('value', handleData, error => setErrorText(error.message));
  return () => { db.off('value', handleData); };
}, []);</pre>

# QuickReact

## 2: Showing a list of courses

Our new **App** creates two component: **Banner** and **CourseList**. It passes the title to the banner and the list of courses to the course list, using HTML attributes.

> Component names must be capitalized, so React can tell them apart from normal HTML such as **div** and **span**.

Component are just functions you define to return JSX. When React sees a component in JSX, it calls the function with the same name. Whatever the function returns replaces the component in the JSX that called it.

[More on functional components](https://courses.cs.northwestern.edu/394/intro-react-notes.php#functional-components).

React collects any attributes attached to a component into a *props* object, and passes that object to the function. The keys of the object are the attributes in the component call, and the values are the attribute values. So 

<pre><Banner title={ schedule.title } /></pre>

means the function **Banner** will be passed the props object `{ "title": "CS Courses for 2018-2019" }`.

> Do not use the attribute **children**.[**props.children** has a special purpose in React.](https://reactjs.org/docs/jsx-in-depth.html#functions-as-children)

We could define **Banner** like this:

<pre>const Banner = props => (
  <h1>{props.title}</h1>
)</pre>

But modern JavaScript lets you use *destructuring* syntax to get the values you want from an object. This makes the parameter list explicit about what the function expects to receive.

```
const Banner = ({ title }) => (
  <h1>{ title }</h1>
);
```
