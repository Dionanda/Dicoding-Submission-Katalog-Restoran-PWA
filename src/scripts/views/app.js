import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
  
    if (page) {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } else {
      console.log(`Halaman '${url}' tidak ditemukan atau tidak terdaftar. Mengarahkan ke halaman utama.`);
      window.location.hash = '/';
    }
  }
}

export default App;
