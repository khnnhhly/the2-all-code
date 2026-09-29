/**
 * The Vietnamese UI is hidden on the live site for now — hidden, not removed.
 * Every `vi` field in Sanity, every Vietnamese fallback string and all the
 * switching logic stay exactly where they are; only the language switcher is
 * withheld, and a visitor who once picked Vietnamese is served English again.
 *
 * To bring it back, set NEXT_PUBLIC_ENABLE_VI=true in the environment (Vercel
 * › Settings › Environment Variables) — no code change needed.
 */
export const VI_ENABLED = process.env.NEXT_PUBLIC_ENABLE_VI === 'true';

export const DEFAULT_LANG = 'en';

/** Falls back to English while Vietnamese is hidden. */
export function resolveLang(lang?: string | null): 'en' | 'vi' {
  if (!VI_ENABLED) return 'en';
  return lang === 'vi' ? 'vi' : 'en';
}
