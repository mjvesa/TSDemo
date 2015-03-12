// Interface for JavascriptComponent

export interface ResizeEvent {
    element:HTMLElement;
}

export interface State {
    height:string;
    width:string;
    readOnly:string;
    immediate:boolean;
    description:string;
    // Note: for the caption, there is a difference between null and an empty
    // string!
    caption: Array<string>;
    styles: Array<string>;
    // List<String> styles = null;
    id:string;
    primaryStyleName:string;

    // HTML formatted error message for the component
    // TODO this could be an object with more information, but currently the UI
    // only uses the message
    errorMessage:string;
}


// In addition to what can be seen below, any functions registered
// using addFunction in AbstractJavascriptComponent will be available here
// as client->server RPC functions. 
export interface Connector {
    getConnectorId:() => string;
    getParentId:() => string;
    getState: () => State;
    getRpcProxy: (iface:string) => any;
    getElement:() => HTMLElement;
    registerRpc: (iface:string, rpcHandler:() => void) => void;
    translateVaadinUri: (uri:string) => string;
    addResizeListener: (el:HTMLElement, listener:(event:ResizeEvent) => void) => void;
    removeResizeListener: (el:HTMLElement, listener:(event:ResizeEvent) => void) => void;
    onStateChange: () => void;
    onUnregister: () => void;
}
