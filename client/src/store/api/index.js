import { createApi } from "@reduxjs/toolkit/query/react";
import { GraphQLClient } from "graphql-request";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";

const graphqlEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;

export const client = new GraphQLClient(graphqlEndpoint, {
  credentials: "include",
});

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({ client }),
  endpoints: () => ({}),
});
