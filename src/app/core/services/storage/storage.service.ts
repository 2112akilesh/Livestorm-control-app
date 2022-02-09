import { Injectable } from '@angular/core';

import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  async set(ara: string, value: string): Promise<void> {
    //await Storage.set({ key: ara, value: JSON.stringify(value) });
    console.log('set', ara, value);
  }

  async get(ara: string): Promise<any> {
    const item = await Storage.get({ key: ara });
    return item.value;
  }

  async remove(ara: string): Promise<void> {
    await Storage.remove({
      key: ara,
    });
  }

}

