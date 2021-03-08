import { Room } from './room.entity';

describe('RoomEntity', () => {
  let room: Room = {
    id: 1,
    createdAt: '2021-01-22T11:53:57.736Z',
    updatedAt: '2021-01-22T11:53:57.736Z',
    roomType: 'House',
    price: 50000,
    cleaningFee: 10000,
    roomCnt: 3,
    bedCnt: 3,
    bathCnt: 1.5,
    maxGuestCnt: 5,
    title: '성북동 편한한 집',
    description: '좋습니다~~',
    addressState: '서울특별시',
    addressCity: '홍길동구',
    addressStreet: '둘리 5길 21',
    addressEtc: '101호',
    addressZipCode: '938-392',
  };

  describe('score', () => {
    it('should be true when problem type is DrawingQuestion', () => {
      problem = new Problem();
      problem.type = ProblemType.DrawingQuestion;
      problem.answer = '';
      expect(problem.score('data:image/png;base64,iVBORw0KGgoAAA...')).toEqual(
        true,
      );
    });

    it('should be true when the multiple choice answer is right', () => {
      problem = new Problem();
      problem.type = ProblemType.MultipleChoice;
      problem.answer = '2';
      expect(problem.score('2')).toEqual(true);
    });

    it('should be false when the multiple choice answer is wrong', () => {
      problem = new Problem();
      problem.type = ProblemType.MultipleChoice;
      problem.answer = '2';
      expect(problem.score('3')).toEqual(false);
    });

    it('should be true when the essay question answer is right', () => {
      problem = new Problem();
      problem.type = ProblemType.EssayQuestion;
      problem.answer = '6분 후';
      expect(problem.score('6분 후')).toEqual(true);
    });

    it('should be true when the essay question answer is wrong', () => {
      problem = new Problem();
      problem.type = ProblemType.EssayQuestion;
      problem.answer = '6분 후';
      expect(problem.score('')).toEqual(false);
    });
  });
});
