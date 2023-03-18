export interface HATemplateSensor {
  name: string;
  unique_id: string;
  state: string;
  unit_of_measurement?: string;
  attributes?: { [key: string]: string };
}

export interface HATemplate {
  sensor: HATemplateSensor[];
}
