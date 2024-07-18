/**
 * Generates TypeScript types for Supabase using the Supabase CLI.
 * 
 * @param {string} PROJECT_REF - The project ID of your Supabase project.
 * @returns {Promise<void>} - A promise that resolves when the types are generated.
 * 
 * @see [Supabase Generating Types](https://supabase.com/docs/guides/api/rest/generating-types)
 */
npx supabase gen types --lang=typescript --project-id "$PROJECT_REF" --schema public > types/supabase.ts
