import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <div className="flex justify-center mt-40">
      <LoginForm />
    </div>
  );
};

export default RegisterPage;
