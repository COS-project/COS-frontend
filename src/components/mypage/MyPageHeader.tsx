import Image from 'next/image';
import { SVGProps } from 'react';
import * as React from 'react';

import useGetInterestCertificates from '@/lib/hooks/useGetInterestCertificates';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import { InterestCertificate } from '@/types/global';

const MyPageHeader = () => {
  const { userProfile } = useGetUserProfile();
  const { interestCertificates } = useGetInterestCertificates();

  return (
    <>
      <div className={'flex flex-col bg-white p-5 gap-y-4'}>
        {/*프로필 설정*/}
        <div className={'flex gap-x-4 items-center'}>
          <Image
            src={userProfile?.profileImage}
            alt={userProfile?.profileImage}
            height={72}
            width={72}
            className={'rounded-full'}></Image>
          <div className={'flex items-center'}>
            <div className={'text-h3'}>{userProfile?.nickname}</div>
            <EditProfileIcon />
          </div>
        </div>

        {/*나의 관심 종목*/}
        <div className={'flex flex-col gap-y-3'}>
          <div className={'flex justify-between'}>
            <div className={'text-h4 font-semibold'}>나의 관심 종목</div>
            <div className={'flex'}>
              <div className={'text-h4 text-gray3'}>변경</div>
              <EditInterestCertificationIcon />
            </div>
          </div>
          <div className={'overflow-x-scroll'}>
            {interestCertificates?.map((interestCertificate: InterestCertificate, index: number) => {
              return (
                <div key={index} className={'w-fit bg-primary rounded-[20px] px-[16px] py-[32px] text-white text-h6'}>
                  {interestCertificate.certificate.certificateName}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPageHeader;

const EditProfileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m9.5 7 5 5-5 5" />
  </svg>
);

const EditInterestCertificationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path stroke="#727375" strokeLinecap="round" strokeLinejoin="round" d="m9.5 17 5-5-5-5" />
  </svg>
);