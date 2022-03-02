"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  let privilages = "";

  if(Boolean(currentUser)) {
    privilages =  `
      ${getTrashHTML(story)}
      ${getStarHTML(story)}`;
  }

  return $(`
      <li id="${story.storyId}">
        ${privilages}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function getTrashHTML(story) {
  if(story.username == currentUser.username) {
    return `<i class="fas fa-trash-alt"></i>`;
  } else {
    return "";
  }
}

function getStarHTML(story) {
  if(currentUser.favorites.find(favorite => favorite.storyId === story.storyId)) {
    return `<i id="favoriteStar" class="fas fa-star"></i>`
  } else {
    return `<i id="favoriteStar" class="far fa-star"></i>`
  }
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Submit new story to server and puts on page. */

async function submitStory(evt) {
  console.debug("submitNewStory");
  evt.preventDefault();

  // form data
  const author = $("#new-author").val();
  const title = $("#new-title").val();
  const url = $("#new-url").val();
  const username = currentUser.username;
  const formData = {title, url, author, username};

  // storyList instance of StoryList
  let newStory = await storyList.addStory(currentUser, formData); 

  const $story = generateStoryMarkup(newStory);

  $allStoriesList.prepend($story);
}

$addStoryForm.on("submit", submitStory);

/** Gets list of favorite stories from server, generates their HTML, and puts on page. */

async function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $favoriteStoriesList.empty();

  if (currentUser.favorites.length == 0) {
    $favoriteStoriesList.append("<h5>No favorites added!</h5>");
  } else {
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoriteStoriesList.append($story);
    }
  }
  $favoriteStoriesList.show();
}

/** Gets list of user stories from server, generates their HTML, and puts on page. */

async function putMyStoriesOnPage() {
  console.debug("putMyStoriesOnPage");

  $myStoriesList.empty();

  if (currentUser.ownStories.length == 0) {
    $myStoriesList.append("<h5>No stories added by user yet!</h5>");
  } else {
    for (let story of currentUser.ownStories) {
      const $story = generateStoryMarkup(story);
      $myStoriesList.append($story);
    }
  }
  $myStoriesList.show();
}

/** Allow user to toggle favorite stories, and puts on their favorites list. */

async function toggleFavorites(evt) {
  console.debug("toggleFavoritesClick");

  const favoriteTrue = `fas fa-star`;
  const favoriteFalse = `far fa-star`;
  const storyId = evt.target.closest("li").id;

  if(evt.target.attributes.class.nodeValue == favoriteFalse) {
    evt.target.attributes.class.nodeValue = favoriteTrue;
    const requestType = 'post';
    const results = await User.toggleFavorites(currentUser, storyId, requestType);
    console.log(results);
  } else {
    evt.target.attributes.class.nodeValue = favoriteFalse;
    const requestType = 'delete';
    const results = await User.toggleFavorites(currentUser, storyId, requestType);
    console.log(results);
  }
}

$storiesList.on("click", ".fa-star", toggleFavorites);

/** Allow users to delete their own stories, and removes from their ownStories list. */

async function deleteStory(evt) {
  console.debug("deleteStoryClick");

  const storyId = evt.target.closest("li").id;
  await User.deleteStory(currentUser, storyId);
}

$storiesList.on("click", ".fa-trash-alt", deleteStory);

/** Put currentUser information on page. */

async function putProfileOnPage() {
  console.debug("putProfileOnPage");

  const {name, username, createdAt} = currentUser;

  $userProfile.append(`
    <h3>User Profile Info</h3>
    <p>Name: ${name}</p>
    <p>Username: ${username}</p>
    <p>Account Created: ${createdAt}</p>
  `);
  $userProfile.show();
}

$storiesList.on("click", putProfileOnPage);