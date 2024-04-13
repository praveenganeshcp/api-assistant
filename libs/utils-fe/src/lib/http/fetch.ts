type HttpMethods = "POST" | "GET" | "PATCH" | "DELETE";

const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL  ;

interface HttpResponse<O> {
    statusCode: number;
    body: O;
}

async function fetchApi<O>(method: HttpMethods, path: string, payload?: any): Promise<HttpResponse<O>> {
    try {
        const response = await fetch(`${apiBaseUrl}/api/v6${path}`, {
            method,
            body: payload ? JSON.stringify(payload) : undefined,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        
        if(response.status >= 400) {
            const body = await response.json()
            throw body?.message;
        }
        const httpResponse: HttpResponse<O> = {
            statusCode: response.status,
            body:  await response.json()
        }
        return httpResponse;
    }
    catch(err: any) {
        throw new Error(err ?? "Something went wrong!");
    }
    
}

export async function httpGet<O>(path: string) {
    return fetchApi<O>("GET", path);
}

export async function httpPost<I, O>(path: string, payload: I) {
    return fetchApi<O>("POST", path, payload);
}