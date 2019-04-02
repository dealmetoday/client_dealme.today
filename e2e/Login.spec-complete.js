describe('Email Signup and Log in', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('[FR-1]should initially show dealme.today screen', async () => {
    await expect(element(by.id('ExampleScreenContainer'))).toBeVisible();
  });

  //Must manually log into facebook since Detox does not support the Facebook component
  it('[FR-1.1] - Should Successfully Sign up to Facebook', async () => {
    await element(by.id('facebook-button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(60000);
    await expect(element(by.id('UserProfileScreenContainer'))).toBeVisible()
  })

  //Must manually log into facebook since Detox does not support the Facebook component
  it('[FR-1.1] - Should Successfully Log in with Facebook', async () => {
    await element(by.id('facebook-button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(60000);
    await expect(element(by.id('UserProfileScreenContainer'))).toBeVisible()
  })

  //Must manually log into facebook since Detox does not support the Google component
  it('[FR-1.1] - Should Successfully Sign up to Google', async () => {
    await element(by.id('google-button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(60000);
    await expect(element(by.id('UserProfileScreenContainer'))).toBeVisible()
  })

  //Must manually log into facebook since Detox does not support the Google component
  it('[FR-1.1] - Should Successfully Log in with Google', async () => {
    await element(by.id('google-button')).tap();
    await waitFor(element(by.id('UserProfileScreenContainer'))).toBeVisible().withTimeout(60000);
    await expect(element(by.id('UserProfileScreenContainer'))).toBeVisible()
  })

  it('[FR-1.2] - Should Successfully Sign up if credentials are valid', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('SignUp-Button')).tap();
    await waitFor(element(by.id('signup-message'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('signup-message'))).toHaveText("Sign up Successful! please try loggin in.")
  })

  it('[FR-1.2] - Should grant access if credentials are found', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await expect(element(by.id('UserProfileScreenContainer'))).toBeVisible()
  })

  it('[FR-1.2] - Should NOT grant access if credentials are found', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await expect(element(by.id('UserProfileScreenContainer'))).toBeNotVisible()
  })

  it('[NFR-2.1] - should correctly validate email: Alfred.hong91@hotmail.com', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('SignUp-Button')).tap();

    await expect(element(by.id('SignUpErrMessage'))).toBeNotVisible();
  });

  it('[NFR-2.1] - should show email is invalid', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hongatHotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('SignUp-Button')).tap();
    await expect(element(by.id('SignUpErrMessage'))).toHaveText('invalid email');
  });

  it('[NFR-2.1] - should show Password is Valid', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('SignUp-Button')).tap();
    await expect(element(by.id('SignUpErrMessage'))).toBeNotVisible();
  });

  it('[NFR-2.1] - should show Password is invalid (No uppercase present', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('SignUp-Button')).tap();
    await expect(element(by.id('SignUpErrMessage'))).toHaveText('Invalid Password. Must contain: one lowercase letter, one uppercase letter, one number and minimum of 8 characters.');
  });

  it('[NFR-2.1] - should show Password is invalid (No Lowercase present', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('PASSWORD123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('SignUp-Button')).tap();
    await expect(element(by.id('SignUpErrMessage'))).toHaveText('Invalid Password. Must contain: one lowercase letter, one uppercase letter, one number and minimum of 8 characters.');
  });

  it('[NFR-2.1] - should show Password is invalid (No NUMBER present', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('PASSWORDone!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('SignUp-Button')).tap();
    await expect(element(by.id('SignUpErrMessage'))).toHaveText('Invalid Password. Must contain: one lowercase letter, one uppercase letter, one number and minimum of 8 characters.');
  });

});