import Image from 'next/image'
import React from 'react'
import images_1 from "@/public/mock-images/lampWithClosedWings.png"
import images_2 from "@/public/mock-images/lampWithOpenWings.png"
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store'

function AnimationLogin() {
    const locale = useLocale();
    const isEnglish = locale === 'en';
    //redux
    const OtpLength = useSelector((state: RootState) => state.auth.OtpLength);

    return (
        <>
            <motion.div
                className={`absolute w-[min(38vw,75vh)] h-[min(62vh,31vw)] top-[13%] ${!isEnglish ? 'right-[30%]' : 'left-[30%]'} ${OtpLength >= 1 ? "" : "grayscale"} hidden lg:block`}
                initial={{ y: -10 }}
                animate={{ y: 10 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 3.5,
                }}
            >
                <Image
                    unoptimized
                    src={images_2}
                    alt='login image'
                    className='object-contain -rotate-12 aspect-square w-[min(18vw,55vh)]'
                    width={260}
                    height={96}
                />
            </motion.div>
            <motion.div
                className={`absolute top-[5%] ${!isEnglish ? 'left-[5%]' : 'right-[5%]'} -rotate-45 ${OtpLength >= 2 ? "" : "grayscale"} hidden lg:block`}
                initial={{ y: -10 }}
                animate={{ y: 10 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 4.5,
                }}
            >
                <Image
                    unoptimized
                    src={images_2}
                    alt='login image'
                    className='object-contain -rotate-12'
                    width={50}
                    height={50}
                />
            </motion.div>
            <motion.div
                className={`absolute top-[80%] ${!isEnglish ? 'right-[10%]' : 'left-[10%]'} ${OtpLength >= 3 ? "" : "grayscale"} hidden lg:block`}
                initial={{ y: -15 }}
                animate={{ y: 10 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 4.5,
                }}
            >
                <Image
                    unoptimized
                    src={images_2}
                    alt='login image'
                    className='object-contain -rotate-12'
                    width={100}
                    height={100}
                />
            </motion.div>
            <motion.div
                className={`absolute top-[10%] ${!isEnglish ? 'right-[5%]' : 'left-[5%]'} ${OtpLength >= 4 ? "" : "grayscale"} hidden lg:block`}
                initial={{ y: -10 }}
                animate={{ y: 10 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 3,
                }}
            >
                <Image
                    unoptimized
                    src={images_1}
                    alt='login image'
                    className='object-contain -rotate-12'
                    width={100}
                    height={100}
                />
            </motion.div>
            <motion.div
                className={`absolute top-[50%] ${!isEnglish ? 'left-[3%]' : 'right-[3%]'} ${OtpLength >= 5 ? "" : "grayscale"} hidden lg:block`}
                initial={{ y: -10 }}
                animate={{ y: 10 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 5,
                }}
            >
                <Image
                    unoptimized
                    src={images_1}
                    alt='login image'
                    className='object-contain'
                    width={100}
                    height={100}
                />
            </motion.div>
            <motion.div
                className={`absolute top-[60%] ${!isEnglish ? 'left-[54%]' : 'right-[54%]'} ${OtpLength >= 6 ? "" : "grayscale"} hidden lg:block`}
                initial={{ y: -10 }}
                animate={{ y: 10 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 4.5,
                }}
            >
                <Image
                    unoptimized
                    src={images_1}
                    alt='login image'
                    className='object-contain'
                    width={100}
                    height={100}
                />
            </motion.div>
        </>
    )
}

export default AnimationLogin