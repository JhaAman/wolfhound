import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Meta } from "../components/landing/Meta";
import LandingLayout from "../layout/LandingLayout";
import { Page } from "../global";

const Home: Page = () => {
  return (
    <div>
      <h1>Aman</h1>
    </div>
  );
};

// Attach the landing layout (and other nested layouts) to the page
Home.getLayout = (page) => {
  return (
    // Attach the Landing layout with a meta component, decide on header/footer
    <LandingLayout
      meta={<Meta title="Title" description="Description" />}
      headerActive={false}
      footerActive={false}
    >
      {page}
    </LandingLayout>
  );
};

export default Home;
