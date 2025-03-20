"use client";

import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { store } from "@/redux/store";
import client from "@/lib/apollo-client";

export default function ClientWrapper({ children }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </Provider>
  );
}
