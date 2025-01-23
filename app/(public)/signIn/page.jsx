import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/components/forms/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <div className="flex justify-center">
      <LoginForm />
    </div>
  );
};

export default RegisterPage;
