const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
  const storedState = localStorage.getItem(key);
  if (!storedState) {
    return null;
  }
  try {
    return JSON.parse(storedState);
  } catch (error) {
    return storedState;
  }
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
