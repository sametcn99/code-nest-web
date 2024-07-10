import { signInWithDiscord } from "./actions";

export default function LoginPage() {
  return (
    <form>
      <button formAction={signInWithDiscord}>Sign In With Discord</button>
    </form>
  );
}
