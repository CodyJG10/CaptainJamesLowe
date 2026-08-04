/**
 * Minimal inline formatter for body copy held in the data files.
 *
 * Prose in src/data/*.ts is plain text so it stays readable and diffable, but a
 * few passages genuinely need emphasis — the opening clause of a paragraph
 * that carries the point. Rather than embed HTML in the data (which invites
 * mistakes and makes the strings unusable as plain text), the data uses
 * `**markers**` and this converts them at render time.
 *
 * Input is escaped BEFORE any markup is introduced, so even though every
 * string here is author-written today, a string that later arrives from a form
 * or a CMS cannot inject markup.
 */

const ESCAPES: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
};

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ESCAPES[c]);

/**
 * Escape, then promote `**text**` to <strong> and `_text_` to <em>.
 * Pass the result through `set:html`.
 */
export function inline(text: string): string {
	return escapeHtml(text)
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/(^|\s)_(.+?)_(?=\s|$|[.,;:!?])/g, '$1<em>$2</em>');
}
