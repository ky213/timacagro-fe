export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  File: { input: any; output: any; }
};

export type Client = {
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  files: Array<Maybe<Scalars['String']['output']>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ClientsList = Pagination & {
  clients: Array<Maybe<Client>>;
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CreateClientInput = {
  files: Array<InputMaybe<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
};

export type CreateInvoiceInput = {
  client: Scalars['String']['input'];
  number: Scalars['String']['input'];
  payed: Scalars['Boolean']['input'];
  total: Scalars['Float']['input'];
};

export type CreateProductInput = {
  active: Scalars['Boolean']['input'];
  available: Scalars['Float']['input'];
  label: Scalars['String']['input'];
  points: Scalars['Int']['input'];
  quantity: Scalars['Float']['input'];
  type: ProductType;
};

export type CreateUserInput = {
  active: Scalars['Boolean']['input'];
  currentPoints?: InputMaybe<Scalars['Int']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  region?: InputMaybe<Region>;
  role: Role;
  targetPoints?: InputMaybe<Scalars['Int']['input']>;
};

export type Entity = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImportProductsInput = {
  products: Array<CreateProductInput>;
};

export type Invoice = {
  client: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  number: Scalars['String']['output'];
  payed: Scalars['Boolean']['output'];
  total: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type InvoicesList = Pagination & {
  invoices: Array<Maybe<Invoice>>;
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Mutation = {
  confirmEmail?: Maybe<Scalars['Boolean']['output']>;
  createClient: Client;
  createInvoice: Invoice;
  createProduct: Product;
  createUser: User;
  deleteClient: Scalars['Boolean']['output'];
  deleteInvoice: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  forgotPassword?: Maybe<Scalars['String']['output']>;
  importProducts: Scalars['Boolean']['output'];
  login?: Maybe<User>;
  logout?: Maybe<Scalars['Boolean']['output']>;
  randomize: Scalars['Float']['output'];
  readTextFile: Scalars['String']['output'];
  resetPassword?: Maybe<Scalars['Boolean']['output']>;
  saveFile: Scalars['Boolean']['output'];
  updateClient: Scalars['Boolean']['output'];
  updateInvoice: Scalars['Boolean']['output'];
  updateProduct: Scalars['Boolean']['output'];
  updateUser: Scalars['Boolean']['output'];
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String']['input'];
};


export type MutationCreateClientArgs = {
  productInfo: CreateClientInput;
};


export type MutationCreateInvoiceArgs = {
  productInfo: CreateInvoiceInput;
};


export type MutationCreateProductArgs = {
  productInfo: CreateProductInput;
};


export type MutationCreateUserArgs = {
  userInfo: CreateUserInput;
};


export type MutationDeleteClientArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationImportProductsArgs = {
  productsList: ImportProductsInput;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationReadTextFileArgs = {
  file: Scalars['File']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSaveFileArgs = {
  file: Scalars['File']['input'];
};


export type MutationUpdateClientArgs = {
  id: Scalars['ID']['input'];
  productInfo: UpdateClientInput;
};


export type MutationUpdateInvoiceArgs = {
  id: Scalars['ID']['input'];
  productInfo: UpdateInvoiceInput;
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  productInfo: UpdateProductInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  userInfo: UpdateUserInput;
};

export type OrderProductsOutput = {
  available: Scalars['Float']['output'];
  label: Scalars['String']['output'];
};

export type Pagination = {
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  total?: Maybe<Scalars['Int']['output']>;
};

export type Product = {
  active: Scalars['Boolean']['output'];
  available: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  points: Scalars['Int']['output'];
  quantity: Scalars['Float']['output'];
  type: ProductType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ProductType {
  Gas = 'GAS',
  Liquid = 'LIQUID',
  Solid = 'SOLID'
}

export type ProductsList = Pagination & {
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  products: Array<Maybe<Product>>;
  total: Scalars['Int']['output'];
};

export type Query = {
  getClient?: Maybe<Client>;
  getDateTime: Scalars['DateTime']['output'];
  getInvoice?: Maybe<Invoice>;
  getProduct?: Maybe<Product>;
  getSession?: Maybe<User>;
  getUser?: Maybe<User>;
  listClients: ClientsList;
  listInvoices: InvoicesList;
  listProducts: ProductsList;
  listUsers: UsersList;
};


export type QueryGetClientArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryListClientsArgs = {
  page: Scalars['Int']['input'];
  perPage: Scalars['Int']['input'];
};


export type QueryListInvoicesArgs = {
  page: Scalars['Int']['input'];
  perPage: Scalars['Int']['input'];
};


export type QueryListProductsArgs = {
  page: Scalars['Int']['input'];
  perPage: Scalars['Int']['input'];
};


export type QueryListUsersArgs = {
  page: Scalars['Int']['input'];
  perPage: Scalars['Int']['input'];
};

export enum Region {
  Center = 'CENTER',
  CenterEast = 'CENTER_EAST',
  DevZoneSouth = 'DEV_ZONE_SOUTH',
  FarEast = 'FAR_EAST',
  FarWest = 'FAR_WEST',
  NorthEast = 'NORTH_EAST',
  NorthWest = 'NORTH_WEST',
  SouthEast = 'SOUTH_EAST'
}

export enum Role {
  Admin = 'ADMIN',
  Atc = 'ATC',
  Commerce = 'COMMERCE',
  Sales = 'SALES'
}

export type Subscription = {
  orderProducts: Array<OrderProductsOutput>;
  randomNumber: Scalars['Float']['output'];
  testConnection: Scalars['Int']['output'];
};

export type UpdateClientInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  files?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateInvoiceInput = {
  client: Scalars['String']['input'];
  number: Scalars['String']['input'];
  payed: Scalars['Boolean']['input'];
  total: Scalars['Float']['input'];
};

export type UpdateProductInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  available?: InputMaybe<Scalars['Float']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<ProductType>;
};

export type UpdateUserInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  currentPoints?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailConfirmed?: InputMaybe<Scalars['Boolean']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Region>;
  role?: InputMaybe<Role>;
  targetPoints?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  currentPoints?: Maybe<Scalars['Int']['output']>;
  email: Scalars['String']['output'];
  emailConfirmed: Scalars['Boolean']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Region>;
  role: Role;
  targetPoints?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UsersList = Pagination & {
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  users: Array<Maybe<User>>;
};
