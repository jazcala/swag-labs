import { faker } from '@faker-js/faker';

// --- USER INTERFACES ---

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

interface UserDetails {
  firstName: string;
  lastName: string;
  zipCode: string;
}

// --- PRODUCT INTERFACE ---

export interface TestProductShape {
  id: number;
  name: string;
  price: string;
  tax: string;
  description: string;
  total: string;
}

// ---CHECKOUT DATA INTERFACE ---

interface TestCheckoutData {
  card: string;
  shipping: string;
}

// --- USER DATA ---
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

export const generateRandomUser = (): UserDetails => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    zipCode: faker.location.zipCode(),
  };
};

// --- PRODUCT DATA ---

/**
 * All available test products used in the application.
 * This array is used for Data-Driven Testing (DDT).
 */
export const ALL_PRODUCTS: TestProductShape[] = [
  {
    id: 4,
    name: 'Sauce Labs Backpack',
    price: '29.99',
    tax: '2.40',
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    total: '32.39'
  },
  {
    id: 0,
    name: 'Sauce Labs Bike Light',
    price: '9.99',
    tax: '0.80', // Assuming an 8% tax calculation based on standard tax setup
    description: 'A light, easy-to-use bike light for improved night visibility.',
    total: '10.79'
  },
  {
    id: 1,
    name: 'Sauce Labs Bolt T-Shirt',
    price: '15.99',
    tax: '1.28', // Assuming an 8% tax calculation
    description: 'Get your testing superpowers on with the very best T-Shirt.',
    total: '17.27'
  }
];

/**
 * Default product used for single-item tests, referencing the first item in ALL_PRODUCTS.
 */
export const TEST_PRODUCT_DATA: TestProductShape = ALL_PRODUCTS[0];

// ---CHECKOUT DATA ---

export const TEST_CHECKOUT_DATA: TestCheckoutData = {
  card: 'SauceCard #31337',
  shipping: 'Free Pony Express Delivery!'
};
