"use client";

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
// Js Cookie
import Cookies from 'js-cookie';
// Next Intl
import { useLocale } from 'next-intl';
//services
import checkAuthentication from '@/services/sso/checkAuthentication'
import getRedirectParam from '@/src/functions/getRedirectParam';


function Page() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const locale = useLocale();
  

  useEffect(() => {
    const runSSO = async () => {
      const TOKEN = Cookies.get('AuthToken');
      const browserID = localStorage.getItem('BROWSER_ID');
      const browserName = navigator.userAgent;

      if (!browserID || !browserName) {
        window.location.href = getRedirectParam(`/${locale}/auth`, redirectTo);
        return;
      }

      const data = {
        browser: browserName,
        browserID: browserID,
        callbackURL: redirectTo ?? process.env.NEXT_PUBLIC_DEFAULT_REDIRECT_URL,
        token: TOKEN,
      };

      checkAuthentication(data)
        .then((res) => {
          window.location.href = `${res.data.redirectURL}?tempToken=${res.data.data}`;
        })
        .catch(() => {
          window.location.href = getRedirectParam(`/${locale}/auth`, redirectTo);
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
    </div>
  )
}

export default Page