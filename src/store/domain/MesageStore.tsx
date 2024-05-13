import {makeAutoObservable, runInAction} from 'mobx';
import {RootStore} from '../RootStore';
import {getMessageAPI} from '../../APIs/message.api';

export interface IMessage {
  sender: string;
  recipient: string;
  content: string;
  createAt: Date;
}
export class MessageStore {
  messages: IMessage[] = [];
  recipient: string = '';
  skipCount: number = 0;
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  getInitMessage = async () => {
    try {
      const {data} = await getMessageAPI({
        recipient: this.recipient,
        skipCount: 0,
      });
      console.log('dfsaf', data);

      this.messages = data;
    } catch (error) {
      console.error(error);
    }
  };
  getMoreMessages = async () => {
    try {
      const res = await getMessageAPI({
        recipient: this.recipient,
        skipCount: this.skipCount,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
