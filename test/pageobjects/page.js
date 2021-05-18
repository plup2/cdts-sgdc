/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    * @param theme theme of the sub page (e.g. gcweb, gcintranet)
    */
    open(theme, path) {
        //TODO: Could have intermediary parent classes GcwebPage and GcintranetPage??
        return browser.url(`http://localhost:8080/app/cls/WET/${theme}/${process.env.CDTS_TEST_VERSION_NAME || 'v4_0_40'}/cdts/test/${path}`)
    }
}
