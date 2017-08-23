export const setCookieSessiionId = (initialiseServerResponse) => {
  if (initialiseServerResponse.token) return document.cookie = `JSESSIONID=${initialiseServerResponse.token}`;
  if (initialiseServerResponse.ok === true) return true;
  return new Error(`Something wrong with cookie response: ${JSON.stringify(initialiseServerResponse)}`)
};
