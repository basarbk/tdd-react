import SecureLS from 'secure-ls';

const secureLS = new SecureLS();

const setItem = (key, value) => {
  secureLS.set(key, value);
};

const getItem = (key) => {
  return secureLS.get(key);
};

const clear = () => {
  localStorage.clear();
};

const storage = {
  setItem,
  getItem,
  clear
};

export default storage;
