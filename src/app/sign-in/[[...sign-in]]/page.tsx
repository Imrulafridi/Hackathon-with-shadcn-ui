import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="constiner mx-auto flex justify-center items-center">
      <SignIn afterSignInUrl={'/'} />
    </div>
  );
}
