describe('Automation Testing Practice', () => {
  it('1: Register User', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');
    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row').should('be.visible');
    //Click on 'Signup / Login' button
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
    //Verify 'New User Signup!' is visible
    cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible');
    //Enter name and email address
    cy.fixture('deleteUser').then((user) => {
      cy.get('[data-qa="signup-name"]').type(user.firstName);
      cy.get('[data-qa="signup-email"]').type(user.email);
    });
    //Click 'Signup' button
    cy.get('[data-qa="signup-button"]').click();
    //Verify that 'ENTER ACCOUNT INFORMATION' is visible
    cy.contains('b', 'Enter Account Information').should('be.visible');
    //Fill details: Title, Name, Email, Password, Date of birth
    cy.get('#id_gender2').check();
    //Select checkbox 'Sign up for our newsletter!'
    cy.fixture('deleteUser').then((user) => {
      cy.get('[data-qa="password"]').type(user.password);
      cy.get('[data-qa="days"]').select(user.dob.days);
      cy.get('[data-qa="months"]').select(user.dob.months);
      cy.get('[data-qa="years"]').select(user.dob.years);
    });
    //Select checkbox 'Receive special offers from our partners!'
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    //Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    cy.fixture('deleteUser').then((form) => {
      cy.get('[data-qa="first_name"]').type(form.firstName);
      cy.get('[data-qa="last_name"]').type(form.lastName);
      cy.get('[data-qa="company"]').type(form.company);
      cy.get('[data-qa="address"]').type(form.address);
      cy.get('[data-qa="address2"]').type(form.address2);
      cy.get('[data-qa="country"]').select(form.country);
      cy.get('[data-qa="state"]').type(form.state);
      cy.get('[data-qa="city"]').type(form.city);
      cy.get('[data-qa="zipcode"]').type(form.zipcode);
      cy.get('[data-qa="mobile_number"]').type(form.mobile);
    });
    //Click 'Create Account button'
    cy.get('[data-qa="create-account"]').click();
    //Verify that 'ACCOUNT CREATED!' is visible
    cy.contains('b', 'Account Created!').should('be.visible');
    //Click 'Continue' button
    cy.get('[data-qa="continue-button"]').click();
    //Verify that 'Logged in as username' is visible
    cy.fixture('deleteUser').then((user) => {
    cy.get(':nth-child(10) > a').contains('a', `Logged in as ${user.firstName}`).should('be.visible');
    });
    //Click 'Delete Account' button
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click();
    //Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    cy.contains('b', 'Account Deleted!').should('be.visible');
  });

  //change fixture email to to not create existing account error
  it('2: Login User with correct email and password', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');
    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row').should('be.visible');
    //CREATE ACCOUNT BEFORE LOGIN TEST
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
    cy.fixture('validUser').then((user) => {
      cy.get('[data-qa="signup-name"]').type(user.username);
      cy.get('[data-qa="signup-email"]').type(user.email);
    });
    cy.get('[data-qa="signup-button"]').click();
    cy.get('#id_gender2').check();
    cy.fixture('validUser').then((user) => {
      cy.get('[data-qa="password"]').type(user.password);
      cy.get('[data-qa="days"]').select(user.dob.days);
      cy.get('[data-qa="months"]').select(user.dob.months);
      cy.get('[data-qa="years"]').select(user.dob.years);
      cy.get('#newsletter').check();
      cy.get('#optin').check();
      cy.get('[data-qa="first_name"]').type(user.firstName);
      cy.get('[data-qa="last_name"]').type(user.lastName);
      cy.get('[data-qa="company"]').type(user.company);
      cy.get('[data-qa="address"]').type(user.address);
      cy.get('[data-qa="address2"]').type(user.address2);
      cy.get('[data-qa="country"]').select(user.country);
      cy.get('[data-qa="state"]').type(user.state);
      cy.get('[data-qa="city"]').type(user.city);
      cy.get('[data-qa="zipcode"]').type(user.zipcode);
      cy.get('[data-qa="mobile_number"]').type(user.mobile);
    });
    cy.get('[data-qa="create-account"]').click();
    cy.contains('b', 'Account Created!').should('be.visible');
  });

  it('3: Login User with incorrect email and password', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');
    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row').should('be.visible');
    //Click on 'Signup / Login' button
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
    //Verify 'Login to your account' is visible
    cy.get('.login-form > h2').contains('h2', 'Login to your account').should('be.visible');
    //Enter incorrect email address and password
    cy.fixture('invalidUser').then((user) => {
      cy.get('[data-qa="login-email"]').type(user.email);
      cy.get('[data-qa="login-password"]').type(user.password);
    });
    //Click 'login' button
    cy.get('[data-qa="login-button"]').click();
    //Verify error 'Your email or password is incorrect!' is visible
    cy.get('.login-form > form > p').contains('p', 'Your email or password is incorrect!').should('be.visible');
  });

  it('4: Logout User', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');
    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row').should('be.visible');
    //Click on 'Signup / Login' button
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
    //Verify 'Login to your account' is visible
    cy.get('.login-form > h2').contains('h2', 'Login to your account').should('be.visible');
    //Enter correct email address and password
    cy.fixture('validUser').then((user) => {
      cy.get('[data-qa="login-email"]').type(user.email);
      cy.get('[data-qa="login-password"]').type(user.password);
      //Click 'login' button
      cy.get('[data-qa="login-button"]').click();
      //Verify that 'Logged in as username' is visible
      cy.get(':nth-child(10) > a').contains('a', `Logged in as ${user.username}`);
    });
    //Click 'Logout' button
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
    //Verify that user is navigated to login page
    cy.url().should('contain' , '/login');
  });

  it('5: Register User with Existing Email', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');
    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row').should('be.visible');
    //Click on 'Signup / Login' button
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
    //Verify 'New User Signup!' is visible
    cy.get('.signup-form > h2').should('be.visible');
    //Enter name and already registered email address
    cy.fixture('validUser').then((user) => {
      cy.get('[data-qa="signup-name"]').type(user.username);
      cy.get('[data-qa="signup-email"]').type(user.email);
    });
    //Click 'Signup' button
    cy.get('[data-qa="signup-button"]').click();
    //Verify error 'Email Address already exist!' is visible
    cy.contains('p', 'Email Address already exist!').should('be.visible');
  });

  it('6: Contact Us Form', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');
    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row').should('be.visible');
    //Click on 'Contact Us' button
    cy.get('.shop-menu > .nav > :nth-child(8) > a').click();
    //Verify 'GET IN TOUCH' is visible
    //cy.get('div.contact-form > .title').contains('title', 'Get in Touch').should('be.visible');
    //Enter name, email, subject and message
    cy.fixture('validUser').then((user) => {
      cy.get('[data-qa="name"]').type(user.firstName);
      cy.get('[data-qa="email"]').type(user.email);
      cy.get('[data-qa="email"]').type('Test Subject');
      cy.get('[data-qa="email"]').type('This is a practice test using Cypress');
    });
    //Upload file
    cy.get(':nth-child(6) > .form-control').attachFile('imageUpload.png');
    //Click 'Submit' button
    cy.get('[data-qa="submit-button"]').click();
    //Click OK button - there is no OK button
    //Verify success message 'Success! Your details have been submitted successfully.' is visible
    cy.get('.status').should('contain', 'Success! Your details have been submitted successfully.');
    //Click 'Home' button and verify that landed to home page successfully
    cy.get('#form-section > .btn').click();
    cy.url().should('contain', 'https://automationexercise.com/');
  });

  it('7: Verify Test Cases Page', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');
    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row').should('be.visible');
    //Click on 'Test Cases' button
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click();
    //Verify user is navigated to test cases page successfully
    cy.url().should('contain', '/test_cases');
  });

  it('8: Verify All Products and product detail page', () => {
     //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');
    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row').should('be.visible');
    //Click on 'Products' button
    cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
    //Verify user is navigated to ALL PRODUCTS page successfully
    cy.get('.title').should('contain', 'All Products');
    //The products list is visible
    cy.get('.features_items').should('exist', 'be.visible');
    //Click on 'View Product' of first product
    cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();
    //User is landed to product detail page
    cy.url().should('contain', '/product_details/1');
    //Verify that detail detail is visible: product name, category, price, availability, condition, brand
    cy.get('.col-sm-9').contains('h2', 'Blue Top').should('be.visible');
  });

  it('9: Search Product', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');
    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row').should('be.visible');
    //Click on 'Products' button
    cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
    //Verify user is navigated to ALL PRODUCTS page successfully
    cy.get('.title').should('contain', 'All Products');
    //Enter product name in search input and click search button
    cy.get('#search_product').type('jeans');
    cy.get('#submit_search').click();
    //Verify 'SEARCHED PRODUCTS' is visible
    cy.get('.title').should('contain', 'Searched Products');
    //Verify all the products related to search are visible
    cy.get('.brands_products').should('exist', 'be.visible');
  });

  it('10: Verify Subscription in home page', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');
    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row').should('be.visible');
    //Scroll down to footer + Verify text 'SUBSCRIPTION'
    cy.get('#footer').scrollIntoView().should('contain', 'Subscription');
    //Enter email address in input and click arrow button
    cy.fixture('validUser').then((user) => {
      cy.get('#susbscribe_email').type(user.email);
    });
    //Verify success message 'You have been successfully subscribed!' is visible
    cy.get('#footer').should('contain', 'You have been successfully subscribed!');
  });

  it('11: Verify Subscription in Cart page', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');

    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row').should('be.visible');
    
    //Click 'Cart' button
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
    
    //Scroll down to footer + Verify text 'SUBSCRIPTION'
    
    cy.get('#footer').scrollIntoView().should('contain', 'Subscription');
    
    //Enter email address in input and click arrow button
    cy.fixture('validUser').then((user) => {
      cy.get('#susbscribe_email').type(user.email);
    });
    
    //Verify success message 'You have been successfully subscribed!' is visible
    cy.get('#footer').should('contain', 'You have been successfully subscribed!');
  });

  it('12: Add Products in Cart', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');

    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row').should('be.visible');
    
    //Click 'Products' button
    cy.get('.shop-menu > .nav > :nth-child(2) > a').click();

    //Scroll into view just in case
    cy.get('.features_items .col-sm-4').eq(0).scrollIntoView();

    //Hover and click
    cy.get('.features_items .col-sm-4').eq(0).trigger('mouseover').within(() => {
      cy.get('.product-overlay').should('be.visible')
        .find('.add-to-cart').click({ force: true });
    });

    //Click 'Continue Shopping' button
    cy.get('.modal-footer > .btn').click();

    //Hover over second product and click 'Add to cart'
    cy.get('.features_items .col-sm-4').eq(1).trigger('mouseover').within(() => {
      cy.get('.product-overlay').should('be.visible')
        .find('.add-to-cart').click({ force: true });
    });

    //Click 'View Cart' button
    cy.get('u').click();

    //Verify both products are added to Cart
    cy.get('#cart_info table tbody tr').should('have.length', 2).then((rows) => {
      cy.wrap(rows).eq(0).should('contain.text', 'Blue Top');
      cy.wrap(rows).eq(1).should('contain.text', 'Men Tshirt');
    });

    //Verify their prices, quantity and total price
    cy.get('#cart_info table tbody tr').as('cartRows');
    //check that there are 2 products
    cy.get('@cartRows').should('have.length', 2);
    //verify first product
    cy.get('@cartRows').eq(0).within(() => {
      cy.get('td').eq(1).should('contain.text', 'Blue Top');
      cy.get('td').eq(2).should('contain.text', 'Rs. 500');
      cy.get('td').eq(3).should('contain.text', '1');
      cy.get('td').eq(4).should('contain.text', 'Rs. 500');
    });
    //verify second product
    cy.get('@cartRows').eq(1).within(() => {
      cy.get('td').eq(1).should('contain.text', 'Men Tshirt');
      cy.get('td').eq(2).should('contain.text', 'Rs. 400');
      cy.get('td').eq(3).should('contain.text', '1');
      cy.get('td').eq(4).should('contain.text', 'Rs. 400');
    });

  });

  it('13: Verify Product quantity in Cart', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');
    
    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row').should('be.visible');
    
    //Click 'View Product' for any product on home page
    cy.get('.features_items .col-sm-4').eq(10)
      .scrollIntoView()
      .trigger('mouseover');
    cy.get('.product-image-wrapper').eq(1).within(() => {
      cy.get('.nav').click();
    });

    //Verify product detail is opened
    cy.url().should('include', 'product_details/2');
    cy.get('.product-information').should('be.visible').within(() => {
      cy.contains('Men Tshirt').should('be.visible');
      cy.contains('Category: Men > Tshirts').should('be.visible');
      cy.contains('Rs. 400').should('be.visible');
      cy.contains('Availability: In Stock').should('be.visible');
      cy.contains('Condition').should('be.visible');
      cy.contains('Brand: H&M').should('be.visible');
    });

    //Increase quantity to 4
    cy.get('#quantity').clear().type('4');
    //OR cy.get('#quantity').focus().type('{uparrow}{uparrow}{uparrow}');

    //Click 'Add to cart' button
    cy.get(':nth-child(5) > .btn').click();

    //Click 'View Cart' button
    cy.get(':nth-child(5) > .btn').should('be.visible');
    cy.get('u').click();

    //Verify that product is displayed in cart page with exact quantity
    cy.get('#cart_info table tbody tr').within(() => {
      cy.contains('Men Tshirt').should('be.visible');
      cy.get('.disabled').should('contain.text', '4');
    });
  });

  it('14: Place Order: Register while Checkout', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');

    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row')
      .should('be.visible');

    //Add products to cart
    cy.get(':nth-child(14) > .product-image-wrapper > .single-products > .productinfo > .btn')
      .click();
    cy.get(':nth-child(19) > .product-image-wrapper > .single-products > .productinfo > .btn')
      .click();

    //Click 'Cart' button
    cy.get('.shop-menu > .nav > :nth-child(3) > a')
      .click();

    //Verify that cart page is displayed
    cy.get('#empty_cart').within(() => {
      cy.get('u').click();
    });

    //Click 'Register / Login' button
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click();

    //Fill all details in Signup and create account
    cy.fixture('shoppingUser').then((user) => {
      cy.get('[data-qa="signup-name"]').type(user.username);
      cy.get('[data-qa="signup-email"]').type(user.email);
      cy.get('[data-qa="signup-button"]').click();
      cy.get('#id_gender2').check();
      cy.get('[data-qa="password"]').type(user.password);
      cy.get('[data-qa="days"]').select(user.dob.days);
      cy.get('[data-qa="months"]').select(user.dob.months);
      cy.get('[data-qa="years"]').select(user.dob.years);
      cy.get('#newsletter').check();
      cy.get('#optin').check();
      cy.get('[data-qa="first_name"]').type(user.firstName);
      cy.get('[data-qa="last_name"]').type(user.lastName);
      cy.get('[data-qa="company"]').type(user.company);
      cy.get('[data-qa="address"]').type(user.address);
      cy.get('[data-qa="address2"]').type(user.address2);
      cy.get('[data-qa="country"]').select(user.country);
      cy.get('[data-qa="state"]').type(user.state);
      cy.get('[data-qa="city"]').type(user.city);
      cy.get('[data-qa="zipcode"]').type(user.zipcode);
      cy.get('[data-qa="mobile_number"]').type(user.mobile);
    });

    //Verify 'ACCOUNT CREATED!' and click 'Continue' button
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="continue-button"]').click();

    //Verify 'Logged in as username' at top
    cy.fixture('shoppingUser').then((user) => {
      cy.get(':nth-child(10) > a').contains(`Logged in as ${user.username}`);
    })

    //Click 'Cart' button
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
    cy.url().should('include', '/view_cart');

    //Click 'Proceed To Checkout' button
    cy.get('.col-sm-6 > .btn').click();

    //Verify Address Details and Review Your Order
    cy.fixture('shoppingUser').then((user) => {
      cy.get('#address_delivery').should('exist').within(() => {
        cy.contains(`${user.firstName} ${user.lastName}`).should('be.visible');
        cy.contains(user.company).should('be.visible');
        cy.contains(user.address).should('be.visible');
        cy.contains(user.address2).should('be.visible');
        cy.contains(user.mobile).should('be.visible');
      });
    });

    cy.fixture('shoppingUser').then((user) => {
      cy.get('#address_invoice').should('exist').within(() => {
        cy.contains(`${user.firstName} ${user.lastName}`).should('be.visible');
        cy.contains(user.company).should('be.visible');
        cy.contains(user.address).should('be.visible');
        cy.contains(user.address2).should('be.visible');
        cy.contains(user.mobile).should('be.visible');
      });
    });

    //Enter description in comment text area and click 'Place Order'
    cy.get('.form-control').type('This is a test comment');
    cy.get(':nth-child(7) > .btn').click();

    //Enter payment details: Name on Card, Card Number, CVC, Expiration date
    cy.url().should('include', '/payment');
    cy.fixture('cardDetails').then((card) => {
      cy.get('[data-qa="name-on-card"]').type(card.name);
      cy.get('[data-qa="card-number"]').type(card.number);
      cy.get('[data-qa="cvc"]').type(card.cvc);
      cy.get('[data-qa="expiry-month"]').type(card.expiryMonth);
      cy.get('[data-qa="expiry-year"]').type(card.expiryYear);
    });

    //Click 'Pay and Confirm Order' button
    cy.get('[data-qa="pay-button"]').click();

    //Verify success message 'Your order has been placed successfully!'
    cy.get('.col-sm-9').should('exist').within(() => {
      cy.get('p')
      .contains('Congratulations! Your order has been confirmed!')
      .should('be.visible');
    });

    //Click 'Delete Account' button
    cy.get(':nth-child(5) > a').click();

    //Verify 'ACCOUNT DELETED!' and click 'Continue' button
    cy.get('[data-qa="account-deleted"]').should('exist').within(() => {
      cy.get('b').contains('Account Deleted!').should('be.visible');
    });
  });

  it.only('15: Place Order: Register before Checkout', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');

    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row')
      .should('be.visible');

    //Click 'Signup / Login' button
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
    cy.wait(1000);

    //Fill all details in Signup and create account
    cy.fixture('shoppingUser').then((user) => {
      cy.get('[data-qa="signup-name"]').type(user.username);
      cy.get('[data-qa="signup-email"]').type(user.email);
      cy.get('[data-qa="signup-button"]').click();
      cy.wait(1000);
      cy.get('#id_gender2').check();
      cy.get('[data-qa="password"]').type(user.password);
      cy.get('[data-qa="days"]').select(user.dob.days);
      cy.get('[data-qa="months"]').select(user.dob.months);
      cy.get('[data-qa="years"]').select(user.dob.years);
      cy.get('#newsletter').check();
      cy.get('#optin').check();
      cy.get('[data-qa="first_name"]').type(user.firstName);
      cy.get('[data-qa="last_name"]').type(user.lastName);
      cy.get('[data-qa="company"]').type(user.company);
      cy.get('[data-qa="address"]').type(user.address);
      cy.get('[data-qa="address2"]').type(user.address2);
      cy.get('[data-qa="country"]').select(user.country);
      cy.get('[data-qa="state"]').type(user.state);
      cy.get('[data-qa="city"]').type(user.city);
      cy.get('[data-qa="zipcode"]').type(user.zipcode);
      cy.get('[data-qa="mobile_number"]').type(user.mobile);
      cy.get('[data-qa="create-account"]').scrollIntoView().click();
      cy.wait(1000);
    });

    //Verify 'ACCOUNT CREATED!' and click 'Continue' button
    cy.get('.col-sm-9', { timeout: 10000 }).should('exist').within(() => {
      cy.get('b').contains('Account Created!').should('be.visible');
    });
    cy.get('[data-qa="continue-button"]').click();
    cy.wait(1000);

    //Verify ' Logged in as username' at top
    cy.fixture('shoppingUser').then((user) => {
      cy.get(':nth-child(10) > a').contains(`Logged in as ${user.username}`);
    });

    //Add products to cart
    cy.get(':nth-child(14) > .product-image-wrapper > .single-products > .productinfo > .btn')
      .scrollIntoView()
      .click({ force: true });
      cy.wait(1000);
    
    cy.get('.modal-footer > .btn').click();

    cy.get(':nth-child(19) > .product-image-wrapper > .single-products > .productinfo > .btn')
      .scrollIntoView()
      .click({ force: true });
      cy.wait(1000);
    
    cy.get('.modal-footer > .btn').click();
    cy.wait(1000);

    //Click 'Cart' button
    cy.get('.shop-menu > .nav > :nth-child(3) > a').scrollIntoView().click();
    cy.wait(1000);

    //Verify that cart page is displayed
    cy.url().should('include', '/view_cart');
    cy.get('#cart_info table thead').should('contain.text', 'Item')
      .and('contain.text', 'Description')
      .and('contain.text', 'Price')
      .and('contain.text', 'Quantity')
      .and('contain.text', 'Total');
      cy.wait(1000);

    //Click Proceed To Checkout
    cy.get('.col-sm-6 > .btn').scrollIntoView().click();
    cy.wait(1000);

    // Verify Address Details and Review Your Order
    cy.url().should('include', '/checkout');

    cy.fixture('shoppingUser').then((user) => {
      cy.get('#address_delivery').should('exist').within(() => {
        cy.contains(`${user.firstName} ${user.lastName}`).should('be.visible');
        cy.contains(user.company).should('be.visible');
        cy.contains(user.address).should('be.visible');
        cy.contains(user.address2).should('be.visible');
        cy.contains(user.mobile).should('be.visible');
      });
    });

    cy.fixture('shoppingUser').then((user) => {
      cy.get('#address_invoice').should('exist').within(() => {
        cy.contains(`${user.firstName} ${user.lastName}`).should('be.visible');
        cy.contains(user.company).should('be.visible');
        cy.contains(user.address).should('be.visible');
        cy.contains(user.address2).should('be.visible');
        cy.contains(user.mobile).should('be.visible');
      });
    });

    //Enter description in comment text area and click 'Place Order'
    cy.get('.form-control').type('I am using my dads card to buy me nice dresses');
    cy.wait(1000);
    cy.get(':nth-child(7) > .btn').click();
    
    //Enter payment details: Name on Card, Card Number, CVC, Expiration date
    cy.url().should('include', '/payment');
    cy.fixture('cardDetails').then((card) => {
      cy.get('[data-qa="name-on-card"]').type(card.name);
      cy.get('[data-qa="card-number"]').type(card.number);
      cy.get('[data-qa="cvc"]').type(card.cvc);
      cy.get('[data-qa="expiry-month"]').type(card.expiryMonth);
      cy.get('[data-qa="expiry-year"]').type(card.expiryYear);
    });

    //Click 'Pay and Confirm Order' button
    cy.get('[data-qa="pay-button"]').click();

    //Verify success message 'Your order has been placed successfully!'
    cy.get('.col-sm-9').should('exist').within(() => {
      cy.get('p')
      .contains('Congratulations! Your order has been confirmed!')
      .should('be.visible');
    });

    //Click 'Delete Account' button
    cy.get(':nth-child(5) > a').click();

    //Verify 'ACCOUNT DELETED!' and click 'Continue' button
    cy.get('[data-qa="account-deleted"]').should('exist').within(() => {
      cy.get('b').contains('Account Deleted!').should('be.visible');
    });
  });

  it('16: Place Order: Login before Checkout', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');

    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row')
      .should('be.visible');

    //Click 'Signup / Login' button
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click();

    //Fill email, password and click 'Login' button
    cy.fixture('validUser').then((user) => {
      cy.get('[data-qa="login-email"]').type(user.email);
      cy.get('[data-qa="login-password"]').type(user.password);
      cy.get('[data-qa="login-button"]').click();

      //Verify 'Logged in as username' at top
      cy.get(':nth-child(10) > a').contains(`Logged in as ${user.username}`);
    });

    //Add products to cart
    cy.get(':nth-child(21) > .product-image-wrapper > .single-products > .productinfo > .btn')
      .scrollIntoView()
      .click();

    cy.get('.modal-footer > .btn').click();

    cy.get(':nth-child(22) > .product-image-wrapper > .single-products > .productinfo > .btn')
      .scrollIntoView()
      .click();
    cy.get('.modal-footer > .btn').click();

    //Click 'Cart' button
    cy.get('.shop-menu > .nav > :nth-child(3) > a')
      .scrollIntoView()
      .click();

    //Verify that cart page is displayed
    cy.url().should('include', '/view_cart');
    cy.get('#cart_info table thead').should('contain.text', 'Item')
      .and('contain.text', 'Description')
      .and('contain.text', 'Price')
      .and('contain.text', 'Quantity')
      .and('contain.text', 'Total');

    //Click Proceed To Checkout
    cy.get('.col-sm-6 > .btn').scrollIntoView().click();

    //Verify Address Details and Review Your Order
    cy.url().should('include', '/checkout');

    cy.fixture('validUser').then((user) => {
      cy.get('#address_delivery').should('exist').within(() => {
        cy.contains(`${user.firstName} ${user.lastName}`).should('be.visible');
        cy.contains(user.company).should('be.visible');
        cy.contains(user.address).should('be.visible');
        cy.contains(user.address2).should('be.visible');
        cy.contains(user.mobile).should('be.visible');
      });
    });

    cy.fixture('validUser').then((user) => {
      cy.get('#address_invoice').should('exist').within(() => {
        cy.contains(`${user.firstName} ${user.lastName}`).should('be.visible');
        cy.contains(user.company).should('be.visible');
        cy.contains(user.address).should('be.visible');
        cy.contains(user.address2).should('be.visible');
        cy.contains(user.mobile).should('be.visible');
      });
    });

    //Enter description in comment text area and click 'Place Order'
    cy.get('.form-control').type('This is a test comment');
    cy.get(':nth-child(7) > .btn').click();

    //Enter payment details: Name on Card, Card Number, CVC, Expiration date
    cy.url().should('include', '/payment');
    cy.fixture('cardDetails').then((card) => {
      cy.get('[data-qa="name-on-card"]').type(card.name);
      cy.get('[data-qa="card-number"]').type(card.number);
      cy.get('[data-qa="cvc"]').type(card.cvc);
      cy.get('[data-qa="expiry-month"]').type(card.expiryMonth);
      cy.get('[data-qa="expiry-year"]').type(card.expiryYear);
    });

    //Click 'Pay and Confirm Order' button
    cy.get('[data-qa="pay-button"]').click();

    //Verify success message 'Your order has been placed successfully!'
    cy.get('.col-sm-9').should('exist').within(() => {
      cy.get('p')
      .contains('Congratulations! Your order has been confirmed!')
      .should('be.visible');
    });
  });

  it('17: Remove Products from Cart', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');

    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row')
      .should('be.visible');

    //Add products to cart
    cy.get(':nth-child(21) > .product-image-wrapper > .single-products > .productinfo > .btn')
      .scrollIntoView()
      .click();

    cy.get('.modal-footer > .btn').click();

    cy.get(':nth-child(22) > .product-image-wrapper > .single-products > .productinfo > .btn')
      .scrollIntoView()
      .click();
    cy.get('.modal-footer > .btn').click();

    //Click 'Cart' button
    cy.get('.shop-menu > .nav > :nth-child(3) > a')
      .scrollIntoView()
      .click();

    //Verify that cart page is displayed
    cy.url().should('include', '/view_cart');
    cy.get('#cart_info table thead').should('contain.text', 'Item')
      .and('contain.text', 'Description')
      .and('contain.text', 'Price')
      .and('contain.text', 'Quantity')
      .and('contain.text', 'Total');
    
    //Click 'X' button corresponding to particular product
    cy.get('#product-22 > .cart_delete > .cart_quantity_delete > .fa')
      .scrollIntoView()
      .click();

    //Verify that product is removed from the cart
    cy.contains('Long Maxi Tulle Fancy Dress Up Outfits -Pink')
      .parents('tr')
      .find('.cart_quantity_delete')
      .click();
    
    cy.get('#cart_info table tbody tr')
      .should('not.contain.text', 'Long Maxi Tulle Fancy Dress Up Outfits -Pink');
  });

  it('18: View Category Products', () => {
    //launch broswer and navigate to page
    cy.visit('https://automationexercise.com');

    //verify that home page is visible 
    cy.get('section[style="height: auto !important;"] > .container > .row')
      .should('be.visible');

    //Verify that categories are visible on left side bar
    cy.get('.left-sidebar').scrollIntoView().within(() => {
      cy.contains(':nth-child(1)', 'Category').should('be.visible');
      cy.contains('.panel-title', 'Women').should('be.visible');
      cy.contains('.panel-title', 'Men').should('be.visible');
      cy.contains('.panel-title', 'Kids').should('be.visible');
    });

    //Click on 'Women' category
    cy.get(':nth-child(1) > .panel-heading > .panel-title').click();

    //Click on any category link under 'Women' category, for example: Dress
    cy.get('#Women > .panel-body').scrollIntoView()

    //Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'

    //On left side bar, click on any sub-category link of 'Men' category

    //Verify that user is navigated to that category page

  });
});