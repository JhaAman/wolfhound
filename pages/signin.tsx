import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, FormEvent, Provider, ReactElement } from "react";
import GitHub from "../components/icons/GitHub";
import Logo from "../components/icons/Logo";
import Meta from "../components/landing/Meta";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LoadingDots from "../components/ui/LoadingDots";
import LandingLayout from "../layout/LandingLayout";
import supabase from "../lib/supabase";

interface Props {
  user?: User;
  beta_list: any;
}

const SignIn = ({ user, beta_list }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });
  const router = useRouter();
  const { signIn } = useUser();

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage({});

    const { error } = await signIn({ email, password });
    if (error) {
      setMessage({ type: "error", content: error.message });
    }
    if (!password) {
      setMessage({
        type: "note",
        content: "Check your email for the magic link.",
      });
    }
    setLoading(false);
  };

  const handleOAuthSignIn = async (provider: Provider) => {
    setLoading(true);
    const { error } = await signIn({ provider });
    if (error) {
      setMessage({ type: "error", content: error.message });
    }
    setLoading(false);
  };

  if (!user)
    return (
      <div className="flex justify-center height-screen-helper">
        <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
          <div className="flex justify-center pb-12 ">
            <Logo width="64px" height="64px" />
          </div>
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

            {!showPasswordInput && (
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
            )}

            {showPasswordInput && (
              <form onSubmit={handleSignin} className="flex flex-col space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={setEmail}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={setPassword}
                  required
                />
                <Button
                  className="mt-1"
                  variant="slim"
                  type="submit"
                  loading={loading}
                  disabled={!password.length || !email.length}
                >
                  Sign in
                </Button>
              </form>
            )}

            <span className="pt-1 text-sm text-center">
              <a
                href="#"
                className="text-gray-200 cursor-pointer text-accent-9 hover:underline"
                onClick={() => {
                  if (showPasswordInput) setPassword("");
                  setShowPasswordInput(!showPasswordInput);
                  setMessage({});
                }}
              >
                {`Or sign in with ${
                  showPasswordInput ? "magic link" : "password"
                }.`}
              </a>
            </span>

            <span className="pt-1 text-sm text-center">
              <span className="text-gray-200">Don't have an account?</span>
              {` `}
              <Link href="/signup">
                <a className="font-bold cursor-pointer text-accent-9 hover:underline">
                  Sign up.
                </a>
              </Link>
            </span>
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

  return (
    <div className="m-6">
      <LoadingDots />
    </div>
  );
};

export async function getServerSideProps(ctx: { req: any }) {
  const { req } = ctx;

  // Check if user is logged in
  const { user } = await supabase.auth.api.getUserByCookie(req);
  // If we have a user logged in, then nav to app
  if (user) {
    return { props: { user: user }, redirect: { destination: "/app" } };
  }

  // If we don't have a user logged in, then continue sign in process
  const { data, error } = await supabase.from("Beta List").select();

  /* if a user is set, pass it to the page via props */
  return { props: { beta_list: data } };
}

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
