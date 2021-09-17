# HACK OR SNOOZE

a clone of the news aggregator Hacker News 

### PART 1: EXPLORE THE CODE
- js/models.js
    - contains classes to manage the data of the app and the connection to the API. The name models.js to describe a file containing these kinds of classes that focus on the data and logic about the data.

For the UI layer, we’ve broken this into several files by topic:

- js/main.js
    - contains code for starting the UI of the application, and other miscellaneous things.

- js/user.js
    - contains code for UI about logging in/signing up/logging out, as well as code about remembering a user when they refresh the page and logging them in automatically.

- js/stories.js
    - contains code for UI about listing stories.

- js/nav.js
    - contains code to show/hide things in the navigation bar, and well as code for when a user clicks in that bar.

### PART 2: CREATING NEW STORIES
- In this part, we designed and wrote the functionality to let logged-in users add new stories. 

#### PART 2A: SENDING STORY DATA TO THE BACKEND API
- wrote a method that adds a new story by sending the right data to our API.

#### PART 2B: BUILDING THE UI FOR NEW STORY FORM/ADD NEW STORY
- Now, we’ll add the UI for the story-adding feature:
    - Added a form in the HTML for the story. This should initially be hidden.
    - Added a link in the navbar with the text of “submit”.
    - Wrote a function in `nav.js` that is called when users click that navbar link. 
    - Wrote a function in `stories.js` that is called when users submit the form. Pick a good name for it. This function should get the data from the form, call the `.addStory` method you wrote, and then put that new story on the page.

### PART 3: FAVORITE STORIES
- Added a feature marking/unmarking a story as a favorite.

#### PART 3A: DATA/API CHANGES
- Allow logged in users to “favorite” and “un-favorite” a story. These stories should remain favorited when the page refreshes.

- Allow logged in users to see a separate list of favorited stories.

### PART 4: REMOVING STORIES
- Allow logged in users to remove a story. Once a story has been deleted, remove it from the DOM and let the API know its been deleted.

### FURTHER STUDY
- Add some error handling for when a username has already been taken or if credentials are incorrect!
- Allow users to edit stories they have created.
- Add a section for a “user profile” where a user can change their name and password in their profile.
- Style the application so that it is presentable on mobile devices.
- Add infinite scroll! When a user scrolls to the bottom of the page, load more stories.