module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    // Modals
    phoneNumberModal: '.modal',
    creditCardModalHelp: '.modal',
    creditCardFill: '.modal.unusual',
    // Functions
    selectCarType: '//div[contains(text(), "Supportive")]',
    paymentMethodButton: '#root > div > div.workflow > div.workflow-subcontainer > div.tariff-picker.shown > div.form > div.pp-button.filled > div.pp-text',
    addCardButton1:  '//div[contains(text(), "Add card")]',
    cardNumberField: '#number',
    codeNumberField: '#code.card-input',
    toggleButtonHelp: '#root > div > div.workflow > div.workflow-subcontainer > div.tariff-picker.shown > div.form > div.reqs.open > div.reqs-body > div:nth-child(1) > div > div.r-sw > div > span',
    plusCounterHelp: '#root > div > div.workflow > div.workflow-subcontainer > div.tariff-picker.shown > div.form > div.reqs.open > div.reqs-body > div.r.r-type-group > div > div.r-group-items > div:nth-child(1) > div > div.r-counter > div > div.counter-plus',
    orderCarButtonHelp: '#root > div > div.workflow > div.smart-button-wrapper > button > span.smart-button-main',
    waitForDriverHelp: ".order-body",
    driverInfoHelp: ".order-btn-group",
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        await delay(2000); 
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    submitCreditCard: async function(cardNumber, cvv) {
        const cardNumberField = await $(this.cardNumberField)
        await cardNumberField.setValue(cardNumber)
        await delay(1000); 
        const codeNumberField = await $(this.codeNumberField)
        await codeNumberField.setValue(cvv)
        await delay(1000); 
        const randomSpot = await $('#root > div > div.payment-picker.open > div.modal.unusual > div.section.active.unusual > form > div.card-wrapper > div.card-second-row > div.plc');
        await randomSpot.click()
        await delay(1000);
        const linkButton = await $('//button[contains(text(), "Link")]')
        await linkButton.click()
        await delay(1000); 
        const cardAddedModal = await $(".modal")
        await expect(cardAddedModal).toBeExisting()
        const secondCloseButton = await $('#root > div > div.payment-picker.open > div.modal > div.section.active > button');
        await secondCloseButton.click()
        await delay(1000);

},
}
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}