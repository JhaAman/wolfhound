import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import { Page } from "../layout/page";

type Props = AppProps & {
  Component: Page;
};
const MyApp = ({ Component, pageProps }: Props) => {
  // adjust accordingly if you disabled a layout rendering option
  const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? Fragment;

  return <Layout>{getLayout(<Component {...pageProps} />)}</Layout>;

  // or swap the layout rendering priority
  // return getLayout(<Layout><Component {...pageProps} /></Layout>)
};

export default MyApp;
