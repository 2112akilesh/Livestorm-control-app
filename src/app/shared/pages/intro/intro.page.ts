import { Component, OnInit, ViewChild, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { INTRO_KEY } from '../../../core/guard/intro-guard/intro.guard';

import { Storage } from '@capacitor/storage';
import { StatusBar, Style } from '@capacitor/status-bar';

import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import Swiper, { Pagination } from 'swiper';

Swiper.use([Pagination]);
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IntroPage implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent;
  @ViewChild('bg') background: ElementRef;

  config: SwiperOptions = {
    pagination: true,
  };

  pages = [
    {
      title: 'Chat & Share',
      text: 'Share multiple photos, documents, presentation from your mobile device',
      img: '../../../../assets/icon/favicon.png',
    },
    {
      title: 'Create engaging events',
      text: 'Create a meeting from mobile and invite your contacts.',
      img: '../../../../assets/icon/favicon.png',
    },
    {
      title: 'Stream from mobile',
      text: 'Use your mobile like a 2nd camera to stream.',
      img: '../../../../assets/icon/favicon.png',
    },
  ];
  constructor(
    private router: Router,
    public renderer: Renderer2
  ) { }

  ngOnInit() {
    StatusBar.setStyle({ style: Style.Dark });
  }

  slidesMoved(ev) {
    if (
      this.swiper.swiperRef.activeIndex == 0 ||
      this.swiper.swiperRef.activeIndex == 1
    ) {
      // Filter out swipe in the wrong direction on first slide
      if (
        this.swiper.swiperRef.activeIndex == 0 &&
        ev.touches.startX < ev.touches.currentX
      ) {
        return;
      }

      const element = this.background.nativeElement;
      const width = ev.width;
      let transform = ev.touches.diff / 3;

      if (this.swiper.swiperRef.activeIndex == 1) {
        transform = -width / 3 + transform;
      }

      this.renderer.setStyle(
        element,
        'webkitTransform',
        `translateX(${transform}px)`
      );
    }
  }

  onSlideSnap(ev) {
    if (ev.snapIndex == 0) {
      this.flyBgOut();
    } else if (ev.snapIndex == 1) {
      this.flyBgIn();
    }
  }

  slideResetTransitionStart() {
    if (this.swiper.swiperRef) {
      if (this.swiper.swiperRef.activeIndex == 0) {
        this.flyBgOut();
      } else if (this.swiper.swiperRef.activeIndex == 1) {
        this.flyBgIn();
      }
    }
  }

  flyBgOut() {
    const element = this.background.nativeElement;
    this.renderer.addClass(element, 'reset-bg');
    setTimeout(() => {
      this.renderer.setStyle(element, 'webkitTransform', `translateX(0px)`);
      this.renderer.removeClass(element, 'reset-bg');
    }, 500);
  }

  flyBgIn() {
    const element = this.background.nativeElement;
    this.renderer.addClass(element, 'reset-bg-out');
    setTimeout(() => {
      this.renderer.setStyle(element, 'webkitTransform', `translateX(-600px)`);
      this.renderer.removeClass(element, 'reset-bg-out');
    }, 500);
  }


  async start() {
    await Storage.set({ key: INTRO_KEY, value: 'true' });
    this.router.navigateByUrl('/auth', { replaceUrl: true });
  }
}
