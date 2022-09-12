import { useEffect, useState } from "react";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  getCsrfToken,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

export default function SignIn() {
  const [csrfToken, setCsrfToken] = useState<string | undefined>();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  useEffect(() => {
    getProviders().then((providers) => setProviders(providers));
    getCsrfToken().then((token) => setCsrfToken(token));
  }, []);

  return (
    <>
      <h1>Sign in</h1>
      {providers
        ? Object.values(providers).map((provider) =>
            provider.name === "Email" ? (
              <form
                key={provider.name}
                method="post"
                action="/api/auth/signin/email"
              >
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <label>
                  Email address
                  <input type="email" id="email" name="email" />
                </label>
                <button type="submit">Sign in with Email</button>
              </form>
            ) : (
              <div key={provider.name}>
                <button onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </button>
              </div>
            )
          )
        : ""}
    </>
  );
}
