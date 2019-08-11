# Redux 
A state container/state management library for Javascript apps, which makes creating complex applications easier.

Action Creators -> Action -> Dispatch -> Reducers -> State Change.

An action creator creates an action which gets dispatched to all the reducers, which can then introduce a state change in our redux app. Let's look at each of the component individually.

Action Creator/Action
---------------------
1. It produces the data/Action for the consumption of reducers, any time we want to change the state of our application.
2. The state of the redux application can only be modified by dispatching an action that is produced by action creators, there is no way we can manually reach the store, and modify the state of the store.
3. Action creators must return action objects/plain JS objects, which should have type property on it and can optionally have payload property.
4. Action creators may return a function, only when a middleware like redux thunk is used in redux application, mostly to handle api requests and asynchronous operations.  For ex: actions/index.js fetchPosts()
5. Keep action creators as tiny bit as possible, so that we can reuse the logic.
6. Action creators can be called from inside the action creators, but make sure we dispatch the action creator instead of directly calling it. For ex: actions/index.js fetchPostsAndUsers()

Dispatch 
---------
1. One of the two most commonly used functions of a store, which makes the copy of a action, generated by the action creator and passes it down to all the reducers of the application.
2. When using a middleware like thunk, all the actions generated gets dispatched to the middleware, which in case of an object passes down to all the reducers, but in case of function, the function gets a copy of dispatch and getState and now it is the responsibility of the function to manually dispatch the action to all the reducers.
 For ex: actions/index.js fetchPosts()
3. In case of a normal redux app, an action can be dispathced like store.dispatch(actionCreator()). But in case of react-app, where react-redux library is used, the connect component passes down the action creators as a prop to the component, and when this function is called, connect dispatches the action behind the scenes. If you do not pass any action creator as a prop to the connect component, then that component also gets the store dispatch action as a prop. But it is always recommended to pass the action creators required by the component as a prop to the connect component.
 For ex: components/PostList.js connect().

Reducers
---------
1. Must return any value besides undefined.
2. During the initialization phase of the redux app, all the reducers all called, and the state of each reducers gets assigned (if we have provided any default value to a state, this is where it gets assigned).
3. Produces next state based on the previous state and action. 
4. Reducers are pure functions, which means it is only going to do all the computation on the state plus the action object, it is never going to reach out of the reducers, like no api calls from the reducers.
5. Must not mutate the input arguments - The reason it is important because the reducers must generate a new object/array etc, instead of modifying the existing one. Because, Redux has a reference to the state of all the reducers, and if instead of creating a new state, we are mutating the existing one, chances are that redux will never observe any state change in case of reference variables. This state change in any of the reducers is what triggers the re-rendering of all the component using connect. 
 For ex: reducers/userReducer.js reducers/postsReducer.js  
 
Store
------
1. Stores all the reducers as well as the state of the redux application.
2. Provides APIs like getState, dispatch etc to the application.
3. When using connect component, the first argument to it: mapStateToProps function, gets handle to the state of entire application, where you can come down to the piece of state that you need in your application.
4. takes combineReducers/list of reducers as a first argument and can also take optional applyMiddleware(...) as the second argument, for createStore(....), when creating the store.
For ex: index.js

Connect is a very special component, as it can communicate with the provider, with a special way of communication called the context system. It takes mapStateToProps and actionCreators as arguments. mapStateToProps takes the store state argument and optional argument - component props.

Directory Structure
--------------------
1. All the reducers can go into ./reducers folder, with a index.js file, where we combineReducers(...) and export it for the store.
2. All the actions can go into the ./actions folder, with either a single index.js file exporting all the action creators or separate action creators exports in separate file. Please note the redux is not aware of these action creators, unless we pass them to the connect component or manually dispatch theem.
3. All the components can go into the ./components folder.

In a traditional application, as the size of the app increases so does the complexity. But with redux applications, there is higher inital complexity, because we can only change the data/state through action creators. But there is stable curve of complexity as our application grows and our application is self-documenting.

Use the Application
-------------------
1. npm install
2. npm run start:dev (by default application will be served on http://localhost:9000/)
