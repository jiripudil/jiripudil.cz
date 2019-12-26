export const classNames = (...classNames: Array<string|false>): string => classNames.filter(Boolean).join(' ');
