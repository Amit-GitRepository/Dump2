package com.iservice;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.cboy.rn.splashscreen.SplashScreen;
import com.iservice.firebasedynamiclink.FirebaseDynamicLinkModule;

public class MainActivity extends ReactActivity{

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "iService";
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onResume() {
        super.onResume();
        // Add firebase listener for dynamic links
        FirebaseDynamicLinkModule.attachDynamicLinkListener(this);
    }
}
