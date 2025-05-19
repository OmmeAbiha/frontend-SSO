"use client"
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
// i18n
import { useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
// Formik
import { useFormik } from 'formik'
import * as Yup from 'yup'
// Component
import TextBox from '@/src/components/inputs/TextBox';
import Button from '@/src/components/Button';
import CountryPicker from './_components/CountryPicker';
import ResponsiveDialogDrawer from '@/src/components/ResponsiveDialogDrawer';
// Iconsax
import { ArrowLeft, SearchNormal1 } from 'iconsax-reactjs';
// Framer Motion
import { motion } from 'framer-motion';
// Static
import { enums as countryData } from '@/static/countryData';


function Page() {
  const router = useRouter();
  const t = useTranslations('Auth');
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const [open, setOpen] = useState(false);
  const [countrySelect, setCountrySelect] = useState("IR-98");
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const selectedCountry = countryData.find((country) => country.id === countrySelect);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required(t('validation.required')) // Use dynamic translation
      .matches(/^(0)?[0-9]{10}$/, t('validation.invalidPhone')), // Allow numbers with or without leading 0
  });

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
    },
    validationSchema,
    onSubmit: values => {
      let phoneNumber = values.phoneNumber;
      if (phoneNumber.startsWith('0')) {
        phoneNumber = phoneNumber.slice(1); // Remove leading 0 if present
      }
      const fullPhoneNumber = `${selectedCountry?.dial_code || ''}${phoneNumber}`;

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('userPhone', fullPhoneNumber);
      }

      const data = {
        phoneNumber: fullPhoneNumber,
        country: selectedCountry
      };

      console.log(data);
      router.push(`/auth/telegram`);
    }
  });

  useEffect(() => {
    phoneNumberInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (open) return;
    setIsActiveSearch(false);
  }, [open])

  return (
    <>
      <form className='flex flex-col w-full gap-y-4' onSubmit={formik.handleSubmit}>
        <div className='flex flex-col w-full'>
          <p className='text-xs text-tertiary-600 mb-5'>{t('enterInfo')}</p>
          <div className={`flex ${isEnglish && "flex-row-reverse"}`}>
            <TextBox
              id='phoneNumber'
              label={t('phoneLabel')}
              type="phone"
              name="phoneNumber"
              className='w-full'
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              error={formik.errors.phoneNumber}
              touched={formik.touched.phoneNumber}
              ref={phoneNumberInputRef}
            />
            <span className='text-tertiary-400 flex pt-3.5 mx-1'>-</span>

            <div
              onClick={() => setOpen(true)}
              className='hover:border-primary-main transition-colors duration-300 cursor-pointer relative h-12 flex items-center w-24 py-2 px-3 border border-border-2 rounded-lg caret-primary-medium focus:outline-none text-sm bg-background'>
              <span className={`absolute bg-background rounded-sm px-1 -top-2 ${isEnglish ? 'left-3' : 'right-3'} pointer-events-none transition-all duration-500 font-medium text-[11px] text-tertiary-600`}>
                {t('codeLabel')}
              </span>
              <div className={`${isEnglish ? "flex flex-row-reverse" : "flex"} gap-1`}>
                <span>{selectedCountry?.dial_code_without_plus}</span>
                <span>+</span>
              </div>
            </div>
            <ResponsiveDialogDrawer
              open={open}
              setOpen={setOpen}
              title={t('countryPicker.title')}
              drawerProps={{
                contentClassName: 'bg-background px-3 py-4 md:p-5 rounded-t-3xl h-[70%]'
              }}
              headerContent={
                <div
                  onClick={() => setIsActiveSearch(!isActiveSearch)}
                  className={`fcc gap-1 text-xs h-8  cursor-pointer  transition-colors duration-300 
                    ${isEnglish ? 'ml-2' : 'mr-2'}
                    ${isActiveSearch ? 'text-secondary-400' : 'text-tertiary-900 hover:text-secondary-400'}
                    `}
                >
                  <motion.div
                    animate={
                      isActiveSearch
                        ? {
                          rotate: [0, 10, -10, 5, -5, 0],
                          scale: [1, 1.15, 1],
                        }
                        : {
                          rotate: 0,
                          scale: 1,
                        }
                    }
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <SearchNormal1 size="18" />
                  </motion.div>
                  <span>{t('countryPicker.btnSearch')}</span>
                </div>
              }
            >
              <CountryPicker
                countrySelect={countrySelect}
                setCountrySelect={setCountrySelect}
                isActiveSearch={isActiveSearch}
                setIsOpen={setOpen}
              />
            </ResponsiveDialogDrawer>
          </div>
        </div>
        <Button
          title={t('continueButton')}
          type='submit'
          iconPosition='end'
          icon={<ArrowLeft className={`${isEnglish && "rotate-180"}`} />}
        />
      </form>

      <p className='text-xs text-tertiary-500 mt-5 leading-5'>
        {t.rich('termsText', {
          link: (chunks) => (
            <Link
              href="/help-center/general-policy"
              target="_blank"
              className="text-secondary-400 hover:underline transition-all duration-300"
            >
              {chunks}
            </Link>
          )
        })}
      </p>
    </>
  );
}

export default Page;