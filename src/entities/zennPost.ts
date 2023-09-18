import { Platform } from "./post.ts";

// This is a sample implementation for the RESTFul API of Zenn.dev.

export type ZennUser = {
  id: number;
  username: string;
  name: string;
  avatar_small_url: string;
};
export type ZennArticle = {
  id: number;
  post_type: "Article";
  title: string;
  slug: string;
  comments_count: number;
  liked_count: number;
  body_letters_count: number;
  article_type: "tech";
  emoji: string;
  is_suspending_private: boolean;
  published_at: string;
  body_updated_at: string;
  source_repo_updated_at: string;
  pinned: boolean;
  path: string;
  user: ZennUser;
  publication: null;
};
export type ZennResponse = {
  articles: ZennArticle[];
  next_page: number | null;
};
export type PostZenn = {
  id: string;
  platform: Platform;
  publishedAt: Date;
  title: string;
};

// DB を操作した結果 Entity を返すクラス
export class ZennPostManager {
  toDB: (data: PostZenn) => ZennArticle | never;
  fromDB: (data: ZennArticle) => PostZenn;

  constructor(
    toDB: (data: PostZenn) => ZennArticle | never,
    fromDB: (data: ZennArticle) => PostZenn
  ) {
    this.toDB = toDB;
    this.fromDB = fromDB;
  }

  async findByUserName(userName: string): Promise<PostZennEntity[]> {
    const res = await fetch(
      `https://zenn.dev/api/articles?username=${userName}`
    );
    const data = await res.json();
    const results = data.articles.map((article: ZennArticle) =>
      new PostZennEntity(this.fromDB(article))
    );
    return results;
  }
}

export class PostZennEntity implements PostZenn {
  id: string;
  platform: Platform;
  publishedAt: Date;
  title: string;

  constructor(data: PostZenn) {
    this.id = data.id;
    this.platform = data.platform;
    this.publishedAt = data.publishedAt;
    this.title = data.title;
  }

  public static toDB(_data: PostZenn): ZennArticle {
    throw new Error("Not implemented");
  }

  public static fromDB(data: ZennArticle): PostZenn {
    return {
      id: String(data.id),
      platform: "Zenn",
      publishedAt: new Date(data.published_at),
      title: data.title,
    };
  }

  public static objects = new ZennPostManager(
    PostZennEntity.toDB,
    PostZennEntity.fromDB
  );
}
