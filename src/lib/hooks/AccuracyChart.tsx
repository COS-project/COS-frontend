import { ResponsiveRadar } from '@nivo/radar';
import { useEffect, useState } from 'react';

import { CorrectRateGraphType, SubjectResultsType } from '@/types/exam/type';

interface Props {
  subjectResults: SubjectResultsType[];
}
const AccuracyChart = (props: Props) => {
  const { subjectResults } = props;

  const [subjectData, setSubjectData] = useState<CorrectRateGraphType[]>([]);

  useEffect(() => {
    if (subjectResults) {
      const transformedData: CorrectRateGraphType[] = subjectResults.map((result) => ({
        subjectTitle: result.subject.subjectName,
        subjectCorrectRate: result.correctRate,
      }));
      setSubjectData(transformedData);
    }
  }, [subjectResults]);

  return (
    <div className={'bg-white rounded-[32px]'}>
      <div className={'font-semibold px-5 mt-5 text-h3'}>과목별 정답률</div>
      <div className={'w-full'} style={{ height: '280px' }}>
        <ResponsiveRadar
          data={subjectData}
          keys={['subjectCorrectRate']}
          indexBy="subjectTitle"
          valueFormat=" >-.2f"
          margin={{ top: 30, right: 70, bottom: 0, left: 70 }}
          // maxValue={subjectResults[0].subject.totalScore} // 최댓값을 부여할지 말지 고민
          borderWidth={1}
          borderColor="#3B3DFF"
          gridShape="linear"
          gridLabelOffset={13}
          dotLabelYOffset={-3}
          enableDots={true}
          dotSize={2}
          enableDotLabel={true}
          dotBorderColor={{ theme: 'background' }}
          dotColor={{ theme: 'background' }}
          dotBorderWidth={2}
          dotLabel="value"
          colors={{ scheme: 'blues', size: 5 }}
          fillOpacity={1}
          blendMode="multiply"
          motionConfig="wobbly"
        />
      </div>
    </div>
  );
};
export default AccuracyChart;