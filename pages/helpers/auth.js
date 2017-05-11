import { fetch } from '../../utils/services';

export const findUserByName = (name) => {
  const url = 'https://api.github.com/users/' + name;
  
  return fetch(url);
}
