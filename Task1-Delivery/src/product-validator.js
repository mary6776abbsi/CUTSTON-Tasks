
import assert from 'node:assert/strict';
import { build } from 'esbuild';

console.log('شروع تست‌های تسک اول...');

// ساخت نسخه قابل اجرا از فایل اعتبارسنجی
const result = await build({
  entryPoints: ['src/product-validator.js'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false
});

const code = result.outputFiles[0].text;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;

const importedModule = await import(moduleUrl);
const validateProducts = importedModule.validateProducts;

assert.equal(typeof validateProducts, 'function');

console.log('تابع اعتبارسنجی با موفقیت بارگذاری شد.');

// اطلاعات نمونه برای تست
const validProducts = [
  {
    id: 'product-1',
    name: 'محصول اول',
    code: 'P-001',
    sizes: [
      {
        id: 'size-1',
        label: '10 × 5 × 2',
        dimensions: {
          length: 10,
          width: 5,
          height: 2
        },
        price: null
      }
    ]
  },
  {
    id: 'product-2',
    name: 'محصول دوم',
    code: 'P-002',
    sizes: []
  }
];

// تست ۱: اطلاعات معتبر
assert.deepEqual(validateProducts(validProducts), []);
console.log('PASS: اطلاعات معتبر');

// تست ۲: شناسه تکراری محصول
const duplicateProduct = [
  ...validProducts,
  { ...validProducts[0] }
];

assert.ok(
  validateProducts(duplicateProduct).some(error =>
    error.includes('شناسه تکراری')
  )
);
console.log('PASS: شناسه تکراری محصول');

// تست ۳: قیمت منفی
const negativePrice = structuredClone(validProducts);
negativePrice[0].sizes[0].price = -100;

assert.ok(
  validateProducts(negativePrice).some(error =>
    error.includes('قیمت معتبر نیست')
  )
);
console.log('PASS: قیمت منفی');

// تست ۴: شناسه تکراری سایز
const duplicateSize = structuredClone(validProducts);
duplicateSize[0].sizes.push({
  ...duplicateSize[0].sizes[0]
});

assert.ok(
  validateProducts(duplicateSize).some(error =>
    error.includes('شناسه سایز تکراری')
  )
);
console.log('PASS: شناسه تکراری سایز');

// تست ۵: محصول بدون ابعاد
assert.deepEqual(
  validateProducts([validProducts[1]]),
  []
);
console.log('PASS: محصول بدون ابعاد');

// تست ۶: قیمت نامشخص
assert.deepEqual(
  validateProducts(validProducts),
  []
);
console.log('PASS: قیمت نامشخص');

console.log('\nتمام تست‌ها با موفقیت اجرا شدند.');
