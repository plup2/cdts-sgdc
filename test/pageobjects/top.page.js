const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TopPage extends Page {
    /**
     * define selectors using getter methods
     */
    get cdtsBreadCrumb() { return $('ol.breadcrumb li:nth-child(2) abbr'); }
    get langLink() { return $('ul.list-inline li:nth-child(1) a'); }
    get langLinkText() { return $('ul.list-inline li:nth-child(1) span'); }
    get langLinkTextIntranet() { return $('section.lang-no-search a'); }
    get langLinkIntranet() { return $('section.lang-no-search a'); }

    //GCIntranet specific
    get intranetText() { return $('div.app-name span.bold-gc'); }
    get intranetTitle() { return $('div.app-name a'); }
    get gcToolsLink() { return $('a.wb-lbx'); }
    get gcToolsModalTitle() { return $('#lbx-title'); }
    get gcToolsModalLinks() { return $('div.modal-body ul.lst-spcd'); }
    get gcToolsModalLink1() { return $('section.modal-dialog li:nth-child(1) a'); }
    get gcToolsModalLink2() { return $('section.modal-dialog li:nth-child(2) a'); }
    get gcToolsModalLink3() { return $('section.modal-dialog li:nth-child(3) a'); }
    get gcToolsModalLink4() { return $('section.modal-dialog li:nth-child(4) a'); }
    get gcToolsModalLink5() { return $('section.modal-dialog li:nth-child(5) a'); }
    get intranetMenu() { return $('ul.menu'); }
    get search() {return $('#wb-srch'); }

    /**
    * Opens a sub page of the page
    * @param theme theme of the sub page (e.g. gcweb, gcintranet)
    * @param lang language of the sub page (e.g. en, fr)
    */

    //Return the various test pages
    open(theme, lang) {
        return super.open(theme, `${theme}-top-${lang}.html`);
    }
}

module.exports = new TopPage();
