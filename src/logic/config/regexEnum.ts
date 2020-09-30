export enum AppRegex {
    NumberOnly = '^[0-9]*$',
    TextOnly = '^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]*$',
    NoSpecialChar = '^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ0-9 ]*$',
    UserName = '^[a-zA-Z][a-zA-Z0-9]*$',
    Email = '^[.a-zA-Z0-9-_]+@[a-zA-Z0-9.-_]+.[A-Za-z]+$',
    EmailChars = '^[a-zA-Z0-9-_@.]+$'
}