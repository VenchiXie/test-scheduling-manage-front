// 创建数据库
export const openDatabase = (database, store) => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(database);
    request.onupgradeneeded = async (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore(store, { keyPath: "SN", autoIncrement: true });
      objectStore.createIndex("SN", "SN", { unique: true });
      resolve(db);
    };

    request.onblocked = () => console.log("在操作数据时，请关闭上个页面或关闭当前页面。");
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

/**
 * @description
 * @param {Object} db     数据库对象
 * @param {String} stores 数据库下的store
 * @param {any} data      需要添加的数据
 *  */
export const addData = (db, stores, data) => {
  return new Promise((resolve, reject) => {
    const request = db.transaction([stores], "readwrite").objectStore(stores).add(data);
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};


export const getAllData = (db, store) => {
  return new Promise((resolve, reject) => {
    const request = db.transaction([store], "readwrite").objectStore(store).getAll();
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

export const getAllDatabases = () => {
  return new Promise((resolve, reject) => {
    window.indexedDB
      .databases()
      .then((databases) => {
        resolve(databases);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
