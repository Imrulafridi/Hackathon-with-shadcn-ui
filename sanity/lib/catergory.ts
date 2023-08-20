import { defineField, defineType } from "sanity";

export const Category = defineType({
  name: "category",
  type: "document",
  title: "Category",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "slug",
        maxLength: 96,
      },
    }),
  ],
});
