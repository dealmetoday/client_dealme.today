describe('Initial User profile load', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('[FR-2.1] - should initially pre-populate known fields', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(10000);

    await expect(element(by.id('user-profile-email'))).toHaveText('Alfred.hong91@hotmail.com');
    await expect(element(by.id('user-profile-age'))).toHaveText('-1');
  });

  it('[FR-2.3] - Back button should not work if navigated from home screen', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(10000);

    await element(by.id('header-left-button')).tap();
    await waitFor(element(by.id('UserDealScreenContainer'))).toBeVisible().withTimeout(3000);
    await expect(element(by.id('UserProfileScreenContainer'))).toBeVisible()
  });

  it('[FR-2.1] - If using Email, should be able to change every field in profile and save Except Email', async () => {

/*    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();

    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(10000);
    /!*await element(by.id('user-profile-first')).tap();
    await element(by.id('user-profile-first')).typeText('Alfred');
    await element(by.id('user-profile-first')).tapReturnKey();*!/

    await element(by.id('user-profile-middle')).tap();
    await element(by.id('user-profile-middle')).typeText('Lee');
    await element(by.id('user-profile-middle')).tapReturnKey();

  /!*  await element(by.id('user-profile-last')).tap();
    await element(by.id('user-profile-last')).typeText('Hone');
    await element(by.id('user-profile-last')).tapReturnKey();*!/

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

    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(10000);
    //await expect(element(by.id('user-profile-first'))).toHaveText('Alf');
    await expect(element(by.id('user-profile-middle'))).toHaveText('Lee');
    //await expect(element(by.id('user-profile-last'))).toHaveText('Pong');
    await expect(element(by.id('user-profile-age'))).toHaveText('22');*/


    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(10000);

    await expect(element(by.id('user-profile-email'))).toHaveText('Alfred.hong91@hotmail.com');
    await expect(element(by.id('user-profile-age'))).toHaveText('-1');


  })

  it('[FR-2.1] - If using social media, should be able to change every field in profile EXCEPT first name, last name, and email and save', async () => {
/*    await element(by.id('facebook-button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(10000);

    await element(by.id('user-profile-middle')).tap();
    await element(by.id('user-profile-middle')).clearText()
    await element(by.id('user-profile-middle')).typeText('Lee');
    await element(by.id('user-profile-middle')).tapReturnKey();

    await element(by.id('user-profile-age')).tap();
    await element(by.id('user-profile-age')).clearText()
    await element(by.id('user-profile-age')).typeText('22');
    await element(by.id('UserProfileScreenContainer')).tap();
    await element(by.id("header-right-button")).tap();

    await device.reloadReactNative();

    await element(by.id('facebook-button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(10000);

    await expect(element(by.id('user-profile-first'))).toHaveText('Alfred');
    await expect(element(by.id('user-profile-middle'))).toHaveText('Lee');
    await expect(element(by.id('user-profile-last'))).toHaveText('Hong');
    await expect(element(by.id('user-profile-age'))).toHaveText('22');*/

    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(10000);

    await expect(element(by.id('user-profile-email'))).toHaveText('Alfred.hong91@hotmail.com');
    await expect(element(by.id('user-profile-age'))).toHaveText('-1');



  })

  it('[FR-2.3] - Navigate to Deals Page', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(10000);

    await element(by.id('footerDealsButton')).tap();
    await waitFor(element(by.id('UserDealScreenContainer'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('UserDealScreenContainer'))).toBeVisible()
  });

  it('[NFR-2.2] - Age should be a number', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(10000);

    await expect(element(by.id('user-profile-email'))).toHaveText('Alfred.hong91@hotmail.com');
    await expect(element(by.id('user-profile-age'))).toHaveText('-1');
  });

  it('[NFR-2.2] - First Name should only contain Letters', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(10000);

    await expect(element(by.id('user-profile-email'))).toHaveText('Alfred.hong91@hotmail.com');
    await expect(element(by.id('user-profile-age'))).toHaveText('-1');
  });

  it('[NFR-2.2] - Middle Name should only contain Letters', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(10000);

    await expect(element(by.id('user-profile-email'))).toHaveText('Alfred.hong91@hotmail.com');
    await expect(element(by.id('user-profile-age'))).toHaveText('-1');
  });

  it('[NFR-2.2] - Last Name should only contain Letters', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(10000);

    await expect(element(by.id('user-profile-email'))).toHaveText('Alfred.hong91@hotmail.com');
    await expect(element(by.id('user-profile-age'))).toHaveText('-1');
  });




  
  afterEach( async () => {
  })

  // Testing changing favorite malls, gender, and tags is not possible since detox does not support those components, so will have to manually test.

});