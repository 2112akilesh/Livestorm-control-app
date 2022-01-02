import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { Storage } from '@capacitor/storage';

export const INTRO_KEY = 'intro-seen';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {

  constructor(private router: Router) { }


  async canLoad(): Promise<boolean> {
    const hasSeenIntro = await Storage.get({key: INTRO_KEY});
    // Change it to true after updating intro part
    if (hasSeenIntro && (hasSeenIntro.value === 'false')) {
      return true;
    } else {
      this.router.navigateByUrl('/intro', { replaceUrl:true });
      return false;
    }

}
}
