"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Eye, EyeOff, Loader2 } from "lucide-react"

interface LoginFormProps {
  onLogin: () => void
  onSwitchToSignup: () => void
}

export function LoginForm({ onLogin, onSwitchToSignup }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Pre-filled demo credentials
  const [email, setEmail] = useState("demo@app4cpa.com")
  const [password, setPassword] = useState("demo1234")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] relative">
      {/* Back to Website Button */}
      <a
        href="https://app4cpa.com/"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white bg-white/10 border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-white/20 transition text-sm sm:text-base"
      >
        ← Back to Website
      </a>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <img src="/LOGO.png" alt="App4CPA Logo" className="mx-auto h-20 sm:h-28 mb-3" />
        </div>

        {/* Login Card */}
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl sm:text-2xl font-semibold">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-300 text-sm sm:text-base">
              Sign in to your account to continue
              <span className="block mt-2 text-xs text-gray-400">
                <strong>Demo Email:</strong> demo@app4cpa.com <br />
                <strong>Password:</strong> demo1234
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-white text-sm sm:text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border border-white/20 text-white placeholder:text-gray-400 mt-1"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-white text-sm sm:text-base">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border border-white/20 text-white placeholder:text-gray-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="link"
                  className="text-[#FDC504] hover:text-[#E68B37] text-sm p-0"
                >
                  Forgot password?
                </Button>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full bg-[#BB0216] hover:bg-[#BB0216]/90 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Switch to Sign Up */}
              <div className="text-center text-sm mt-2">
                <span className="text-gray-400">{"Don't have an account? "}</span>
                <Button
                  type="button"
                  variant="link"
                  className="text-[#FDC504] hover:text-[#E68B37] p-0"
                  onClick={onSwitchToSignup}
                >
                  Sign up
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
