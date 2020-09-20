import { renderHook } from '@testing-library/react-hooks';
import useNormalizeBoardName from './useNormalizeBoardName';

test('useNormalizeBoardName normalize board name as uppercase', () => {
  const muscleBeach = renderHook(() => useNormalizeBoardName('MuscleBeach'));
  const softJob = renderHook(() => useNormalizeBoardName('Soft_Job'));
  const movie = renderHook(() => useNormalizeBoardName('movie'));
  const hrm = renderHook(() => useNormalizeBoardName('HRM'));
  const cChat = renderHook(() => useNormalizeBoardName('C_Chat'));

  expect(muscleBeach.result.current).toBe('MUSCLE BEACH');
  expect(softJob.result.current).toBe('SOFT JOB');
  expect(movie.result.current).toBe('MOVIE');
  expect(hrm.result.current).toBe('HRM');
  expect(cChat.result.current).toBe('C CHAT');
});
