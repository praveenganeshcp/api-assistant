import  { AllHTMLAttributes } from "react";
import { TabProps } from "../Tab/Tab";
import "./TabView.scss";

interface ReactEasyTabProps extends Pick<AllHTMLAttributes<HTMLElement>, "children"> {
    activeIndex: number;
    onChangeTab: (index: number) => unknown;
}

export function TabView({activeIndex, children, onChangeTab} : ReactEasyTabProps) {
    let tabs: any[] = !Array.isArray(children) ? [children] : children;

    const allTabProps: TabProps[] = (tabs as any[])
        .map(tab => (tab.props as TabProps));
    
    return (
        <div 
            className="react-easy-tab-view">
            <div className="react-easy-tab-titles">
                {
                    allTabProps.map(
                        (tabProp, index) => 
                        <button 
                            key={index}
                            className={`react-easy-tab-title ${index === activeIndex ? 'react-easy-active-tab' : ''}`}
                            onClick={() => onChangeTab(index)} 
                            disabled={tabProp.disabled}
                        >
                            {tabProp.title}
                        </button>
                    )
                }
            </div>
            <div className="react-easy-tab-content">
                {tabs[activeIndex]}
            </div>
        </div>
    )
}