describe('[FR-5] Deals - Promotions Screen Test', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();

    await waitFor(element(by.id('UserDealScreenContainer'))).toBeVisible().withTimeout(10000);
    await element(by.id('store0_viewButton')).tap();
    await element(by.id('unlock-promotion0-button')).tap();
  });


  it('[FR-5.1] View a QR code to apply to promotion', async () => {
    await waitFor(element(by.id('Deals-modal'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('QR-Code'))).toBeVisible();

  });

  it('[FR-5.2] Input a correct store-specific security number to apply to promotion', async () => {
    await waitFor(element(by.id('Deals-modal'))).toBeVisible().withTimeout(10000);
    await element(by.id('store-pin')).tap();
    await element(by.id('store-pin')).typeText('1234');
    await element(by.id('store-pin')).tapReturnKey();
    await element(by.id('claim-button')).tap();
    await expect(element(by.id('store0_viewButton'))).toBeNotVisible();


  });

  it('[FR-5.2] Input an incorrect store-specific security number to apply to promotion', async () => {
    await waitFor(element(by.id('Deals-modal'))).toBeVisible().withTimeout(10000);
    await element(by.id('store-pin')).tap();
    await element(by.id('store-pin')).typeText('123456');
    await element(by.id('store-pin')).tapReturnKey();
    await expect(element(by.id('store0_viewButton'))).toBeNotVisible();


  });

  it('[FR-5.3] Exit back to the select store screen', async () => {
    await waitFor(element(by.id('Deals-modal'))).toBeVisible().withTimeout(10000);
    await element(by.id('promotion-back-button')).tap();
    await expect(element(by.id('store0_viewButton'))).toBeNotVisible();


  });

});

