export const apiClient = async (url: string) => {
    const res = await fetch(url, { credentials: "include" })

    if (!res.ok) {
        const error: any = new Error("Request failed");
        error.status = res.status;
        throw error;
    }

    return res.json()
}