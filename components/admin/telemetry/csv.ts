import type { UnfinishedTeacher } from "@/lib/telemetry";

/** Where a teacher stopped onboarding, as shown in the panel and the CSV. */
export const STOPPED_AT_LABELS: Record<string, string> = {
  new: "Never gave details",
  personal_info_submitted: "Stopped at subjects",
};

/**
 * "255712345678" -> "+255 712 345 678". Digits are grouped in threes from the
 * country code, for any country, so spreadsheets never read it as a number.
 */
export function formatPhone(waId: string): string {
  const digits = waId.replace(/\D/g, "");
  return digits ? `+${digits.match(/\d{1,3}/g)!.join(" ")}` : "";
}

/** A formatted phone number: "+", then only digits and spaces. */
const SAFE_PHONE = /^\+[\d ]+$/;

function csvCell(value: string | number | null, { phone = false } = {}): string {
  let s = value === null ? "" : String(value);
  // Stop spreadsheets from running a cell as a formula. Only a formatted phone
  // number may start with "+"; leading spaces are ignored by spreadsheets too.
  if (/^\s*[=+\-@\t\r]/.test(s) && !(phone && SAFE_PHONE.test(s))) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const PHONE_COLUMN = 1;

/** The CSV text for a list of teachers (exactly what the panel shows). */
export function buildCsv(rows: UnfinishedTeacher[]): string {
  const header = [
    "Name",
    "Phone",
    "School",
    "Region",
    "Registered (EAT)",
    "Stopped at",
    "Messages sent",
    "Last message (EAT)",
    "Account status",
  ];
  const lines = rows.map((r) =>
    [
      r.name,
      formatPhone(r.waId),
      r.school,
      r.region,
      r.registered,
      STOPPED_AT_LABELS[r.stoppedAt] ?? r.stoppedAt,
      r.messages,
      r.lastMessage,
      r.accountState.replace(/_/g, " "),
    ]
      .map((v, i) => csvCell(v, { phone: i === PHONE_COLUMN }))
      .join(",")
  );
  // BOM so Excel opens Swahili names and dashes as UTF-8.
  return "\ufeff" + [header.join(","), ...lines].join("\r\n");
}
