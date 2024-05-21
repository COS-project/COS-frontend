'use client';

import React, { SVGProps, useCallback, useEffect, useState } from 'react';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import MyPageFilter from '@/components/mypage/MyPageFilter';
import MyWritingMenu from '@/components/mypage/MyWritingMenu';
import ReviewPost from '@/components/mypage/ReviewPost';
import { filterContent } from '@/utils/mypage/FilterContent';
import useGetUserPosts from '@/lib/hooks/useGetUserPosts';
import { PostType, BoardType, ResponsePostType } from '@/types/community/type';
import { useInView } from 'react-intersection-observer';
import useAllIncorrectQuestions from '@/lib/hooks/useAllIncorrectQuestions';
import { AxiosResponse } from 'axios';
import Post from '@/components/mypage/Post';
import { FilterType } from '@/types/mypage/type';

export default function MyWriting() {
  const [ref, inView] = useInView();
  // REVIEW, COMMENTARY, TIP, NORMAL
  const [boardType, setBoardType] = useState<BoardType>('COMMENTARY');
  // 최신순:createdAt, 인기순:popular
  const [selectedFilterContent, setSelectedFilterContent] = useState('최신순');
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const { userPostsList, setSize } = useGetUserPosts(boardType);

  const getMoreItem = useCallback(async () => {
    if (userPostsList) {
      setSize((prev: number) => prev + 1);
    }
    return;
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  const commentaryTopElement = (year: number, round: number, number: number) => {
    return (
      <div className={'flex gap-x-[6px] pb-3'}>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{year}년도</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{round}회차</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{number}번</div>
      </div>
    );
  };

  const tipTopElement = () => {
    return (
      <div className={'pb-2'}>
        <div className={'px-3 py-[2px] text-white bg-primary rounded-full w-fit font-light'}>BEST</div>
      </div>
    );
  };

  const bottomElement = () => {
    return (
      <div className={'flex justify-end gap-x-2'}>
        <button className={'bg-gray0 py-2 px-4 rounded-[12px]'}>수정</button>
        <button className={'bg-black text-white py-2 px-4 rounded-[12px]'}>삭제</button>
      </div>
    );
  };

  return (
    <>
      <Header headerType={'dynamic'} title={'내가 작성한 글'} rightElement={<EmptyIcon />} />
      <div className={'flex flex-col gap-y-4 bg-gray0 min-h-screen'}>
        <MyWritingMenu boardType={boardType} setBoardType={setBoardType} />
        <div className={'relative px-5 flex flex-col gap-y-4 '}>
          {/*필터*/}
          <div className={' w-fit flex px-3 py-1 rounded-full bg-white '}>
            <span className={'text-gray4 text-h6'}>{selectedFilterContent}</span>
            {isOpenFilter ? (
              <ActivationIcon onClick={() => setIsOpenFilter(!isOpenFilter)} />
            ) : (
              <DisableIcon onClick={() => setIsOpenFilter(!isOpenFilter)} />
            )}
          </div>
          {isOpenFilter ? (
            <MyPageFilter
              isOpenFilter={isOpenFilter}
              setSelectedFilterContent={setSelectedFilterContent}
              setIsOpenFilter={setIsOpenFilter}
              data={filterContent}
            />
          ) : null}
          <div className={'flex flex-col gap-y-4'}>
            {userPostsList
              ? userPostsList.map((userPosts: AxiosResponse<ResponsePostType>) => {
                  return userPosts.result.content.map((userPost: PostType) => {
                    return (
                      <div key={userPost.postId} ref={ref}>
                        <Post
                          content={userPost.postContent.content}
                          title={userPost.postContent.title}
                          commentCount={userPost.postStatus.commentCount}
                          bottomElement={bottomElement}
                          createdAt={'2023.7.12'}
                          imageUrl={
                            userPost.postContent.images.length !== 0 ? userPost.postContent.images[0].imageUrl : null
                          }
                          likeCount={userPost.postStatus.likeCount}
                          topElement={
                            userPost.question
                              ? commentaryTopElement(
                                  userPost.question.mockExam.examYear,
                                  userPost.question.mockExam.round,
                                  userPost.question.questionSeq,
                                )
                              : userPost.recommendTags
                              ? tipTopElement()
                              : null
                          }></Post>
                      </div>
                    );
                  });
                })
              : null}
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
}
const DisableIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#727375" strokeLinecap="round" d="M13.5 9 10 12 6.5 9" />
  </svg>
);
const ActivationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#727375" strokeLinecap="round" d="M6.5 12 10 9l3.5 3" />
  </svg>
);

const EmptyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
    <mask
      id="a"
      width={32}
      height={32}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M0 0h32v32H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#fff"
        d="m26.11 26.867-8.474-8.474a7 7 0 0 1-2.306 1.349 7.8 7.8 0 0 1-2.64.468q-3.19 0-5.402-2.206-2.211-2.207-2.211-5.384T7.283 7.23q2.207-2.21 5.383-2.21t5.397 2.207q2.22 2.208 2.22 5.385 0 1.378-.492 2.692a7.2 7.2 0 0 1-1.347 2.28l8.48 8.45zm-13.424-7.785q2.721 0 4.595-1.87 1.875-1.869 1.875-4.597 0-2.727-1.875-4.597t-4.595-1.87q-2.726 0-4.604 1.87-1.877 1.871-1.877 4.597 0 2.728 1.877 4.597t4.603 1.87"
      />
    </g>
  </svg>
);