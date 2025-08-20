"use client"

import React, { useEffect, useRef, useState } from 'react'
// Components
import { OtpInput } from '../_components/OtpInput';
import Button from '@/src/components/Button';
import OtpResendTimer from '@/src/components/OtpResendTimer';
// Iconsax
import { ArrowLeft, ArrowLeft2 } from 'iconsax-reactjs';
// Next Intl
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/src/i18n/routing';
// Redux
import { clearOtpLength } from '@/store/features/authSlice'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
// Services
import verifyOTP from '@/services/sso/verifyOTP'
import checkMobile from '@/services/sso/checkMobile'
import sendOTPForRegisteredUser from '@/services/sso/sendOTPForRegisteredUser'
import passwordChangeCheckMobile from '@/services/sso/passwordChangeCheckMobile'
import passwordChangeVerifyOTP from '@/services/sso/passwordChangeVerifyOTP'
// Functions
import getRedirectParam from '@/src/functions/getRedirectParam';

function Page() {
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const OtpInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations('Auth.code');
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const mode = searchParams.get('mode') ?? 'register';
  const [otpError, setOtpError] = useState({
    invalid: false,
    message: '',
  });

  // Helper to get OTP request data
  const getOtpRequestData = (extra: Record<string, any> = {}) => {
    const mobile = sessionStorage.getItem('userPhone');
    const country = sessionStorage.getItem('country')!;
    const browserID = localStorage.getItem('BROWSER_ID');
    return {
      browser: navigator.userAgent,
      browserID,
      callbackURL: redirectTo ?? process.env.NEXT_PUBLIC_DEFAULT_REDIRECT_URL,
      mobile,
      country: JSON.parse(country),
      ...extra,
    };
  };

  const handleSendOTP = () => {
    sendOTPForRegisteredUser(getOtpRequestData())
      .catch(console.log);
  };

  const handleSendOTPForgetPassword = () => {
    passwordChangeCheckMobile(getOtpRequestData())
      .catch(console.log);
  };

  useEffect(() => {
    dispatch(clearOtpLength());
    const savedPhone = sessionStorage.getItem('userPhone')?.replaceAll("+98", "0");
    if (savedPhone) setPhoneNumber(savedPhone);
    if (mode === "login") handleSendOTP();
    if (mode === "forget-password") handleSendOTPForgetPassword();
  }, []);

  const handleOtpForgetPasswordSubmit = (val?: string) => {
    const otpValue = val ?? otp;
    if (!otpValue || otpValue.length !== 6) return;
    setIsLoading(true);
    passwordChangeVerifyOTP(getOtpRequestData({ otp: otpValue, otpType: 0 }))
      .then(() => router.push(getRedirectParam("/auth/forget-password/change-password", redirectTo)))
      .catch((err) => {
        setIsLoading(false);
        if (err.status === 400) {
          setOtpError({
            invalid: true,
            message: 'کد وارد شده نامعتبر است',
          });
        }
      });
  };

  const handleOtpSubmit = (val?: string) => {
    const otpValue = val ?? otp;
    if (!otpValue || otpValue.length !== 6) return;
    setIsLoading(true);
    verifyOTP(getOtpRequestData({ otp: otpValue, otpType: 0 }))
      .then((res) => {
        window.location.href = `${res.data.redirectURL}?tempToken=${res.data.data.jwtBrowser}`;
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.status === 400) {
          setOtpError({
            invalid: true,
            message: 'کد وارد شده نامعتبر است',
          });
        }
      });
  };

  const handleResendOtp = async () => {
    // const res = await checkMobile(getOtpRequestData());
    const res = await sendOTPForRegisteredUser(getOtpRequestData());
    return res;
  };

  const handleResendOtpForgetPassword = async () => {
    const res = await passwordChangeCheckMobile(getOtpRequestData());
    return res;
  };

  return (
    <div className="w-full">
      <p className='text-xs text-tertiary-600 mb-5'>
        {t('enterInfo', { phoneNumber: "0" + phoneNumber })}
      </p>
      <form
        className='flex flex-col w-full gap-y-4'
        onSubmit={(e) => {
          e.preventDefault();
          if (mode === 'register' || mode === 'login') {
            handleOtpSubmit();
          } else if (mode === 'forget-password') {
            handleOtpForgetPasswordSubmit();
          }
        }}
      >
        <div>
          <OtpInput
            value={otp}
            onChange={setOtp}
            onComplete={(val) => {
              OtpInputRef.current?.blur();
              if (mode === 'register' || mode === 'login') {
                handleOtpSubmit(val);
              } else if (mode === 'forget-password') {
                handleOtpForgetPasswordSubmit(val);
              }
            }}
            ref={OtpInputRef}
            isError={otpError.invalid && otp.length === 6}
          />
          {otpError.invalid && otp.length === 6 && (
            <div className="mt-1">
              <span className="text-danger-300 font-bold text-[10px] p-0.5 px-2 bg-danger-300/10 rounded-[4px]">
                {otpError.message}
              </span>
            </div>
          )}
        </div>

        <OtpResendTimer
          initialTime={120}
          resendText={t("resendCode")}
          countdownText={(time) => t("resendIn", { time })}
          onResend={async () => {
            if (mode === 'forget-password') {
              return await handleResendOtpForgetPassword();
            }
            return await handleResendOtp();
          }}
        />

        <Button
          title={t('OTPConfirmationBtn')}
          type='submit'
          iconPosition='end'
          icon={<ArrowLeft className={`${isEnglish && "rotate-180"}`} />}
          loading={isLoading}
        />
      </form>
      <div className='flex flex-col w-full gap-3'>
        <Button
          variant='outline'
          className='mt-8'
          onClick={() => {
            const query = new URLSearchParams();

            if (mode === "login" || mode === "forget-password") {
              query.set("mode", mode);
            }

            if (redirectTo) {
              query.set("redirectTo", redirectTo);
            }

            const url = `/auth/bale${query.toString() ? `?${query.toString()}` : ""}`;
            router.push(url);
          }}
        >
          <div className='w-full h-full flex font-normal items-center justify-between'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <g clipPath="url(#clip0_4418_9829)">
                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#FDB713" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7.75 11.9999L10.58 14.8299L16.25 9.16992" stroke="#FDB713" strokeWidth="2.8" strokeLinecap="round" />
              </g>
              <defs>
                <clipPath id="clip0_4418_9829">
                  <rect width="24" height="24" fill="red" />
                </clipPath>
              </defs>
            </svg>
            <span className='text-sm'>{t('getCodeViaBale')}</span>
            <ArrowLeft2 size={20} className={`${isEnglish && "rotate-180"}`} />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default Page;