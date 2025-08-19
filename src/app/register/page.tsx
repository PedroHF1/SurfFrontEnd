'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth";
import { cn } from "@/lib/utils";
import { RegisterProps, RegisterSchema } from "@/schemas/auth/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { GalleryVerticalEnd } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function PageRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const {register} = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { register: formRegister, formState: { errors }, handleSubmit } = useForm<RegisterProps>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit = async (data: RegisterProps) => {
    setIsLoading(true)
    console.log(data);
    try {
        await register(data);
router.push('/login')
        setError('')
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Web Surf
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form className={"flex flex-col gap-6"} onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col items-center gap-2 text-center ">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-balance text-sm text-muted-foreground">Fill the fields below to create your account</p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Your name" {...formRegister('name')} />
                   {errors.name && (
                    <p className='text-red-400 text-sm mt-1'>{errors.name.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" {...formRegister('email')} />
                   {errors.email && (
                    <p className='text-red-400 text-sm mt-1'>{errors.email.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" {...formRegister('password')} />
                   {errors.password && (
                    <p className='text-red-400 text-sm mt-1'>{errors.password.message}</p>
                  )}
                </div>

                  {error && (
                  <Alert variant={'destructive'}>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                  )}

                <Button type="submit" className="w-full" loading={isLoading} disabled={isLoading}>
                  Create
                </Button>

              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Sign in
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/image.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
