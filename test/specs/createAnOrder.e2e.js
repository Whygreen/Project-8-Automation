const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should select the supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const selectTypeCar = await $(page.selectCarType);
        await selectTypeCar.click()
    })
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    })  
    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting(); 
    })
    it('should open up credit card modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const paymentMethodButton = $(page.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const addCardModal = await $(page.creditCardModalHelp);
        await expect(addCardModal).toBeExisting();
    })
    it('should open up the add credit card modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const paymentMethodButton = $(page.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const addCardButton = $(page.addCardButton1);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const fillCardModal = await $(page.creditCardFill);
        await expect(fillCardModal).toBeExisting(); 
    })   
    it('should save the credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const paymentMethodButton = $(page.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const addCardButton = $(page.addCardButton1);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        //the expect for this test is in the page.js file 
        await page.submitCreditCard('1234 5678 9000', '14');
    })   
    it('should add a message to the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const messageDriverField = await $('#comment');
        await messageDriverField.setValue('bring some ketchup!');
    }) 
    it('should order a Blanket and handkerchiefs', async () => {
        // await browser.url(`/`)
        // await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const toggleButton = await $(page.toggleButtonHelp);
        await toggleButton.waitForDisplayed();
        await toggleButton.click();
        await expect(toggleButton).toBeEnabled();
    })
    it('should add two ice creams', async () => {
        // await browser.url(`/`)
        // await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const plusCounter = await $(page.plusCounterHelp);
        await plusCounter.waitForDisplayed();
        await plusCounter.click();
        await plusCounter.click();
    })    
    it('should open the car search modal and wait for driver', async () => {
        const orderCarButton = await $(page.orderCarButtonHelp);
        await orderCarButton.waitForDisplayed();
        await orderCarButton.click();
        await delay(40000);
        const waitForDriver = await $(page.waitForDriverHelp);
        expect(waitForDriver).toBeTruthy();
    })
    it('should change from showing the car search to the drive info', async () => {    
        const driverInfo = await $(page.driverInfoHelp);
        expect(driverInfo).toBeTruthy();
    })
})
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}