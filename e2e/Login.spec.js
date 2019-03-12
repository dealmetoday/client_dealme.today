describe('Email Signup and Log in', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should initially show dealme.today screen', async () => {
    await expect(element(by.id('ExampleScreenContainer'))).toBeVisible();
  });

  it('should correctly validate email: Alfred.hong91@hotmail.com', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('SignUp-Button')).tap();

    await expect(element(by.id('SignUpErrMessage'))).toBeNotVisible();
  });

  it('should show email is invalid', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hongatHotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('SignUp-Button')).tap();
    await expect(element(by.id('SignUpErrMessage'))).toHaveText('invalid email');
  });

  it('should show Password is Valid', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('SignUp-Button')).tap();
    await expect(element(by.id('SignUpErrMessage'))).toBeNotVisible();
  });

  it('should show Password is invalid (No uppercase present', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('SignUp-Button')).tap();
    await expect(element(by.id('SignUpErrMessage'))).toHaveText('Invalid Password. Must contain: one lowercase letter, one uppercase letter, one number and minimum of 8 characters.');
  });

  it('should show Password is invalid (No Lowercase present', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('PASSWORD123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('SignUp-Button')).tap();
    await expect(element(by.id('SignUpErrMessage'))).toHaveText('Invalid Password. Must contain: one lowercase letter, one uppercase letter, one number and minimum of 8 characters.');
  });

  it('should show Password is invalid (No NUMBER present', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('PASSWORDone!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('SignUp-Button')).tap();
    await expect(element(by.id('SignUpErrMessage'))).toHaveText('Invalid Password. Must contain: one lowercase letter, one uppercase letter, one number and minimum of 8 characters.');
  });

  //TODO Write test to successfully signup

  /* EMAIL LOG IN TEST */

  it('Should grant access if credentials are found', async () => {
    await element(by.id('Email-input')).tap();
    await element(by.id('Email-input')).typeText('Alfred.hong91@hotmail.com');
    await element(by.id('Email-input')).tapReturnKey();
    await element(by.id('Password-input')).tap();
    await element(by.id('Password-input')).typeText('Password123!')
    await element(by.id('Password-input')).tapReturnKey();
    await element(by.id('Login-Button')).tap();
    await expect(element(by.id('UserProfileScreenContainer'))).toBeVisible()
  })

});