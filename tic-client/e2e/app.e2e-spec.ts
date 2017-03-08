import { TicClientPage } from './app.po';

describe('tic-client App', function() {
  let page: TicClientPage;

  beforeEach(() => {
    page = new TicClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
