describe('Navigation', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Navigate to Deal Screen After login when it\'s not first time', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(5000);
    await expect(element(by.id('UserProfileScreenContainer'))).toBeVisible();
  });

  it("Navigate to Profile Screen After login when it is first time loggin in", async ()=>{
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfredtest@test.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Test123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await waitFor(element(by.id('UserDealScreenContainer'))).toBeVisible().withTimeout(5000);
    await expect(element(by.id('UserDealScreenContainer'))).toBeVisible();
  })

  it("Navigate to Profile Screen from Deals Screen", async ()=>{
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await waitFor(element(by.id('UserDealScreenContainer'))).toBeVisible().withTimeout(5000);
    await element(by.id('footerProfileButton')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(5000);
    await expect(element(by.id('UserProfileScreenContainer'))).toBeVisible();
  })

  it("Navigate to Deals Screen From Profile Screen", async ()=>{
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfredtest@test.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Test123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(5000);
    await element(by.id('footerDealsButton')).tap();
    await waitFor(element(by.id('UserDealScreenContainer'))).toBeVisible().withTimeout(5000);
    await expect(element(by.id('UserDealScreenContainer'))).toBeVisible();
  })


});