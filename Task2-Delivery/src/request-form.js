import { PRODUCTS } from './product-data.js';

// تبدیل اعداد فارسی و عربی به انگلیسی
export function normalizeDigits(value) {
  const persian = '۰۱۲۳۴۵۶۷۸۹';
  const arabic = '٠١٢٣٤٥٦٧٨٩';

  return String(value).replace(/[۰-۹٠-٩]/g, digit => {
    const index = persian.indexOf(digit);
    return index !== -1 ? String(index) : String(arabic.indexOf(digit));
  });
}

// دریافت اطلاعات محصولات
export function getProducts() {
  return PRODUCTS;
}

// دریافت سایزهای یک محصول
export function getProductSizes(productId) {
  const product = PRODUCTS.find(item => item.id === productId);
  return product ? product.sizes : [];
}

// اعتبارسنجی شماره موبایل ایران
export function validateMobile(value) {
  const mobile = normalizeDigits(value).replace(/[\s-]/g, '');

  return /^(09\d{9}|\+989\d{9}|00989\d{9})$/.test(mobile);
}

// اعتبارسنجی تعداد
export function validateQuantity(value) {
  const quantity = normalizeDigits(value).trim();

  return /^[1-9]\d*$/.test(quantity);
}

// محاسبه مبلغ اولیه
export function calculateAmount(unitPrice, quantity) {
  if (
    unitPrice === null ||
    unitPrice === undefined ||
    !Number.isFinite(Number(unitPrice)) ||
    !validateQuantity(quantity)
  ) {
    return null;
  }

  return Number(unitPrice) * Number(normalizeDigits(quantity));
}

// اعتبارسنجی اطلاعات فرم
export function validateRequest(data) {
  const errors = {};

  if (!data.companyName?.trim()) {
    errors.companyName = 'نام شرکت الزامی است.';
  }

  if (!data.mobile?.trim()) {
    errors.mobile = 'شماره موبایل الزامی است.';
  } else if (!validateMobile(data.mobile)) {
    errors.mobile = 'شماره موبایل معتبر نیست.';
  }

  if (!data.city?.trim()) {
    errors.city = 'انتخاب شهر الزامی است.';
  }

  if (!data.productId) {
    errors.productId = 'انتخاب محصول الزامی است.';
  }

  if (!data.sizeId) {
    errors.sizeId = 'انتخاب سایز الزامی است.';
  }

  if (!data.quantity?.trim()) {
    errors.quantity = 'تعداد را وارد کنید.';
  } else if (!validateQuantity(data.quantity)) {
    errors.quantity = 'تعداد باید عدد صحیح بزرگ‌تر از صفر باشد.';
  }

  const product = PRODUCTS.find(item => item.id === data.productId);

  if (product && data.sizeId) {
    const sizeExists = product.sizes.some(
      size => size.id === data.sizeId
    );

    if (!sizeExists) {
      errors.sizeId = 'سایز انتخاب‌شده معتبر نیست.';
    }
  }

  return errors;
}