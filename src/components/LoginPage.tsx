import { useState, useRef, FormEvent } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import loginBg from "@/assets/login-bg.jpg";

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");
    const eErr = validateEmail(email);
    const pErr = password ? "" : "Enter your password";
    setEmailError(eErr);
    setPasswordError(pErr);
    if (eErr || pErr) return;

    setIsSubmitting(true);
    // Simulate login
    await new Promise((r) => setTimeout(r, 1500));
    setPasswordError("Incorrect password");
    setIsSubmitting(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-mf-page overflow-hidden">
      {/* Background image */}
      <img
        src={loginBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      {/* Dark overlay to push background down */}
      <div className="absolute inset-0 bg-mf-page/20" />
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, hsl(183 85% 70% / 0.4), transparent 70%)" }}
      />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(circle, hsl(200 80% 50% / 0.3), transparent 70%)" }}
      />

      {/* Logo */}
      <div className="absolute top-6 left-8 z-10">
        <span className="text-xl font-bold text-mf-text">
          MovieFlow
          <span className="ml-1.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full border border-mf-border text-mf-text-tertiary align-top">
            Beta
          </span>
        </span>
      </div>

      {/* Card */}
      <div
        className="relative z-10 w-[440px] max-w-[92vw] rounded-card border border-[rgba(255,255,255,0.08)] px-8 py-8 animate-card-enter"
        style={{
          background: "rgba(18, 28, 45, 0.72)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 24px 72px rgba(2, 6, 23, 0.45)",
        }}
      >
        {/* Server error */}
        {serverError && (
          <div className="mb-6 rounded-control px-4 py-3 text-xs leading-[18px] text-mf-error" style={{ background: "rgba(248,113,113,0.10)" }}>
            {serverError}
          </div>
        )}

        {/* Title */}
        <h1 className="text-[28px] leading-[34px] font-semibold text-mf-text text-center">Welcome to MovieFlow</h1>
        <p className="mt-2 text-sm leading-[22px] text-mf-text-secondary text-center">Your inspiration is waiting. Log in to bring your vision to life.</p>

        <form onSubmit={handleSubmit} className="mt-6" noValidate>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-[13px] leading-5 font-medium text-mf-text-secondary mb-2">
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
              className="w-full h-12 rounded-control bg-mf-input border border-mf-border px-4 text-[15px] leading-[22px] text-mf-text placeholder:text-mf-text-tertiary outline-none transition-colors duration-[160ms] ease-out hover:border-mf-border-hover focus:border-mf-border-focus focus:ring-2 focus:ring-mf-action/20"
            />
            {emailError && (
              <p id="email-error" className="mt-1 text-xs leading-[18px] text-mf-error transition-opacity duration-[120ms]">
                {emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mt-4">
            <label htmlFor="password" className="block text-[13px] leading-5 font-medium text-mf-text-secondary mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(""); }}
                placeholder=""
                aria-invalid={!!passwordError}
                aria-describedby={passwordError ? "password-error" : "password-helper"}
                autoComplete="current-password"
                className="w-full h-12 rounded-control bg-mf-input border border-mf-border px-4 pr-12 text-[15px] leading-[22px] text-mf-text outline-none transition-colors duration-[160ms] ease-out hover:border-mf-border-hover focus:border-mf-border-focus focus:ring-2 focus:ring-mf-action/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-mf-text-tertiary hover:text-mf-text-secondary transition-colors duration-[160ms]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {/* Password helper row: error left, forgot right */}
            <div id="password-helper" className="flex items-center justify-between mt-2 h-5">
              <span className="text-xs leading-[18px] text-mf-error transition-opacity duration-[120ms]">
                {passwordError || ""}
              </span>
              <a
                href="#"
                id="password-error"
                className="text-[13px] leading-5 font-medium text-mf-link hover:brightness-110 hover:underline transition-all duration-[160ms] whitespace-nowrap"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Log in button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full h-12 rounded-control bg-mf-action text-[15px] leading-[22px] font-semibold text-primary-foreground transition-all duration-[160ms] ease-out hover:bg-mf-action-hover active:bg-mf-action-active active:translate-y-px disabled:opacity-[0.38] disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ boxShadow: "0 8px 20px rgba(184,77,255,0.22)" }}
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
          <span className="text-xs leading-[18px] text-mf-text-tertiary">or continue with</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
        </div>

        {/* Google button */}
        <button
          type="button"
          className="w-full h-12 rounded-control border border-[rgba(255,255,255,0.14)] text-[15px] leading-[22px] font-medium text-mf-text flex items-center justify-center gap-3 transition-all duration-[160ms] ease-out hover:border-mf-border-hover hover:bg-[rgba(255,255,255,0.06)]"
          style={{ background: "rgba(255,255,255,0.04)" }}
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
        <p className="mt-4 text-center text-sm leading-5 text-mf-text-secondary">
          Don't have an account?{" "}
          <a href="#" className="font-medium text-mf-link hover:underline hover:brightness-110 transition-all duration-[160ms]">
            Sign up
          </a>
        </p>

        {/* Terms */}
        <p className="mt-3 text-center text-xs leading-[18px] text-mf-text-tertiary">
          By continuing, you agree to our{" "}
          <a href="#" className="hover:text-mf-text-secondary hover:underline transition-colors duration-[160ms]">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="hover:text-mf-text-secondary hover:underline transition-colors duration-[160ms]">Privacy Policy</a>.
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 w-full text-center text-xs leading-[18px] text-mf-text-tertiary z-10">
        © 2026 MovieFlow. All rights reserved.{" "}
        <a href="#" className="text-mf-link hover:underline ml-2">Contact Us</a>
        <a href="#" className="text-mf-link hover:underline ml-2">Blog</a>
      </div>
    </div>
  );
};

export default LoginPage;
