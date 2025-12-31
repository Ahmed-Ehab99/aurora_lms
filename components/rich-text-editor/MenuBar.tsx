import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditorState, type Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";

interface MenuBarProps {
  editor: Editor | null;
}

type ToggleAction = {
  icon: React.ComponentType;
  label: string;
  isActive: keyof EditorStateType;
  action: (editor: Editor) => void;
};

type ButtonAction = {
  icon: React.ComponentType;
  label: string;
  action: (editor: Editor) => void;
  isDisabled: keyof EditorStateType;
};

type EditorStateType = {
  isBold: boolean;
  isItalic: boolean;
  isStrike: boolean;
  isH1: boolean;
  isH2: boolean;
  isH3: boolean;
  isH4: boolean;
  isH5: boolean;
  isH6: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isAlignLeft: boolean;
  isAlignCenter: boolean;
  isAlignRight: boolean;
  canUndo: boolean;
  canRedo: boolean;
};

const TOGGLE_ACTIONS: ToggleAction[] = [
  {
    icon: Bold,
    label: "Bold",
    isActive: "isBold",
    action: (editor) => editor.chain().focus().toggleBold().run(),
  },
  {
    icon: Italic,
    label: "Italic",
    isActive: "isItalic",
    action: (editor) => editor.chain().focus().toggleItalic().run(),
  },
  {
    icon: Strikethrough,
    label: "Strike",
    isActive: "isStrike",
    action: (editor) => editor.chain().focus().toggleStrike().run(),
  },
  {
    icon: Heading1,
    label: "Heading 1",
    isActive: "isH1",
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    icon: Heading2,
    label: "Heading 2",
    isActive: "isH2",
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    icon: Heading3,
    label: "Heading 3",
    isActive: "isH3",
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    icon: Heading4,
    label: "Heading 4",
    isActive: "isH4",
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 4 }).run(),
  },
  {
    icon: Heading5,
    label: "Heading 5",
    isActive: "isH5",
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 5 }).run(),
  },
  {
    icon: Heading6,
    label: "Heading 6",
    isActive: "isH6",
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 6 }).run(),
  },
  {
    icon: List,
    label: "Bullet List",
    isActive: "isBulletList",
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    icon: ListOrdered,
    label: "Ordered List",
    isActive: "isOrderedList",
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
  },
];

const ALIGNMENT_ACTIONS: ToggleAction[] = [
  {
    icon: AlignLeft,
    label: "Align Left",
    isActive: "isAlignLeft",
    action: (editor) => editor.chain().focus().setTextAlign("left").run(),
  },
  {
    icon: AlignCenter,
    label: "Align Center",
    isActive: "isAlignCenter",
    action: (editor) => editor.chain().focus().setTextAlign("center").run(),
  },
  {
    icon: AlignRight,
    label: "Align Right",
    isActive: "isAlignRight",
    action: (editor) => editor.chain().focus().setTextAlign("right").run(),
  },
];

const HISTORY_ACTIONS: ButtonAction[] = [
  {
    icon: Undo,
    label: "Undo",
    action: (editor) => editor.chain().focus().undo().run(),
    isDisabled: "canUndo",
  },
  {
    icon: Redo,
    label: "Redo",
    action: (editor) => editor.chain().focus().redo().run(),
    isDisabled: "canRedo",
  },
];

const ToolbarToggle = ({
  action,
  editorState,
  editor,
}: {
  action: ToggleAction;
  editorState: EditorStateType;
  editor: Editor;
}) => {
  const Icon = action.icon;
  const isPressed = editorState[action.isActive];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          size="sm"
          data-state={isPressed ? "on" : "off"}
          pressed={isPressed}
          onPressedChange={() => action.action(editor)}
        >
          <Icon />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>{action.label}</TooltipContent>
    </Tooltip>
  );
};

const ToolbarButton = ({
  action,
  editorState,
  editor,
}: {
  action: ButtonAction;
  editorState: EditorStateType;
  editor: Editor;
}) => {
  const Icon = action.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          type="button"
          onClick={() => action.action(editor)}
          disabled={!editorState[action.isDisabled]}
        >
          <Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{action.label}</TooltipContent>
    </Tooltip>
  );
};

const Divider = () => <div className="bg-border mx-2 h-6 w-px" />;

const MenuBar = ({ editor }: MenuBarProps) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) {
        return {
          isBold: false,
          isItalic: false,
          isStrike: false,
          isH1: false,
          isH2: false,
          isH3: false,
          isH4: false,
          isH5: false,
          isH6: false,
          isBulletList: false,
          isOrderedList: false,
          isAlignLeft: false,
          isAlignCenter: false,
          isAlignRight: false,
          canUndo: false,
          canRedo: false,
        };
      }
      return {
        isBold: ctx.editor.isActive("bold"),
        isItalic: ctx.editor.isActive("italic"),
        isStrike: ctx.editor.isActive("strike"),
        isH1: ctx.editor.isActive("heading", { level: 1 }),
        isH2: ctx.editor.isActive("heading", { level: 2 }),
        isH3: ctx.editor.isActive("heading", { level: 3 }),
        isH4: ctx.editor.isActive("heading", { level: 4 }),
        isH5: ctx.editor.isActive("heading", { level: 5 }),
        isH6: ctx.editor.isActive("heading", { level: 6 }),
        isBulletList: ctx.editor.isActive("bulletList"),
        isOrderedList: ctx.editor.isActive("orderedList"),
        isAlignLeft: ctx.editor.isActive({ textAlign: "left" }),
        isAlignCenter: ctx.editor.isActive({ textAlign: "center" }),
        isAlignRight: ctx.editor.isActive({ textAlign: "right" }),
        canUndo: ctx.editor.can().chain().undo().run(),
        canRedo: ctx.editor.can().chain().redo().run(),
      };
    },
  });

  if (!editor || !editorState) {
    return (
      <div>
        <div className="border-input bg-card flex flex-wrap items-center gap-1 rounded-t-lg border p-2">
          {Array.from({ length: 11 }).map((_, i) => (
            <Skeleton key={i} className="size-8" />
          ))}
          <Divider />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="size-8" />
          ))}
          <Divider />
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="size-8" />
          ))}
        </div>
        <div className="min-h-80"></div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="border-input bg-card flex flex-wrap items-center gap-1 rounded-t-lg border-b p-2">
        {TOGGLE_ACTIONS.map((action, index) => (
          <ToolbarToggle
            key={index}
            action={action}
            editorState={editorState}
            editor={editor}
          />
        ))}

        <Divider />

        {ALIGNMENT_ACTIONS.map((action, index) => (
          <ToolbarToggle
            key={index}
            action={action}
            editorState={editorState}
            editor={editor}
          />
        ))}

        <Divider />

        {HISTORY_ACTIONS.map((action, index) => (
          <ToolbarButton
            key={index}
            action={action}
            editorState={editorState}
            editor={editor}
          />
        ))}
      </div>
    </TooltipProvider>
  );
};

export default MenuBar;
