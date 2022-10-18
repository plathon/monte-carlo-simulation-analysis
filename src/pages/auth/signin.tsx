import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { string, ValidationError } from "yup";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  getCsrfToken,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

export default function SignIn() {
  const session = useSession();
  const router = useRouter();

  const [isLoadingEmailSignIn, setIsLoadingEmailSignIn] = useState(false);
  const [isLoadingOAuthSignIn, setIsLoadingOAuthSignIn] = useState(false);

  const [email, setEmail] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");
  const [showEmailErrors, setShowEmailErrors] = useState(false);

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

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    try {
      await string()
        .email("Invalid email address")
        .required("Required")
        .default("")
        .validate(value);
      setEmailValidationError("");
      setShowEmailErrors(false);
    } catch (e) {
      if (e instanceof ValidationError && e.errors[0]) {
        setEmailValidationError(e.errors[0]);
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (emailValidationError) {
      e.preventDefault();
    } else {
      setIsLoadingEmailSignIn(true);
    }
  };

  const handleBlur = () => {
    if (emailValidationError) {
      setShowEmailErrors(true);
    }
  };

  if (session.status === "loading")
    return <div className="loader is-loading"></div>;

  if (session.status === "authenticated") {
    router.push("/workspace/default");
    return <div className="loader is-loading is-danger"></div>;
  }

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
              onSubmit={handleSubmit}
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
                              className={`input ${
                                showEmailErrors && "is-danger"
                              }`}
                              type="text"
                              name="email"
                              placeholder="Type your email address."
                              value={email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <p className="help is-danger">
                            {showEmailErrors && emailValidationError}
                          </p>
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
