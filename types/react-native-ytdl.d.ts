declare module "react-native-ytdl" {
  export function getInfo(url: string): Promise<any>;
  export function filterFormats(formats: any[], filter: string): any[];
}
