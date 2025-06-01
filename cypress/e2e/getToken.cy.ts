describe('Getting Access and Refresh Tokens', () => {
  it('Getting Tokens', () => {
    cy.request({
      method: 'POST',
      url: `https://norma.nomoreparties.space/api/auth/login`,
      body: {
        email: 'andrei@gmail.com',
        password: '12345678'
      }
    }).then((response) => {
      const { accessToken, refreshToken } = response.body;
      cy.log('Access Token:', accessToken);
      cy.log('Refresh Token:', refreshToken);
    });
  });
});
