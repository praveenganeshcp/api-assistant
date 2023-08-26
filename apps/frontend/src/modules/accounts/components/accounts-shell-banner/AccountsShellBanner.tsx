import { APP_CONFIG } from "../../../../constants";
import "./AccountsShellBanner.scss";


export function AccountsShellBanner() {
    return (
        <section className="h-100 w-100 d-flex accounts-shell-banner justify-content-center align-items-center">
            <div className="d-flex flex-column align-items-center justify-content-center h-50 w-100">
                <h4>{APP_CONFIG.SLOGAN}</h4>
                <ul className="mt-3">
                    <li>Integrate username and password authentication in minutes.</li>
                    <li>Manage your application data declaratively from Frontend.</li>
                    <li>Use MongoDB query language to aggregate data at any scale.</li>
                    <li>Upload files without worrying about storage.</li>
                </ul>
            </div>
        </section>
    )
}