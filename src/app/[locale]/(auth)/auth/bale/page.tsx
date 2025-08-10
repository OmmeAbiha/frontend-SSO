"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation';
// Components
import Button from '@/src/components/Button';
import { OtpInput } from '../_components/OtpInput';
import { InfoBox } from '@/src/components/InfoBox';
// Iconsax
import { ArrowLeft, ArrowLeft2, SmsTracking } from 'iconsax-reactjs';
// Next Intl
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/src/i18n/routing';
// Redux
import { clearOtpLength } from '@/store/features/authSlice'
import { useDispatch } from 'react-redux';
//services
import verifyOTP from '@/services/sso/verifyOTP'
import OtpResendTimer from '@/src/components/OtpResendTimer';
import passwordChangeVerifyOTP from '@/services/sso/passwordChangeVerifyOTP'
// Functions
import getRedirectParam from '@/src/functions/getRedirectParam';


function Page() {
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hasClickedBotLink, setHasClickedBotLink] = useState(false);
  const OtpInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations('Auth.bale');
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

  useEffect(() => {
    dispatch(clearOtpLength());
    const savedPhone = sessionStorage.getItem('userPhone')?.replaceAll("+98", "0");
    if (savedPhone) setPhoneNumber(savedPhone);
  }, []);

  const handleOtpForgetPasswordSubmit = (val?: string) => {
    const otpValue = val ?? otp;
    if (!otpValue || otpValue.length !== 6) return;
    setIsLoading(true);
    passwordChangeVerifyOTP(getOtpRequestData({ otp: otpValue, otpType: 1 }))
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
    verifyOTP(getOtpRequestData({ otp: otpValue, otpType: 1 }))
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
    window.open("https://ble.ir/@FuleStationbot", "_blank");
    return true;
  };

  return (
    <div className="w-full">
      {!hasClickedBotLink ? (
        <>
          <InfoBox
            type="info"
            title={t('titleInfo')}
            message={t('pleaseRegisterThenReturnInfo')}
            className='mb-5'
          />
          <Button
            onClick={() => {
              window.open("https://ble.ir/@FuleStationbot", "_blank");
              setHasClickedBotLink(true);
            }}
            title={t('goToBaleBotBtn')}
            iconPosition='end'
            icon={<ArrowLeft className={`${isEnglish && "rotate-180"}`} />}
          />
        </>
      ) : (
        <>
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
              onResend={handleResendOtp}
            />

            <Button
              title={t('OTPConfirmationBtn')}
              type='submit'
              iconPosition='end'
              icon={<ArrowLeft className={`${isEnglish && "rotate-180"}`} />}
              loading={isLoading}
            />
          </form>
        </>
      )}

      <div className='flex flex-col w-full gap-3 mt-8'>
        <Button
          variant='outline'
          onClick={() => {
            const query = new URLSearchParams();

            if (mode === "login" || mode === "forget-password") {
              query.set("mode", mode);
            }

            if (redirectTo) {
              query.set("redirectTo", redirectTo);
            }

            const url = `/auth/code${query.toString() ? `?${query.toString()}` : ""}`;
            router.push(url);
          }}
        >
          <div className='w-full h-full flex font-normal items-center justify-between'>
            <SmsTracking size={20} className={`${!isEnglish && "[transform:rotateY(180deg)]"}`} />
            <span className='text-sm'>{t('getCodeViaSms')}</span>
            <ArrowLeft2 size={20} className={`${isEnglish && "rotate-180"}`} />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default Page;