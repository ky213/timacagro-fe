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
export type GetDateTimeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetDateTimeQuery = { getDateTime: any };

export type GetSessionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSessionQuery = { getSession?: { id: number, firstName: string, lastName: string, email: string, role: Types.Role, currentPoints?: number, targetPoints?: number, region?: Types.Region, active: boolean, emailConfirmed: boolean, createdAt: any, updatedAt: any } };

export type GetUserQueryVariables = Types.Exact<{
  getUserId: Types.Scalars['ID']['input'];
}>;


export type GetUserQuery = { getUser?: { id: number, firstName: string, lastName: string, email: string, role: Types.Role, currentPoints?: number, targetPoints?: number, region?: Types.Region, active: boolean, emailConfirmed: boolean, createdAt: any, updatedAt: any } };

export type ListUsersQueryVariables = Types.Exact<{
  page: Types.Scalars['Int']['input'];
  perPage: Types.Scalars['Int']['input'];
}>;


export type ListUsersQuery = { listUsers: { page: number, perPage: number, total: number, users: Array<{ id: number, firstName: string, lastName: string, email: string, role: Types.Role, currentPoints?: number, targetPoints?: number, region?: Types.Region, active: boolean, emailConfirmed: boolean, createdAt: any, updatedAt: any }> } };

export type GetClientQueryVariables = Types.Exact<{
  getClientId: Types.Scalars['ID']['input'];
}>;


export type GetClientQuery = { getClient?: { id: number, name: string, active: boolean, createdAt: any, updatedAt: any } };

export type ListClientsQueryVariables = Types.Exact<{
  page: Types.Scalars['Int']['input'];
  perPage: Types.Scalars['Int']['input'];
}>;


export type ListClientsQuery = { listClients: { page: number, perPage: number, total: number, clients: Array<{ id: number, name: string, updatedAt: any, createdAt: any, active: boolean }> } };

export type GetProductQueryVariables = Types.Exact<{
  getProductId: Types.Scalars['ID']['input'];
}>;


export type GetProductQuery = { getProduct?: { id: number, label: string, type: Types.ProductType, quantity: number, available: number, points: number, createdAt: any, updatedAt: any } };

export type ListProductsQueryVariables = Types.Exact<{
  page: Types.Scalars['Int']['input'];
  perPage: Types.Scalars['Int']['input'];
}>;


export type ListProductsQuery = { listProducts: { page: number, perPage: number, total: number, products: Array<{ id: number, label: string, type: Types.ProductType, quantity: number, available: number, points: number, createdAt: any, updatedAt: any }> } };

export type GetInvoiceQueryVariables = Types.Exact<{
  getInvoiceId: Types.Scalars['ID']['input'];
}>;


export type GetInvoiceQuery = { getInvoice?: { id: number, number: string, payed: boolean, total: number, updatedAt: any, createdAt: any, client: number } };

export type LisInvoicesQueryVariables = Types.Exact<{
  page: Types.Scalars['Int']['input'];
  perPage: Types.Scalars['Int']['input'];
}>;


export type LisInvoicesQuery = { listInvoices: { page: number, perPage: number, total: number, invoices: Array<{ id: number, createdAt: any, client: number, number: string, payed: boolean, total: number, updatedAt: any }> } };


export const GetDateTimeDocument = `
    query GetDateTime {
  getDateTime
}
    `;
export const GetSessionDocument = `
    query GetSession {
  getSession {
    id
    firstName
    lastName
    email
    role
    currentPoints
    targetPoints
    region
    active
    emailConfirmed
    createdAt
    updatedAt
  }
}
    `;
export const GetUserDocument = `
    query GetUser($getUserId: ID!) {
  getUser(id: $getUserId) {
    id
    firstName
    lastName
    email
    role
    currentPoints
    targetPoints
    region
    active
    emailConfirmed
    createdAt
    updatedAt
  }
}
    `;
export const ListUsersDocument = `
    query ListUsers($page: Int!, $perPage: Int!) {
  listUsers(page: $page, perPage: $perPage) {
    users {
      id
      firstName
      lastName
      email
      role
      currentPoints
      targetPoints
      region
      active
      emailConfirmed
      createdAt
      updatedAt
    }
    page
    perPage
    total
  }
}
    `;
export const GetClientDocument = `
    query GetClient($getClientId: ID!) {
  getClient(id: $getClientId) {
    id
    name
    active
    createdAt
    updatedAt
  }
}
    `;
export const ListClientsDocument = `
    query ListClients($page: Int!, $perPage: Int!) {
  listClients(page: $page, perPage: $perPage) {
    page
    perPage
    total
    clients {
      id
      name
      updatedAt
      createdAt
      active
    }
  }
}
    `;
export const GetProductDocument = `
    query GetProduct($getProductId: ID!) {
  getProduct(id: $getProductId) {
    id
    label
    type
    quantity
    available
    points
    createdAt
    updatedAt
  }
}
    `;
export const ListProductsDocument = `
    query ListProducts($page: Int!, $perPage: Int!) {
  listProducts(page: $page, perPage: $perPage) {
    page
    perPage
    total
    products {
      id
      label
      type
      quantity
      available
      points
      createdAt
      updatedAt
    }
  }
}
    `;
export const GetInvoiceDocument = `
    query GetInvoice($getInvoiceId: ID!) {
  getInvoice(id: $getInvoiceId) {
    id
    number
    payed
    total
    updatedAt
    createdAt
    client
  }
}
    `;
export const LisInvoicesDocument = `
    query LisInvoices($page: Int!, $perPage: Int!) {
  listInvoices(page: $page, perPage: $perPage) {
    page
    invoices {
      id
      createdAt
      client
      number
      payed
      total
      updatedAt
    }
    perPage
    total
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetDateTime: build.query<GetDateTimeQuery, GetDateTimeQueryVariables | void>({
      query: (variables) => ({ document: GetDateTimeDocument, variables })
    }),
    GetSession: build.query<GetSessionQuery, GetSessionQueryVariables | void>({
      query: (variables) => ({ document: GetSessionDocument, variables })
    }),
    GetUser: build.query<GetUserQuery, GetUserQueryVariables>({
      query: (variables) => ({ document: GetUserDocument, variables })
    }),
    ListUsers: build.query<ListUsersQuery, ListUsersQueryVariables>({
      query: (variables) => ({ document: ListUsersDocument, variables })
    }),
    GetClient: build.query<GetClientQuery, GetClientQueryVariables>({
      query: (variables) => ({ document: GetClientDocument, variables })
    }),
    ListClients: build.query<ListClientsQuery, ListClientsQueryVariables>({
      query: (variables) => ({ document: ListClientsDocument, variables })
    }),
    GetProduct: build.query<GetProductQuery, GetProductQueryVariables>({
      query: (variables) => ({ document: GetProductDocument, variables })
    }),
    ListProducts: build.query<ListProductsQuery, ListProductsQueryVariables>({
      query: (variables) => ({ document: ListProductsDocument, variables })
    }),
    GetInvoice: build.query<GetInvoiceQuery, GetInvoiceQueryVariables>({
      query: (variables) => ({ document: GetInvoiceDocument, variables })
    }),
    LisInvoices: build.query<LisInvoicesQuery, LisInvoicesQueryVariables>({
      query: (variables) => ({ document: LisInvoicesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetDateTimeQuery, useLazyGetDateTimeQuery, useGetSessionQuery, useLazyGetSessionQuery, useGetUserQuery, useLazyGetUserQuery, useListUsersQuery, useLazyListUsersQuery, useGetClientQuery, useLazyGetClientQuery, useListClientsQuery, useLazyListClientsQuery, useGetProductQuery, useLazyGetProductQuery, useListProductsQuery, useLazyListProductsQuery, useGetInvoiceQuery, useLazyGetInvoiceQuery, useLisInvoicesQuery, useLazyLisInvoicesQuery } = injectedRtkApi;

