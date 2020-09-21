import { useMemo } from 'react';

function sortBoard(b1, b2) {
  return b2.threads.length - b1.threads.length;
}

export default function useSortedBoards(boards) {
  return useMemo(() => [...boards].sort(sortBoard), [boards]);
}
