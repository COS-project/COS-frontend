'use client';
import { SubjectResultRequests, UserAnswerRequests } from '@/types/global';
import { extend } from 'dayjs';
import SubjectList from '@/components/exam/SubjectList';
import { CreatePostDataType, EditPostDataType } from '@/types/community/type';
import { atom } from 'recoil';
import { GenerateComment, Post } from '@/types/global';

//글 삭제 및 수정 모달창 조작
export let postingModalState = atom<boolean>({
  key: 'postingModalState',
  default: false,
});

//댓글 삭제 모달창 조작
export let commentModalState = atom<boolean>({
  key: 'commentModalState',
  default: false,
});

//댓글 삭제
export let commentDeleteState = atom<number>({
  key: 'commentDeleteState',
  default: 0,
});

//글 삭제
export let postDeleteState = atom<number>({
  key: 'postDeleteState',
  default: 0,
});

//댓글 생성
export let GenerateCommentState = atom<GenerateComment>({
  key: 'GenerateCommentState',
  default: {
    parentCommentId: null,
    content: '',
  },
});

export const imagePreviewsState = atom<string[]>({
  key: 'imagePreviewsState',
  default: [],
});

export const imageUrlListState = atom<File[]>({
  key: 'imageUrlListState',
  default: [],
});

export const pastImageUrlsState = atom<string[]>({
  key: 'pastImageUrlsState',
  default: [],
});

export const createPostDataState = atom<CreatePostDataType>({
  key: 'createPostDataState',
  default: {
    title: '제목',
    content: '내용',
    tags: [],
    examYear: 2023,
    round: 1,
    questionSequence: 0,
  },
});

export const editPostDataState = atom<EditPostDataType>({
  key: 'editPostDataState',
  default: {
    postId: 0,
    title: '제목',
    content: '내용',
  },
});
