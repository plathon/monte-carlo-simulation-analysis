import { useEffect, useState } from "react";
import Head from "next/head";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  getCsrfToken,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

export default function SignIn() {
  const [isLoadingEmailSignIn, setIsLoadingEmailSignIn] = useState(false);
  const [isLoadingOAuthSignIn, setIsLoadingOAuthSignIn] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | undefined>();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  useEffect(() => {
    Promise.all([getProviders(), getCsrfToken()]).then((result) => {
      const [providers, token] = result;
      setProviders(providers);
      setCsrfToken(token);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Snap Trade - Sign In</title>
      </Head>

      <main>
        <section className="hero is-fullheight">
          <div className="hero-body">
            <form
              method="post"
              action="/api/auth/signin/email"
              onSubmit={() => setIsLoadingEmailSignIn(true)}
            >
              {providers
                ? Object.values(providers).map((provider, i) =>
                    provider.name === "Email" ? (
                      <div key={provider.name}>
                        <input
                          name="csrfToken"
                          type="hidden"
                          defaultValue={csrfToken}
                        />

                        <div className="field">
                          <div className="control has-icons-left">
                            <span className="icon is-small is-left">
                              <i className="fas fa-envelope"></i>
                            </span>
                            <input
                              id="email"
                              className="input"
                              type="email"
                              name="email"
                              placeholder="Type your email address."
                              pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                              required
                            />
                          </div>
                        </div>

                        <div className="control">
                          <button
                            type="submit"
                            className={`button is-dark is-fullwidth ${
                              isLoadingEmailSignIn && "is-loading"
                            }`}
                          >
                            Sign in with Email
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div key={provider.name}>
                        {i === 1 && <hr />}
                        <div className="control">
                          <button
                            type="button"
                            className={`button is-fullwidth ${
                              isLoadingOAuthSignIn && "is-loading"
                            }`}
                            onClick={() => {
                              setIsLoadingOAuthSignIn(true);
                              signIn(provider.id);
                            }}
                          >
                            <span className="icon">
                              <i
                                className={`fab fa-${provider.name.toLocaleLowerCase()}`}
                              ></i>
                            </span>
                            <span>Sign in with {provider.name}</span>
                          </button>
                        </div>
                      </div>
                    )
                  )
                : ""}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
