export function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "");
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0 && digits.length >= 12 && digits.length <= 19;
}

export function validateExpiry(mmYY: string): boolean {
  const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(mmYY.trim());
  if (!match) return false;
  const month = parseInt(match[1], 10);
  const year = 2000 + parseInt(match[2], 10);
  const now = new Date();
  const exp = new Date(year, month, 0, 23, 59, 59, 999);
  return exp >= now;
}
