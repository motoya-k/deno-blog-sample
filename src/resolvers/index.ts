import { PostService } from "../services/post.ts";

const postService = new PostService();

export const resolvers = {
  Query: {
    ping: () => "pong",
    posts: async () => await postService.getPosts(),
  },
};
