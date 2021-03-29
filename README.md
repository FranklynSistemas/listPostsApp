# listPostsApp

### Run App

To run this app, following this commands: 

1. Install the dependecies: `npm install`
2. If you are running on ios, run `pod install` in the ios folder
3. Run the project:
  - For ios: `npx react-native run-ios`
  - For Android: `npx react-native run-android`

### Architeture

The project architecture is based on concepts on [Clean Archicteture](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164) taking in account separate the responsibilities following this approach:

* **Config:** It is in charge of having the specific settings of the application, api urls, passwords, tokens etc..
* **Services:** They are in charge of having the logic to conect with internal or external services like APIs or Local tools
* **Providers:** They are in charge of having the logic to connect the services with the app storage and handle how and when update them
* **ContainerComponents:** They are in charge of having the business logic to decide what data or behavior send to `Presentation Components` through props drilling 
* **PresentationComponents:** They are in charge of having the logic and styles to determine how and when print the visual components
* **Types:** They are in charge of having all the data types what will be using in all the application

### Libraries used

* [Typescript](https://www.typescriptlang.org/): I chose use this such the base of the project due to their multiples advantages that saves you time catching errors and providing fixes before you run code to see more [Typescript pros and cons](https://www.altexsoft.com/blog/typescript-pros-and-cons/)
* [React native elements](https://reactnativeelements.com/): I chose this UI Toolkit over some other like [UI kitten](https://akveo.github.io/react-native-ui-kitten/) because of to be simple and easy to use for small projects that not require to many custom components
* [react-native-async-storage](https://github.com/react-native-async-storage/async-storage): I chose this tool over some other like `realm` or `react-native-sqlite-storage` or some other because their performance and to be simple to use for no too complex data entities
* [@react-navigation/native](https://reactnavigation.org/): I chose this navigation tool to be the most common use it for this their documentation it's so complete and work perfectly for ios and android
* [react-native-gesture-handler](https://docs.swmansion.com/): I chose this tool to control the user gestures due to be the most updated and with the best documentation over some others like [react-native-swipe-list-view](https://github.com/jemise111/react-native-swipe-list-view) or  [react-native-swipeable](https://github.com/jshanson7/react-native-swipeable), also require a minimal configuration and work perfect for android and ios without side effects

### Application screens

![image](https://user-images.githubusercontent.com/11137311/112779180-bd4e5700-900b-11eb-8982-0f11053a94b3.png)
![image](https://user-images.githubusercontent.com/11137311/112779207-d0612700-900b-11eb-8694-eaad1946c2d9.png)
![image](https://user-images.githubusercontent.com/11137311/112779228-dd7e1600-900b-11eb-8320-ae1eef28c1b8.png)
![image](https://user-images.githubusercontent.com/11137311/112779298-06061000-900c-11eb-9490-79323df46bb4.png)


