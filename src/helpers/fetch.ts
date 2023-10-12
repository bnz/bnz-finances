const BIN_ID = "65129e8c0574da7622b080d3"
const X_MASTER_KEY = "$2a$10$2D923FoCNR8T9GDGmzAzYenNKXCF3n3U8UlN3ghThWztuX7F0TOOS"
const ROOT_URL = "https://api.jsonbin.io/v3/b/"

export interface DataItem {
    id: string
    title: string
    sum: number
    color: string | null
}

export type Data = DataItem[]

export async function fetch<T = Data>(
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: string,
): Promise<T> {
    return await (await window.fetch(`${ROOT_URL}${BIN_ID}?meta=false`, {
        method,
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": X_MASTER_KEY,
            "X-Bin-Meta": "false",
        },
        ...(body ? { body } : {}),
    })).json()
}
