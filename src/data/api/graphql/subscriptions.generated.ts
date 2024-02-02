/* eslint-disable */ /** *
 * THIS FILE IS AUTOGENERATED, DO NOT EDIT IT!
 *
 * instead, edit one of the `.graphql` files in this project and run
 *
 * npm run graphql-codegen
 *
 * for this file to be re-created
 */

import * as Types from '../../types/generated';

import { api } from 'src/data/api';
export type RandomNumberSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type RandomNumberSubscription = { randomNumber: number };

export type TestConnectionSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type TestConnectionSubscription = { testConnection: number };


export const RandomNumberDocument = `
    subscription RandomNumber {
  randomNumber
}
    `;
export const TestConnectionDocument = `
    subscription TestConnection {
  testConnection
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
  }),
});

export { injectedRtkApi as api };
export const {  } = injectedRtkApi;

