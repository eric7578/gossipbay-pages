import { useMemo } from 'react';

export default function useNormalizeBoardName(boardName) {
  const normalized = useMemo(() => {
    const byUnderline = boardName.split('_');
    if (byUnderline.length > 1) {
      return byUnderline.map(seg => seg.toUpperCase()).join(' ');
    }

    boardName = [...boardName].reduce((chars, c, index) => {
      if (index > 0 && /[A-Z]/.test(c)) {
        chars.push(` ${c}`);
      } else {
        chars.push(c);
      }
      return chars;
    }, []);

    return boardName.join('').toUpperCase();
  }, [boardName]);

  return normalized;
}
