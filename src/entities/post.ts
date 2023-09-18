// import { TimestampMixin } from "./shared.ts";
import { Post as IPost } from "prisma-client";
import { ulid } from "ulid";
import { client } from "../client/db.ts";

// const は別のところに切り出してもいいかも
export const PLATFORM_BY_NUMBER: Record<number, Platform> = {
  0: "Zenn",
};

// TODO: Abstract class に切り出して簡単に使えるようにする

// DB を操作した結果 Entity を返すクラス
export class PostManager {
  toDB: (data: Post) => IPost | never;
  fromDB: (data: IPost) => Post;

  constructor(
    toDB: (data: Post) => IPost | never,
    fromDB: (data: IPost) => Post
  ) {
    this.toDB = toDB;
    this.fromDB = fromDB;
  }

  async create(_data: Post): Promise<PostEntity> {
    const data = this.toDB(_data);
    const results = await client.queryObject<IPost>(
      `INSERT INTO "Post" (id, platform, "publishedAt") VALUES ('${ulid()}', ${data.platform}, '${data.publishedAt.toISOString()}');`
    );
    return new PostEntity(this.fromDB(results.rows[0]));
  }

  async findById(id: string): Promise<PostEntity> {
    await client.connect();
    const results = await client.queryObject<IPost>(
      `SELECT * FROM posts WHERE id = ${id}`
    );
    return new PostEntity(this.fromDB(results.rows[0]));
  }
}

export type Platform = "Zenn" | "Qiita" | "Note";
// これが GraphQL の Type でも使われる = Domain の型
// IPost が DB の型
export type Post = Omit<IPost, "platform"> & {
  platform: Platform;
};
export class PostEntity implements Post {
  id: string;
  platform: Platform;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Post) {
    this.id = data.id;
    this.platform = data.platform;
    this.publishedAt = data.publishedAt;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public static toDB(data: Post): IPost {
    return {
      ...data,
      platform: 0,
    };
  }

  public static fromDB(data: IPost): Post {
    return {
      ...data,
      platform: "Zenn",
    };
  }

  public static objects = new PostManager(PostEntity.toDB, PostEntity.fromDB);
}
