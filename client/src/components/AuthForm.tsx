import { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </fieldset>
      <fieldset>
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </fieldset>
      <button>Sign Up</button>
    </form>
  );
};

export default AuthForm;
