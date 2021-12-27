import { ReactElement } from "react";
import AppLayout from "@/layout/AppLayout";
import supabase from "@/lib/supabase";
import Question from "@/components/Question";

interface Props {}

const Playground = ({}: Props) => {
  return <Question />;
};

export async function getServerSideProps(ctx: { req: any }) {
  const { req } = ctx;

  /* check to see if a user is set */
  const { user } = await supabase.auth.api.getUserByCookie(req);

  /* if no user is set, redirect to the sign-in page */
  if (!user) {
    console.log("Redirecting from app to signin");
    return { props: {}, redirect: { destination: "/signin" } };
  }

  /* if a user is set, pass it to the page via props */
  return { props: { user } };
}

// Attach the app layout (and other nested layouts) to the page
Playground.getLayout = (page: ReactElement) => {
  return (
    // Attach the app layout
    <AppLayout>{page}</AppLayout>
  );
};

export default Playground;
