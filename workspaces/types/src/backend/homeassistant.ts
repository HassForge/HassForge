export type HACustomizeDictionary = { [key: string]: Customize };

export interface Customize {
  friendly_name: string;
}

export interface HAHomeassistant {
  customize: HACustomizeDictionary;
}
