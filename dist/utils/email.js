"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = isValidEmail;
exports.normalizeEmail = normalizeEmail;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
function isValidEmail(email) {
    return EMAIL_REGEX.test(email.trim());
}
function normalizeEmail(email) {
    return email.trim().toLowerCase();
}
//# sourceMappingURL=email.js.map