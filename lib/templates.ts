import templates from "./template.json" 

export default templates 

export type Template = keyof typeof templates;
export type TemplateId = keyof typeof templates;
export type TemplateConfig =  (typeof templates)[TemplateId]