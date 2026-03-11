import { Form, redirect } from "react-router";
import { api } from "../services/mockApi";
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "../components/ui";

export async function loginAction() {
  await api.login();
  return redirect("/");
}

export function Login() {
  return (
      <div className="flex h-screen w-full items-center justify-center bg-muted/20 px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" name="email" placeholder="admin@yoga.com" required defaultValue="admin@yoga.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" name="password" required defaultValue="password" />
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </Form>
          </CardContent>
        </Card>
      </div>
  );
}