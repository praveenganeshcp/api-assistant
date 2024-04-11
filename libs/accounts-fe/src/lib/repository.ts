
export async function login(emailId: string, password: string) {

    const response = await fetch("http://localhost:3000/api/v6/accounts/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({emailId, password}),
        credentials: "include"
    })
    const loginResponse = await response.json()
    return loginResponse;
}

export async function fetchProfile() {
  console.log(import.meta.env.VITE_TEST)

    const response = await fetch("http://localhost:3000/api/v6/accounts/profile", {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })
    const loginResponse = await response.json()
    return loginResponse;
}