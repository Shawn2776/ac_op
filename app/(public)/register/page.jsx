import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <div className="flex h-screen bg-neutral-400">
      <div className="m-auto">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
