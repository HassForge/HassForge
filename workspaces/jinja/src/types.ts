export type JinjaLiteral = `"${string}"`
export type JinjaBlock = `{% ${string} %}`
export type JinjaComment = `{# ${string} #}`
export type JinjaOutput = `{{ ${string} }}`