"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  courseCategories,
  courseLevels,
  courseSchema,
  CourseSchemaType,
  courseStatus,
} from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, SparkleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { z } from "zod";

const initialValues = {
  title: "",
  description: "",
  fileKey: "",
  price: 1,
  duration: 1,
  level: courseLevels[0],
  category: courseCategories[0],
  smallDescription: "",
  slug: "",
  status: courseStatus[0],
} satisfies z.infer<typeof courseSchema>;

const CreateCourseForm = () => {
  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: initialValues,
  });

  function onSubmit(values: CourseSchemaType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* TITLE */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SLUG */}
        <div className="flex items-end gap-4">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            className="w-fit"
            onClick={() => {
              const titleValue = form.getValues("title");
              const slug = slugify(titleValue);
              form.setValue("slug", slug, { shouldValidate: true });
            }}
          >
            Generate Slug <SparkleIcon className="ml-1" size={16} />
          </Button>
        </div>

        {/* SMALL DESCRIPTION */}
        <FormField
          control={form.control}
          name="smallDescription"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Small Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Small Description"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DESCRIPTION */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* FILE KEY */}
        <FormField
          control={form.control}
          name="fileKey"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Thumbnail Image</FormLabel>
              <FormControl>
                <Input placeholder="Thumbnail URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CATEGORY / LEVEL / DURATION / PRICE */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* CATEGORY */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* LEVEL */}
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Level</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* DURATION */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Duration (hours)</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Duration"
                    type="number"
                    {...field}
                    value={field.value?.toString() ?? ""}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* PRICE */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Price ($)</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Price"
                    type="number"
                    {...field}
                    value={field.value?.toString() ?? ""}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* STATUS */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Status</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courseStatus.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* SUBMIT BUTTON */}
        <Button type="submit">
          Create Course <PlusIcon className="ml-1" size={16} />
        </Button>
      </form>
    </Form>
  );
};

export default CreateCourseForm;
