const validateTemplate = (template: TemplateType | {}): TemplateType => { // eslint-disable-line
    if (typeof template.id === 'undefined') {
        throw new Error('invalid template');
    }

    if (typeof template.title !== 'string') {
        throw new Error('title should be defined');
    }

    if (!Array.isArray(template.sections)) {
        throw new Error('at least 1 section should be present');
    }

    return template;
};

export default validateTemplate;
