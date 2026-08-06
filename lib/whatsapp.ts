/** Twiga's WhatsApp chatbot number, digits only, in international format. */
export const TWIGA_WHATSAPP_NUMBER = "255743464912";

/** Pre-filled first message, so the teacher only has to press send. */
export const TWIGA_WHATSAPP_GREETING =
  "Hi Twiga! I'm a teacher and I'd like to join the beta.";

/** wa.me deep link — opens the WhatsApp app on mobile, WhatsApp Web on desktop. */
export function whatsappLink(message: string = TWIGA_WHATSAPP_GREETING): string {
  return `https://wa.me/${TWIGA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Renders 255700000000 as "+255 700 000 000". */
export function formatWhatsappNumber(
  number: string = TWIGA_WHATSAPP_NUMBER,
): string {
  const digits = number.replace(/\D/g, "");
  const match = digits.match(/^(\d{3})(\d{3})(\d{3})(\d{3})$/);
  return match
    ? `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`
    : `+${digits}`;
}
