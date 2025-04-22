declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";

// Types for AsyncStorage
declare module '@react-native-async-storage/async-storage' {
  export default {
    getItem: (key: string) => Promise<string | null>,
    setItem: (key: string, value: string) => Promise<void>,
    removeItem: (key: string) => Promise<void>,
    clear: () => Promise<void>,
    getAllKeys: () => Promise<string[]>,
    multiGet: (keys: string[]) => Promise<[string, string | null][]>,
    multiSet: (keyValuePairs: [string, string][]) => Promise<void>,
    multiRemove: (keys: string[]) => Promise<void>,
  };
}