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
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const UserResetSchema = z.object({
  email: z.string().email(),
});

const AuthForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { mutate, data, isLoading } = useMutation({
    mutationKey: ["reset-password-link"],
    mutationFn: (params: z.infer<typeof UserResetSchema>) =>
      axios.post("/api/auth/reset-password", params).then((res) => res.data),
    onError: (error, variables, context) => setErrorMessage(`${error}`),
    onSuccess: (data, variables, context) => {
      if (data.error) setErrorMessage(data.error);
      else {
        setErrorMessage(undefined);
        setIsSuccess(true);
      }
    },
  });

  const form = useForm<z.infer<typeof UserResetSchema>>({
    resolver: zodResolver(UserResetSchema),
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
          className="space-y-5 py-12 text-base"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState, formState }) => (
              <FormItem className="">
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
            {isLoading && <Loader2 className="mx-2 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      </Form>
      {isSuccess && (
        <>
          <h3 className="pt-12 text-center font-rubik text-xl font-semibold">
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
