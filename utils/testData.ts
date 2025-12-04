import { faker } from '@faker-js/faker';

// User credentials for testing
// These credentials are used to log in to the application and perform various actions
// They are defined as an interface for better type safety and maintainability
interface UserCredentials {
  username: string;
  password: string;
}

interface Users {
  STANDARD_USER: UserCredentials;
  LOCKED_OUT_USER: UserCredentials;
  PROBLEM_USER: UserCredentials;
  PERFORMANCE_GLITCH_USER: UserCredentials;
}

export const USERS: Users = {
  STANDARD_USER: { username: 'standard_user', password: 'secret_sauce' },
  LOCKED_OUT_USER: { username: 'locked_out_user', password: 'secret_sauce' },
  PROBLEM_USER: { username: 'problem_user', password: 'secret_sauce' },
  PERFORMANCE_GLITCH_USER: { username: 'performance_glitch_user', password: 'secret_sauce' },
};

// Generate a random user with first name, last name, and zip code
// This function uses the faker library to create a random user object
// It returns an object with firstName, lastName, and zipCode properties
// This is useful for testing scenarios where you need to fill out forms with random user data
interface UserDetails {
  firstName: string;
  lastName: string;
  zipCode: string;
}

export const generateRandomUser = (): UserDetails => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    zipCode: faker.location.zipCode(),
  };
}

// Test data for products
interface TestProductShape {
  id: number;
  name: string;
  price: string;
  tax: string;
  description: string;
}

export const TEST_PRODUCT_DATA: TestProductShape =
{
  id: 4,
  name: 'Sauce Labs Backpack',
  price: '29.99',
  tax: '2.40',
  description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
};

// Test data for checkout
interface TestCheckoutData {
  card: string;
  shipping: string;
}

export const TEST_CHECKOUT_DATA: TestCheckoutData = {
  card: 'SauceCard #31337',
  shipping: "Free Pony Express Delivery!"
}
