import {expect, Page} from "@playwright/test";
import {Locator} from "playwright";

export class SecurePage {
    page: Page;
    url: string;
    logoutBtn: Locator;
    alert: Locator;

    constructor(page) {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/secure';
        this.logoutBtn = this.page.getByRole('link', {name: ' Logout'})
        this.alert = this.page.locator('div#flash')
    }

    async logOut(){
        await this.logoutBtn.click()
    }

    async verifyLoginSuccess(){
        await expect(this.page, 'Failed to log in.').toHaveURL(this.url);
        await expect(this.alert).toContainText("You logged into a secure area!")
    }

}