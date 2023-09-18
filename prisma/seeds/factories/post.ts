import { Factory } from "fishery";
import { ulid } from "ulid";

import { PostEntity, Post } from "../../../src/entities/post.ts";

export const PostFactory = Factory.define<Post>(({ params, onCreate }) => {
  onCreate(async (post) => {
    console.log(`Created post with id ${post.id}`);
    await PostEntity.objects.create(post);
    return post;
  });

  return {
    id: ulid(),
    platform: params.platform || "Zenn",
    publishedAt: params.publishedAt || new Date(),
    createdAt: params.createdAt || new Date(),
    updatedAt: params.updatedAt || new Date(),
  };
});
