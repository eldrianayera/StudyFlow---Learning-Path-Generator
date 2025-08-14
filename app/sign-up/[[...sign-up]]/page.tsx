import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div>
      <SignUp signInFallbackRedirectUrl={"/create-profile"} />
    </div>
  );
}
