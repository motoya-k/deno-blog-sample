import { PostZennEntity } from "../entities/zennPost.ts";
import { Setting } from "../common/setting.ts";

export class PostRepository {
  async findAll() {
    const zenn = await PostZennEntity.objects.findByUserName(
      Setting.Zenn.USER_NAME
    );
    return zenn;
  }
}
