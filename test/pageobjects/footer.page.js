const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class FooterPage extends Page {
    /**
     * define selectors using getter methods
     */

    get footer() { return $('#transactFooter'); }
    get footerContactLink() { return $('#wb-info nav.wb-navcurr li:nth-child(1) a'); }
    get contactLink() { return $('#wb-info nav.ftr-urlt-lnk li:nth-child(1) a'); }
    get termsLink() { return $('#wb-info nav.ftr-urlt-lnk li:nth-child(2) a'); }
    get privacyLink() { return $('#wb-info nav.ftr-urlt-lnk li:nth-child(3) a'); }

    /**
    * Opens a sub page of the page
    * @param theme theme of the sub page (e.g. gcweb, gcintranet)
    * @param lang language of the sub page (e.g. en, fr)
    */

    //Return the various test pages
    open(theme, lang, classifier = '') {
        return super.open(theme, `${theme}-footer${classifier ? '-' : ''}${classifier}-${lang}.html`);
    }
}

module.exports = new FooterPage();
