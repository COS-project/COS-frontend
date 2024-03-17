import { useRecoilState } from 'recoil';

import { selectedRoundState } from '@/utils/recoilState';

import StickGraph from './StickGraph';

// examreportpage에서 머문시간 그래프를 나타내는 컴포넌트
const StayTimeGraph: React.FC = () => {
  const [selectedRound, setSelectedRound] = useRecoilState<Number | null>(selectedRoundState);

  const dummyData = [
    { height: 30, color: 'gray2' },
    { height: 50, color: 'blue' },
  ];

  return (
    <div>
      <div className="bg-white rounded-xl p-3 my-4">
        <div className="font-bold text-h3">머문시간 그래프</div>
        <div className="text-h5 p-2">
          <div>걸린 시간</div>
          <div className="font-bold">50m</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-[85%] border-t border-gray1"></div>
          <div className="w-[15%] text-gray3 text-h5">20분</div>
        </div>
        <div className="flex items-end space-x-2">
          <div className="w-[85%]">
            <div className="flex h-32">
              <div className="w-full flex justify-center space-x-2">
                <StickGraph height={10} color="gray2" />
                <StickGraph height={50} color="blue" />
              </div>
              <div className="w-full flex justify-center space-x-2">
                <StickGraph height={30} color="gray2" />
                <StickGraph height={50} color="blue" />
              </div>
              <div className="w-full flex justify-center space-x-2">
                <StickGraph height={30} color="gray2" />
                <StickGraph height={50} color="blue" />
              </div>
            </div>
            <div className="border-t border-gray1"></div>
          </div>
          <div className="w-[15%] text-gray3 text-h5">0분</div>
        </div>
        <div className="flex space-x-2">
          <div className="w-[85%] flex justify-between">
            <div className="w-full flex justify-center text-h6">{'데이터 베이스'}</div>
            <div className="w-full flex justify-center text-h6">{'정보처리기사'}</div>
            <div className="w-full flex justify-center text-h6">{'데이터 베이스'}</div>
          </div>
          <div className="w-[15%] text-white text-h5">0분</div>
        </div>
      </div>
    </div>
  );
};

export default StayTimeGraph;
