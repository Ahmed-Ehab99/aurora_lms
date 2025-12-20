"use client";

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
import { useState } from "react";
import DeleteCourse from "./DeleteCourse";

interface AdminCardMenuProps {
  id: string;
  slug: string;
  onDelete: (id: string) => void;
  title: string;
}

const AdminCardMenu = ({ id, slug, onDelete, title }: AdminCardMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon">
            <MoreVertical className="text-primary size-4" />
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
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => {
              setIsOpen(true);
            }}
          >
            <Trash className="text-destructive mr-2 size-4" />
            Delete Course
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteCourse
        id={id}
        isOpen={isOpen}
        onDelete={onDelete}
        setIsOpen={setIsOpen}
        title={title}
      />
    </>
  );
};

export default AdminCardMenu;
