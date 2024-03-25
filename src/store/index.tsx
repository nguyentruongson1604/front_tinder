import React, {useContext} from 'react';
import {IRootStore, RootStore} from './RootStore';

export const MobXStoreContext = React.createContext<IRootStore | null>(null);
export interface IMobxStoreProviderProps {
  children: React.ReactNode;
}
export const MobxStoreProvider: React.FC<IMobxStoreProviderProps> = ({
  children,
}) => {
  const store = new RootStore();
  return (
    <MobXStoreContext.Provider value={store}>
      {children}
    </MobXStoreContext.Provider>
  );
};

export const useStore = (): IRootStore => {
  const store = useContext(MobXStoreContext);
  if (!store) {
    throw new Error('Hook must be call in StoreProvider');
  }
  return store;
};

export const useUserStore = () => {
  const store = useStore();
  return store.userStore;
};
