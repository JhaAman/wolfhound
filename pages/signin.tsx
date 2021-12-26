import { useRouter } from "next/router";
import { useState, FormEvent, ReactElement, useEffect } from "react";
import GitHub from "../components/icons/GitHub";
import Meta from "../components/landing/Meta";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LandingLayout from "../layout/LandingLayout";
import supabase from "../lib/supabase";

const app_base_url = process.env.NEXT_PUBLIC_BASE_URL;

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

    const { error } = await supabase.auth.signIn(
      { email },
      { redirectTo: "/app" }
    );
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
    const { error } = await supabase.auth.signIn(
      { provider },
      { redirectTo: "/app" }
    );
    if (error) {
      setMessage({ type: "error", content: error.message });
    }
    setLoading(false);
  };

  // user shouldn't even be here if they're logged in
  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        {/* <div className="flex items-center justify-center pb-12">
          <Logo width="32px" height="32px" />
        </div> */}

        <h1 className="items-center justify-center m-8 text-3xl font-bold text-center text-red-400">
          Sign into Rosie
        </h1>

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
          title="Sign into Rosie"
          description="Ready to become a 10x React developer?"
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
