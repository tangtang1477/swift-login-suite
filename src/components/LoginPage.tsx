import { useState, useRef, useEffect, FormEvent } from "react";
import { Eye, EyeOff, Loader2, Phone } from "lucide-react";
import movieflowLogo from "@/assets/movieflow-logo.png";

type Step = "initial" | "email-login" | "email-signup" | "verify-code" | "reset-password";

const LoginPage = () => {
  const [step, setStep] = useState<Step>("initial");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [serverError, setServerError] = useState("");
  const [resendSuccess, setResendSuccess] = useState("");
  const [verifySuccess, setVerifySuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInlinePassword, setShowInlinePassword] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const inlinePasswordRef = useRef<HTMLInputElement>(null);

  const validateEmail = (val: string) => {
    if (!val) return "Enter a valid email address";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Enter a valid email address";
    return "";
  };

  // Show inline password when email is valid
  useEffect(() => {
    if (step === "initial") {
      const isValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setShowInlinePassword(!!isValid);
    }
  }, [email, step]);

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    if (!password) setPasswordError("Enter your password");
  };

  const handleConfirmPasswordBlur = () => {
    if (!confirmPassword) setConfirmPasswordError("Confirm your password");
    else if (confirmPassword !== password) setConfirmPasswordError("Passwords do not match");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");
    const eErr = validateEmail(email);
    setEmailError(eErr);

    const pErr = !password
      ? "Enter your password"
      : password.length < 8
        ? "Password must be at least 8 characters"
        : !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)
          ? "Password must contain both letters and numbers"
          : "";
    if (!showInlinePassword) {
      // password not visible yet, only validate email
      if (eErr) return;
      return;
    }
    setPasswordError(pErr);
    if (eErr || pErr) return;

    // Simulate sending verification code
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setStep("verify-code");
  };

  const handleVerifySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!verificationCode) {
      setCodeError("Enter the verification code");
      setServerError("");
      setResendSuccess("");
      setVerifySuccess("");
      return;
    }
    setCodeError("");
    setResendSuccess("");
    setVerifySuccess("");
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    // Simulate: code "000000" is valid, anything else is invalid
    if (verificationCode === "000000") {
      setServerError("");
      setResendSuccess("");
      setVerifySuccess("Verification successful!");
    } else {
      setVerifySuccess("");
      setServerError("Invalid verification code. Please try again.");
    }
    setIsSubmitting(false);
  };

  const handleResendEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    setResendSuccess("");
    setServerError("");
    setVerifySuccess("");
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setResendSuccess("Verification email sent successfully.");
    setIsSubmitting(false);
    setTimeout(() => setResendSuccess(""), 4000);
  };

  const handleContinueWithPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    // Go back to login with password
    setStep("email-login");
    setVerificationCode("");
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");
    const pErr = password ? "" : "Enter your password";
    setPasswordError(pErr);
    if (pErr) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setServerError("Invalid email or password. Please try again.");
    setIsSubmitting(false);
  };

  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");
    const pErr = password ? "" : "Enter your password";
    const cErr = !confirmPassword
      ? "Confirm your password"
      : confirmPassword !== password
        ? "Passwords do not match"
        : "";
    setPasswordError(pErr);
    setConfirmPasswordError(cErr);
    if (pErr || cErr) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setServerError("Sign up failed. Please try again.");
    setIsSubmitting(false);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Password reset flow would open here.");
  };

  const handleGoogleLogin = () => {
    alert("Google OAuth flow would start here.");
  };

  const handleAppleLogin = () => {
    alert("Apple OAuth flow would start here.");
  };

  const handlePhoneLogin = () => {
    alert("Phone login flow would start here.");
  };

  const handleBack = () => {
    setStep("initial");
    setPassword("");
    setConfirmPassword("");
    setVerificationCode("");
    setPasswordError("");
    setConfirmPasswordError("");
    setServerError("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchToSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep("email-signup");
    setPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setConfirmPasswordError("");
    setServerError("");
  };

  const switchToLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep("email-login");
    setPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setConfirmPasswordError("");
    setServerError("");
  };

  const inputStyle = (hasError: boolean) => ({
    height: "40px",
    background: "#233648",
    border: `1px solid ${hasError ? "hsl(0 94% 72%)" : "#46637F"}`,
    borderRadius: "12px",
    padding: "8px 16px",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#F0F5FA",
  });

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>, hasError: boolean) => {
    if (!hasError) e.currentTarget.style.borderColor = "#71F0F6";
  };

  const handleInputBlurStyle = (e: React.FocusEvent<HTMLInputElement>, hasError: boolean) => {
    if (!hasError) e.currentTarget.style.borderColor = "#46637F";
  };

  const socialButtonBaseStyle: React.CSSProperties = {
    height: "40px",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.14)",
    borderRadius: "12px",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 700,
    color: "#F0F5FA",
    cursor: "pointer",
    transition: "all 0.2s ease-out",
  };

  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  const getSocialButtonStyle = (id: string): React.CSSProperties => ({
    ...socialButtonBaseStyle,
    ...(hoveredBtn === id
      ? {
          background: "rgba(255, 255, 255, 0.10)",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          boxShadow: "0 0 16px rgba(255, 255, 255, 0.06)",
        }
      : {}),
  });

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-end"
      style={{
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
        <source src="/landing.mp4" type="video/mp4" />
      </video>

      {/* Card */}
      <div
        className="relative z-10 flex flex-col"
        style={{
          width: "440px",
          maxWidth: "92vw",
          marginRight: "clamp(16px, 2vw, 32px)",
          background: "rgba(18, 28, 45, 0.72)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: "16px",
          padding: "64px 32px 32px",
        }}
      >
        {/* Server error - show for non-verify steps */}
        {serverError && step !== "verify-code" && (
          <div
            className="mb-4 rounded-xl px-4 py-3 text-xs leading-[18px]"
            style={{ background: "rgba(248,113,113,0.10)", color: "hsl(0 94% 72%)" }}
          >
            {serverError}
          </div>
        )}

        {/* ===== VERIFY CODE STEP ===== */}
        {step === "verify-code" ? (
          <>
            {/* Title - no logo */}
            <h1 className="text-center font-bold" style={{ fontSize: "28px", lineHeight: "34px", color: "#F0F5FA" }}>
              Check your inbox
            </h1>

            <p className="mt-3 text-center" style={{ fontSize: "16px", lineHeight: "24px", color: "rgba(255, 255, 255, 0.7)" }}>
              Enter the code we just sent to {email}
            </p>

            <form onSubmit={handleVerifySubmit} className="mt-6" noValidate>
              {/* Server error above input with 16px gap */}
              {serverError && (
                <div
                  className="mb-4 rounded-xl px-4 py-3 text-sm leading-[22px]"
                  style={{ background: "rgba(248,113,113,0.10)", color: "hsl(0 94% 72%)" }}
                >
                  {serverError}
                </div>
              )}

              {/* Verify success */}
              {verifySuccess && (
                <div
                  className="mb-4 rounded-xl px-4 py-3 text-sm leading-[22px]"
                  style={{ background: "rgba(74,222,128,0.10)", color: "#4ade80" }}
                >
                  {verifySuccess}
                </div>
              )}

              {/* Resend success */}
              {resendSuccess && (
                <div
                  className="mb-4 rounded-xl px-4 py-3 text-sm leading-[22px]"
                  style={{ background: "rgba(113,240,246,0.10)", color: "#71F0F6" }}
                >
                  {resendSuccess}
                </div>
              )}

              <div>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => { setVerificationCode(e.target.value); if (codeError) setCodeError(""); }}
                  placeholder="Verification code"
                  autoComplete="one-time-code"
                  aria-invalid={!!codeError}
                  aria-describedby={codeError ? "code-error" : undefined}
                  className="w-full outline-none transition-colors duration-150"
                  style={inputStyle(!!codeError)}
                  onFocus={(e) => handleInputFocus(e, !!codeError)}
                  onBlurCapture={(e) => handleInputBlurStyle(e, !!codeError)}
                />
                {codeError && (
                  <p id="code-error" className="mt-1 text-sm leading-[22px]" style={{ color: "hsl(0 94% 72%)" }}>
                    {codeError}
                  </p>
                )}
              </div>

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
                {isSubmitting ? "Verifying..." : "Continue"}
              </button>
            </form>

            {/* Open mailbox & Resend */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <a
                href={`https://${email.split("@")[1] || ""}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center transition-all duration-150 ease-out"
                onMouseEnter={() => setHoveredBtn("openmail")}
                onMouseLeave={() => setHoveredBtn(null)}
                style={getSocialButtonStyle("openmail")}
              >
                Open {email.split("@")[1] || "mailbox"}
              </a>
              <button
                type="button"
                onClick={handleResendEmail}
                className="flex-1 flex items-center justify-center transition-all duration-150 ease-out"
                onMouseEnter={() => setHoveredBtn("resend")}
                onMouseLeave={() => setHoveredBtn(null)}
                style={getSocialButtonStyle("resend")}
              >
                Resend email
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
              <span style={{ fontSize: "14px", lineHeight: "22px", color: "rgba(255, 255, 255, 0.5)" }}>or</span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
            </div>

            {/* Continue with password */}
            <button
              type="button"
              onClick={handleContinueWithPassword}
              className="w-full flex items-center justify-center gap-2 transition-all duration-150 ease-out"
              onMouseEnter={() => setHoveredBtn("pw")}
              onMouseLeave={() => setHoveredBtn(null)}
              style={getSocialButtonStyle("pw")}
            >
              Continue with password
            </button>

            {/* Terms */}
            <p className="mt-4 text-center" style={{ fontSize: "14px", lineHeight: "22px", color: "rgba(255, 255, 255, 0.4)" }}>
              <a href="#" className="hover:underline transition-colors duration-150" style={{ color: "rgba(255, 255, 255, 0.4)" }}>Terms of Service</a>
              {"  |  "}
              <a href="#" className="hover:underline transition-colors duration-150" style={{ color: "rgba(255, 255, 255, 0.4)" }}>Privacy Policy</a>
            </p>
          </>
        ) : (
          <>
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
              {step === "initial"
                ? "Log in or sign up to start creating."
                : step === "email-login"
                  ? "Your ideas are waiting. Log in to create."
                  : "Create your account to get started."}
            </p>

            {/* ===== INITIAL STEP ===== */}
            {step === "initial" && (
              <>
                {/* Social buttons */}
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    onMouseEnter={() => setHoveredBtn("google")}
                    onMouseLeave={() => setHoveredBtn(null)}
                    className="w-full flex items-center justify-center gap-2"
                    style={getSocialButtonStyle("google")}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>

                  <button
                    type="button"
                    onClick={handleAppleLogin}
                    onMouseEnter={() => setHoveredBtn("apple")}
                    onMouseLeave={() => setHoveredBtn(null)}
                    className="w-full flex items-center justify-center gap-2"
                    style={getSocialButtonStyle("apple")}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                      <path d="M14.94 9.88c-.02-2.07 1.69-3.06 1.77-3.11-0.96-1.41-2.46-1.6-3-1.63-1.27-.13-2.49.75-3.14.75-.65 0-1.65-.73-2.71-.71-1.4.02-2.68.81-3.4 2.06-1.45 2.52-.37 6.25 1.04 8.3.69 1 1.51 2.12 2.59 2.08 1.04-.04 1.43-.67 2.69-.67 1.25 0 1.61.67 2.71.65 1.12-.02 1.83-1.02 2.51-2.02.79-1.16 1.12-2.28 1.14-2.34-.02-.01-2.18-.84-2.2-3.33v-.03zM12.87 3.54c.57-.69.96-1.65.85-2.61-.82.03-1.82.55-2.41 1.24-.53.61-.99 1.59-.87 2.53.92.07 1.86-.47 2.43-1.16z"/>
                    </svg>
                    Continue with Apple
                  </button>

                  <button
                    type="button"
                    onClick={handlePhoneLogin}
                    onMouseEnter={() => setHoveredBtn("phone")}
                    onMouseLeave={() => setHoveredBtn(null)}
                    className="w-full flex items-center justify-center gap-2"
                    style={getSocialButtonStyle("phone")}
                  >
                    <Phone size={18} />
                    Continue with Phone
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
                  <span style={{ fontSize: "14px", lineHeight: "22px", color: "rgba(255, 255, 255, 0.5)" }}>or</span>
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
                </div>

                {/* Email + inline password + Continue */}
                <form onSubmit={handleContinue} noValidate>
                  <div>
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
                      style={inputStyle(!!emailError)}
                      onFocus={(e) => handleInputFocus(e, !!emailError)}
                      onBlurCapture={(e) => handleInputBlurStyle(e, !!emailError)}
                    />
                    {emailError && (
                      <p id="email-error" className="mt-1 text-sm leading-[22px]" style={{ color: "hsl(0 94% 72%)" }}>
                        {emailError}
                      </p>
                    )}
                  </div>

                  {/* Inline password - smooth animation */}
                  <div
                    style={{
                      overflow: "hidden",
                      maxHeight: showInlinePassword ? "80px" : "0px",
                      opacity: showInlinePassword ? 1 : 0,
                      transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                      marginTop: showInlinePassword ? "12px" : "0px",
                    }}
                  >
                    <div className="relative">
                      <input
                        ref={inlinePasswordRef}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(""); }}
                        placeholder="8-18 characters (letters & numbers)"
                        aria-invalid={!!passwordError}
                        autoComplete="new-password"
                        className="w-full outline-none transition-colors duration-150"
                        style={{ ...inputStyle(!!passwordError), paddingRight: "48px" }}
                        onFocus={(e) => handleInputFocus(e, !!passwordError)}
                        onBlurCapture={(e) => handleInputBlurStyle(e, !!passwordError)}
                      />
                      <button
                        type="button"
                        onClick={() => { setShowPassword(!showPassword); inlinePasswordRef.current?.focus(); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors duration-150 hover:opacity-100"
                        style={{ color: "rgba(255, 255, 255, 0.7)" }}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        tabIndex={-1}
                      >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    </div>
                    {passwordError && (
                      <p className="mt-1 text-sm leading-[22px]" style={{ color: "hsl(0 94% 72%)" }}>
                        {passwordError}
                      </p>
                    )}
                  </div>

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
                    {isSubmitting ? "Sending..." : "Continue"}
                  </button>
                </form>
              </>
            )}

            {/* ===== EMAIL LOGIN STEP ===== */}
            {step === "email-login" && (
              <form onSubmit={handleLoginSubmit} className="mt-6" noValidate>
                <div>
                  <label
                    htmlFor="email-login"
                    className="block mb-2"
                    style={{ fontSize: "14px", lineHeight: "22px", color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Email address
                  </label>
                  <div
                    className="w-full flex items-center justify-between cursor-pointer transition-colors duration-150 hover:border-white/30"
                    style={{ ...inputStyle(false), cursor: "pointer" }}
                    onClick={handleBack}
                  >
                    <span style={{ color: "#F0F5FA" }}>{email}</span>
                    <span style={{ fontSize: "14px", color: "#71F0F6" }}>Change</span>
                  </div>
                </div>

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
                      placeholder="8-18 characters (letters & numbers)"
                      aria-invalid={!!passwordError}
                      aria-describedby={passwordError ? "password-error" : "password-helper"}
                      autoComplete="current-password"
                      className="w-full outline-none transition-colors duration-150"
                      style={{ ...inputStyle(!!passwordError), paddingRight: "48px" }}
                      onFocus={(e) => handleInputFocus(e, !!passwordError)}
                      onBlurCapture={(e) => handleInputBlurStyle(e, !!passwordError)}
                    />
                    <button
                      type="button"
                      onClick={() => { setShowPassword(!showPassword); passwordRef.current?.focus(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors duration-150 hover:opacity-100"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      tabIndex={-1}
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>

                  <div id="password-helper" className="flex items-center justify-between mt-2">
                    <span id="password-error" className="text-sm leading-[22px]" style={{ color: "hsl(0 94% 72%)" }}>
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

                <p className="mt-4 text-center" style={{ fontSize: "16px", lineHeight: "24px", color: "#A9B4C2" }}>
                  Don't have an account?{" "}
                  <a href="#" onClick={switchToSignup} className="hover:underline transition-all duration-150" style={{ color: "#71F0F6" }}>
                    Sign up
                  </a>
                </p>
              </form>
            )}

            {/* ===== EMAIL SIGNUP STEP ===== */}
            {step === "email-signup" && (
              <form onSubmit={handleSignupSubmit} className="mt-6" noValidate>
                <div>
                  <label
                    className="block mb-2"
                    style={{ fontSize: "14px", lineHeight: "22px", color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Email address
                  </label>
                  <div
                    className="w-full flex items-center justify-between cursor-pointer transition-colors duration-150 hover:border-white/30"
                    style={{ ...inputStyle(false), cursor: "pointer" }}
                    onClick={handleBack}
                  >
                    <span style={{ color: "#F0F5FA" }}>{email}</span>
                    <span style={{ fontSize: "14px", color: "#71F0F6" }}>Change</span>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="signup-password"
                    className="block mb-2"
                    style={{ fontSize: "14px", lineHeight: "22px", color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      ref={passwordRef}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(""); }}
                      onBlur={handlePasswordBlur}
                      placeholder="8-18 characters (letters & numbers)"
                      aria-invalid={!!passwordError}
                      autoComplete="new-password"
                      className="w-full outline-none transition-colors duration-150"
                      style={{ ...inputStyle(!!passwordError), paddingRight: "48px" }}
                      onFocus={(e) => handleInputFocus(e, !!passwordError)}
                      onBlurCapture={(e) => handleInputBlurStyle(e, !!passwordError)}
                    />
                    <button
                      type="button"
                      onClick={() => { setShowPassword(!showPassword); passwordRef.current?.focus(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors duration-150 hover:opacity-100"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      tabIndex={-1}
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="mt-1 text-sm leading-[22px]" style={{ color: "hsl(0 94% 72%)" }}>
                      {passwordError}
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2"
                    style={{ fontSize: "14px", lineHeight: "22px", color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      ref={confirmPasswordRef}
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); if (confirmPasswordError) setConfirmPasswordError(""); }}
                      onBlur={handleConfirmPasswordBlur}
                      placeholder="Re-enter your password"
                      aria-invalid={!!confirmPasswordError}
                      autoComplete="new-password"
                      className="w-full outline-none transition-colors duration-150"
                      style={{ ...inputStyle(!!confirmPasswordError), paddingRight: "48px" }}
                      onFocus={(e) => handleInputFocus(e, !!confirmPasswordError)}
                      onBlurCapture={(e) => handleInputBlurStyle(e, !!confirmPasswordError)}
                    />
                    <button
                      type="button"
                      onClick={() => { setShowConfirmPassword(!showConfirmPassword); confirmPasswordRef.current?.focus(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors duration-150 hover:opacity-100"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                  {confirmPasswordError && (
                    <p className="mt-1 text-sm leading-[22px]" style={{ color: "hsl(0 94% 72%)" }}>
                      {confirmPasswordError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full flex items-center justify-center gap-2 transition-all duration-150 ease-out hover:brightness-110 active:translate-y-px disabled:opacity-40 disabled:cursor-not-allowed"
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
                  {isSubmitting ? "Creating account..." : "Sign up"}
                </button>

                <p className="mt-4 text-center" style={{ fontSize: "16px", lineHeight: "24px", color: "#A9B4C2" }}>
                  Already have an account?{" "}
                  <a href="#" onClick={switchToLogin} className="hover:underline transition-all duration-150" style={{ color: "#71F0F6" }}>
                    Log in
                  </a>
                </p>
              </form>
            )}

            {/* Terms */}
            <p className="mt-2 text-center" style={{ fontSize: "14px", lineHeight: "22px", color: "rgba(255, 255, 255, 0.4)" }}>
              By continuing, you agree to our{" "}
              <a href="#" className="hover:underline transition-colors duration-150" style={{ color: "rgba(255, 255, 255, 0.4)" }}>Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="hover:underline transition-colors duration-150" style={{ color: "rgba(255, 255, 255, 0.4)" }}>Privacy Policy</a>.
            </p>
          </>
        )}
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
