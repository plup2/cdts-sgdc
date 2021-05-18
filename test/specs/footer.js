const footerPage = require('../pageobjects/footer.page');
const basicPage = require('../pageobjects/basic.page');
const generateTestFile = require('../../TestFileGenerator.js');
require('../setup/basic.js');

describe('Footer section tests for GCWeb', () => {
    const theme = 'gcweb';

    generateTestFile('./test/html/gcweb/template-gcweb-en.html', 'gcweb', 'gcweb-footer-en', {
        refTop: '{"cdnEnv": "localhost"}',
        top: '{"cdnEnv": "localhost"}',
        preFooter: '{"cdnEnv": "localhost"}',
        footer: '{"showFooter": false, "contactLinks": [{"href": "contactLinksTest"}], "termsLink": [{"href": "termsLinkTest"}], "privacyLink": [{"href": "privacyLinkTest"}], "cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    generateTestFile('./test/html/gcweb/template-gcweb-fr.html', 'gcweb', 'gcweb-footer-fr', {
        refTop: '{"cdnEnv": "localhost"}',
        top: '{"cdnEnv": "localhost"}',
        preFooter: '{"cdnEnv": "localhost"}',
        footer: '{"showFooter": false, "contactLinks": [{"href": "contactLinksTest"}], "termsLink": [{"href": "termsLinkTest"}], "privacyLink": [{"href": "privacyLinkTest"}], "cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    generateTestFile('./test/html/gcweb/template-gcweb-en.html', 'gcweb', 'gcweb-footer-customizedContact-en', {
        refTop: '{"cdnEnv": "localhost"}',
        top: '{"cdnEnv": "localhost"}',
        preFooter: '{"cdnEnv": "localhost"}',
        footer: '{"contactLinks": [{"href": "contactLinksTest"}], "cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    generateTestFile('./test/html/gcweb/template-gcweb-fr.html', 'gcweb', 'gcweb-footer-customizedContact-fr', {
        refTop: '{"cdnEnv": "localhost"}',
        top: '{"cdnEnv": "localhost"}',
        preFooter: '{"cdnEnv": "localhost"}',
        footer: '{"contactLinks": [{"href": "contactLinksTest"}], "cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    it('Validate that the footer does not show', async () => {
        await showFooterFalse(theme, 'en');
        await showFooterFalse(theme, 'fr');
    });

    it('Validate the customized links when footer is not shown', async () => {
        await footerBrandLinks(theme, 'en');
        await footerBrandLinks(theme, 'fr');
    });

    it('Validate the contact link when footer is shown', async () => {
        await footerCustomizedContactLink(theme, 'en');
        await footerCustomizedContactLink(theme, 'fr');
    });

    it('Validate the customized contact link when footer is shown', async () => {
        await footerContactLink(theme, 'en');
        await footerContactLink(theme, 'fr');
    });
});

describe('Footer section tests for GCIntranet', () => {
    const theme = 'gcintranet';

    generateTestFile('./test/html/gcintranet/template-gcintranet-en.html', 'gcintranet', 'gcintranet-footer-en', {
        refTop: '{"cdnEnv": "localhost"}',
        top: '{"cdnEnv": "localhost"}',
        preFooter: '{"cdnEnv": "localhost"}',
        footer: '{"contactLinks": [{"href": "contactLinksTest", "text": "Customized Contact"}], "cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    generateTestFile('./test/html/gcintranet/template-gcintranet-fr.html', 'gcintranet', 'gcintranet-footer-fr', {
        refTop: '{"cdnEnv": "localhost"}',
        top: '{"cdnEnv": "localhost"}',
        preFooter: '{"cdnEnv": "localhost"}',
        footer: '{"contactLinks": [{"href": "contactLinksTest", "text": "Customized Contact"}], "cdnEnv": "localhost"}',
        refFooter: '{"cdnEnv": "localhost"}'
	});

    it('Validate the contact link when footer is shown', async () => {
        await footerContactLink(theme, 'en');
        await footerContactLink(theme, 'fr');
    });

    it('Validate the customized contact link when footer is shown', async () => {
        await footerCustomizedContactLinkGC(theme, 'en');
        await footerCustomizedContactLinkGC(theme, 'fr');
    });
});

async function showFooterFalse(theme, lang){
    footerPage.open(theme, lang);
    await expect(footerPage.footer).toExist();
}

async function footerBrandLinks(theme, lang){
    footerPage.open(theme, lang);
    await expect(footerPage.contactLink).toHaveHrefContaining('contactLinksTest');
    await expect(footerPage.termsLink).toHaveHrefContaining('termsLinkTest');
    await expect(footerPage.privacyLink).toHaveHrefContaining('privacyLinkTest');
}

async function footerContactLink(theme, lang){
    basicPage.open(theme, lang);
    if (theme === 'gcweb'){
        await expect(footerPage.footerContactLink).toHaveHrefContaining('contact.html');
    }
    else{
        await expect(footerPage.footerContactLink).toHaveHrefContaining('contactgc');
        if (lang ==='en') { await expect(footerPage.footerContactLink).toHaveTextContaining('Contact us'); }
        else { await expect(footerPage.footerContactLink).toHaveTextContaining('Communiquez avec nous'); }
    }
}

async function footerCustomizedContactLink(theme, lang){
    footerPage.open(theme, lang, 'customizedContact');
    await expect(footerPage.footerContactLink).toHaveHrefContaining('contactLinksTest');
}

async function footerCustomizedContactLinkGC(theme, lang){
    footerPage.open(theme, lang);
    await expect(footerPage.footerContactLink).toHaveHrefContaining('contactLinksTest');
    await expect(footerPage.footerContactLink).toHaveTextContaining('Customized Contact');
}