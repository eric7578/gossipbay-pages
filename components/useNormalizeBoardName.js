import { useMemo } from 'react';

export default function useNormalizeBoardName(boardName) {
  const normalized = useMemo(() => {
    const byUnderline = boardName.split('_');
    if (byUnderline.length > 1) {
      return byUnderline.map(seg => seg.toUpperCase()).join(' ');
    }

    const chars = [];
    const regUpperCase = /[A-Z]/;
    for (let x = 0, len = boardName.length; x < len; x++) {
      const c = boardName.charAt(x);
      if (c === '_') {
        c = ' ';
      } else if (x > 0) {
        const prevc = boardName.charAt(x - 1);
        if (!regUpperCase.test(prevc) && regUpperCase.test(c)) {
          chars.push(' ');
        }
      }
      chars.push(c);
    }

    return chars.join('').toUpperCase();
  }, [boardName]);

  return normalized;
}
