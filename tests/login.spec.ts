import { test } from '@playwright/test';
import { LoginPage } from "../pages/loginPage";
import { SecurePage } from "../pages/securePage";

const data = require('../data.json');
let loginPage;
let securePage;
let page;

test.describe.configure({mode: 'parallel'})
test.describe('LogIn tests ', async ()=>{

  test.beforeAll( async ({browser}) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    securePage = new SecurePage(page)
  })

  test.beforeEach(async () => {
    await loginPage.goTo();
  })

  test( 'verify you can login and out', async () => {
    await loginPage.logIn(data.userName, data.password)
    await securePage.verifyLoginSuccess()
    await securePage.logOut()
    await loginPage.verifyPageURL()
  })

  test('verify wrong username fails', async () => {
    await loginPage.userNameFail(data.password);
  })

  test('verify wrong password fails', async () => {
    await loginPage.passwordFail(data.userName)
  })


})