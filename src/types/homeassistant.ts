
export type CustomizeDictionary = { [key: string]: Customize }

  export interface Customize {
    friendly_name: string;
  }

export interface Homeassistant {
  customize: CustomizeDictionary;
}


