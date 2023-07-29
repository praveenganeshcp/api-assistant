import  { AllHTMLAttributes } from "react";
import { SideTabContentProps } from "../SideTabContent/SideTabContent";
import "./SideTabView.scss";

/**
 * Props to customize side tab view.
 */
export interface ReactEasySideTabProps extends Pick<AllHTMLAttributes<HTMLElement>, "children"> {
    /**
     * Currently active tab index.
     */
    activeIndex: number;
    /**
     * Fired when tab is selected.`selectedIndex` will be passed as argument to the handler.
     */
    onChangeTab: (selectedIndex: number) => void;
    /**
     * Width to be allocated to tab titles.
     */
    titleWidth: number;
}

/**
 * A customizable side tab view component for organizing and displaying content with a clean and intuitive user interface.
 * Import the component and add individual tab contents as children elements.
 */
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