export function mapNameToIcon(name: string): string {
  const lowerCaseName = name.toLowerCase();

  if (
    lowerCaseName.includes("ví") ||
    lowerCaseName.includes("wallet") ||
    lowerCaseName.includes("cash") ||
    lowerCaseName.includes("tiền mặt")
  ) {
    return "wallet";
  } else if (
    lowerCaseName.includes("thẻ") ||
    lowerCaseName.includes("card") ||
    lowerCaseName.includes("tín dụng") ||
    lowerCaseName.includes("ngân hàng") ||
    lowerCaseName.includes("visa") ||
    lowerCaseName.includes("bank")
  ) {
    return "credit-card";
  } else if (
    lowerCaseName.includes("shop") ||
    lowerCaseName.includes("lazada") ||
    lowerCaseName.includes("cửa hàng")
  ) {
    return "shopping-cart";
  } else {
    return "money";
  }
}
