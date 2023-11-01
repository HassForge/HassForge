import { EntityTarget } from "./entity";

export interface LightTarget extends EntityTarget<"light"> {
    dimmable?: boolean;
    rgb?: boolean;
}

