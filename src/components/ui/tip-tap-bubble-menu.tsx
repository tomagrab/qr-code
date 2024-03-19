import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { BubbleMenu, Editor } from '@tiptap/react';

type TipTapBubbleMenuProps = {
  editor: Editor | null;
};

export default function TipTapBubbleMenu({ editor }: TipTapBubbleMenuProps) {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <FontBoldIcon
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`h-4 w-4 ${editor.isActive('bold') ? 'is-active' : ''}`}
          />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <FontItalicIcon
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`h-4 w-4 ${editor.isActive('italic') ? 'is-active' : ''}`}
          />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="strikethrough"
          aria-label="Toggle strikethrough"
        >
          <UnderlineIcon
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`h-4 w-4 ${editor.isActive('underline') ? 'is-active' : ''}`}
          />
        </ToggleGroupItem>
      </ToggleGroup>
    </BubbleMenu>
  );
}
