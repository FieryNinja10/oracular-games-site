"use client";

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
import { useQuery } from "@tanstack/react-query";

const UserResetSchema = z.object({
  password: z.string().min(6, "Password should be at least 6 characters")
});

const AuthForm = ({ userId, token }: { userId: string; token: string }) => {
  const { data, error, isLoading, isError } = useQuery({
    queryFn: () =>
      axios
        .get(`/api/auth/reset-password/${userId}/${token}`)
        .then((res) => res.data)
  });

  const form = useForm<z.infer<typeof UserResetSchema>>({
    resolver: zodResolver(UserResetSchema)
  });

  const onSubmit = async (formData: z.infer<typeof UserResetSchema>) => {
    // reset password
  };

  return (
    <Form {...form}>
      {isError ? (
        <Badge variant="destructive" className="py-1 text-sm">
          {`${error}`}
        </Badge>
      ) : data.error ? (
        <Badge variant="destructive" className="py-1 text-sm">
          {`${data.error}`}
        </Badge>
      ) : null}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-base space-y-5"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState, formState }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
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
  );
};

export default AuthForm;
