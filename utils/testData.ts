import { faker } from '@faker-js/faker';

// User credentials for testing
// These credentials are used to log in to the application and perform various actions
// They are defined as an interface for better type safety and maintainability
interface userCredentials {
  username: string;
  password: string;
}

interface users {
  STANDARD_USER: userCredentials;
  LOCKED_OUT_USER: userCredentials;
  PROBLEM_USER: userCredentials;
  PERFORMANCE_GLITCH_USER: userCredentials;
}

export const USERS: users = {
  STANDARD_USER: { username: 'standard_user', password: 'secret_sauce' },
  LOCKED_OUT_USER: { username: 'locked_out_user', password: 'secret_sauce' },
  PROBLEM_USER: { username: 'problem_user', password: 'secret_sauce' },
  PERFORMANCE_GLITCH_USER: { username: 'performance_glitch_user', password: 'secret_sauce' },
};

// Generate a random user with first name, last name, and zip code
// This function uses the faker library to create a random user object
// It returns an object with firstName, lastName, and zipCode properties
// This is useful for testing scenarios where you need to fill out forms with random user data
interface userDetails {
  firstName: string;
  lastName: string;
  zipCode: string;
}

export const generateRandomUser = (): userDetails => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    zipCode: faker.location.zipCode(),
  };
}

// URLs for the application pages
export const productsPageUrl: string = '/inventory.html';
export const cartPageUrl: string = '/cart.html';
export const checkoutPageUrl: string = '/checkout-step-one.html';
export const checkoutOverviewPageUrl: string = '/checkout-step-two.html';
export const checkoutCompletePageUrl: string = '/checkout-complete.html';

// Test data for products
interface testProduct {
  id: number;
  name: string;
  price: string;
  tax: string;
  description: string;
}

export const testProduct: testProduct =
{
  id: 4, name: 'Sauce Labs Backpack', price: '29.99', tax: '2.40',
  description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
};

// Test data for checkout
interface testCheckoutData {
  card: string;
  shipping: string;
}

export const testCheckoutData: testCheckoutData = {
  card: 'SauceCard #31337',
  shipping: "Free Pony Express Delivery!"
}
