export const asyncTimeout = duration =>
  new Promise(resolve => {
    setTimeout(resolve, duration);
  });

export const $el = selector => document.querySelector(selector);

export const formatInput = string => string.toLowerCase().trim();

export const generateId = () => Math.floor(Math.random() * Date.now());
