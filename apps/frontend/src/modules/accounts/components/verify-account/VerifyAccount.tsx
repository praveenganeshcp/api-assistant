import { APP_CONFIG } from "apps/frontend/src/constants";
import { useEffect } from "react";
import { useParams } from "react-router-dom"

export function VerifyAccount() {
    const { token } = useParams();

    useEffect(() => {
        console.log('verifying account', token);
    }, [])

    return (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            <h3>Verifying your {APP_CONFIG.NAME} account...</h3>
        </div>
    )
}