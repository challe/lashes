import { MsbPage } from './app.po';

describe('msb App', function() {
  let page: MsbPage;

  beforeEach(() => {
    page = new MsbPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
