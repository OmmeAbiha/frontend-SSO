"use client"
import React from 'react'
// Assets
import illuminatedThoughts from "@/public/mock-images/illuminatedThoughts.png"


import Logo from "@/public/common/logo/favicon-70x87.png"
import Typography from "@/public/common/logo/Typography.png"
import { motion } from 'framer-motion';
import LocaleSwitcherMenu from '@/src/components/LocaleSwitcherMenu';
import DarkModeToggleSwitch from '@/src/components/DarkModeToggleSwitch';
import Image from 'next/image';
import AnimationLogin from './AnimationLogin'

function BaseLayoutAuth({ children }: { children: React.ReactNode }) {

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className='flex gap-8 w-full h-screen p-8'>
      <AnimationLogin />
      <div className='w-full lg:w-[40%] h-full fcc flex-col '>
        <motion.div
          className='w-[290px] sm:w-[320px] h-full fcc flex-col'
          initial="hidden"
          animate="visible"
          variants={animationVariants}
        >
          <div className='w-full mb-10 text-xs flex gap-2'>
            <Image
              unoptimized
              src={Logo}
              alt='login image'
              className='object-contain w-[60px] h-auto'
              width={70}
              height={87}
            />
            <Image
              unoptimized
              src={Typography}
              alt='login image'
              className='object-contain w-[160px] h-auto'
              width={260}
              height={96}
            />
          </div>
          {children}
          <div className='w-full mt-5 flex gap-2'>
            <LocaleSwitcherMenu />
            <DarkModeToggleSwitch
              className="w-full"
            />
          </div>
        </motion.div>
      </div>
      <div className='w-[60%] h-full hidden lg:flex'>
        <div className='w-full h-full rounded-3xl overflow-hidden fcc'>
          <Image
            unoptimized
            src={illuminatedThoughts}
            alt='login image'
            className='object-contain w-full h-full aspect-square'
            width={900}
            height={900}
          />
        </div>
      </div>
    </div>
  )
}

export default BaseLayoutAuth