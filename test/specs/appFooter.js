const appFooterPage = require('../pageobjects/appFooter.page');
const basicPage = require('../pageobjects/basic.page');
const generateTestFile = require('../../TestFileGenerator.js');
require('../setup/basic.js');

describe('AppFooter section tests for GCWeb', () => {
    const theme = 'gcweb';

    generateTestFile('./test/html/gcweb/template-gcwebapp-en.html', 'gcweb', 'gcweb-appFooter-en', {
        refTop: '{"cdnEnv": "localhost", "isApplication": true}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"footerSections": [{"href": "#", "text": "Portal footer link 1"}, {"href": "#", "text": "Portal footer link 2"}, {"href": "#", "text": "Portal footer link 3", "newWindow": true}], "contactLink": [{"href": "contactLinksTest", "newWindow": true }], "termsLink": [{"href": "termsLinkTest"}], "privacyLink": [{"href": "privacyLinkTest"}], "cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost", "isApplication": true}'
	});

    generateTestFile('./test/html/gcweb/template-gcwebapp-fr.html', 'gcweb', 'gcweb-appFooter-fr', {
        refTop: '{"cdnEnv": "localhost", "isApplication": true}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"footerSections": [{"href": "#", "text": "Portal footer link 1"}, {"href": "#", "text": "Portal footer link 2"}, {"href": "#", "text": "Portal footer link 3", "newWindow": true}], "contactLink": [{"href": "contactLinksTest", "newWindow": true }], "termsLink": [{"href": "termsLinkTest"}], "privacyLink": [{"href": "privacyLinkTest"}], "cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost", "isApplication": true}'
	});

    it('Validate the footer links', async () => {
        await footerLinks(theme, 'en');
        await footerLinks(theme, 'fr');
    });

    it('Validate the customized links', async () => {
        await footerBrandLinks(theme, 'en');
        await footerBrandLinks(theme, 'fr');
    });

    it('Validate the footer links are not shown', async () => {
        await footerLinksNotExist(theme, 'en');
        await footerLinksNotExist(theme, 'fr');
    });

    it('Validate default links', async () => {
        await footerDefaultBrandLinks(theme, 'en');
        await footerDefaultBrandLinks(theme, 'fr');
    });
});

describe('AppFooter section tests for GCIntranet', () => {
    const theme = 'gcintranet';

    generateTestFile('./test/html/gcintranet/template-gcintranetapp-en.html', 'gcintranet', 'gcintranet-appFooter-en', {
        refTop: '{"cdnEnv": "localhost"}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"footerSections": [{"href": "#", "text": "Portal footer link 1"}, {"href": "#", "text": "Portal footer link 2"}, {"href": "#", "text": "Portal footer link 3", "newWindow": true}], "cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    generateTestFile('./test/html/gcintranet/template-gcintranetapp-fr.html', 'gcintranet', 'gcintranet-appFooter-fr', {
        refTop: '{"cdnEnv": "localhost"}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"footerSections": [{"href": "#", "text": "Portal footer link 1"}, {"href": "#", "text": "Portal footer link 2"}, {"href": "#", "text": "Portal footer link 3", "newWindow": true}], "cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    generateTestFile('./test/html/gcintranet/template-gcintranetapp-en.html', 'gcintranet', 'gcintranet-appFooter-global-en', {
        refTop: '{"cdnEnv": "localhost"}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"globalNav": true, "cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    generateTestFile('./test/html/gcintranet/template-gcintranetapp-fr.html', 'gcintranet', 'gcintranet-appFooter-global-fr', {
        refTop: '{"cdnEnv": "localhost"}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"globalNav": true, "cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    generateTestFile('./test/html/gcintranet/template-gcintranetapp-en.html', 'gcintranet', 'gcintranet-appFooter-subTheme-en', {
        refTop: '{"cdnEnv": "localhost"}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"subTheme": "esdc", "cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    generateTestFile('./test/html/gcintranet/template-gcintranetapp-fr.html', 'gcintranet', 'gcintranet-appFooter-subTheme-fr', {
        refTop: '{"cdnEnv": "localhost"}',
        appTop: '{"cdnEnv": "localhost", "appName": [{"text": "Application name", "href": "#"}]}',
        preFooter: '{"cdnEnv": "localhost"}',
        appFooter: '{"subTheme": "esdc", "cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    it('Validate the footer links', async () => {
        await footerLinks(theme, 'en');
        await footerLinks(theme, 'fr');
    });

    it('Validate the globalfooter links', async () => {
        await footerLinksGlobal(theme, 'en');
        await footerLinksGlobal(theme, 'fr');
    });

    it('Validate the footer links are not shown', async () => {
        await footerLinksNotExist(theme, 'en');
        await footerLinksNotExist(theme, 'fr');
    });

    it('Validate the footer when subtheme is esdc', async () => {
        await footerSubTheme(theme, 'en');
        await footerSubTheme(theme, 'fr');
    });
});

async function footerLinks(theme, lang){
    appFooterPage.open(theme, lang);
    await expect(appFooterPage.footer).toExist();
    await expect(appFooterPage.footerLink).toHaveTextContaining('Portal footer link 1');
}

async function footerLinksGlobal(theme, lang){
    appFooterPage.open(theme, lang, 'global');
    await expect(appFooterPage.footer).toExist();
    if (lang === 'en') { await expect(appFooterPage.footerLink).toHaveTextContaining('News'); }
    else { await expect(appFooterPage.footerLink).toHaveTextContaining('Nouvelles'); }
}

async function footerBrandLinks(theme, lang){
    appFooterPage.open(theme, lang);
    await expect(appFooterPage.contactLink).toHaveHrefContaining('contactLinksTest');
    await expect(appFooterPage.termsLink).toHaveHrefContaining('termsLinkTest');
    await expect(appFooterPage.privacyLink).toHaveHrefContaining('privacyLinkTest');
}

async function footerLinksNotExist(theme, lang){
    appFooterPage.open(theme, lang, 'app');
    await expect(appFooterPage.footer).not.toExist();
}

async function footerDefaultBrandLinks(theme, lang){
    basicPage.open(theme, lang, 'app');
    await expect(appFooterPage.contactLink).toHaveHrefContaining('contact.html');
    if (lang === 'en'){
        await expect(appFooterPage.termsLink).toHaveHrefContaining('terms.html');
        await expect(appFooterPage.privacyLink).toHaveHrefContaining('privacy.html');
    } else{
        await expect(appFooterPage.termsLink).toHaveHrefContaining('avis.html');
        await expect(appFooterPage.privacyLink).toHaveHrefContaining('confidentialite.html');
    }
}

async function footerSubTheme(theme, lang){
    appFooterPage.open(theme, lang, 'subTheme');
    await expect(appFooterPage.footer).toHaveAttributeContaining('data-wb-ajax', 'global/esdcfooter')
}