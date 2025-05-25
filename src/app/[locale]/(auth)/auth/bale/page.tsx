"use client"
import React, { useEffect, useRef, useState } from 'react'
// Components
import Button from '@/src/components/Button';
import { OtpInput } from '../_components/OtpInput';
import { InfoBox } from '@/src/components/InfoBox';
// Iconsax
import { ArrowLeft, ArrowLeft2, Send2, SmsTracking } from 'iconsax-reactjs';
// Next Intl
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/src/i18n/routing';
// Redux
import { clearOtpLength } from '@/store/features/authSlice'
import { useDispatch } from 'react-redux';

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

  useEffect(() => {
    dispatch(clearOtpLength());
    const savedPhone = sessionStorage.getItem('userPhone')?.replaceAll("+98", "0");
    if (savedPhone) {
      setPhoneNumber(savedPhone);
    }
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log("handleSubmit:", otp);
    // اینجا می‌تونی otp رو بفرستی به سرور
  }

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
              window.open("https://web.bale.ai/@your_bale_bot_username", "_blank");
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
            {t('enterInfo', { phoneNumber })}
          </p>
          <form className='flex flex-col w-full gap-y-4' onSubmit={handleSubmit}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              onComplete={() => {
                OtpInputRef.current?.blur();
                handleSubmit();
              }}
              ref={OtpInputRef}
            />
            <Button
              title={t('OTPConfirmationBtn')}
              type='submit'
              iconPosition='end'
              icon={<ArrowLeft className={`${isEnglish && "rotate-180"}`} />}
            />
          </form>
        </>
      )}

      <div className='flex flex-col w-full gap-3 mt-8'>
        <Button
          variant='outline'
          onClick={() => router.push("/auth/code")}
        >
          <div className='w-full h-full flex font-normal items-center justify-between'>
            <SmsTracking size={20} className={`${!isEnglish && "[transform:rotateY(180deg)]"}`} />
            <span className='text-sm'>{t('getCodeViaSms')}</span>
            <ArrowLeft2 size={20} className={`${isEnglish && "rotate-180"}`} />
          </div>
        </Button>
        <Button
          variant='outline'
          onClick={() => router.push("/auth/telegram")}
        >
          <div className='w-full h-full font-normal flex items-center justify-between'>
            <Send2 size={20} className={`${!isEnglish && "[transform:rotateY(180deg)]"}`} />
            <span className='text-sm'>{t('getCodeViaTelegram')}</span>
            <ArrowLeft2 size={20} className={`${isEnglish && "rotate-180"}`} />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default Page;