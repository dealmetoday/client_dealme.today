describe('Initial User profile load', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
  });

  it('should initially pre-populate known fields', async () => {
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(5000);
    await expect(element(by.id('user-profile-first'))).toHaveText('Alfred');
    await expect(element(by.id('user-profile-middle'))).toHaveText('Hi');
    await expect(element(by.id('user-profile-last'))).toHaveText('Hong');
    await expect(element(by.id('user-profile-email'))).toHaveText('Alfred.hong91@hotmail.com');
    await expect(element(by.id('user-profile-age'))).toHaveText('27');
  });

  it('should be able to change every field in profile', async () => {
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(5000);
    await element(by.id('user-profile-first')).tap();
    await element(by.id('user-profile-first')).clearText()
    await element(by.id('user-profile-first')).typeText('Alf');
    await element(by.id('user-profile-first')).tapReturnKey();

    await element(by.id('user-profile-middle')).tap();
    await element(by.id('user-profile-middle')).clearText()
    await element(by.id('user-profile-middle')).typeText('Lee');
    await element(by.id('user-profile-middle')).tapReturnKey();

    await element(by.id('user-profile-last')).tap();
    await element(by.id('user-profile-last')).clearText()
    await element(by.id('user-profile-last')).typeText('Pong');
    await element(by.id('user-profile-last')).tapReturnKey();

    await element(by.id('user-profile-age')).tap();
    await element(by.id('user-profile-age')).clearText()
    await element(by.id('user-profile-age')).typeText('22');
    await element(by.id('UserProfileScreenContainer')).tap();
    await element(by.id("header-right-button")).tap();

    await device.reloadReactNative();

    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();

    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(5000);
    await expect(element(by.id('user-profile-first'))).toHaveText('Alf');
    await expect(element(by.id('user-profile-middle'))).toHaveText('Lee');
    await expect(element(by.id('user-profile-last'))).toHaveText('Pong');
    await expect(element(by.id('user-profile-age'))).toHaveText('22');



  })
  
  afterEach( async () => {
    await element(by.id('user-profile-first')).tap();
    await element(by.id('user-profile-first')).clearText()
    await element(by.id('user-profile-first')).typeText('Alfred');
    await element(by.id('user-profile-first')).tapReturnKey();

    await element(by.id('user-profile-middle')).tap();
    await element(by.id('user-profile-middle')).clearText()
    await element(by.id('user-profile-middle')).typeText('Hi');
    await element(by.id('user-profile-middle')).tapReturnKey();

    await element(by.id('user-profile-last')).tap();
    await element(by.id('user-profile-last')).clearText()
    await element(by.id('user-profile-last')).typeText('Hong');
    await element(by.id('user-profile-last')).tapReturnKey();

    await element(by.id('user-profile-age')).tap();
    await element(by.id('user-profile-age')).clearText()
    await element(by.id('user-profile-age')).typeText('27');
    await element(by.id('UserProfileScreenContainer')).tap();

    await element(by.id("header-right-button")).tap();

  })

  // Testing changing favorite malls, gender, and tags is not possible since detox does not support those components, so will have to manually test.

});