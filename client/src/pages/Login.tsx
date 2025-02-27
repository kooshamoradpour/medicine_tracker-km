import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [action, setAction] = React.useState('');
  const navigate = useNavigate();

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      validationBehavior="native"
      onSubmit={async (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));
        try {
          const response = await fetch("/api/patient/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const result = await response.json();
          console.log(result);

          if (response.ok) {
            localStorage.setItem("token", result.token); // Store the token
            setAction(result.message || "Success");

            if (result.redirect) {
              navigate(result.redirect); // Redirect to User page
            }
          } else {
            setAction(result.message || "Login failed");
          }
        } catch (error) {
          console.error("Error:", error);
          setAction("Error submitting form");
        }
      }}
    >

      <Input
        isRequired
        errorMessage="Please enter a valid email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type="password"
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Login
        </Button>

      </div>
      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>


      )}

    </Form>
  );
}
