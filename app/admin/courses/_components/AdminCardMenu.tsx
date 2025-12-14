import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical, Pencil, Trash } from "lucide-react";
import Link from "next/link";

interface AdminCardMenuProps {
  id: string;
  slug: string;
}

const AdminCardMenu = ({ id, slug }: AdminCardMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <MoreVertical className="size-4 text-primary" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/admin/courses/${id}/edit`}>
            <Pencil className="mr-2 size-4" />
            Edit Course
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/courses/${slug}`}>
            <Eye className="mr-2 size-4" />
            Preview Course
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/admin/courses/${id}/delete`}>
            <Trash className="text-destructive mr-2 size-4" />
            Delete Course
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminCardMenu;
