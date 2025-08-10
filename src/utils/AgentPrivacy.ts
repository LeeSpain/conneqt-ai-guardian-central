export type RedactionOptions = {
  allowWebsite?: boolean;
  maskEmails?: boolean;
  maskPhones?: boolean;
  shareOnlyAllowlist?: boolean;
  allowlistKeys?: string[];
};

const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PHONE_REGEX = /(?:(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4})/g;
const URL_REGEX = /https?:\/\/[\w.-]+(?:\.[\w\.-]+)+(?:[\w\-\._~:\/?#\[\]@!$&'()*+,;=.]+)/gi;

function mask(text: string, opts: RedactionOptions): string {
  let out = text;
  if (opts.maskEmails) out = out.replace(EMAIL_REGEX, '[redacted-email]');
  if (opts.maskPhones) out = out.replace(PHONE_REGEX, (m) => (m.length > 6 ? '[redacted-phone]' : m));
  if (!opts.allowWebsite) out = out.replace(URL_REGEX, '[redacted-url]');
  return out;
}

function pick(obj: any, path: string) {
  const parts = path.split('.');
  let cur = obj;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in cur) cur = cur[p];
    else return undefined;
  }
  return cur;
}

function set(obj: any, path: string, value: any) {
  const parts = path.split('.');
  let cur = obj;
  parts.forEach((p, i) => {
    if (i === parts.length - 1) cur[p] = value;
    else cur[p] = cur[p] ?? {};
    cur = cur[p];
  });
}

export function extractDomain(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    return u.hostname;
  } catch {
    return undefined;
  }
}

export function buildRedactedContext(profile: any, opts: RedactionOptions): any {
  const safe: any = {};
  if (opts.shareOnlyAllowlist && opts.allowlistKeys?.length) {
    for (const key of opts.allowlistKeys) {
      const val = pick(profile, key);
      if (val !== undefined) set(safe, key, val);
    }
  } else {
    Object.assign(safe, profile);
  }

  // Post-process strings to mask
  const scrub = (v: any): any => {
    if (typeof v === 'string') return mask(v, opts);
    if (Array.isArray(v)) return v.map(scrub);
    if (v && typeof v === 'object') {
      const o: any = {};
      for (const k of Object.keys(v)) o[k] = scrub(v[k]);
      return o;
    }
    return v;
  };

  const redacted = scrub(safe);

  // Replace website with domain or remove entirely
  if (!opts.allowWebsite) {
    if (redacted.companyOverview?.website) {
      const host = extractDomain(redacted.companyOverview.website);
      if (host) redacted.companyOverview.website = host;
      else delete redacted.companyOverview.website;
    }
    if (redacted.assessmentAnswers?.website) {
      const host = extractDomain(redacted.assessmentAnswers.website);
      if (host) redacted.assessmentAnswers.website = host;
      else delete redacted.assessmentAnswers.website;
    }
  }

  return redacted;
}
