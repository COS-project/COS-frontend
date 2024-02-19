'use client';

import React, { useEffect, useState } from 'react';
import Question from './Question';
import { problemData } from '@/utils/examDummyData';
import useMockExamQuestions from '@/lib/hooks/useMockExamQuestions';
import { useRecoilState } from 'recoil';
import { UserAnswerRequests } from '@/types/global';
import { questionIndex, subjectResultRequestsList } from '@/recoil/exam/atom';

interface AllQuestionModalProps {
  toggleQuestionModal: () => void;
}

export const AllQuestionModal = (props: AllQuestionModalProps) => {
  const { toggleQuestionModal } = props;

  const [userAnswerList, setUserAnswerList] = useRecoilState<UserAnswerRequests[]>(subjectResultRequestsList);
  const [questionIdx, setQuestionIdx] = useRecoilState<number>(questionIndex);

  return (
    <>
      <div className={'p-5 fixed inset-0 flex justify-center bg-black bg-opacity-60'}>
        <div className={'w-[100%]'}>
          <div className={'flex flex-col bg-white justify-center items-center rounded-3xl p-4 gap-y-7'}>

            <div className={'rounded-full bg-gray2 w-[100px] h-[6px]'}/>

            <h2 className={'flex flex-col items-center gap-y-1'}>
              <div className={'font-bold text-h3'}>문항 번호 전체보기</div>
              <div className={'text-gray4 text-h4 justify-center'}>
                문제 번호를 눌러 해당 문제로 이동하세요.
              </div>
            </h2>

            <div className={'flex gap-x-4'}>
              <div className={'flex items-center gap-x-[6px] text-h6 text-gray4'}>
                <div className={'rounded-[10px] w-5 h-2 bg-second'} />
                <div>푼 문제</div>
              </div>
              <div className={'flex items-center gap-x-[6px] text-h6 text-gray4'}>
                <div className={'rounded-[10px] w-5 h-2 bg-[#C8D3F9]'} />
                <div>안 푼 문제</div>
              </div>
            </div>

            <div className={'grid grid-cols-5 gap-x-4 gap-y-4 overflow-y-scroll h-[500px]'}>
              {userAnswerList
                ? userAnswerList.map((userAnswer: UserAnswerRequests, index) => {
                    return userAnswer.selectOption == 0 ? (
                      <div
                        onClick={() => {
                          setQuestionIdx(userAnswer.questionId - 1);
                          toggleQuestionModal();
                        }}
                        className={'flex justify-center items-center bg-[#6283FD]/30 w-12 h-12 rounded-[8px]'}>{userAnswer.questionId}</div>
                    ) : (
                      <div
                        onClick={() => {
                          setQuestionIdx(userAnswer.questionId - 1);
                          toggleQuestionModal();
                        }}
                        className={'flex justify-center items-center bg-second text-white w-12 h-12 rounded-[8px]'}>{userAnswer.questionId}</div>
                    );
                  })
                : null}
            </div>
          </div>
          <button
            className={'p-[16px] mt-3 w-full rounded-[16px] bg-white text-h3 font-bold text-blue'}
            onClick={toggleQuestionModal}>
            닫기
          </button>
        </div>
      </div>
    </>
  );
};
