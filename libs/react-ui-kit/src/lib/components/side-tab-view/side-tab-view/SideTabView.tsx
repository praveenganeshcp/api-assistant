import  { AllHTMLAttributes } from "react";
import { SideTabContentProps } from "../SideTabContent/SideTabContent";
import "./SideTabView.scss";

export interface ReactEasySideTabProps extends Pick<AllHTMLAttributes<HTMLElement>, "children"> {
    activeIndex: number;
    onChangeTab: (selectedIndex: number) => void;
    titleWidth: number;
}

export function SideTabView(props : ReactEasySideTabProps) {
    const {activeIndex, children, onChangeTab, titleWidth} = props;
    const titleSize = `${titleWidth}%`;
    const contentSize = `${100-titleWidth}%`;
    const allSideTabContent: any[] = !Array.isArray(children) ? [children] : children;

    const allTabContentProps: SideTabContentProps[] = (allSideTabContent as any[])
        .map(tab => (tab.props as SideTabContentProps));
    
    return (
        <div 
            className="react-easy-side-tab-view">
            <div className="react-easy-side-tab-titles" style={{width: titleSize}}>
                {
                    allTabContentProps.map(
                        (sideTabContentProp, index) => 
                        <button 
                            key={index}
                            className={`react-easy-side-tab-title ${index === activeIndex ? 'react-easy-active-side-tab' : ''}`}
                            onClick={() => onChangeTab(index)} 
                            disabled={sideTabContentProp.disabled}
                        >
                            {sideTabContentProp.title}
                        </button>
                    )
                }
            </div>
            <div className="react-easy-side-tab-content" style={{width: contentSize}}>
                {allSideTabContent[activeIndex]}
            </div>
        </div>
    )
}