describe('Email Signup and Log in', () => {
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
    await expect(element(by.id('Deals-modal'))).toBeVisible();
  });


  it('[FR-4.1] Number of promotions should match deals available', async () => {
    await waitFor(element(by.id('Deals-modal'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('promotion0_description'))).toHaveText('$25 off your purchase');
    await expect(element(by.id('promotion1_description'))).toHaveText('70% off your purchase');
    await expect(element(by.id('promotion2_description'))).toHaveText('$10 off your purchase');

  });
  it('[FR-4.1] should be able to view description of the promotion', async () => {
    await waitFor(element(by.id('Deals-modal'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('promotion0_description'))).toHaveText('$25 off your purchase');
    await expect(element(by.id('promotion1_description'))).toHaveText('70% off your purchase');
    await expect(element(by.id('promotion2_description'))).toHaveText('$10 off your purchase');

  });

  it('[FR-4.2] should be able to view time left until deal expires', async () => {
    await waitFor(element(by.id('Deals-modal'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('promotion0_expirey'))).toBeVisible()
    await expect(element(by.id('promotion1_expirey'))).toBeVisible()
    await expect(element(by.id('promotion2_expirey'))).toBeVisible()
  });

  it('[FR-4.3] should be able to view number of promotions left', async () => {
    await waitFor(element(by.id('Deals-modal'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('promotion0_quantity'))).toHaveText('unlimited codes left!');
    await expect(element(by.id('promotion1_quantity'))).toHaveText('656 codes left!');
    await expect(element(by.id('promotion2_quantity'))).toHaveText('874 codes left!');

  });

  it('[FR-4.3] should be able to see "unlimited number of deals available"', async () => {
    await waitFor(element(by.id('Deals-modal'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('promotion0_quantity'))).toHaveText('unlimited codes left!');

  });

  it('[FR-4.5] should be able to exit back to the deals screen', async () => {
    await waitFor(element(by.id('Deals-modal'))).toBeVisible().withTimeout(10000);
    await element(by.id('promotions-close-button')).tap();
    await expect(element(by.id('deals-modal'))).toBeNotVisible();
  });


});
