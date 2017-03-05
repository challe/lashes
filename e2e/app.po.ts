import { browser, element, by } from 'protractor';

export class MsbPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('h3')).getText();
  }
}
