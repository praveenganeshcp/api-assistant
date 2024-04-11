type HttpMethods = "POST" | "GET" | "PATCH" | "DELETE";

const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL  ;

function fetchApi<T>(method: HttpMethods, path: string, payload?: T) {
    return fetch(`${apiBaseUrl}/api/v6${path}`, {
        method,
        body: payload ? JSON.stringify(payload) : undefined,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

export async function httpGet(path: string) {
    return fetchApi("GET", path);
}

export async function httpPost<T>(path: string, payload: T) {
    return fetchApi("POST", path, payload);
}