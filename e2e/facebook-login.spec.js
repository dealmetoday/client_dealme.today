describe('Email Signup and Log in', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should properly log in via facebook', async () => {
    await element(by.id('facebook-login-button')).tap();

  });



});