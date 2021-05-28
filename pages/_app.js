import ReduxProvider from "../src/redux/provider";

function Providers({ children }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;
