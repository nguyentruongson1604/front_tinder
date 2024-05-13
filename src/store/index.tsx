import React, {useContext} from 'react';
import {IRootStore, RootStore} from './RootStore';
import {Socket, io} from 'socket.io-client';
interface IStoreContext {
  store: IRootStore;
  socket: Socket;
}
export const MobXStoreContext = React.createContext<IStoreContext | null>(null);
export interface IMobxStoreProviderProps {
  children: React.ReactNode;
}
export const MobxStoreProvider: React.FC<IMobxStoreProviderProps> = ({
  children,
}) => {
  const store = new RootStore();
  const socket = io('http://192.168.100.57:3001');
  return (
    <MobXStoreContext.Provider value={{store, socket}}>
      {children}
    </MobXStoreContext.Provider>
  );
};

export const useStore = (): IRootStore => {
  const context = useContext(MobXStoreContext);
  if (!context) {
    throw new Error('Hook must be call in StoreProvider');
  }
  return context.store;
};

export const useSocket = (): Socket => {
  const context = useContext(MobXStoreContext);
  if (!context) {
    throw new Error('Hook must be call in StoreProvider');
  }
  return context.socket;
};

export const useUserStore = () => {
  const store = useStore();
  return store.userStore;
};
export const useActivityStore = () => {
  const store = useStore();
  return store.activityStore;
};

export const useProfileStore = () => {
  const store = useStore();
  return store.profileStore;
};

export const useHobbiesStore = () => {
  const store = useStore();
  return store.hobbiesStore;
};

export const usePreferencesStore = () => {
  const store = useStore();
  return store.preferencesStore;
};

export const useAppStore = () => {
  const store = useStore();
  return store.appStore;
};

export const useMessageStore = () => {
  const store = useStore();
  return store.messageStore;
};
