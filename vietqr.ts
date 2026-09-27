// Builds a VietQR quick-link image (img.vietqr.io) for manual bank-transfer
// payment. No API key needed — it's a public image-generation endpoint.
// Docs: https://www.vietqr.io/danh-sach-api/link-tao-ma-nhanh
export function buildVietQrUrl(amount: number, orderCode: string) {
  const bankId = process.env.NEXT_PUBLIC_BANK_ID; // e.g. "MB", "VCB", "TCB"
  const accountNo = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NO;
  const accountName = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME;

  const params = new URLSearchParams({
    amount: String(Math.round(amount)),
    addInfo: orderCode,
    accountName: accountName ?? "",
  });

  return `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?${params.toString()}`;
}
