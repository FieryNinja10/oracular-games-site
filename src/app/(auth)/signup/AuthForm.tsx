"use client";

import { block } from "million/react";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useYearMonthDay } from "@/hooks";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import { userRegisterSchema } from "@/db/types";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const AuthForm = block(() => {
  // check if user is already authenticated
  const session = useSession();
  const router = useRouter();
  if (session.status === "authenticated") router.push("/already-authenticated");

  const [isDateFocused, setIsDateFocused] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const yearMonthDay = useYearMonthDay;

  // tan-stack query
  const { mutate, data, isError, error, isSuccess, isLoading, status } =
    useMutation({
      mutationKey: ["user-registration"],
      mutationFn: async (params: z.infer<typeof userRegisterSchema>) => {
        return axios.post("/api/auth/user", params).then((res) => res.data);
      },
      onSuccess: async (data, { password }, context) => {
        if (data.user === null) {
          setErrorMessage(data.message);
          return;
        } else toast.success(data.message);

        // sign user in
        const res = await signIn("credentials", {
          email: data.user.email,
          password,
          callbackUrl: "/",
        });

        // throw toast
        if (res) {
          if (res.error) toast.error(res.error);
          else if (!res.ok && !res.error)
            toast.error("Sign in unsuccessful, error unknown");
          else if (!res.ok && res.error) toast.error(res.error);
          else toast.success("User successfully signed in");
        } else toast.success("User successfully signed in");
      },
      onError(error, variables, context) {
        setErrorMessage(JSON.stringify(error));
        return;
      },
    });

  // react hook form
  const UserSignUpSchema = userRegisterSchema.merge(
    z.object({
      tosPrivacy: z
        .boolean({
          required_error:
            "You have to accept the Terms of Service and the Privacy Policy",
        })
        .refine((val) => val, {
          message:
            "You have to accept the Terms of Service and the Privacy Policy",
        }),
    })
  );

  type UserSignUpType = z.infer<typeof UserSignUpSchema>;

  const form = useForm<UserSignUpType>({
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (formData: UserSignUpType) => {
    // validate data
    const { email, password, username, birthday, newsletter } =
      userRegisterSchema.parse({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        birthday: formData.birthday,
        newsletter: formData.newsletter,
      });

    // http request
    mutate({
      email,
      password,
      username,
      birthday,
      newsletter,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 pb-12 pt-2 text-base"
      >
        {((errorMessage && errorMessage !== "" && errorMessage !== " ") ||
          isError) && (
          <Badge variant="destructive" className="py-1 text-sm">
            {errorMessage}
          </Badge>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState, formState }) => (
            <FormItem className="py-2">
              <FormLabel className="text-gray-600 hover:cursor-text">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  className="ring-gray-300"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState, formState }) => (
            <FormItem className="py-2">
              <FormLabel className="text-gray-600 hover:cursor-text">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  className="ring-gray-300"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          rules={{
            required: false,
            maxLength: 20,
          }}
          render={({ field, fieldState, formState }) => (
            <FormItem className="py-2">
              <FormLabel className="text-gray-600 hover:cursor-text">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Username"
                  className="ring-gray-300"
                  disabled={isLoading}
                  {...field}
                  value={field.value ? field.value : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          rules={{ pattern: undefined }}
          render={({ field, fieldState, formState }) => (
            <FormItem className="py-2">
              <FormLabel className="text-gray-600 hover:cursor-text">
                Birthday
              </FormLabel>
              <FormControl>
                <Input
                  type="date"
                  className={`ring-gray-300 ${
                    isDateFocused ? "text-gray-600" : "text-gray-400"
                  }`}
                  disabled={isLoading}
                  placeholder="Birthday"
                  {...field}
                  value={yearMonthDay(field.value)}
                  onChange={(e) => {
                    // css
                    if (
                      e.target.value === null ||
                      e.target.value === undefined ||
                      !e.target.value
                    )
                      setIsDateFocused(false);
                    else setIsDateFocused(true);

                    // getting values

                    const dateStringArray: any = e.target.value.split("-");

                    field.onChange(
                      new Date(
                        Number(dateStringArray[0]),
                        Number(dateStringArray[1]) - 1,
                        Number(dateStringArray[2])
                      )
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newsletter"
          render={({ field, fieldState, formState }) => (
            <FormItem className="flex flex-col py-3">
              <div className="flex">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      if (checked === "indeterminate") field.onChange(true);
                      else field.onChange(checked);
                    }}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormLabel className="ml-2 text-gray-600 hover:cursor-text">
                  Sign up for newsletter
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tosPrivacy"
          render={({ field, fieldState, formState }) => (
            <FormItem className="flex flex-col pb-3">
              <div className="flex">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      if (checked === "indeterminate") field.onChange(false);
                      else field.onChange(checked);
                    }}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormLabel className="ml-2 text-gray-600 hover:cursor-text">
                  You agree to the{" "}
                  <Link href="/terms" className="underline hover:text-rad">
                    Terms of Service
                  </Link>{" "}
                  and the{" "}
                  <Link href="/privacy" className="underline hover:text-rad">
                    Privacy Policy
                  </Link>
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-prime text-white hover:bg-rad active:bg-darkRad"
          disabled={isLoading}
        >
          Sign up
          {isLoading && <Loader2 className="mx-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
});

export default AuthForm;
