
export const PRODUCTS = [
  {
    id: "granite-segment-g200",
    name: "سگمنت الماسه سری G-200",
    code: "CS-G200",
    category: "سگمنت الماسه",
    description: "سگمنت الماسه صنعتی برای کاربردهای برش سنگ",

    sizes: [
      {
        id: "24x8x5",
        label: "24 × 8 × 5",
        dimensions: {
          length: 24,
          width: 8,
          height: 5
        },
        price: 100000,
        currency: "IRR",
        available: true
      },
      {
        id: "24x8x6",
        label: "24 × 8 × 6",
        dimensions: {
          length: 24,
          width: 8,
          height: 6
        },
        price: 120000,
        currency: "IRR",
        available: true
      }
    ]
  },

  {
    id: "demo-product-2",
    name: "محصول آزمایشی دوم",
    code: "TEST-002",
    category: "محصول آزمایشی",
    description: "محصول آزمایشی برای بررسی مدیریت قیمت نامشخص",

    sizes: [
      {
        id: "30x10x6",
        label: "30 × 10 × 6",
        dimensions: {
          length: 30,
          width: 10,
          height: 6
        },
        price: null,
        currency: "IRR",
        available: true
      }
    ]
  },

  {
    id: "demo-product-3",
    name: "محصول آزمایشی سوم",
    code: "TEST-003",
    category: "محصول آزمایشی",
    description: "محصول آزمایشی بدون ابعاد تعریف‌شده",

    sizes: []
  }
];
