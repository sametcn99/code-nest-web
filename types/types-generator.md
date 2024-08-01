# Generating TypeScript Types for Supabase using the Supabase CLI

## Description

This command generates TypeScript types for your Supabase project using the Supabase CLI.

### Parameters

- `PROJECT_REF` - The project ID of your Supabase project.

### Returns

- A promise that resolves when the types are generated.

### Command

```bash
npx supabase gen types --lang=typescript --project-id "$PROJECT_REF" --schema public > database.types.ts
```

### See Also

- [Supabase Generating Types](https://supabase.com/docs/guides/api/rest/generating-types)
