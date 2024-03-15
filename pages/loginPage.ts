import {expect, Page} from "@playwright/test";
import {Locator} from "playwright";

export class LoginPage {
    page: Page;
    url: string;
    userNameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    alert: Locator;


    constructor(page) {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/login';
        this.userNameInput = this.page.locator('input#username');
        this.passwordInput = this.page.locator('input#password');
        this.loginButton = this.page.getByRole('button', {name: ' Login'});
        this.alert = this.page.locator('div#flash');
    }
    async goTo(){
        await this.page.goto(this.url);
        await expect(this.page, 'Failed to load page').toHaveURL(this.url);
    }
    async logIn(userName, password){
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async userNameFail(password){
        await this.logIn('FakeUser', password);
        await expect(this.alert, 'Did not fail to log in').toContainText('Your username is invalid!');
    }

    async passwordFail(userName){
        await this.logIn(userName, 'FakePassword');
        await expect(this.alert, 'Did not fail to log in').toContainText('Your password is invalid!');
    }

    async verifyPageURL(){
        await expect(this.page, 'Not on loginPage').toHaveURL(this.url)
    }
}