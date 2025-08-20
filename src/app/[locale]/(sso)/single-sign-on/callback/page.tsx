"use client"
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
// Js Cookie
import Cookies from 'js-cookie';
// Next Intl
import { useLocale } from 'next-intl';
//services
import checkAuthentication from '@/services/sso/checkAuthentication'
// Functions
import getRedirectParam from '@/src/functions/getRedirectParam';
import { User } from 'iconsax-reactjs';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import lotUser from '@/public/lottie/NQuzUdBFFi.json';

function Page() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const locale = useLocale();

  useEffect(() => {
    const runSSO = async () => {
      const TOKEN = Cookies.get('TOKEN');
      const browserID = localStorage.getItem('BROWSER_ID');
      const browserName = navigator.userAgent;

      console.log(navigator.userAgent)

      if (!TOKEN || !browserID || !browserName) {
        // window.location.href = getRedirectParam(`/${locale}/auth`, redirectTo);
        return;
      }

      const data = {
        browser: browserName,
        browserID: browserID,
        callbackURL: redirectTo,
        token: TOKEN,
      };

      checkAuthentication(data)
        .then((res) => {
          console.log(res.data.data)
          const tempToken = res.data.data;
          // window.location.href = `${redirectTo}?tempToken=${tempToken}`;
        })
        .catch(() => {
          // window.location.href = getRedirectParam(`/${locale}/auth`, redirectTo);
        })
    }

    runSSO();
  }, [redirectTo]);

  return (
    <div className='w-screen h-screen fcc'>
      {/* <div className='w-full relative pt-1'>
        <svg viewBox="0 0 250 30">
          <line x1="10" y1="15" x2="240" y2="15" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeDasharray="5, 5" strokeDashoffset="0">
            <animate attributeName="stroke-dashoffset" attributeType="XML" from="0" to="20" dur="2s" repeatCount="indefinite" />
          </line>
        </svg>
      </div> */}

      {/* <div className='fcc flex-col bg-tertiary-200 rounded-lg'>
        <div className='overflow-hidden w-[150px] fcc'>
          <div className='min-w-[400px]'>
            <DotLottieReact
              src="/lottie/a6MDJ6FAaH.json"
              loop
              autoplay
              className='w-[400px]'
            />
          </div>
        </div>
      </div> */}

      {/* <div className='w-full relative pt-1'>
        <svg viewBox="0 0 250 30">
          <line x1="10" y1="15" x2="240" y2="15" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeDasharray="5, 5" strokeDashoffset="0">
            <animate attributeName="stroke-dashoffset" attributeType="XML" from="0" to="20" dur="2s" repeatCount="indefinite" />
          </line>
        </svg>
      </div> */}
    </div>
  )
}

export default Page