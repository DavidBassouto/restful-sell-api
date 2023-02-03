import handlebars from 'handlebars';

export interface ITemplateVariable {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

export class HandleBarsMailTemplate {
  public async parse({ template, variables }: IParseMailTemplate) {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
