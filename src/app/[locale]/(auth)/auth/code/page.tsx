"use client"
import React, { useEffect, useRef, useState } from 'react'
// Components
import { OtpInput } from '../_components/OtpInput';
import Button from '@/src/components/Button';
// Iconsax
import { ArrowLeft, ArrowLeft2, Send2 } from 'iconsax-reactjs';
// Next Intl
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/src/i18n/routing';
// Redux
import { clearOtpLength } from '@/store/features/authSlice'
import { useDispatch } from 'react-redux';

function Page() {
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const OtpInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations('Auth.code');
  const locale = useLocale();
  const isEnglish = locale === 'en';

  useEffect(() => {
    dispatch(clearOtpLength());
    const savedPhone = sessionStorage.getItem('userPhone')?.replaceAll("+98", "0");
    if (savedPhone) {
      setPhoneNumber(savedPhone);
    }
  }, []);

  const handleSubmit = () => {
    console.log("handleSubmit");
  }

  return (
    <div className="w-full">
      <p className='text-xs text-tertiary-600 mb-5'>
        {t('enterInfo', { phoneNumber })} {/* Pass phoneNumber to the translation */}
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
      <Button
        variant='outline'
        className='mt-8'
        onClick={() => router.push("/auth/telegram")}
      >
        <div className='w-full h-full font-normal flex items-center justify-between'>
          <Send2 size={20} className={`${!isEnglish && "[transform:rotateY(180deg)]"}`} />
          <span className='text-sm'>{t('getCodeViaTelegram')}</span>
          <ArrowLeft2 size={20} className={`${isEnglish && "rotate-180"}`} />
        </div>
      </Button>
    </div>
  )
}

export default Page;