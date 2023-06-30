import { APP_CONFIG } from "apps/frontend/src/constants";
import "./LandingPage.scss";
import { LandingPageFeatureCard } from "../landing-page-feature-card/LandingPageFeatureCard";
import { Link } from "react-router-dom";
import { LandingPageHeader } from "../landing-page-header/LandingPageHeader";

export function LandingPage() {
    const features: {name: string, id: number, description: string}[] = [
        {
            id: 1,
            name: "Zero Backend code",
            description: `Declaratively create and query application data from Frontend.`
        },
        {
            id: 2,
            name: "Welcome users in minutes",
            description: "Integrate username and password authentication in minutes."
        },
        {
            id: 3,
            name: "Upload files",
            description: "Allow users to upload files without worrying about infrastructure."
        },
        {
            id: 4,
            name: "Simple and Clean UI",
            description: `Explore application data and files in simple and elegant UI`
        }
    ]
    return (
        <section className="w-100 d-flex flex-column landing-page">
            <LandingPageHeader />
            <div className="landing-page-app-banner d-flex flex-column 
                align-items-center justify-content-around">
                <h1>{APP_CONFIG.NAME}</h1>
                <h3>{APP_CONFIG.SLOGAN}</h3>
            </div>
            <div className="mt-3 w-100 landing-page-feature-cards">
                {features.map(feature => 
                    <LandingPageFeatureCard 
                        name={feature.name} 
                        key={feature.id}
                        description={feature.description} 
                    />
                )}
            </div>
            <div className="landing-page-try-today-banner">
                <span>
                    Want to build application with {APP_CONFIG.NAME}?
                    <Link to={"/accounts/signup"}> Signup here</Link>
                </span>
            </div>
        </section>        
    )
}