describe('Email Signup and Log in', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('[FR-3.1] should Display the correct deals according to profile', async () => {
    await device.reloadReactNative();
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();

    await waitFor(element(by.id('UserDealScreenContainer'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('store0_NAME'))).toHaveText('All Supermarket');
    await expect(element(by.id('store1_NAME'))).toHaveText('Garden Bodega');
    await expect(element(by.id('store2_NAME'))).toHaveText('Garden Bodega');
    await expect(element(by.id('store3_NAME'))).toHaveText('Sports Store');
  });

  it('[FR-3.1] should Display A message if user did not select default mall', async () => {
     await device.reloadReactNative();
     await element(by.id('Email-input')).tap();
     await element(by.id('Email-input')).typeText('TestNoMall@test.com');
     await element(by.id('Email-input')).tapReturnKey();
     await element(by.id('Password-input')).tap();
     await element(by.id('Password-input')).typeText('Password123!')
     await element(by.id('Password-input')).tapReturnKey();
     await element(by.id('Login-Button')).tap();
     await waitFor(element(by.id('UserDealScreenContainer-noMallSelected'))).toBeVisible().withTimeout(10000);

   });

  it('[FR-3.2] should Display correct number of deals available for each store', async () => {
    await device.reloadReactNative();
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();

    await waitFor(element(by.id('UserDealScreenContainer'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('store0_DEALNUM'))).toHaveText('3 Deals Available!');
    await expect(element(by.id('store1_DEALNUM'))).toHaveText('1 Deals Available!');
    await expect(element(by.id('store2_DEALNUM'))).toHaveText('1 Deals Available!');
    await expect(element(by.id('store3_DEALNUM'))).toHaveText('2 Deals Available!');

  });

  it('[FR-3.3] should be able to select a store and modal will open with more information', async () => {
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

  it('[FR-3.4] should be able to navigate to profile page', async () => {
    await device.reloadReactNative();
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();

    await waitFor(element(by.id('UserDealScreenContainer'))).toBeVisible().withTimeout(10000);
    await element(by.id('footerProfileButton')).tap();
    await expect(element(by.id('UserProfileScreenContainer'))).toBeVisible();

  });

  it('[FR-3.4] should be able to go back to previous screen using back button', async () => {
    await device.reloadReactNative();
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();

    await waitFor(element(by.id('UserDealScreenContainer'))).toBeVisible().withTimeout(10000);
    await element(by.id('footerProfileButton')).tap();

    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(10000);
    await element(by.id('Profile_backButton')).tap();
    await waitFor(element(by.id('UserDealScreenContainer'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('UserDealScreenContainer'))).toBeVisible();

  });

  it('[FR-3.4] should NOT be able to go back to previous screen if previous screen was home screen', async () => {
    await device.reloadReactNative();
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await waitFor(element(by.id('UserDealScreenContainer'))).toBeVisible().withTimeout(10000);
    await element(by.id('Deals_backButton')).tap();
    await expect(element(by.id('ExampleScreenContainer'))).toBeNotVisible();


  });

  it('[FR-3.5] should be able to logout', async () => {
    await device.reloadReactNative();
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await waitFor(element(by.id('UserDealScreenContainer'))).toBeVisible().withTimeout(10000);

    await element(by.id('header-right-button')).tap();
    await expect(element(by.id('ExampleScreenContainer'))).toBeVisible();


  });

});