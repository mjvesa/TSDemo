package com.github.mjvesa.tsdemo;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;

import org.jsoup.nodes.Element;

import com.github.mjvesa.tsdemo.widget.DemoWidget;
import com.github.mjvesa.tsdemo.widget.DemoWidget.ClickListener;
import com.vaadin.annotations.Theme;
import com.vaadin.annotations.VaadinServletConfiguration;
import com.vaadin.server.BootstrapFragmentResponse;
import com.vaadin.server.BootstrapListener;
import com.vaadin.server.BootstrapPageResponse;
import com.vaadin.server.ServiceException;
import com.vaadin.server.SessionInitEvent;
import com.vaadin.server.SessionInitListener;
import com.vaadin.server.VaadinRequest;
import com.vaadin.server.VaadinServlet;
import com.vaadin.ui.Button;
import com.vaadin.ui.Button.ClickEvent;
import com.vaadin.ui.HorizontalLayout;
import com.vaadin.ui.Label;
import com.vaadin.ui.Notification;
import com.vaadin.ui.TextField;
import com.vaadin.ui.UI;
import com.vaadin.ui.VerticalLayout;

@Theme("mytheme")
@SuppressWarnings("serial")
public class MyVaadinUI extends UI {

    @WebServlet(value = "/*", asyncSupported = true)
    @VaadinServletConfiguration(productionMode = false,
            ui = MyVaadinUI.class,
            widgetset = "com.github.mjvesa.tsdemo.AppWidgetSet")
    public static class Servlet extends VaadinServlet {
    }

    @Override
    protected void init(VaadinRequest request) {
        final HorizontalLayout layout = new HorizontalLayout();
        layout.setSpacing(true);
        layout.setMargin(true);
        setContent(layout);

        final DemoWidget dw = new DemoWidget();
        dw.setDescription("Tooltips are possible");
        layout.addComponent(dw);

        final TextField tfr = new TextField("R", "1.0");
        final TextField tfg = new TextField("G", "1.0");
        final TextField tfb = new TextField("B", "1.0");
        Button b = new Button("Set colors", new Button.ClickListener() {
            @Override
            public void buttonClick(ClickEvent event) {
                dw.setRGB(Double.valueOf(tfr.getValue()),
                        Double.valueOf(tfg.getValue()),
                        Double.valueOf(tfb.getValue()));
            }
        });
        
        dw.addClickListener(new ClickListener() {
            
            @Override
            public void clicked() {
                Notification.show("It was clicked!");
            }
        });

        layout.addComponents(new VerticalLayout(tfr, tfg, tfb), b);

    }

}
