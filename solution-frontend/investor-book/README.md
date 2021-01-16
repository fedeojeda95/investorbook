# Frontend project

- Created using create-react-app
- Versions:
  - React 17.0.1
- Using Yarn

**Live app:** https://spread-test.netlify.app/

## How to run

- Run `yarn start` to open up the application in development mode.
- Run `yarn build` to build the app for production to the `build` folder. It correctly bundles React in production mode.

## Architecture & folder structure

Since it's a small application, the organization of the code is really simple.

- No external libraries where used apart of what's bundled in create-react-app
- There's two folders:
  - _components:_ where the UI components are.
  - _hooks:_ where the custom hooks created are.
  - In bigger projects, this structure would not be suitable for having different features and modules, but having anything else for this project felt way too overkill.

## Features

- Full-scrollable grid with 6 columns
- Column and row indicators
- Cells are editable: text can be changed and it's persisted while scrolling forth and back
- Columns are resizable, being able to resize them, with the only constraint of having a minimum width

## Performance

In order to keep up with the performance requirements, the following was taken into account:

### Amount of items rendered in screen

While rendering a huge list with all the items in a list may be feasible for a couple of thousands of items, it's not enough for millions of records. That's why the approach taken is using a virtualized list.

This means that we're only rendering what the user needs to see. If the user should only see 6-8 items, then that's what we are rendering. Whenever there's a scrolling action that goes down enough, then we re-calculate what rows are needed to be shown.

What does this improve?

- If there's 5 million records, we're only rendering the amount that are needed to be seen.
- The amount of memory used is smaller by a significant amount

### Lazy loading/infite scrolling

Instead of loading all the elements into memory at once, we wait until we reach the end for the screen to load more. This brings **huge** improvements, specially when dealing with users that will not scroll down to the bottom because they don't need to. It minimizes the memory used.

### Example of performance

![](./files/fakexcel-demo.gif)

As it can be seen on the right, we only have a small amount of rendered elements that are being updated while we scroll. Also, the FPS drop count is acceptable with the amount of elements in the list.

## What could be improved with more time

- Polish a little bit the UI, since it's pretty lacking.
- Probably add typescript for type safety.
- Also, improve the quality assurance tools (linter, prettier, etc) which is a must in a project IMHO.
- Add some tests for the behaviour mentioned!

## Other alternatives

It's important to consider already existing solutions for the problem. In some cases they are battle-tested solutions that have already gone through all the problems that we are facing. In other situations they do not fit our reality enough.

In this case, I would strongly consider using one of the following libraries.

- [react-virtualized](https://github.com/bvaughn/react-virtualized)
- [react-window](https://github.com/bvaughn/react-window)

Both provide solutions similar to the problem that was previously mentioned. The solution reached in this repository was done manually in order to express the solution better.
