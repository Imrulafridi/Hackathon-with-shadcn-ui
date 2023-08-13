import { defineField, defineType } from "sanity";

export const Product = defineType({
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Product Title",
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Product Description",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Product Images",
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Product Price",
    }),
    defineField({
      name: "category",
      type: "reference",
      title: "Category",
      to: [
        {
          type: "category",
        },
      ],
    }),
  ],
});
