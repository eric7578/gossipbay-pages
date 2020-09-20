import { useMemo } from 'react';

function sortPost(p1, p2) {
  if (p1.reply && p2.reply) {
    return p2.battlePush - p1.battlePush;
  } else if (p1.reply) {
    return 1;
  } else {
    return -1;
  }
}

export default function useSortedPosts(posts) {
  return useMemo(() => [...posts].sort(sortPost), [posts]);
}
