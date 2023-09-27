export const dateFormat = (date, locale, options) => {
    return new Intl.DateTimeFormat(locale, options).format(date);
};