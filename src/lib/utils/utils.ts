export function generateRandomNumber(digitCount: number): number {
  if (digitCount < 1) {
    throw new Error("Digit count must be at least 1");
  }

  const min = Math.pow(10, digitCount - 1);
  const max = Math.pow(10, digitCount) - 1;

  return Math.floor(min + Math.random() * (max - min + 1));
}

export const formatDate = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (24 * 60 * 60 * 1000);

  if (diffDays < 1) {
    const diffHours = diffMs / (60 * 60 * 1000);
    if (diffHours < 1) {
      const diffMinutes = diffMs / (60 * 1000);
      return `${Math.floor(diffMinutes)} dakika önce`;
    }
    return `${Math.floor(diffHours)} saat önce`;
  }
  return date.toUTCString();
};
