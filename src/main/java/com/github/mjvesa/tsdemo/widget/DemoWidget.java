package com.github.mjvesa.tsdemo.widget;

import java.util.HashSet;
import java.util.Set;

import com.vaadin.annotations.JavaScript;
import com.vaadin.ui.AbstractJavaScriptComponent;
import com.vaadin.ui.JavaScriptFunction;

import elemental.json.JsonArray;


@JavaScript({"DemoWidget.js"})
public class DemoWidget extends AbstractJavaScriptComponent {
    
    private Set<ClickListener> clickListeners = new HashSet<ClickListener>();
    
    public static interface ClickListener {
        public void clicked();
    }

    public DemoWidget() {
        addFunction("clicked", new JavaScriptFunction() {
            
            @Override
            public void call(JsonArray arguments) {
                for (ClickListener listener : clickListeners) {
                    listener.clicked();
                }
            }
        });
    }
        
    protected DemoWidgetState getState() {
        return (DemoWidgetState) super.getState();
    }
    
    public void setRGB(double r, double g, double b) {
        callFunction("setRGB", r, g, b);
    }
    
    public void addClickListener(ClickListener listener) {
        clickListeners.add(listener);
    }
    
    public void removeClickListener(ClickListener listener) {
        clickListeners.remove(listener);
    }

}
