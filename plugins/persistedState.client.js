import localForage from 'localforage';
import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  new VuexPersistence({
    key: 'your-persist-key',
    storage: localForage,
    asyncStorage: true,
    restoreState: (key, storage) => localForage.getItem(key).then((value) => {
      if (value !== null) {
        store.replaceState(value);
      }
    }),
  }).plugin(store);
};
