import { Factory } from "fishery";
import { Post } from "prisma-client";
import { ulid } from "ulid";

import prisma from "../../../src/client/prisma.ts";

export const PostFactory = Factory.define<Post>(({ params, onCreate }) => {
  onCreate(async (post) => {
    console.log(`Created post with id ${post.id}`);
    const posts = await prisma.post.findMany();
    console.log("posts", posts);
    // await prisma.post.create({
    //   data: post,
    // });
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
