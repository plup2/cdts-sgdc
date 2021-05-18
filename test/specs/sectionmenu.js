const sectionMenuPage = require('../pageobjects/sectionMenu.page');

describe('Section menu tests for GCWeb', () => {
    const theme = 'gcweb';

    it('Validate that the section menu exists', async () => {
        await sectionMenuExists(theme, 'en');
        await sectionMenuExists(theme, 'fr');
    });

    it('Validate menu Link', async () => {
        await menuLinks(theme, 'en');
        await menuLinks(theme, 'fr');
    });

    it('Validate sublinks', async () => {
        await subLinks(theme, 'en');
        await subLinks(theme, 'fr');
    });

    it('Validate link will open in a new window', async () => {
        await linkOpensInNewWindow(theme, 'en');
        await linkOpensInNewWindow(theme, 'fr');
    });

    it('Validate second/third sections', async () => {
        await validateSections(theme, 'en');
        await validateSections(theme, 'fr');
    });

});

describe('Section menu tests for GCIntranet', () => {
    const theme = 'gcintranet';

    it('Validate that the section menu exists', async () => {
        await sectionMenuExists(theme, 'en');
        await sectionMenuExists(theme, 'fr');
    }); 

    it('Validate menu Link', async () => {
        await menuLinks(theme, 'en');
        await menuLinks(theme, 'fr');
    });

    it('Validate sublinks', async () => {
        await subLinks(theme, 'en');
        await subLinks(theme, 'fr');
    });

    it('Validate link will open in a new window', async () => {
        await linkOpensInNewWindow(theme, 'en');
        await linkOpensInNewWindow(theme, 'fr');
    });

    it('Validate second/third sections', async () => {
        await validateSections(theme, 'en');
        await validateSections(theme, 'fr');
    });
});

async function sectionMenuExists(theme, lang){
    sectionMenuPage.open(theme, lang);
    await expect(sectionMenuPage.sectionMenu).toExist();
}

async function menuLinks(theme, lang){
    sectionMenuPage.open(theme, lang);
    await expect(sectionMenuPage.menuLink).toHaveTextContaining('Link 1');
}

async function subLinks(theme, lang){
    sectionMenuPage.open(theme, lang);
    await expect(sectionMenuPage.subLink).toHaveTextContaining('Link 1.1 a)');
}

async function linkOpensInNewWindow(theme, lang){
    sectionMenuPage.open(theme, lang);
    await expect(sectionMenuPage.subLinkNewWindow).toHaveAttribute('target', '_blank')
}

async function validateSections(theme, lang){
    sectionMenuPage.open(theme, lang);
    await expect(sectionMenuPage.secondSectionLink).toHaveTextContaining('Opens in a new window');
    await expect(sectionMenuPage.thirdSectionText).toHaveTextContaining('Section name 3');
}