import Image from "next/image";
import AuthForm from "./components/AuthForm";

const Home = async () => {
  return (
    <div
      className="
      py-12
      sm:px-4
      md:px-8
      min-h-full
      bg-gray-100
      flex flex-col items-center justify-center
      "
    >
      {/* Logo and title */}
      <Image src="/images/logo.png" height="40" width="40" alt="" />
      <h2
        className="
        mt-6
        text-3xl
        font-bold
        text-gray-900
        tracking-tight
        "
      >
        Sign in to your account
      </h2>
      {/* End Logo and title */}

      {/* Auth Form */}
      <AuthForm />
    </div>
  );
};

export default Home;
