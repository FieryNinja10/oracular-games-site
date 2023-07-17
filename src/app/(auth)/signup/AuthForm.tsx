"use client";

import Link from "next/link";
import { useState } from "react";

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
  FormMessage
} from "@/components/ui/form";
import { useYearMonthDay } from "@/hooks";

import { UserRegisterSchema } from "@/types";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const UserSignUpSchema = UserRegisterSchema.merge(
  z.object({
    tosPrivacy: z
      .boolean({
        required_error:
          "You have to accept the Terms of Service and the Privacy Policy"
      })
      .refine((val) => val, {
        message:
          "You have to accept the Terms of Service and the Privacy Policy"
      })
  })
);

const AuthForm = () => {
  const [isDateFocused, setIsDateFocused] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const yearMonthDay = useYearMonthDay;

  // react hook form
  const form = useForm<z.infer<typeof UserSignUpSchema>>({
    resolver: zodResolver(UserSignUpSchema)
  });

  const onSubmit = async (formData: z.infer<typeof UserSignUpSchema>) => {
    // validate data
    const { email, password, username, birthday, newsletter } =
      UserRegisterSchema.parse({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        birthday: formData.birthday,
        newsletter: formData.newsletter
      });

    // http request
    // TODO: Change to tanstack query
    const data = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, username, birthday, newsletter })
    }).then((res) => res.json());

    // check for additional error messages
    if (!data.user) {
      setErrorMessage(data.message);
      return;
    }
    await signIn("credentials", {
      email: data.user.email,
      password,
      callbackUrl: "/"
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 space-y-5 text-base"
      >
        {errorMessage && errorMessage !== "" && errorMessage !== " " ? (
          <Badge variant="destructive" className="py-1 text-sm">
            {errorMessage}
          </Badge>
        ) : null}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState, formState }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState, formState }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState, formState }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Username" {...field} />
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
            <FormItem>
              <FormLabel className="text-gray-600">Birthday</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  className={isDateFocused ? "text-gray-600" : "text-gray-400"}
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
            <FormItem className="flex flex-col">
              <div className="flex">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      if (checked === "indeterminate") field.onChange(true);
                      else field.onChange(checked);
                    }}
                  />
                </FormControl>
                <FormLabel className="ml-2 text-gray-600">
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
            <FormItem className="flex flex-col">
              <div className="flex">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      if (checked === "indeterminate") field.onChange(false);
                      else field.onChange(checked);
                    }}
                  />
                </FormControl>
                <FormLabel className="ml-2 text-gray-600">
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
        <Button className="w-full bg-prime text-white hover:bg-rad active:bg-darkRad">
          Sign up
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
