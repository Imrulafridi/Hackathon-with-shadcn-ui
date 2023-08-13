import { type SchemaTypeDefinition } from 'sanity'
import { Product } from './lib/product'
import { Category } from './lib/catergory'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Product, Category],
}
