exports.DuckStartPage = class DuckStartPage {
    constructor(page) {
        this.page = page;
    }
    async goto() {
    await this.page.goto('https://start.duckduckgo.com/');
    }

    async initiateSearch(searchCriteria) {
    await page.waitForSelector('#logo_homepage_link');
    await page.fill('#search_form_input_homepage', searchCriteria);
    await page.click('#search_button_homepage');
    }
}