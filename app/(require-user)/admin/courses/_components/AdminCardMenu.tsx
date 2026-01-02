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
          <Button
            variant="secondary"
            size="icon"
            aria-label={`Course options for ${title}`}
          >
            <MoreVertical
              size={16}
              className="text-primary"
              aria-hidden="true"
            />
            <span className="sr-only">Open course options menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link
              href={`/admin/courses/${id}/edit`}
              aria-label={`Edit ${title}`}
            >
              <Pencil size={16} className="mr-2" aria-hidden="true" />
              Edit Course
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`/courses/${slug}`} aria-label={`Preview ${title}`}>
              <Eye size={16} className="mr-2" aria-hidden="true" />
              Preview Course
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => {
              setIsOpen(true);
            }}
            aria-label={`Delete ${title}`}
          >
            <Trash
              size={16}
              className="text-destructive mr-2"
              aria-hidden="true"
            />
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
