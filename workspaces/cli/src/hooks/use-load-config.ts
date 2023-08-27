import { Dashboard, Room } from "@hassforge/base";
import { useEffect, useState } from "react";
import { loadConfig } from "../config";

export const useLoadConfig = (configFilePath: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<{
    rooms: { [key: string]: Room };
    dashboards: { [key: string]: Dashboard };
  }>({ rooms: {}, dashboards: {} });
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setData({ rooms: {}, dashboards: {} });
        setError(undefined);
        const data = await loadConfig(configFilePath);
        if (!data) {
          setError(`Config at '${configFilePath}' is empty`);
          return;
        }
        setData(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, [configFilePath]);
  return {
    loading,
    error,
    data,
  } as const;
};
