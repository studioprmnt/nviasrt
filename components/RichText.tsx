import { RichText as Lexical, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

// Paragraphs and headings take the site's type styles; everything else uses Payload's defaults.
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  paragraph: ({ node, nodesToJSX }) => <p className="body-l">{nodesToJSX({ nodes: node.children })}</p>,
  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag === 'h1' || node.tag === 'h2' ? 'h3' : node.tag;
    return <Tag className={Tag === 'h3' ? 'h3' : 'h4'}>{nodesToJSX({ nodes: node.children })}</Tag>;
  },
});

export default function RichText({ data }: { data: SerializedEditorState }) {
  return <Lexical data={data} converters={converters} disableContainer />;
}
