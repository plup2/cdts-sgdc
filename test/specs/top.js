const topPage = require('../pageobjects/top.page');
const basicPage = require('../pageobjects/basic.page');
const generateTestFile = require('../../TestFileGenerator.js');
const runAccessbilityTest = require('../../TestA11y.js');
require('../setup/basic.js');

describe('Top section tests for GCWeb', () => {
    const theme = 'gcweb';
    
    generateTestFile('./test/html/gcweb/template-gcweb-en.html', 'gcweb', 'gcweb-top-en', {
        refTop: '{"cdnEnv": "localhost"}',
        top: '{"cdnEnv": "localhost", "lngLinks": [{"lang": "fr", "href": "gcweb-top-fr.html", "text": "Français"}], "breadcrumbs": [{"title": "Canada.ca", "acronym": "Canada.ca", "href": "http://www.canada.ca/en.html"}, {"title": "CDTS", "acronym": "Centrally Deployed Templates Solution"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        footer: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    generateTestFile('./test/html/gcweb/template-gcweb-fr.html', 'gcweb', 'gcweb-top-fr', {
        refTop: '{"cdnEnv": "localhost"}',
        top: '{"cdnEnv": "localhost", "lngLinks": [{"lang": "en", "href": "gcweb-top-en.html", "text": "English"}], "breadcrumbs": [{"title": "Canada.ca", "acronym": "Canada.ca", "href": "http://www.canada.ca/fr.html"}, {"title": "SGDC", "acronym": "Centrally Deployed Templates Solution"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        footer: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    it('Should contain breadcrumbs', async () => {
        await breadcrumbsExist(theme);
        await breadcrumbsExist_FR(theme);
    });

    it('Should not contain breadcrumbs', async () => {
        await breadcrumbsDoNotExist(theme, 'en');
        await breadcrumbsDoNotExist(theme, 'fr');
    });

    it('Check if lang link exists', async () => {
        await langLinksExist(theme);
        await langLinksExist_FR(theme);
    });

    it('Check lang link does not exist', async () => {
        await langLinksDoNotExist(theme, 'en');
        await langLinksDoNotExist(theme, 'fr');
    });

    it('Accessibility', async () => {
        await accessibility(theme, 'en');
        await accessibility(theme, 'fr');
    });
});

describe('Top section tests for GCIntranet', () => {
    const theme = 'gcintranet';
    
    generateTestFile('./test/html/gcintranet/template-gcintranet-en.html', 'gcintranet', 'gcintranet-top-en', {
        refTop: '{"cdnEnv": "localhost"}',
        top: '{"cdnEnv" : "localhost", "menuPath": "menu-esdc.html", "lngLinks": [{"lang": "fr", "href": "gcintranet-top-fr.html", "text": "Français" }], "breadcrumbs": [{ "title": "Home", "href": "https://www.canada.ca/en/index.html"},{ "title": "CDTS","acronym": "Centrally Deployed Templates Solution", "href": "https://www.canada.ca/en/index.html"}], "intranetTitle": [{"href": "http://esdc.prv/en/index.shtml","text": "CustomTitle", 	"boldText" : "Bold", 	"acronym": "Employment and Social Development Canada / Service Canada" }], "GCToolsModal": true, "search": false, "subTheme": "esdc"}',
        preFooter: '{"cdnEnv": "localhost"}',
        footer: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    generateTestFile('./test/html/gcintranet/template-gcintranet-fr.html', 'gcintranet', 'gcintranet-top-fr', {
        refTop: '{"cdnEnv": "localhost"}',
        top: '{"cdnEnv": "localhost", "menuPath": "menu-esdc.html", "lngLinks": [{"lang": "en", "href": "gcintranet-top-en.html", "text": "English"}], "breadcrumbs": [{"title": "Canada.ca", "acronym": "Canada.ca", "href": "http://www.canada.ca/fr.html"}, {"title": "SGDC", "acronym": "Centrally Deployed Templates Solution", "href": "https://www.canada.ca/en/index.html"}], "intranetTitle": [{"href": "http://esdc.prv/en/index.shtml","text": "CustomTitle", 	"boldText" : "Bold", 	"acronym": "Employment and Social Development Canada / Service Canada" }], "GCToolsModal": true, "search": false, "subTheme": "esdc"}',
        preFooter: '{"cdnEnv": "localhost"}',
        footer: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    generateTestFile('./test/html/gcintranet/template-gcintranet-en.html', 'gcintranet', 'gcintranet-top-nomenu-en', {
        refTop: '{"cdnEnv": "localhost"}',
        top: '{"cdnEnv" : "localhost", "siteMenu": false, "lngLinks": [{"lang": "fr", "href": "gcintranet-top-fr.html", "text": "Français" }], "breadcrumbs": [{ "title": "Home", "href": "https://www.canada.ca/en/index.html"},{ "title": "CDTS","acronym": "Centrally Deployed Templates Solution", "href": "https://www.canada.ca/en/index.html"}], "intranetTitle": [{"href": "http://esdc.prv/en/index.shtml","text": "CustomTitle", 	"boldText" : "Bold", 	"acronym": "Employment and Social Development Canada / Service Canada" }], "GCToolsModal": true, "search": false, "subTheme": "esdc"}',
        preFooter: '{"cdnEnv": "localhost"}',
        footer: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    generateTestFile('./test/html/gcintranet/template-gcintranet-fr.html', 'gcintranet', 'gcintranet-top-nomenu-fr', {
        refTop: '{"cdnEnv": "localhost"}',
        top: '{"cdnEnv": "localhost", "siteMenu": false, "lngLinks": [{"lang": "en", "href": "gcintranet-top-en.html", "text": "English"}], "breadcrumbs": [{"title": "Canada.ca", "acronym": "Canada.ca", "href": "http://www.canada.ca/fr.html"}, {"title": "SGDC", "acronym": "Centrally Deployed Templates Solution", "href": "https://www.canada.ca/en/index.html"}], "intranetTitle": [{"href": "http://esdc.prv/en/index.shtml","text": "CustomTitle", 	"boldText" : "Bold", 	"acronym": "Employment and Social Development Canada / Service Canada" }], "GCToolsModal": true, "search": false, "subTheme": "esdc"}',
        preFooter: '{"cdnEnv": "localhost"}',
        footer: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});
    
    it('Should contain breadcrumbs', async () => {
        await breadcrumbsExist(theme);
        await breadcrumbsExist_FR(theme);
    });

    it('Should not contain breadcrumbs', async () => {
        await breadcrumbsDoNotExist(theme, 'en');
        await breadcrumbsDoNotExist(theme, 'fr');
    });

    it('Should contain lang link', async () => {
        await langLinksExist(theme);
        await langLinksExist_FR(theme);
    });

    it('Check lang link does not exist', async () => {
        await langLinksDoNotExist(theme, 'en');
        await langLinksDoNotExist(theme, 'fr');
    });

    it('Test if title has been customized', async () => {
        await titleCustomized(theme, 'en');
        await titleCustomized(theme, 'fr');
    });

    it('GC Tools links in the header should now be a modal dialogue box', async () => {
        await gcToolsLinks(theme);
        await gcToolsLinks_FR(theme);
    });

    it('Search bar should NOT appear', async () => {
        await searchDoesNotExist(theme, 'en');
        await searchDoesNotExist(theme, 'fr');
    });

    it('Subtheme should be esdc', async () => {
        await subThemeESDCMenu(theme, 'en');
        await subThemeESDCMenu(theme, 'fr');
    });

    it('Test title not customized', async () => {
        await titleNotCustomized(theme, 'en');
        await titleNotCustomized(theme, 'fr');
    });

    it('GC Tools links in the header should not be a modal dialogue box', async () => {
        await gcToolsLinksStandard(theme, 'en');
        await gcToolsLinksStandard(theme, 'fr');
    });

    it('Search bar should appear', async () => {
        await searchExists(theme, 'en');
        await searchExists(theme, 'fr');
    });

    it('Subtheme should be esdc', async () => {
        await subThemeStandard(theme, 'en');
        await subThemeStandard(theme, 'fr');
    });

    it('No menu present when turned off', async () => {
        await noMenuWhenTurnedOff(theme, 'nomenu-en');
        await noMenuWhenTurnedOff(theme, 'nomenu-fr');
    });

    it('Accessibility', async () => {
        await accessibility(theme, 'nomenu-en');
        await accessibility(theme, 'nomenu-fr');
    });
});

async function breadcrumbsExist(theme){
    await topPage.open(theme, 'en');
    await expect(topPage.cdtsBreadCrumb).toHaveTextContaining('CDTS');
}

async function breadcrumbsExist_FR(theme){
    await topPage.open(theme, 'fr');
    await expect(topPage.cdtsBreadCrumb).toHaveTextContaining('SGDC');
}

async function breadcrumbsDoNotExist(theme, lang){
    await basicPage.open(theme, lang);
    await expect(basicPage.cdtsBreadCrumb).toHaveChildren(1);
}

async function langLinksExist(theme){
    await topPage.open(theme, 'en');
    if (theme === "gcweb") {
        await expect(topPage.langLinkText).toHaveTextContaining('Français');
        const langLink = await topPage.langLink;
        await langLink.click();
    }
    else {
        await expect(topPage.langLinkTextIntranet).toHaveTextContaining('Français');
        const langLink = await topPage.langLinkIntranet;
        await langLink.click();
    }    
    await expect(browser).toHaveUrlContaining('-fr');
}

async function langLinksExist_FR(theme){
    await topPage.open(theme, 'fr');
    if (theme === "gcweb") {
        expect(topPage.langLinkText).toHaveTextContaining('English');
        const langLink = await topPage.langLink;
        await langLink.click();
    }
    else {
        await expect(topPage.langLinkTextIntranet).toHaveTextContaining('English');
        const langLink = await topPage.langLinkIntranet;
        await langLink.click();
    }
    await expect(browser).toHaveUrlContaining('-en');
}

async function langLinksDoNotExist(theme, lang){
    await basicPage.open(theme, lang);
    await expect(basicPage.langLink).not.toExist();
}

async function titleCustomized(theme, lang){
    await topPage.open(theme, lang);
    await expect(topPage.intranetText).toHaveTextContaining('Bold');
    await expect(topPage.intranetTitle).toHaveTextContaining('CustomTitle');
}

async function gcToolsLinks(theme){
    await topPage.open(theme, 'en');

    const gcToolsLink = await topPage.gcToolsLink;
    await gcToolsLink.click();
    await expect(topPage.gcToolsModalTitle).toHaveTextContaining('GCTools');
    await expect(topPage.gcToolsModalLink1).toHaveTextContaining('connex');
    await expect(topPage.gcToolsModalLink2).toHaveTextContaining('pedia');
    await expect(topPage.gcToolsModalLink3).toHaveTextContaining('directory');
    await expect(topPage.gcToolsModalLink4).toHaveTextContaining('collab');
    await expect(topPage.gcToolsModalLink5).toHaveTextContaining('intranet');
}

async function gcToolsLinks_FR(theme){
    await topPage.open(theme, 'fr');

    const gcToolsLink = await topPage.gcToolsLink;
    await gcToolsLink.click();
    await expect(topPage.gcToolsModalTitle).toHaveTextContaining('OutilsGC');
    await expect(topPage.gcToolsModalLink1).toHaveTextContaining('connex');
    await expect(topPage.gcToolsModalLink2).toHaveTextContaining('pédia');
    await expect(topPage.gcToolsModalLink3).toHaveTextContaining('annuaire');
    await expect(topPage.gcToolsModalLink4).toHaveTextContaining('collab');
    await expect(topPage.gcToolsModalLink5).toHaveTextContaining('intranet');
}

async function searchDoesNotExist(theme, lang){
    await topPage.open(theme, lang);
    await expect(topPage.search).not.toExist();
}

async function subThemeESDCMenu(theme, lang){
    await topPage.open(theme, lang);
    await expect(topPage.intranetMenu).toHaveChildren(7);
    await expect(topPage.intranetMenu).toHaveTextContaining('This is a test menu!');
}

async function titleNotCustomized(theme, lang){
    await basicPage.open(theme, lang);
    await expect(basicPage.intranetText).toHaveTextContaining('GC');
    await expect(basicPage.intranetTitle).toHaveTextContaining('GC intranet');
}

async function gcToolsLinksStandard(theme, lang){
    await basicPage.open(theme, lang);

    await expect(basicPage.gcToolsModalLinks).toExist();
    await expect(basicPage.gcToolsModalLinks).toHaveChildren(4);
}

async function searchExists(theme, lang){
    await basicPage.open(theme, lang);
    await expect(basicPage.search).toExist();
}

async function subThemeStandard(theme, lang){
    await basicPage.open(theme, lang);
    await expect(basicPage.intranetMenu).toHaveChildren(5);
}

async function noMenuWhenTurnedOff(theme, lang){
    await topPage.open(theme, lang);
    await expect(topPage.intranetMenu).not.toExist();
}

async function accessibility(theme, lang) {
    await topPage.open(theme, lang);
    await runAccessbilityTest();
}
