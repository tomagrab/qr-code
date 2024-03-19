import { useEditor, EditorContent, Content, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import CharacterCount from '@tiptap/extension-character-count';
import TipTapToolbar from '@/components/ui/tip-tap-toolbar';
import { useEffect } from 'react';
import TipTapCharacterCount from './tip-tap-character-count';
import TipTapBubbleMenu from './tip-tap-bubble-menu';

type TipTapProps = {
  limit: number;
  content: Content | undefined;
  onChange: (content: string) => void;
  loading: boolean;
};

export default function TipTap({
  limit,
  content,
  onChange,
  loading,
}: TipTapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Link,
      CharacterCount.configure({ limit: limit }),
    ],
    content: content ?? '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  // Ensure to properly handle unmounting to avoid memory leaks
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  return (
    <div
      className={`
        flex
        flex-col
        items-start
        gap-2
      `}
    >
      <TipTapToolbar editor={editor} />

      <EditorContent
        disabled={loading}
        editor={editor}
        className={`
          w-full
        `}
      />

      <TipTapCharacterCount editor={editor} limit={limit} />
    </div>
  );
}
