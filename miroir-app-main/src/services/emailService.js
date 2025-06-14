// src/services/emailService.js
import emailjs from "@emailjs/browser";

// Initialise EmailJS avec TON user_id (PUBLIC_KEY)
emailjs.init("pg95igy_kpn72hVfg");

const SERVICE_ID  = "service_p8f4b5b";
const TEMPLATE_ID = "template_78xv20p";

export async function sendVerificationEmail(email, code) {
  try {
    const templateParams = {
      to_email:          email,  // {{to_email}} dans “To Email”
      user_email:        email,  // {{user_email}} dans le contenu / Reply To
      verification_code: code    // {{verification_code}} dans le contenu / subject
    };

    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    console.log("✅ EmailJS OK:", result);
    return { success: true };
  } catch (err) {
    console.error("❌ EmailJS Error:", err);
    return { success: false, error: err.text || err.message };
  }
}
