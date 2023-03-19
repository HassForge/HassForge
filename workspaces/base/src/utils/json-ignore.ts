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

const getAllIgnoredFieldsFromChain = (obj: any) => {
  const p: string[] = [];
  do {
    const name = obj.constructor.name;
    p.push(...(IGNORE_FIELDS.get(name) ?? []));
    obj = Object.getPrototypeOf(obj);
  } while (obj != null);
  return p;
};

function props(obj: any) {
  const p = [];
  for (; obj != null; obj = Object.getPrototypeOf(obj)) {
    const op = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < op.length; i++)
      if (p.indexOf(op[i]) == -1) p.push(op[i]);
  }
  return p;
}

export function toJSON(this: any): { [name: string]: any } {
  let json: any = {};
  let ignore = getAllIgnoredFieldsFromChain(this);
  props(this)
    .filter((name) => (ignore ?? []).indexOf(name) < 0)
    .forEach((name) => {
      json[name] = this[name];
    });

  return json;
}
