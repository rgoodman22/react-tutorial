# JavaScript Notes

## Const, let, var

Originally JavaScript had one keyword to introduce a new variable: **var**. Most JavaScript code you see online uses it. But modern style recommends **const** for most code, **let**otherwise, and **var** never.

**const** declares a variable with a value. An error will occur if code tries to re-assign the variable. Therefore, when a developer sees a **const**, they know what the variable holds for the rest of the code. This makes code maintenance much simpler. It also catches accidental assignments, e.g., when a variable name is mistyped.

By restricting re-assignment, **const** encourages a functional rather than imperative programming style. This also makes maintenance easier.

Rarely, you may need a variable that can be reassigned, for example, in a classic **for**loop. In that case, use **let**.

**let** variables have narrower scope. The scope of the loop variable **i** in the code above is just the **for** loop. If you used **var** instead, the scope of **i** would be the entire function in which the **for** appears.

## Make Strings with templates

Modern JavaScript provides template literals. These are string created using backquotes that let you embed data directly. The above becomes

<pre>const describeLine = (x1, y1, x2, y2) => (
`The line goes from (${x1}, ${y1}) to (${x2}, ${y2})`
)</pre>

## Prefer arrow function syntax

Functions have become more and more central to JavaScript programming. For this reason, an alternative more compact and semantically simpler way of defining functions was added to JavaScript.

Here are two traditional ways to define a function to square numbers:

<pre>function square(x) { return x * x; }

const square = function (x) { return x * x; }</pre>

The first is a *function declaration*. It is not an expression with a return value. It declares the definition of **square**.

The second is an assignment statement, with a *function expression* on the right-hand side. The value of the expression is a function object that is stored as the value of the variable **square**.

Function expressions become more useful with higher-order functions like **map**. The following expression takes a list of numbers and return a list of their squares, without needing to define a **square** function first.

<pre>numbers.map(function(x) { return x * x; })</pre>

This kind of code happens a lot, so arrow notation was created to make the above code even simpler. Here's one way to do the above with arrow notation:

<pre>numbers.map((x) => { return x * x; })</pre>

But this can be even simpler. There are two common cases that have a simpler syntax:

* If there is exactly one simple parameter variable, it can be written without parentheses.
* If the body is just a **return** expression, the body can be written without the braces and **return**.

So the list of squares expression can be written as just

<pre>numbers.map(x => x * x)</pre>

There is one important difference between functions created with arrow expressions and functions created with **function** expressions. When a function created with a **function**expression is called, **this** is bound to the "execution context". That does not happen for arrow functions. This difference only matters if you use JavaScript classes or object methods.

## User array iterative methods

### Make a list from a list

Suppose you have a list **members** of data about members of a club, where a single member object looks like this:

<pre>{ name: { first: 'John', last: 'Smith' }, email: 'jsmith@example.com', ... }</pre>

We can get a simple list of member names, in the form "Smith, John", in one line, using the array **map()** method:

<pre>members.map(member => `${member.last}, ${member.first}`);</pre>

Most uses of **map()** look like this. Occasionally, you want to map over two lists in parallel. To do this, you can take advantage of the fact that **map()** actually calls the function with two arguments for each element of a list: the element and its zero-based position in the list. We can use that position as an index to get the corresponding element in another list.

For example, to define **makePairs(lst1, lst2)** to take two lists and return pairs of corresponding elements:

<pre>const makePairs = (lst1, lst2) => (
  lst1.map((x1, i) => [ x1, lst2[i] ])
);</pre>

### Make a Sublist

Suppose we want to define **activeMembers(members)** to take a list of members and returns the ones who are active.

The array method **filter()** is designed for this. Like **map()**, it takes a function and calls that function with each element of the list. **filter()** returns a list of all elements of the original array for which the function returned a "truthy" value, i.e., not false, null, zero, "", undefined, or NaN.

So our **activeMembers(members)** is just

<pre>const activeMembers = members => (
  members.filter(member => member.isActive)
);</pre>

This is far simpler than the corresponding **for** loop version.

### Find something in a list


The array **find()** method takes a function. It returns the first element in the array that makes the function return a truthy value. So, to define **getOfficer()** to take a role and a list of members, and return the member with that role, if any, we write

<pre>const getOffcice = (role, members) => (
  members.find(member => member.role === role)
);</pre>

### To collect a value

The array method **reduce()** implements this aggregation algorithm. All you need to give it is the initial value and a function to update the result. The function given is passed four arguments: the current result, an element of the list, the index of that element, and the list. Normally you just specify and use the first two arguments.

The key to using **reduce()** is the update function. It should always return a value. It should never return undefined. For example, here's how to count the active members with **reduce()**:

<pre>members.reduce((count, member) => member.isActive ? count + 1 : count, 0)</pre>

The following code would not work

<pre class="bad-code">members.reduce((count, member) => { if (member.isActive) return count + 1; })</pre>

## Asynchronous code

Asynchronous code is tricky. The goal is to wait for some data without stopping the normal execution of a program. For example, while getting data from a server, or doing a complex calculation, you do not want a web app to freeze the browser. Instead of returning a value immediately, we want to specify code to run with a value, whenever it becomes available.

### Promises

A common solution in modern languages is to use *promises*. A promise object holds code to be executed when some data is returned by some other code. A promise is said to be *resolved* when it has the data it was waiting for. A JavaScript promise object has a method**then(*function*)**. This can be used to tell the promise to call *function* with the response object when the promise is resolved.

The **then(*function*)** method returns a new promise. If *function* returns a value, you could add a second **then(*function2*)** to specify the function to call with the value returned by the first function.

### await and async

> **await** can only be used inside functions that are marked with the **async**keyword.

A common mistake is to think that **async** functions return values like normal functions. Here's an example of bad code

<pre class="bad-code">const getName = async () => {
  const response = await fetch('https://some-server.com/data/x/y')
  const json = await response.json()
  return json.name
}

console.log(getName())</pre>

This will not print a name, It will print a promise object. To get access to the promise value, when it resolves, you must use an **await** or **then()**, e.g.,

<pre>const getName = async () => {
  const response = await fetch('https://some-server.com/data/x/y')
  const json = await response.json()
  return json.name
}

getName().then(name => console.log(name))</pre>
