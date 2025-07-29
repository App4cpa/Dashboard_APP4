"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { Dashboard } from "@/components/dashboard/dashboard"

export default function Home() {
  const [currentView, setCurrentView] = useState<"login" | "signup" | "dashboard">("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentView("dashboard")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentView("login")
  }

  if (isAuthenticated && currentView === "dashboard") {
    return <Dashboard onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {currentView === "login" ? (
        <LoginForm onLogin={handleLogin} onSwitchToSignup={() => setCurrentView("signup")} />
      ) : (
        <SignupForm onSignup={handleLogin} onSwitchToLogin={() => setCurrentView("login")} />
      )}
    </div>
  )
}
