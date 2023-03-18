const IGNORE_FIELDS = new Map<string, string[]>();

export function JsonIgnore(cls: any, name: string) {
  let clsName = cls.constructor.name;
  let list: string[];

  if (IGNORE_FIELDS.has(clsName)) {
    list = IGNORE_FIELDS.get(clsName) as string[];
  } else {
    list = [];
    IGNORE_FIELDS.set(clsName, list);
  }

  list.push(name);
}

export function toJson(this: any): { [name: string]: any } {
  let json: any = {};
  let ignore = IGNORE_FIELDS.get(this.constructor.name);

  Object.getOwnPropertyNames(this)
    .filter((name) => (ignore ?? []).indexOf(name) < 0)
    .forEach((name) => {
      json[name] = this[name];
    });

  return json;
}
