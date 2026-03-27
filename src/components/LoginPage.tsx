import { useState, useRef, FormEvent } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import movieflowLogo from "@/assets/movieflow-logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const validateEmail = (val: string) => {
    if (!val) return "Enter a valid email address";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Enter a valid email address";
    return "";
  };

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    if (!password) setPasswordError("Enter your password");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");
    const eErr = validateEmail(email);
    const pErr = password ? "" : "Enter your password";
    setEmailError(eErr);
    setPasswordError(pErr);
    if (eErr || pErr) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setServerError("Invalid email or password. Please try again.");
    setIsSubmitting(false);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Password reset flow would open here.");
  };

  const handleGoogleLogin = () => {
    alert("Google OAuth flow would start here.");
  };

  const handleSignUp = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Sign up page would open here.");
  };

  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-end"
      style={{
        width: "1920px",
        height: "934px",
        background: "#000",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/landing_highresolution.mp4" type="video/mp4" />
      </video>

      {/* Login Card */}
      <div
        className="relative z-10 flex flex-col"
        style={{
          width: "440px",
          minHeight: "716px",
          marginRight: "32px",
          background: "rgba(18, 28, 45, 0.72)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: "16px",
          padding: "64px 32px 32px",
        }}
      >
        {/* Server error */}
        {serverError && (
          <div
            className="mb-4 rounded-xl px-4 py-3 text-xs leading-[18px]"
            style={{ background: "rgba(248,113,113,0.10)", color: "hsl(0 94% 72%)" }}
          >
            {serverError}
          </div>
        )}

        {/* Logo */}
        <div className="flex justify-center mb-3">
          <img src={movieflowLogo} alt="MovieFlow" style={{ width: "36px", height: "36px", objectFit: "contain" }} />
        </div>

        {/* Title */}
        <h1 className="text-center font-bold" style={{ fontSize: "28px", lineHeight: "34px", color: "#F0F5FA" }}>
          Welcome to{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #92F1F7 0%, #BA49F7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            MovieFlow
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-center" style={{ fontSize: "16px", lineHeight: "24px", color: "rgba(255, 255, 255, 0.7)" }}>
          Your ideas are waiting. Log in to create.
        </p>

        <form onSubmit={handleSubmit} className="mt-6" noValidate>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2"
              style={{ fontSize: "14px", lineHeight: "22px", color: "rgba(255, 255, 255, 0.7)" }}
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(""); }}
              onBlur={handleEmailBlur}
              placeholder="name@example.com"
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "email-error" : undefined}
              autoComplete="email"
              className="w-full outline-none transition-colors duration-150"
              style={{
                height: "40px",
                background: "#233648",
                border: `1px solid ${emailError ? "hsl(0 94% 72%)" : "#46637F"}`,
                borderRadius: "12px",
                padding: "8px 16px",
                fontSize: "16px",
                lineHeight: "24px",
                color: "#F0F5FA",
              }}
              onFocus={(e) => {
                if (!emailError) e.currentTarget.style.borderColor = "#71F0F6";
              }}
              onBlurCapture={(e) => {
                if (!emailError) e.currentTarget.style.borderColor = "#46637F";
              }}
            />
            {emailError && (
              <p id="email-error" className="mt-1 text-xs leading-[18px]" style={{ color: "hsl(0 94% 72%)" }}>
                {emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block mb-2"
              style={{ fontSize: "14px", lineHeight: "22px", color: "rgba(255, 255, 255, 0.7)" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(""); }}
                onBlur={handlePasswordBlur}
                placeholder=""
                aria-invalid={!!passwordError}
                aria-describedby={passwordError ? "password-error" : "password-helper"}
                autoComplete="current-password"
                className="w-full outline-none transition-colors duration-150"
                style={{
                  height: "40px",
                  background: "#233648",
                  border: `1px solid ${passwordError ? "hsl(0 94% 72%)" : "#46637F"}`,
                  borderRadius: "12px",
                  padding: "8px 16px",
                  paddingRight: "48px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#F0F5FA",
                }}
                onFocus={(e) => {
                  if (!passwordError) e.currentTarget.style.borderColor = "#71F0F6";
                }}
                onBlurCapture={(e) => {
                  if (!passwordError) e.currentTarget.style.borderColor = "#46637F";
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                  passwordRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors duration-150 hover:opacity-100"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {/* Forgot password row */}
            <div id="password-helper" className="flex items-center justify-between mt-2">
              <span id="password-error" className="text-xs leading-[18px]" style={{ color: "hsl(0 94% 72%)" }}>
                {passwordError || "\u00A0"}
              </span>
              <a
                href="#"
                onClick={handleForgotPassword}
                className="text-sm leading-[22px] hover:underline transition-all duration-150 whitespace-nowrap"
                style={{ color: "#71F0F6", fontSize: "14px" }}
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full flex items-center justify-center gap-2 transition-all duration-150 ease-out hover:brightness-110 active:translate-y-px disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              height: "40px",
              background: "#71F0F6",
              boxShadow: "0px 0px 24px rgba(113, 240, 246, 0.22)",
              borderRadius: "12px",
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 700,
              color: "#091729",
              border: "none",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
          <span style={{ fontSize: "14px", lineHeight: "22px", color: "rgba(255, 255, 255, 0.5)" }}>
            or continue with
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
        </div>

        {/* Google button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 transition-all duration-150 ease-out hover:brightness-110 hover:border-white/30"
          style={{
            height: "40px",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            borderRadius: "12px",
            fontSize: "16px",
            lineHeight: "24px",
            fontWeight: 700,
            color: "#F0F5FA",
            cursor: "pointer",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Sign up */}
        <p className="mt-4 text-center" style={{ fontSize: "16px", lineHeight: "24px", color: "#A9B4C2" }}>
          Don't have an account?{" "}
          <a
            href="#"
            onClick={handleSignUp}
            className="hover:underline transition-all duration-150"
            style={{ color: "#71F0F6" }}
          >
            Sign up
          </a>
        </p>

        {/* Terms */}
        <p className="mt-2 text-center" style={{ fontSize: "14px", lineHeight: "22px", color: "rgba(255, 255, 255, 0.4)" }}>
          By continuing, you agree to our{" "}
          <a href="#" className="hover:underline transition-colors duration-150" style={{ color: "rgba(255, 255, 255, 0.4)" }}>Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="hover:underline transition-colors duration-150" style={{ color: "rgba(255, 255, 255, 0.4)" }}>Privacy Policy</a>.
        </p>
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-4 w-full text-center text-xs leading-[18px] z-10"
        style={{ color: "rgba(255, 255, 255, 0.4)" }}
      >
        © 2026 MovieFlow. All rights reserved.{" "}
        <a href="#" className="underline hover:brightness-110 ml-2" style={{ color: "#71F0F6" }}>Contact Us</a>
        <a href="#" className="underline hover:brightness-110 ml-2" style={{ color: "#71F0F6" }}>Blog</a>
      </div>
    </div>
  );
};

export default LoginPage;
