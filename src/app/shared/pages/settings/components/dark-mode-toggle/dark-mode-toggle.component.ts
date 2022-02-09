import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss'],
})
export class DarkModeToggleComponent implements OnInit {

  darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;


  constructor() { }

  ngOnInit() {

    this.toggleDarkmode(this.darkMode);

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', e => {
      const dark = e.matches ? true : false;

      if (this.darkMode !== dark) {
        this.darkMode = !this.darkMode;
        this.toggleDarkmode(this.darkMode);
      }
    });
  }


  toggleDarkmode(enable) {
    document.body.classList.toggle('dark', enable);
  }

  changeDarkmode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }

}

