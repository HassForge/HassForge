import { EntityID, MediaPlayerID } from "../../id";
import { HAMediaPlayerDeviceClass } from "./device-class";

/**
 * Represents a command to turn on a media player.
 */
export interface TurnOnCommand {
  entity_id: EntityID;
}

/**
 * Represents a command to turn off a media player.
 */
export interface TurnOffCommand {
  entity_id: EntityID;
}

/**
 * Represents a command to toggle the state of a media player.
 */
export interface ToggleCommand {
  entity_id: EntityID;
}

/**
 * Represents a command to increase the volume of a media player.
 */
export interface VolumeUpCommand {
  entity_id: EntityID;
}

/**
 * Represents a command to decrease the volume of a media player.
 */
export interface VolumeDownCommand {
  entity_id: EntityID;
}

/**
 * Represents a command to seek to a specific position in the media content.
 */
export interface MediaSeekCommand {
  entity_id: EntityID;
  seek_position: string;
}

/**
 * Represents a command to play media on a media player.
 */
export interface PlayMediaCommand {
  entity_id: EntityID;
  media_content_id: string;
  media_content_type: string;
  enqueue: boolean;
  announce: boolean;
  extra: {
    title?: string;
    thumb?: string;
    current_time?: number;
    autoplay?: boolean;
    stream_type?: string;
    subtitles?: string;
    subtitles_lang?: string;
    subtitles_mime?: string;
    subtitle_id?: number;
    media_info?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  };
}

/**
 * Represents a command to select a media source on a media player.
 */
export interface SelectSourceCommand {
  entity_id: EntityID;
  source: string;
}

/**
 * Represents a command to select a sound mode on a media player.
 */
export interface SelectSoundModeCommand {
  entity_id: EntityID;
  sound_mode: string;
}

/**
 * Represents a command to enable or disable shuffle on a media player.
 */
export interface ShuffleSetCommand {
  entity_id: EntityID;
  shuffle: boolean;
}

/**
 * Represents a command to set the repeat mode on a media player.
 */
export interface RepeatSetCommand {
  entity_id: EntityID;
  repeat: string;
}

/**
 * Represents a command to join multiple media players together for synchronous playback.
 */
export interface JoinCommand {
  entity_id: EntityID;
  group_members: string[];
}

/**
 * Represents a command to unjoin a media player from any player groups.
 */
export interface UnjoinCommand {
  entity_id: EntityID;
}

/**
 * Represents a generic media command with a specified type.
 * @template T - The specific command type.
 */
export interface MediaCommand<T extends {}> {
  service: string;
  data: T;
}

/**
 * Represents a Universal Media Player entity that can combine multiple existing entities in Home Assistant
 * into a single media player entity.
 */
export interface HAUniversalMediaPlayer {
  name: string;
  children?: MediaPlayerID[];
  active_child_template?: string;
  state_template?: string;
  commands?: {
    turn_on?: MediaCommand<TurnOnCommand>;
    turn_off?: MediaCommand<TurnOffCommand>;
    toggle?: MediaCommand<ToggleCommand>;
    volume_up?: MediaCommand<VolumeUpCommand>;
    volume_down?: MediaCommand<VolumeDownCommand>;
    media_seek?: MediaCommand<MediaSeekCommand>;
    play_media?: MediaCommand<PlayMediaCommand>;
    select_source?: MediaCommand<SelectSourceCommand>;
    select_sound_mode?: MediaCommand<SelectSoundModeCommand>;
    shuffle_set?: MediaCommand<ShuffleSetCommand>;
    repeat_set?: MediaCommand<RepeatSetCommand>;
    join?: MediaCommand<JoinCommand>;
    unjoin?: MediaCommand<UnjoinCommand>;
  };
  attributes?: {
    is_volume_muted: string;
    state: string;
  };
  browse_media_entity?: string;
  device_class?: HAMediaPlayerDeviceClass;
  unique_id?: string;
}
