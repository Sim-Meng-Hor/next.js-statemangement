// fetch data From API Products
const baseAPI = process.env.NEXT_PUBLIC_API;

// fetch products list
export async function fetchAllProducts() {
  const data = await fetch(`${baseAPI}/api/v1/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await data.json();
  return response;
}
