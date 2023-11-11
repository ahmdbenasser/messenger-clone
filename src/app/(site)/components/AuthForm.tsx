"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { FieldValues, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

import Input from "@/components/inputs/Input";
import Button from "@/components/Button";
import AuthProvButton from "./AuthProvButton";

type TVaraint = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [varaint, setVaraint] = useState<TVaraint>("LOGIN");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const sessoin = useSession();
  const toggleVaraint = useCallback(() => {
    if (varaint === "LOGIN") {
      setVaraint("REGISTER");
    } else {
      setVaraint("LOGIN");
    }
  }, [varaint]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);

    // Register
    if (varaint === "REGISTER") {
      try {
        await axios.post("/api/register", data);
        signIn("credentials", { ...data });
        router.push("/users");
      } catch (err) {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    }

    // Login
    if (varaint === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!");
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const onProviderLogin = (provider: string) => {
    setLoading(true);
    signIn(provider, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Something went wrong!");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (sessoin?.status === "authenticated") {
      router.push("/users");
    }
  }, [sessoin.status, router]);

  return (
    <div
      className="
        mt-5
        py-8
        px-4
        sm:px-10
        shadow-md
        sm:w-full
        sm:mx-auto
        rounded-md
        bg-white
        sm:max-w-md
        "
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {varaint === "REGISTER" && (
          <Input
            register={register}
            errors={errors}
            label="Name"
            type="name"
            id="name"
            disabled={loading}
          />
        )}
        <Input
          register={register}
          errors={errors}
          label="Email address"
          type="email"
          id="email"
          disabled={loading}
        />
        <Input
          register={register}
          errors={errors}
          label="Password"
          type="password"
          id="password"
          disabled={loading}
        />
        <Button onClick={() => {}} fullWidth type="submit" disabled={loading}>
          {varaint === "LOGIN" ? "Sign in" : "Register"}
        </Button>
      </form>

      {/* Auth login Providers*/}
      <div className="mt-6">
        {/* centered horizontal line */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className=" relative flex justify-center">
            <span className=" px-2 text-gray-500 bg-white ">
              Or continue with
            </span>
          </div>
        </div>
        {/* end Auths login*/}

        {/* Buttons Auth */}
        <div className="flex items-center gap-2 mt-6">
          <AuthProvButton
            onClick={() => onProviderLogin("github")}
            icon={BsGithub}
            disabled={loading}
          />
          <AuthProvButton
            onClick={() => onProviderLogin("google")}
            icon={BsGoogle}
            disabled={loading}
          />
        </div>
        {/* end Buttons Auth */}
      </div>
      {/* end Auth login Providers*/}

      {/* Toggle login or register */}
      <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
        <span className="font-semibold">
          {varaint === "LOGIN"
            ? "New to messenger?"
            : "Already have an account?"}
        </span>
        <span
          className="cursor-pointer underline transition"
          onClick={toggleVaraint}
        >
          {varaint === "LOGIN" ? "Create an account" : "Login"}
        </span>
      </div>
      {/* end Toggle login or register */}
    </div>
  );
};

export default AuthForm;
