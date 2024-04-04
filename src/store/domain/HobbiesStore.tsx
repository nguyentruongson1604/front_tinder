import {makeAutoObservable} from 'mobx';
import {RootStore} from '../RootStore';
import {
  getHobbiesTypeAPI,
  getHobbyNameFromTypeAPI,
} from '../../APIs/hobbies.api';

export interface IHobby {
  _id: any;
  name: string;
  type: string;
}
export interface IHobbyType {
  type: string;
}
export class HobbiesStore {
  arrType: IHobbyType[] = [];
  hobbiesByType: IHobby[] = [];
  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
  }

  getHobbiesType = async () => {
    try {
      const res = await getHobbiesTypeAPI();
      this.arrType = res.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  getHobbyNameFromType = async (hobbyType: string) => {
    try {
      const res = await getHobbyNameFromTypeAPI(hobbyType);
      this.hobbiesByType = res.data.data;
    } catch (error) {
      console.error(error);
    }
  };
}
