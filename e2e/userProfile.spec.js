describe('Initial User profile load', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('test1@test.org');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
  });

  it('should initially pre-populate known fields', async () => {
    await expect(element(by.id('UserProfileScreenContainer'))).toBeVisible();
    await expect(element(by.id('user-profile-email'))).toHaveText('test1@test.org');
    await expect(element(by.id('user-profile-age'))).toHaveText('-1');

  });



});