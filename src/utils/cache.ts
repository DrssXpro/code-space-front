class MyCache {
  getItem<T>(key: string) {
    return JSON.parse(localStorage.getItem(key) as string) as T | null;
  }
  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
  claer() {
    localStorage.clear();
  }
}

export default new MyCache();
