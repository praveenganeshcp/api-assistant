import "./LandingPageFeatureCard.scss";

interface LandingPageFeatureCardProps {
    name: string;
    description: string
}

export function LandingPageFeatureCard(props: LandingPageFeatureCardProps) {
    return (
        <div className="p-3 landing-page-feature-card">
            <h3>{props.name}</h3>
            <h6 className="mt-3">{props.description}</h6>
        </div>
    )
}