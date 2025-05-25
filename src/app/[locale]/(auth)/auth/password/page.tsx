"use client"
import React, { useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/routing';
// Next Intl
import { useTranslations, useLocale } from 'next-intl';
// Formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
// Components
import TextBox from '@/src/components/inputs/TextBox';
import Button from '@/src/components/Button';
import CustomLink from '@/src/components/CustomLink';
// Iconsax
import { ArrowLeft, ArrowLeft2, Send2, SmsTracking } from 'iconsax-reactjs';

function Page() {
    const router = useRouter();
    const locale = useLocale();
    const isEnglish = locale === 'en';
    const t = useTranslations('Auth.password');
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const validationSchema = Yup.object({
        password: Yup.string()
            .required(t('validation.required'))
            .min(8, t('validation.minLength'))
            .matches(/[A-Z]/, t('validation.uppercase'))
            .matches(/[a-z]/, t('validation.lowercase'))
            .matches(/[0-9]/, t('validation.number'))
            .matches(/[@$!%*?&#]/, t('validation.specialChar'))
            .matches(/^[A-Za-z0-9@$!%*?&#]+$/, t('validation.validChars')),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema,
        onSubmit: values => {
            const data = {
                password: values,
                country: values
            };

            console.log(data);

            // router.push(`/auth?callbackUrl=${encodeURIComponent('/checkout')}`)
            // router.push(`/auth/change-password`);
        }
    });

    useEffect(() => {
        passwordInputRef.current?.focus();
    }, []);

    return (
        <>
            <form className='flex flex-col w-full gap-y-4' onSubmit={formik.handleSubmit}>
                <div className='w-full'>
                    <div className='flex flex-col w-full'>
                        <div className={`flex ${isEnglish && "flex-row-reverse"}`}>
                            <TextBox
                                id='password'
                                label={t('passwordLabel')}
                                type="phone"
                                name="password"
                                className='w-full'
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                error={formik.errors.password}
                                touched={formik.touched.password}
                                ref={passwordInputRef}
                            />
                        </div>
                    </div>
                    {/* <CustomLink className='text-xs text-secondary-400' href="/auth/forget-password/mobile-verification">{t('forgotPassword')}</CustomLink> */}
                </div>
                <Button
                    title={t('continue')}
                    type='submit'
                    iconPosition='end'
                    icon={<ArrowLeft className={`${isEnglish && "rotate-180"}`} />}
                />
            </form>
            <div className='flex flex-col w-full gap-3 mt-8'>
                <Button
                    variant='outline'
                    onClick={() => router.push("/auth/code")}
                >
                    <div className='w-full h-full font-normal flex items-center justify-between'>
                        <SmsTracking size={20} className={`${!isEnglish && "[transform:rotateY(180deg)]"}`} />
                        <span className='text-sm'>{t('smsOption')}</span>
                        <ArrowLeft2 size={20} className={`${isEnglish && "rotate-180"}`} />
                    </div>
                </Button>
                <Button
                    variant='outline'
                    onClick={() => router.push("/auth/telegram")}
                >
                    <div className='w-full h-full flex font-normal items-center justify-between'>
                        <Send2 size={20} className={`${!isEnglish && "[transform:rotateY(180deg)]"}`} />
                        <span className='text-sm'>{t('telegramOption')}</span>
                        <ArrowLeft2 size={20} className={`${isEnglish && "rotate-180"}`} />
                    </div>
                </Button>
                <Button
                    variant='outline'
                    onClick={() => router.push("/auth/bale")}
                >
                    <div className='w-full h-full flex font-normal items-center justify-between'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <g clipPath="url(#clip0_4418_9829)">
                                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#FDB713" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round" />
                                <path d="M7.75 11.9999L10.58 14.8299L16.25 9.16992" stroke="#FDB713" strokeWidth="2.8" stroke-linecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_4418_9829">
                                    <rect width="24" height="24" fill="red" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span className='text-sm'>{t('baleOption')}</span>
                        <ArrowLeft2 size={20} className={`${isEnglish && "rotate-180"}`} />
                    </div>
                </Button>
            </div>
        </>
    );
}

export default Page;