"use client";

import { block } from "million/react";

import { useRouter } from "next/navigation";
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
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const UserResetSchema = z.object({
  password: z.string().min(6, "Password should be at least 6 characters"),
});

const AuthForm = block(
  ({ userId, token }: { userId: string; token: string }) => {
    const [verifyError, setVerifyError] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [success, setSuccess] = useState<boolean>(false);

    const router = useRouter();

    const { isLoading: pageLoading } = useQuery({
      queryKey: ["reset-password-verification"],
      queryFn: () =>
        axios
          .get(`/api/auth/reset-password/${userId}/${token}`)
          .then((res) => res.data),
      onError: (err) => setVerifyError(`${err}`),
      onSuccess: (data) => {
        if (data.verified) {
          setVerifyError(undefined);
          setSuccess(data.verified);
          router.push("/login");
        } else if (!data.verified) setVerifyError("Not verified");
        else if (data.error) setVerifyError(data.error);
      },
    });

    const { mutate, isLoading } = useMutation({
      mutationKey: ["reset-password"],
      mutationFn: (params: z.infer<typeof UserResetSchema>) =>
        axios
          .post(`/api/auth/reset-password/${userId}/${token}`, params)
          .then((res) => res.data),
      onError: (error, variables, context) => setErrorMessage(`${error}`),
      onSuccess: (data, variables, context) => {
        if (data.error) setErrorMessage(data.error);
        else {
          setErrorMessage(undefined);
          toast.success(data.message);
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
        {pageLoading && (
          <div className="flex w-full justify-center text-prime">
            <Loader2 className="mr-2 h-28 w-28 animate-spin" />
          </div>
        )}
        {verifyError && (
          <div className="text-center text-lg uppercase text-rad">
            {verifyError}
          </div>
        )}
        {success && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 py-12 text-base"
            >
              {errorMessage && (
                <Badge variant="destructive" className="py-1 text-sm">
                  {errorMessage}
                </Badge>
              )}
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
                {isLoading && <Loader2 className="mx-2 h-4 w-4 animate-spin" />}
              </Button>
            </form>
          </Form>
        )}
      </>
    );
  }
);

export default AuthForm;
