export class Jinja2Expression {
  line: string;

  constructor(line: string) {
    this.line = line;
  }

  static and(left: string, right: string | Jinja2Expression) {
    return new Jinja2Expression(left).and(right);
  }

  and(right: string | Jinja2Expression) {
    this.line += ` and ${right}`;
    return this;
  }

  static or(left: string, right: string | Jinja2Expression) {
    return new Jinja2Expression(left).or(right);
  }

  or(right: string | Jinja2Expression) {
    this.line += ` or ${right}`;
    return this;
  }

  static not(left: string | Jinja2Expression) {
    return new Jinja2Expression("").not(left);
  }

  not(value: string | Jinja2Expression) {
    this.line += `not ${value}`;
    return this;
  }

  static filter(left: string, right: string | Jinja2Expression) {
    return new Jinja2Expression(left).filter(right);
  }

  filter(filter: string | Jinja2Expression) {
    this.line += ` | ${filter}`;
    return this;
  }

  toString() {
    return this.line;
  }
}

const expression = Jinja2Expression.and(
  "is_number(state)",
  Jinja2Expression.filter("state", "float > 20")
);
