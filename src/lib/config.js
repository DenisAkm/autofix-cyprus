// Single source of truth for contact details & business facts.
// Edit these in one place — every component reads from here.

export const CONTACT = {
  phoneDisplay: "+357 99 777281",
  phoneHref: "tel:+35799777281",
  whatsapp: "35799777281",
  whatsappHref: "https://wa.me/35799777281",
  email: "support@autofixcyprus.com",
  emailHref: "mailto:support@autofixcyprus.com",
  instagram: "https://www.instagram.com/autofixcyprus/",
  facebook: "https://www.facebook.com/people/AutoFix-Cyprus/61578717991640/",
  address: "Konstantinou & Euripidi Avenue 25, Shop 4, Cyprus",
  mapLink: "https://maps.google.com/?cid=9240733620121607118",
  // Keyless Google Maps embed (pin at the shop coordinates).
  mapEmbed: "https://maps.google.com/maps?q=34.6557878,32.9683562&z=16&output=embed",
};

export const HOURS = {
  weekdays: "08:00 – 18:00",
  emergency: true,
};

export const CITIES = ["Nicosia", "Limassol", "Larnaca", "Paphos", "Famagusta"];

// Build a pre-filled WhatsApp link from the request form so leads never get
// lost to a flaky backend — the message opens straight in WhatsApp.
export function buildWhatsappLink({ name, phone, city, service, message }) {
  const lines = [
    "Hello AutoFix Cyprus! I'd like a free estimate.",
    name && `Name: ${name}`,
    phone && `Phone: ${phone}`,
    city && `Location: ${city}`,
    service && `Service: ${service}`,
    message && `Details: ${message}`,
  ].filter(Boolean);
  return `${CONTACT.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
}
