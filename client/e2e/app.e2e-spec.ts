import { GranadaIoTestPage } from './app.po';

describe('granada-io-test App', function() {
  let page: GranadaIoTestPage;

  beforeEach(() => {
    page = new GranadaIoTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
