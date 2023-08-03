"use client";

import { useState } from "react";

import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const UserResetSchema = z.object({
  email: z.string().email()
});

const AuthForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>();

  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationFn: (params: z.infer<typeof UserResetSchema>) =>
      axios.post("/api/auth/reset-password", params).then((res) => res.data),
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {}
  });

  const form = useForm<z.infer<typeof UserResetSchema>>({
    resolver: zodResolver(UserResetSchema)
  });

  const onSubmit = async (formData: z.infer<typeof UserResetSchema>) => {
    mutate(formData);
  };

  return (
    <>
      <Form {...form}>
        {errorMessage && (
          <Badge variant="destructive" className="py-1 text-sm">
            {errorMessage}
          </Badge>
        )}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="font-base space-y-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState, formState }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="border-prime ring-second"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-prime text-white hover:bg-rad active:bg-darkRad"
            disabled={isLoading}
          >
            Submit
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      </Form>
      {isSuccess && (
        <>
          <h3 className="text-center font-nunito text-xl">
            Email has been sent
          </h3>
          <p className="text-center font-nunito text-lg">
            Email will expire in 10 minutes, click{" "}
            <span className="text-rad">Submit</span> to resend the email
          </p>
        </>
      )}
    </>
  );
};

export default AuthForm;
