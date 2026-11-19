const STORAGE_KEY = 'cutston_purchase_requests_v1';

// دریافت تمام درخواست‌های ذخیره‌شده
export function getRequests() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('خطا در خواندن درخواست‌ها:', error);
    return [];
  }
}

// تولید کد پیگیری یکتا
function generateTrackingNumber() {
  const date = new Date();
  const datePart = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('');

  const randomPart = crypto.randomUUID()
    .replaceAll('-', '')
    .slice(0, 8)
    .toUpperCase();

  return `CUT-${datePart}-${randomPart}`;
}

// ذخیره درخواست جدید
export function saveRequest(data) {
  const requests = getRequests();

  const request = {
    ...data,
    trackingNumber: generateTrackingNumber(),
    createdAt: new Date().toISOString()
  };

  try {
    requests.push(request);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(requests)
    );

    return request;
  } catch (error) {
    throw new Error('ذخیره درخواست انجام نشد. فضای ذخیره‌سازی مرورگر را بررسی کنید.');
  }
}

// دریافت یک درخواست با کد پیگیری
export function getRequestByTrackingNumber(trackingNumber) {
  const requests = getRequests();

  return requests.find(
    request => request.trackingNumber === trackingNumber
  ) || null;
}