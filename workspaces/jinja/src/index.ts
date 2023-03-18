class Jinja2Template {
  private template: string;

  constructor(template: string = "") {
    this.template = template;
  }

  set(
    variableName: string,
    variableValue: string | number | boolean
  ): Jinja2Template {
    const value =
      typeof variableValue === "string" ? `"${variableValue}"` : variableValue;
    this.addLine(`{% set ${variableName} = ${value} %}`);
    return this;
  }

  ifStatement(
    condition: string,
    thenClause: Jinja2Template | string,
    ...elseClauses: (Jinja2Template | string)[]
  ): Jinja2Template {
    const thenClauseTemplate =
      thenClause instanceof Jinja2Template
        ? thenClause.nested().toString()
        : thenClause;
    elseClauses.forEach((clause) => {
      const line = clause instanceof Jinja2Template
        ? clause.nested().toString()
        : clause;
    });
    const elseClauseTemplate =
      elseClause instanceof Jinja2Template
        ? elseClause.nested().toString()
        : elseClause;
    this.template += `\n{% if ${condition} %}${thenClauseTemplate}${
      elseClause ? `{% else %}${elseClauseTemplate}` : null
    }{% endif %}`;
    return this;
  }

  toString(): string {
    return this.template;
  }

  static fromString(templateString: string): Jinja2Template {
    return new Jinja2Template(templateString);
  }

  private static quote(value: string | number | boolean): string {
    if (typeof value === "string") {
      return `"${value}"`;
    }
    return value.toString();
  }

  private static indent(templateString: string): string {
    return templateString.replace(/\n/g, "\n  ");
  }

  private addLine(line: string) {
    this.template += `\n${line}`;
  }

  nested(): Jinja2Template {
    return new Jinja2Template(`{${Jinja2Template.indent(this.template)}}`);
  }
}
