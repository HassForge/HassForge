import { HAUniversalMediaPlayer } from "@hassforge/types/src/backend/media-player/universal";
import { CreatableEntity } from "../entity";
import { MediaPlayerTarget } from "../..";
import { snakeCase } from "change-case";

export class UniversalMediaPlayer
  extends CreatableEntity<"media_player">
  implements HAUniversalMediaPlayer, MediaPlayerTarget
{
  platform = "universal" as const;

  name!: string;

  constructor(entity: Omit<HAUniversalMediaPlayer, "platform">) {
    super("media_player", `media_player.${snakeCase(entity.name)}`);
    Object.assign(this, entity);
  }
}
