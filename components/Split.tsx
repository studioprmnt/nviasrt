import { Fragment, type CSSProperties, type ElementType } from 'react';

/**
 * Headline that rises in word by word from under a soft mask.
 * load: animates on first paint with CSS only (for page titles, never waits for JS).
 * Otherwise it waits for the scroll reveal (data-reveal → .is-in).
 * A "\n" in the text forces a line break (desktop and up; it reflows naturally on small screens).
 */
export default function Split({ as: Tag = 'h2', children, className = '', load = false, delay = 0, style, id }: {
  as?: ElementType; children: string; className?: string; load?: boolean; delay?: number; style?: CSSProperties; id?: string;
}) {
  const lines = children.split('\n');
  let wi = 0;
  return (
    <Tag id={id} className={`split${load ? ' split--load' : ''} ${className}`} aria-label={children.replace(/\n/g, ' ')}
      style={{ ...style, '--d': `${delay}ms` } as CSSProperties} {...(load ? {} : { 'data-reveal': '' })}>
      {lines.map((line, li) => {
        const words = line.split(' ');
        return (
          <Fragment key={li}>
            {li > 0 && <><br className="split-br" />{' '}</>}
            {words.map((w, i) => (
              <Fragment key={i}><span aria-hidden className="w"><span style={{ '--wi': wi++ } as CSSProperties}>{w}</span></span>{i < words.length - 1 ? ' ' : ''}</Fragment>
            ))}
          </Fragment>
        );
      })}
    </Tag>
  );
}
