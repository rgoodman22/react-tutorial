# React Design Tutorial

### Component Hierarchy

1. Draw boxes around every component with names
2. single responsible principle
   1. component should only do one thing
3. include containers

### Build a static version in React

1. top down or bottom up
   1. smaller projects: top down is easier
   2. bigger projects: bottom up and write tests as you go

### Props vs. State

Let’s go through each one and figure out which one is state. Ask three questions about each piece of data:

1. Is it passed in from a parent via props? If so, it probably isn’t state.
2. Does it remain unchanged over time? If so, it probably isn’t state.
3. Can you compute it based on any other state or props in your component? If so, it isn’t state.


### Where should state live

For each piece of state in your application:

* Identify every component that renders something based on that state.
* Find a common owner component (a single component above all the components that need the state in the hierarchy).
* Either the common owner or another component higher up in the hierarchy should own the state.
* If you can’t find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common owner component.


### Inverse data flow

setState
