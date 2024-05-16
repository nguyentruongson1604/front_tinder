import {makeAutoObservable, runInAction} from 'mobx';
import {RootStore} from '../RootStore';
import {createMessageAPI, getMessageAPI} from '../../APIs/message.api';

export interface IMessage {
  _id: string;
  sender: string;
  recipient: string;
  content: string;
  createdAt: Date;
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
      runInAction(() => {
        this.messages = data.data;
      });
    } catch (error) {
      console.error(error);
    }
  };
  getMoreMessages = async () => {
    try {
      const {data} = await getMessageAPI({
        recipient: this.recipient,
        skipCount: this.skipCount,
      });
      runInAction(() => {
        this.messages = [...this.messages, data.data];
      });
    } catch (error) {
      console.error(error);
    }
  };
  addMessage = (message: IMessage) => {
    this.messages = [...this.messages, message];
  };
  createMessage = async (content: string, recipient: string) => {
    try {
      const {data} = await createMessageAPI({content, recipient});
      runInAction(() => {
        this.addMessage(data.data);
      });
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };
}
