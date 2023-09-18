import { PostRepository } from "../repositories/post.ts";

export class PostService {
  async getPosts() {
    // repository は DI できるようにする
    const postRepository = new PostRepository();
    return await postRepository.findAll();
  }
}
