import { postCommentDelete, postingDelete } from '@/lib/api/communityPost';
import { commentDeleteState, commentModalState, postDeleteState, postingModalState } from '@/recoil/community/atom';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useSWRConfig } from 'swr';

interface Props {
  children: React.ReactNode; //글메뉴, 댓글메뉴, 대댓글메뉴 등등 입력
  editOnOff: boolean; //true이면 "수정하기" 있음
  afterDelete?: string; //게시글 삭제 후 보이는 페이지
}

const PostingModal = (props: Props) => {
  const { children, editOnOff, afterDelete } = props;
  const { mutate } = useSWRConfig(); //삭제정보를 바로 받아오기 위함

  const [onCommentModal, setOnCommentModal] = useRecoilState(commentModalState); //댓글 삭제 모달창
  const [onPostModal, setOnPostModal] = useRecoilState(postingModalState); //게시글 수정 및 삭제 모달창

  const [commentDelete, setCommentDelete] = useRecoilState(commentDeleteState); //삭제할 댓글 아이디(댓글 삭제 진행에 사용됨)
  const [postDelete, setPostDelete] = useRecoilState(postDeleteState); //삭제할 게시글 아이디(게시글 삭제 진행에 사용됨)
  const router = useRouter();

  return (
    <>
      <div className="z-50">
        <div className="fixed w-full h-full px-5 py-8 bg-black bg-opacity-60 flex-col justify-end items-center gap-2 inline-flex ">
          <div className="self-stretch h-[211px] rounded-xl flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch bg-white rounded-2xl flex-col justify-start items-start flex">
              <div className="self-stretch p-2 justify-center items-center gap-2 inline-flex">
                <div className="text-center text-gray4 text-h6 font-normal font-['Pretendard Variable']">
                  {children}
                </div>
              </div>
              <div className="self-stretch h-px bg-neutral-100"></div>
              {editOnOff ? (
                <div className="self-stretch h-14 p-2 bg-neutral-100 justify-center items-center gap-2 inline-flex">
                  <div className="text-center text-black text-h3 font-normal font-['Pretendard Variable']">
                    수정하기
                  </div>
                </div>
              ) : null}
              <div className="self-stretch h-px bg-neutral-100"></div>
              <div
                className="self-stretch h-14 p-2 justify-center items-center gap-2 inline-flex"
                onClick={() => {
                  if (commentDelete != 0 && postDelete == 0) { //댓글 삭제
                    postCommentDelete(commentDelete);
                    setOnCommentModal(false);
                  }
                  if (postDelete != 0 && commentDelete == 0) {//게시글 삭제
                    postingDelete(postDelete);
                    setOnPostModal(false);
                    router.push(afterDelete || '/'); //'/'는 사실상 실행 안됨 게시글 삭제후 이전페이지로 돌아감
                  }
                  setCommentDelete(0); //삭제할 댓글 아이디 정보 초기화
                  setPostDelete(0); //삭제할 게시글 아이디 정보 초기화
                  mutate(`/api/v1/post-comments/${commentDelete}`); //삭제 정보를 바로 불러옴
                }}>
                <div className="text-center text-black text-h3 font-normal font-['Pretendard Variable']">삭제하기</div>
              </div>
            </div>
            <div
              className="self-stretch bg-white rounded-2xl justify-start items-start inline-flex"
              onClick={() => { 
                setOnPostModal(false); //게시글 모달창 닫힘
                setOnCommentModal(false); //댓글 모달창 닫힘
                setCommentDelete(0); //삭제할 댓글 아이디 초기화
                setPostDelete(0); //삭제할 게시글 아이디 초기화
              }}>
              <div className="grow shrink basis-0 h-14 p-2 justify-center items-center gap-2 flex">
                <div className="text-center text-second text-h3 font-bold font-['Pretendard Variable']">취소</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostingModal;