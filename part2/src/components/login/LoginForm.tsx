import React, { useState } from "react";

interface CredItems {
  username: string;
  password: string;
}

interface LoginFormProps {
  handleSubmit: (creds: CredItems) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ username, password });
        setUsername("");
        setPassword("");
      }}
    >
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
