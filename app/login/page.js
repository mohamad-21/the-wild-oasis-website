import SignInButton from "../_components/SignInButton";
import { signInAction } from "../actions";

export default function Page() {
  return (
    <form className="flex flex-col items-center gap-6" action={signInAction}>
      <h2 className="text-3xl">Sign in to access your guest area</h2>
      <SignInButton />
    </form>
  )
}