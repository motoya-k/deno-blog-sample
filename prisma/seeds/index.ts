import { PostFactory } from "./factories/index.ts";

const createPosts = () => {
  PostFactory.createList(3);
};

const execute = () => {
  createPosts();
};

execute();
