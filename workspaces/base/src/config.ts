import { Dashboard, Room } from ".";

export interface HassForgeConfig {
  rooms?: { [key: string]: Room };
  dashboards?: { [key: string]: Dashboard };
}

export const defineConfig = (config: HassForgeConfig) => {
  return config;
};
