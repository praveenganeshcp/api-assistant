import  { AllHTMLAttributes } from "react";
import { TabProps } from "../Tab/Tab";
import "./TabView.scss";

interface ReactEasyTabProps extends Pick<AllHTMLAttributes<HTMLElement>, "children"> {
    activeIndex: number;
    onChangeTab: (index: number) => unknown;
    titleWidth: string;
    contentWidth: string;
}

export function TabView(props : ReactEasyTabProps) {
    const {activeIndex, children, onChangeTab, titleWidth, contentWidth} = props;
    let tabs: any[] = !Array.isArray(children) ? [children] : children;

    const allTabProps: TabProps[] = (tabs as any[])
        .map(tab => (tab.props as TabProps));
    
    return (
        <div 
            className="react-easy-tab-view">
            <div className="react-easy-tab-titles" style={{width: titleWidth}}>
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
            <div className="react-easy-tab-content" style={{width: contentWidth}}>
                {tabs[activeIndex]}
            </div>
        </div>
    )
}