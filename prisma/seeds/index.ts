import { PostFactory } from "./factories/index.ts";

const createPosts = () => {
  PostFactory.create();
};

const execute = () => {
  createPosts();
};

execute();
