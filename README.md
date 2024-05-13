# Nubble App

This is a project developed throughout the course _"React Native Professional"_ from [Coffstack](https://coffstack.com.br).

The reason why I started this course was to improve and expand my knowledge with React Native.

This project contains everything from start to finish of the creation of a React Native application, including:

- Advanced use of React Navigation.
- Building a design system (@shopify/restyle).
- Front-end architecture: Clean Code, DDD (Domain-driven Design).
- Using SOLID concepts.
- Global state (Zustand).
- ...and a lot more (more details in the [technologies](#technologies) section).

## Table of Content:

- [About The App](#about-the-app)
- [Screenshots](#screenshots)
- [Demo](#demo)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Step 1: Start the Metro Server](#step-1-start-the-metro-server)
- [Step 2: Start your Application](#step-2-start-your-application)

## About The App

Nubble App is a social network application where users can share photos with one another, follow other people, like and comment their photos.

## Screenshots

<div style="flex-direction: row;">
  <img src="https://i.imgur.com/arjoDx2.png" alt="Login Screen" height="500" />
  <img src="https://i.imgur.com/rXAUBju.png" alt="Home screen containing other user's posts" height="500" />
  <img src="https://i.imgur.com/x9h7Z2D.png" alt="Comments screen showing the comments from an user's post" height="500" />
</div>

## Demo

https://github.com/willperes/NubbleApp/assets/64440935/6cec38a0-00d6-4205-b958-52a3031e8f21

## Technologies

This project was developed using React Native and other libraries such as:

- React Navigation
- Axios
- React Hook Form
- Zustand
- Zod

## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
