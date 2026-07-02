import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useActionState, useEffect } from "react";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import { AuthLayout } from "../components/layout/AuthLayout";
import { Input } from "../components/ui/Input";
import { SubmitButton } from "../components/ui/SubmitButton";

const initialState = {
  error: null,
};

export const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const loginAction = async (previousState, formData) => {
    try {
      const email = formData.get("email");
      const password = formData.get("password");

      await login({ email, password });

      navigate("/dashboard", { replace: true });

      return {
        error: null,
      };
    } catch (error) {
      return {
        error: getApiErrorMessage(error),
      };
    }
  };

  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="Log in to continue your Japanese learning journey."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-nihon-red hover:text-nihon-red-dark"
          >
            Create one
          </Link>
        </>
      }
    >
      <form action={formAction} className="space-y-5">
        {state.error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-950 dark:bg-red-950/40 dark:text-red-200">
            {state.error}
          </div>
        )}
        <Input
          id="email"
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <Input
          id="password"
          label="Password"
          name="password"
          type="password"
          placeholder="Your password"
          autoComplete="current-password"
          required
        />

        <SubmitButton loadingText="Logging in..">Log in</SubmitButton>
      </form>
    </AuthLayout>
  );
};
