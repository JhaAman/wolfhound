import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, FormEvent, ReactElement, useEffect } from "react";
import GitHub from "../components/icons/GitHub";
import Logo from "../components/icons/Logo";
import Meta from "../components/landing/Meta";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LoadingDots from "../components/ui/LoadingDots";
import LandingLayout from "../layout/LandingLayout";
import supabase from "../lib/supabase";

interface Props {}

type Provider = "github";

const SignIn = ({}: Props) => {
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  });

  async function fetchProfile() {
    const user = supabase.auth.user();
    if (user) {
      console.log("Redirecting from signin to app");
      router.push("/app");
    }
  }

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage({});

    const { error } = await supabase.auth.signIn({ email });
    if (error) {
      setMessage({ type: "error", content: error.message });
    }

    setMessage({
      type: "note",
      content: "Check your email for the magic link.",
    });

    setLoading(false);
  };

  const handleOAuthSignIn = async (provider: Provider) => {
    setLoading(true);
    const { error } = await supabase.auth.signIn({ provider });
    if (error) {
      setMessage({ type: "error", content: error.message });
    }
    setLoading(false);
  };

  // user shouldn't even be here if they're logged in
  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
          <Logo width="64px" height="64px" />
        </div>

        {/* Display messages and errors */}
        <div className="flex flex-col space-y-4">
          {message.content && (
            <div
              className={`${
                message.type === "error" ? "text-pink-500" : "text-green-500"
              } border ${
                message.type === "error"
                  ? "border-pink-500"
                  : "border-green-500"
              } p-3`}
            >
              {message.content}
            </div>
          )}

          <form onSubmit={handleSignin} className="flex flex-col space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={setEmail}
              required
            />
            <Button
              variant="slim"
              type="submit"
              loading={loading}
              disabled={!email.length}
            >
              Send magic link
            </Button>
          </form>
        </div>

        <div className="flex items-center my-6">
          <div
            className="flex-grow mr-3 border-t border-gray-600"
            aria-hidden="true"
          ></div>
          <div className="text-gray-400">Or</div>
          <div
            className="flex-grow ml-3 border-t border-gray-600"
            aria-hidden="true"
          ></div>
        </div>

        <Button
          variant="slim"
          type="submit"
          disabled={loading}
          onClick={() => handleOAuthSignIn("github")}
        >
          <GitHub />
          <span className="ml-2">Continue with GitHub</span>
        </Button>
      </div>
    </div>
  );
};

// Attach the landing layout (and other nested layouts) to the page
SignIn.getLayout = (page: ReactElement) => {
  return (
    // Attach the Landing layout with a meta component, decide on header/footer
    <LandingLayout
      meta={
        <Meta
          title="Sign in - NextJS"
          description="Ready to code 10x faster? Get in there!"
        />
      }
      headerActive={false}
      footerActive={false}
    >
      {page}
    </LandingLayout>
  );
};

export default SignIn;
