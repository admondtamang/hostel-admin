export const TagToString = (data: string) => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(data, 'text/html');

  const firstElement = htmlDoc.querySelector('*');
  const textContent = firstElement ? firstElement.textContent : '';

  return textContent;
};
