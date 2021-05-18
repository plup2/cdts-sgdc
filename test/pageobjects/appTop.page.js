const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AppTopPage extends Page {
    /**
     * define selectors using getter methods
     */
    get settingsBtn() { return $('ul.app-list-account li:nth-child(1) a') }
    get signinBtn() { return $('ul.app-list-account li:nth-child(2) a') }
    get signOutBtn() { return $('ul.app-list-account li:nth-child(1) a') }
    get signOffBtnIntranet() { return $('a.btn-signoff') }
    get cdtsBreadCrumb() { return $('ol.breadcrumb li:nth-child(2) abbr'); }
    get langLink() { return $('ul.list-inline li:nth-child(1) a'); }
    get langLinkText() { return $('ul.list-inline li:nth-child(1) span'); }
    get langLinkTextIntranet() { return $('section.lang-no-search ul.gcbarlng a'); }
    get langLinkIntranet() { return $('section.lang-no-search a'); }
    get search() {return $('#wb-srch-q'); }
    get menuLinks() {return $('div.nvbar'); }
    get menuLink1() {return $('div.nvbar ul li:nth-child(1) a'); }
    get menuLink2() {return $('div.nvbar ul li:nth-child(2) a'); }
    get menuSubLink() {return $('div.nvbar ul li:nth-child(1) ul li.slflnk a'); }
    get menuPathSubLink() {return $('div.nvbar ul li:nth-child(3) ul li.slflnk a'); }
    get secureIcon() {return $('i.glyphicon-lock'); }
    get intranetText() { return $('div.app-name span.bold-gc'); }
    get intranetTitle() { return $('div.app-name a'); }

    /**
    * Opens a sub page of the page
    * @param theme theme of the sub page (e.g. gcweb, gcintranet)
    * @param lang language of the sub page (e.g. en, fr)
    */

    //Return the various test pages
    open(theme, lang, classifier = '') {
        return super.open(theme, `${theme}-appTop${classifier ? '-' : ''}${classifier}-${lang}.html`);
    }
}

module.exports = new AppTopPage();