import { Injectable } from '@angular/core';

import { Http } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor() { }

  async getGames(gameUrl) {
    //Body
    const body = {
      scope: {
        type: 'organization',
        organization_id: '6e1f9bbc-d7f9-49da-8364-45feef4ab8ad'
      },
      payload: {
        event: {
          eventName: 'game',
          data: {
            id: `${gameUrl}`
          }
        }
      }
    };

    const response = await Http.request({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhcGkubGl2ZXN0b3JtLmNvIiwianRpIjoiMjVlNGFjYjUtZDliYi00NGIxLWE2YTUtYzNhYjdkMGIzZWMzIiwiaWF0IjoxNjMxNDQwNTY0LCJvcmciOiI2ZTFmOWJiYy1kN2Y5LTQ5ZGEtODM2NC00NWZlZWY0YWI4YWQifQ.NfCm-IC_9zempZIBhiqTI6kNqgzVSk801shnZ1gtSFE'
      },
      url: 'https://plugins.livestorm.co/api/v1/pub_subs',
      data: JSON.stringify(body)
    });
    console.log(response);
  }

}
