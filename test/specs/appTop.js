const appTopPage = require('../pageobjects/appTop.page');
const basicPage = require('../pageobjects/basic.page');
const generateTestFile = require('../../TestFileGenerator.js');
const runAccessbilityTest = require('../../TestA11y.js');
require('../setup/basic.js');

describe('AppTop section tests for GCWeb', () => {
    const theme = 'gcweb';
     
    generateTestFile('./test/html/gcweb/template-gcwebapp-en.html', 'gcweb', 'gcweb-appTop-en', {
        refTop: '{"cdnEnv": "localhost", "isApplication": true}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}], "appSettings": [{"href": "#"}], "signIn": [{"href": "#"}], "lngLinks": [{"lang": "fr",	"href": "gcweb-appTop-fr.html",	"text": "Français"	}],	"menuLinks":[{"href": "#", "text":"Menu Option 1", "subLinks": [{ "subhref": "#", "subtext": "Link 1a" }], }, { "href": "#", "text":"Menu Option 2" }],	"breadcrumbs": [{"title": "Home", "href": "https://www.canada.ca/en/index.html"},{"title": "CDTS", "acronym": "Centrally Deployed Templates Solution", "href": "https://www.canada.ca/en/index.html"}], "customSearch": [{ "action" : "https://www.canada.ca/en/sr.html", "placeholder" : "Canada.ca", "method" : "get"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost", "isApplication": true}'
    });

    generateTestFile('./test/html/gcweb/template-gcwebapp-fr.html', 'gcweb', 'gcweb-appTop-fr', {
        refTop: '{"cdnEnv": "localhost", "isApplication": true}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}], "appSettings": [{"href": "#"}], "signIn": [{"href": "#"}], "lngLinks": [{"lang": "en",	"href": "gcweb-appTop-en.html",	"text": "English"	}],	"menuLinks":[{"href": "#", "text":"Menu Option 1", "subLinks": [{ "subhref": "#", "subtext": "Link 1a" }], }, { "href": "#", "text":"Menu Option 2" }],	"breadcrumbs": [{"title": "Home", "href": "https://www.canada.ca/en/index.html"},{"title": "SGDC", "acronym": "Centrally Deployed Templates Solution", "href": "https://www.canada.ca/en/index.html"}], "customSearch": [{ "action" : "https://www.canada.ca/fr/sr.html", "placeholder" : "Canada.ca", "method" : "get"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost", "isApplication": true}'
    });

    generateTestFile('./test/html/gcweb/template-gcwebapp-en.html', 'gcweb', 'gcweb-appTop-externalLinkMenu-en', {
        refTop: '{"cdnEnv": "localhost", "isApplication": true}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}], "menuPath": "../ajax/appmenu-en.html"}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost", "isApplication": true}'
    });

    generateTestFile('./test/html/gcweb/template-gcwebapp-fr.html', 'gcweb', 'gcweb-appTop-externalLinkMenu-fr', {
        refTop: '{"cdnEnv": "localhost", "isApplication": true}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}], "menuPath": "../ajax/appmenu-en.html"}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost", "isApplication": true}'
    });

    generateTestFile('./test/html/gcweb/template-gcwebapp-en.html', 'gcweb', 'gcweb-appTop-signOut-en', {
        refTop: '{"cdnEnv": "localhost", "isApplication": true}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}], "signOut": [{"href": "#"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost", "isApplication": true}'
    });

    generateTestFile('./test/html/gcweb/template-gcwebapp-fr.html', 'gcweb', 'gcweb-appTop-signOut-fr', {
        refTop: '{"cdnEnv": "localhost", "isApplication": true}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}], "signOut": [{"href": "#"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost", "isApplication": true}'
    });

    it('Account settings button exists', async () => {
        await settingsBtnExists(theme, 'en');
        await settingsBtnExists(theme, 'fr');
    });

    it('Account settings button does not exist', async () => {
        await settingsBtnDoesNotExist(theme, 'en');
        await settingsBtnDoesNotExist(theme, 'fr');
    });

    it('Sign in button exists', async () => {
        await signinBtnExists('en');
        await signinBtnExists('fr');
    });

    it('Sign out button exists', async () => {
        await signOutBtnExists('en');
        await signOutBtnExists('fr');
    });

    it('Sign in button does not exist', async () => {
        await signinBtnDoesNotExist(theme, 'en');
        await signinBtnDoesNotExist(theme, 'fr');
    });
    
    it('Menu links exist', async () => {
        await menuExists(theme, 'en');
        await menuExists(theme, 'fr');
    });

    it('Menu links exist when using Menu Path', async () => {
        await menuExistsUsingPath(theme, 'en');
        await menuExistsUsingPath(theme, 'fr');
    });
    
    it('Menu links do not exist', async () => {
        await menuDoesNotExist(theme, 'en');
        await menuDoesNotExist(theme, 'fr');
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

    it('Search bar should appear', async () => {
        await searchExists(theme, 'en');
        await searchExists(theme, 'fr');
    });

    it('Search bar should NOT appear', async () => {
        await searchDoesNotExist(theme, 'en');
        await searchDoesNotExist(theme, 'fr');
    });

    it('Accessibility', async () => {
        await accessibility(theme, 'en');
        await accessibility(theme, 'fr');
    });
});

describe('AppTop section tests for GCIntranet', () => {
    const theme = 'gcintranet';
    
    generateTestFile('./test/html/gcintranet/template-gcintranetapp-en.html', 'gcintranet', 'gcintranet-appTop-en', {
        refTop: '{"cdnEnv": "localhost"}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application Name"}], "lngLinks": [{"lang": "fr", "href": "gcintranet-appTop-fr.html", "text": "Français"}], "secure": true, "signIn": [{ "href": "#" }], "search": false, "menuLinks": [{"href": "#", "text": "Link 1", "subLinks": [{"subhref": "#", "subtext": "SubLink 1"}, {"subhref": "#",	"subtext": "SubLink 2"}]}, {"href": "#", "text": "Link 2" }], "breadcrumbs": [{ "title": "Home", "href": "https://www.canada.ca/en/index.html" },{"title": "CDTS", "acronym": "Centrally Deployed Templates Solution", "href": "https://www.canada.ca/en/index.html"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
    });

    generateTestFile('./test/html/gcintranet/template-gcintranetapp-fr.html', 'gcintranet', 'gcintranet-appTop-fr', {
        refTop: '{"cdnEnv": "localhost"}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application Name"}], "lngLinks": [{"lang": "en", "href": "gcintranet-appTop-en.html", "text": "English"}], "secure": true, "signIn": [{ "href": "#" }], "search": false, "menuLinks": [{"href": "#", "text": "Link 1", "subLinks": [{"subhref": "#", "subtext": "SubLink 1"}, {"subhref": "#",	"subtext": "SubLink 2"}]}, {"href": "#", "text": "Link 2" }], "breadcrumbs": [{ "title": "Home", "href": "https://www.canada.ca/en/index.html" },{"title": "SGDC", "acronym": "Centrally Deployed Templates Solution", "href": "https://www.canada.ca/en/index.html"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
    });

    generateTestFile('./test/html/gcintranet/template-gcintranetapp-en.html', 'gcintranet', 'gcintranet-appTop-externalLinkMenu-en', {
        refTop: '{"cdnEnv": "localhost"}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}], "menuPath": "../ajax/custommenu-eng.html"}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
    });

    generateTestFile('./test/html/gcintranet/template-gcintranetapp-fr.html', 'gcintranet', 'gcintranet-appTop-externalLinkMenu-fr', {
        refTop: '{"cdnEnv": "localhost"}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}], "menuPath": "../ajax/custommenu-eng.html"}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
    });

    generateTestFile('./test/html/gcintranet/template-gcintranetapp-en.html', 'gcintranet', 'gcintranet-appTop-signOut-en', {
        refTop: '{"cdnEnv": "localhost"}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}], "signOut": [{"href": "#"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
    });

    generateTestFile('./test/html/gcintranet/template-gcintranetapp-fr.html', 'gcintranet', 'gcintranet-appTop-signOut-fr', {
        refTop: '{"cdnEnv": "localhost"}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}], "signOut": [{"href": "#"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
    });

    generateTestFile('./test/html/gcintranet/template-gcintranetapp-en.html', 'gcintranet', 'gcintranet-appTop-customizedTitle-en', {
        refTop: '{"cdnEnv": "localhost"}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}], "intranetTitle": [{"href": "http://esdc.prv/en/index.shtml","text": "CustomTitle", "boldText" : "Bold", "acronym": "Acronym" }]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
    });

    generateTestFile('./test/html/gcintranet/template-gcintranetapp-fr.html', 'gcintranet', 'gcintranet-appTop-customizedTitle-fr', {
        refTop: '{"cdnEnv": "localhost"}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}], "intranetTitle": [{"href": "http://esdc.prv/en/index.shtml","text": "CustomTitle", "boldText" : "Bold", "acronym": "Acronym" }]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
    });

    it('Sign in button exists', async () => {
        await signinBtnExistsIntranet('en');
        await signinBtnExistsIntranet('fr');
    });

    it('Sign out button exists', async () => {
        await signOutBtnExistsIntranet('en');
        await signOutBtnExistsIntranet('fr');
    });

    it('Sign in button does not exists', async () => {
        await signinBtnDoesNotExist(theme, 'en');
        await signinBtnDoesNotExist(theme, 'fr');
    });
    
    it('Menu links exist', async () => {
        await menuExists(theme, 'en');
        await menuExists(theme, 'fr');
    });

    it('Menu links exist when using Menu Path', async () => {
        await menuExistsUsingPath(theme, 'en');
        await menuExistsUsingPath(theme, 'fr');
    });

    it('Menu links do not exist', async () => {
        await menuDoesNotExist(theme, 'en');
        await menuDoesNotExist(theme, 'fr');
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
    
    it('Search bar should appear', async () => {
        await searchExists(theme, 'en');
        await searchExists(theme, 'fr');
    });

    it('Search bar should NOT appear', async () => {
        await searchDoesNotExist(theme, 'en');
        await searchDoesNotExist(theme, 'fr');
    });

    it('Secure Icon should appear', async () => {
        await secureIconExists(theme, 'en');
        await secureIconExists(theme, 'fr');
    });

    it('Secure Icon should NOT appear', async () => {
        await secureIconDoesNotExist(theme, 'en');
        await secureIconDoesNotExist(theme, 'fr');
    });

    it('Test if title has been customized', async () => {
        await titleCustomized(theme, 'en');
        await titleCustomized(theme, 'fr');
    });

    it('Accessibility', async () => {
        await accessibility(theme, 'en');
        await accessibility(theme, 'fr');
    });
});

async function settingsBtnExists(theme, lang){
    await appTopPage.open(theme, lang);
    if (lang === 'en') { await expect(appTopPage.settingsBtn).toHaveTextContaining('Account settings'); }
    else { await expect(appTopPage.settingsBtn).toHaveTextContaining('Paramètres du compte'); }
}

async function settingsBtnDoesNotExist(theme, lang){
    await basicPage.open(theme, lang, 'app');
    await expect(appTopPage.settingsBtn).not.toExist();
}

async function signinBtnExists(lang){
    await appTopPage.open('gcweb', lang);
    if (lang === 'en') { await expect(appTopPage.signinBtn).toHaveTextContaining('Sign in'); }
    else { await expect(appTopPage.signinBtn).toHaveTextContaining('Ouvrir une session'); }
}

async function signOutBtnExists(lang){
    await appTopPage.open('gcweb', lang, 'signOut');
    if (lang === 'en') { await expect(appTopPage.signOutBtn).toHaveTextContaining('Sign out'); }
    else { await expect(appTopPage.signOutBtn).toHaveTextContaining('Fermer la session'); }
}

async function signinBtnExistsIntranet(lang){
    await appTopPage.open('gcintranet', lang);
    if (lang === 'en') { await expect(appTopPage.signOffBtnIntranet).toHaveTextContaining('Sign in'); }
    else { await expect(appTopPage.signOffBtnIntranet).toHaveTextContaining('Connexion'); }
}

async function signOutBtnExistsIntranet(lang){
    await appTopPage.open('gcintranet', lang, 'signOut');
    if (lang === 'en') { await expect(appTopPage.signOffBtnIntranet).toHaveTextContaining('Sign out'); }
    else { await expect(appTopPage.signOffBtnIntranet).toHaveTextContaining('Déconnexion'); }
}

async function signinBtnDoesNotExist(theme, lang){
    await basicPage.open(theme, lang, 'app');
    if (theme === 'gcweb') { await expect(appTopPage.signinBtn).not.toExist(); }
    else { await expect(appTopPage.signOffBtnIntranet).not.toExist(); }
}

async function menuExists(theme, lang){
    await appTopPage.open(theme, lang);
    await expect(appTopPage.menuLinks).toExist();
    await expect(appTopPage.menuLink1).toExist();
    await expect(appTopPage.menuLink2).toExist();
    await expect(appTopPage.menuSubLink).toExist();
}

async function menuExistsUsingPath(theme, lang){
    await appTopPage.open(theme, lang, 'externalLinkMenu');
    await expect(appTopPage.menuLinks).toExist();
    await expect(appTopPage.menuLink1).toExist();
    await expect(appTopPage.menuLink2).toExist();
    await expect(appTopPage.menuPathSubLink).toExist();
}

async function menuDoesNotExist(theme, lang){
    await basicPage.open(theme, lang, 'app');
    await expect(appTopPage.menuLinks).not.toExist();
}

async function breadcrumbsExist(theme){
    await appTopPage.open(theme, 'en');
    await expect(appTopPage.cdtsBreadCrumb).toHaveTextContaining('CDTS');
}

async function breadcrumbsExist_FR(theme){
    await appTopPage.open(theme, 'fr');
    await expect(appTopPage.cdtsBreadCrumb).toHaveTextContaining('SGDC');
}

async function breadcrumbsDoNotExist(theme, lang){
    await basicPage.open(theme, lang, 'app');
    await expect(basicPage.cdtsBreadCrumb).not.toExist();
}

async function langLinksExist(theme){
    await appTopPage.open(theme, 'en');
    if (theme === 'gcweb') {
        await expect(appTopPage.langLinkText).toHaveTextContaining('Français');
        const langLink = await appTopPage.langLink;
        await langLink.click();
    }
    else {
        await expect(appTopPage.langLinkTextIntranet).toHaveTextContaining('Français');
        const langLink = await appTopPage.langLinkTextIntranet;
        await langLink.click();
    }    
    await browser.pause(3000);
    await expect(browser).toHaveUrlContaining('-fr');
}

async function langLinksExist_FR(theme){
    await appTopPage.open(theme, 'fr');
    if (theme === 'gcweb') {
        expect(appTopPage.langLinkText).toHaveTextContaining('English');
        const langLink = await appTopPage.langLink;
        await langLink.click();
    }
    else {
        await expect(appTopPage.langLinkTextIntranet).toHaveTextContaining('English');
        const langLink = await appTopPage.langLinkTextIntranet;
        await langLink.click();
    }
    await browser.pause(3000);
    await expect(browser).toHaveUrlContaining('-en');
}

async function searchExists(theme, lang){
    if (theme === 'gcweb') { await appTopPage.open(theme, lang); }
    else { await basicPage.open(theme, lang, 'app'); }
    await expect(appTopPage.search).toExist();
}

async function searchDoesNotExist(theme, lang){
    if (theme === 'gcweb') { await basicPage.open(theme, lang, 'app'); }
    else { await appTopPage.open(theme, lang); }
    await expect(appTopPage.search).not.toExist();
}

async function langLinksDoNotExist(theme, lang){
    await basicPage.open(theme, lang, 'app');
    await expect(basicPage.langLink).not.toExist();
}

async function secureIconExists(theme, lang){
    await appTopPage.open(theme, lang);
    await expect(appTopPage.secureIcon).toExist();
}

async function secureIconDoesNotExist(theme, lang){
    await basicPage.open(theme, lang, 'app');
    await expect(appTopPage.secureIcon).not.toExist();
}

async function titleCustomized(theme, lang){
    await appTopPage.open(theme, lang, 'customizedTitle');
    await expect(appTopPage.intranetText).toHaveTextContaining('Bold');
    await expect(appTopPage.intranetTitle).toHaveTextContaining('CustomTitle');
}

async function accessibility(theme, lang) {
    await appTopPage.open(theme, lang);
    await runAccessbilityTest();
}
