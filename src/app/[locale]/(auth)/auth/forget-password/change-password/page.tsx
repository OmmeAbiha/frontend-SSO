"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from '@/i18n/routing';
// Next Intl
import { useTranslations, useLocale } from 'next-intl';
// Formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
// Components
import Button from '@/src/components/Button';
// Iconsax
import { ArrowLeft } from 'iconsax-reactjs';
import { useSearchParams } from 'next/navigation';
import PasswordTextBox from '@/src/components/inputs/PasswordTextBox';
//Services
import passwordChangeSavePassword from '@/services/sso/passwordChangeSavePassword'
// Functions
import getRedirectParam from '@/src/functions/getRedirectParam';

function Page() {
  const router = useRouter();
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const t = useTranslations('Auth.changePassword');
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    password: Yup.string()
      .required(t('validation.required'))
      .min(8, t('validation.minLength'))
      .matches(/[A-Z]/, t('validation.uppercase'))
      .matches(/[a-z]/, t('validation.lowercase'))
      .matches(/[0-9]/, t('validation.number'))
      .matches(/[@$!%*?&#]/, t('validation.specialChar'))
      .matches(/^[A-Za-z0-9@$!%*?&#]+$/, t('validation.validChars')),
    confirmPassword: Yup.string()
      .required(t('validation.required'))
      .oneOf([Yup.ref('password')], t('validation.passwordsMustMatch')),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: values => {
      setIsLoading(true);

      const data = {
        data: values.password
      };

      passwordChangeSavePassword(data)
        .then((res) => {
          console.log(res)
          router.push(getRedirectParam("/auth/password", redirectTo))
        })
        .catch(() => {
          setIsLoading(false);
        })
    }
  });

  useEffect(() => {
    passwordInputRef.current?.focus();
  }, []);

  return (
    <div className="w-full">
      <p className='text-xs text-tertiary-600 mb-5'>
        {t('passwordStrengthHint')}
      </p>
      <form className='flex flex-col w-full gap-y-4' onSubmit={formik.handleSubmit}>
        <div className='flex flex-col w-full gap-5'>
          <div className={`flex ${isEnglish && "flex-row-reverse"}`}>
            <PasswordTextBox
              id='password'
              label={t('newPasswordLabel')}
              name="password"
              className='w-full'
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
              touched={formik.touched.password}
              ref={passwordInputRef}
            />
          </div>
          <div className={`flex ${isEnglish && "flex-row-reverse"}`}>
            <PasswordTextBox
              id='confirmPassword'
              label={t('confirmNewPasswordLabel')}
              name="confirmPassword"
              className='w-full'
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              error={formik.errors.confirmPassword}
              touched={formik.touched.confirmPassword}
            />
          </div>
        </div>
        <Button
          title={t('continue')}
          type='submit'
          iconPosition='end'
          icon={<ArrowLeft className={`${isEnglish && "rotate-180"}`} />}
          loading={isLoading}
        />
      </form>
    </div>
  );
}

export default Page;