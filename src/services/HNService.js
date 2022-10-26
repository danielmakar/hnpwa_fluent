export const baseURL = "https://hacker-news.firebaseio.com/v0/";
export const itemURL = `${baseURL}item/`;
export const userURL = `${baseURL}user/`;

export const getItem = async (itemID) => {
  return fetch(`${itemURL + itemID}.json`).then((response) => response.json());
};

export const getItems = async (storyType) => {
  return fetch(`${baseURL + storyType}.json`).then((response) =>
    response.json()
  );
};

export const getUser = async (userID) => {
  return fetch(`${userURL + userID}.json`).then((response) => response.json());
};

export const getCommentParent = async (commentID) => {
  let currParent = await getItem(commentID);
  while (currParent.type !== "story") {
    currParent = await getItem(currParent.parent);
  }
  return currParent;
};
