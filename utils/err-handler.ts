import { toast } from 'react-toastify';
import chalk from 'chalk';
// import { ApolloError } from "@apollo/client";

interface GeneralErrorOptions {
  name?: string;
  data?: any;
  statusCode?: number;
  errors?: { message: string }[];
}

export class GeneralError extends Error {
  data?: any;
  errors: { message: string }[] = [];
  private code = 400;

  constructor(message: string, options?: GeneralErrorOptions) {
    super();
    this.message = message;
    this.data = options?.data;

    if (options?.name) this.name = options?.name;
    if (options?.statusCode) this.code = options?.statusCode;
    if (options?.errors) this.errors = options?.errors;
  }

  get statusCode() {
    return this.code;
  }
}

type SignInErrorTypes =
  | 'Signin'
  | 'OAuthSignin'
  | 'OAuthCallback'
  | 'OAuthCreateAccount'
  | 'EmailCreateAccount'
  | 'Callback'
  | 'OAuthAccountNotLinked'
  | 'EmailSignin'
  | 'CredentialsSignin'
  | 'SessionRequired'
  | 'default';

const auth_errors: Record<SignInErrorTypes, string> = {
  Signin: 'Try signing in with a different account.',
  OAuthSignin: 'Try signing in with a different account.',
  OAuthCallback: 'Try signing in with a different account.',
  OAuthCreateAccount: 'Try signing in with a different account.',
  EmailCreateAccount: 'Try signing in with a different account.',
  Callback: 'Try signing in with a different account.',
  OAuthAccountNotLinked: 'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'The e-mail could not be sent.',
  CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
  SessionRequired: 'Please sign in to access this page.',
  default: 'Unable to sign in.',
};

function handleError(err: unknown) {
  if (!err) return toast.error('Invalid Error message');

  // if (err instanceof ApolloError) {
  //   return toast.error(err?.message);
  // }

  if (err instanceof GeneralError) {
    return toast.error(err?.message);
  }

  if (err instanceof Error) {
    return toast.error(err?.message);
  }

  if (typeof err === 'string') {
    if (auth_errors[err as SignInErrorTypes]) {
      return toast.error(auth_errors[err as SignInErrorTypes]);
    }
    return toast.error(err);
  }

  toast.error((err as any)?.message ?? 'unknown error');

  console.error(chalk.bgRed('Unhandled error (frontend) ==>', JSON.stringify(err)));
}

export { auth_errors, handleError };
