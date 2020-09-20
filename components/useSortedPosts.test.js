import { renderHook } from '@testing-library/react-hooks';
import useSortedPosts from './useSortedPosts';

const posts = [
  {
    id: 'M.1600306282.A.E93.html',
    reply: true,
    battlePush: 1,
  },
  {
    id: 'M.1600304549.A.59A.html',
    reply: false,
    battlePush: 15,
  },
  {
    id: 'M.1600324418.A.71C.html',
    reply: true,
    battlePush: 18,
  },
];

test('useSortedPosts sort original post as first one', () => {
  const sorted = renderHook(() => useSortedPosts(posts));

  expect(sorted.result.current[0].id).toBe('M.1600304549.A.59A.html');
  expect(sorted.result.current[0].reply).toBeFalsy();
});

test('useSortedPosts sort other posts according to number of battlePush', () => {
  const sorted = renderHook(() => useSortedPosts(posts));

  expect(sorted.result.current[1].id).toBe('M.1600324418.A.71C.html');
  expect(sorted.result.current[2].id).toBe('M.1600306282.A.E93.html');
});
