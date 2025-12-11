import TextAlign from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extensions";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ControllerRenderProps } from "react-hook-form";
import MenuBar from "./MenuBar";

interface RichTextEditorProps {
  field: ControllerRenderProps<
    {
      title: string;
      description: string;
      fileKey: string;
      price: unknown;
      duration: unknown;
      level: "Beginner" | "Intermediate" | "Advanced";
      category:
        | "Development"
        | "Business"
        | "Finance"
        | "IT & Software"
        | "Photography"
        | "Design"
        | "Marketing"
        | "Health & Fitness"
        | "Music"
        | "Teaching & Acadamics";
      smallDescription: string;
      slug: string;
      status: "Draft" | "Published" | "Archived";
    },
    "description"
  >;
}

const RichTextEditor = ({ field }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Full Description",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-80 px-3 py-2 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert w-full! max-w-none! md:text-sm! text-base",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : null,
    immediatelyRender: false,
  });

  return (
    <div className="border-input dark:bg-input/30 focus-within:border-ring focus-within:ring-ring/50 w-full overflow-hidden rounded-md border focus-within:ring-[3px]">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
