import { FormDescription } from '@/components/ui/form';
import { Editor } from '@tiptap/react';

type TipTapCharacterCountProps = {
  editor: Editor | null;
  limit: number;
};

export default function TipTapCharacterCount({
  editor,
  limit,
}: TipTapCharacterCountProps) {
  if (!editor) {
    return null;
  }

  return (
    <FormDescription>
      {editor.storage.characterCount.characters()} / {limit} characters
    </FormDescription>
  );
}
